"""Batch-score next-horizon demand for every in-range store-SKU."""

from __future__ import annotations

import argparse


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--catalog", required=True)
    p.add_argument("--alias", default="Champion")
    p.add_argument("--horizon-weeks", dest="horizon_weeks", type=int, default=12)
    p.add_argument("--schema", default="ml")
    p.add_argument("--name", default="demand_forecast")
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    import mlflow
    from pyspark.sql import SparkSession
    from pyspark.sql import functions as F

    spark = SparkSession.builder.getOrCreate()
    model_uri = f"models:/{args.catalog}.{args.schema}.{args.name}@{args.alias}"
    model = mlflow.pyfunc.load_model(model_uri)
    feats = spark.table(f"{args.catalog}.ml.demand_features").toPandas()
    preds = model.predict(feats[["recency_days", "units_l7", "units_l28", "on_hand"]])
    feats = feats.copy()
    feats["predicted_units"] = preds
    feats["model_version"] = args.alias
    feats["horizon_weeks"] = args.horizon_weeks
    feats["scored_at"] = F.current_timestamp()  # filled below in Spark
    sdf = spark.createDataFrame(feats.drop(columns=["scored_at"]))
    sdf = sdf.withColumn("scored_at", F.current_timestamp()).withColumn(
        "actual_units", F.lit(None).cast("double")
    )
    (
        sdf.write.mode("append")
        .option("mergeSchema", "true")
        .saveAsTable(f"{args.catalog}.ml.demand_predictions")
    )


if __name__ == "__main__":
    main()
