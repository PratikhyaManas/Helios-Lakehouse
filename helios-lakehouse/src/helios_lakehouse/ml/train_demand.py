"""Train a store-SKU LightGBM demand model and log it to MLflow."""

from __future__ import annotations

import argparse

import numpy as np


FEATURE_COLS = ["recency_days", "units_l7", "units_l28", "on_hand"]
TARGET = "units_l7"


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--catalog", required=True)
    p.add_argument("--experiment", required=True)
    p.add_argument("--seed", type=int, default=7)
    return p.parse_args(argv)


def fit_lgbm(X: np.ndarray, y: np.ndarray, seed: int = 7):
    import lightgbm as lgb

    dataset = lgb.Dataset(X, label=y, feature_name=FEATURE_COLS)
    params = {
        "objective": "regression",
        "metric": "mae",
        "learning_rate": 0.05,
        "num_leaves": 31,
        "min_data_in_leaf": 40,
        "verbosity": -1,
        "seed": seed,
    }
    return lgb.train(params, dataset, num_boost_round=200)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    import mlflow
    import mlflow.lightgbm
    from pyspark.sql import SparkSession

    spark = SparkSession.builder.getOrCreate()
    mlflow.set_experiment(args.experiment)
    pdf = spark.table(f"{args.catalog}.ml.demand_features").toPandas()
    pdf = pdf.dropna(subset=FEATURE_COLS)
    X = pdf[FEATURE_COLS].to_numpy(dtype=float)
    y = pdf[TARGET].to_numpy(dtype=float)

    with mlflow.start_run() as run:
        model = fit_lgbm(X, y, seed=args.seed)
        pred = model.predict(X)
        wape = float(np.abs(y - pred).sum() / max(np.abs(y).sum(), 1e-9))
        mlflow.log_metric("train_wape", wape)
        mlflow.log_param("catalog", args.catalog)
        mlflow.lightgbm.log_model(model, "model")
        spark.createDataFrame(
            [(run.info.run_id, wape)],
            schema="run_id string, train_wape double",
        ).write.mode("overwrite").saveAsTable(f"{args.catalog}.ml.last_training_run")


if __name__ == "__main__":
    main()
