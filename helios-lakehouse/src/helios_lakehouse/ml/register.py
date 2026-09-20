"""Register the latest MLflow run as a Unity Catalog model version."""

from __future__ import annotations

import argparse


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--catalog", required=True)
    p.add_argument("--alias", default="Challenger")
    p.add_argument("--schema", default="ml")
    p.add_argument("--name", default="demand_forecast")
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    import mlflow
    from mlflow.tracking import MlflowClient
    from pyspark.sql import SparkSession

    spark = SparkSession.builder.getOrCreate()
    run_id = spark.table(f"{args.catalog}.ml.last_training_run").collect()[0]["run_id"]
    model_uri = f"runs:/{run_id}/model"
    uc_name = f"{args.catalog}.{args.schema}.{args.name}"
    result = mlflow.register_model(model_uri, uc_name)
    MlflowClient().set_registered_model_alias(uc_name, args.alias, result.version)


if __name__ == "__main__":
    main()
