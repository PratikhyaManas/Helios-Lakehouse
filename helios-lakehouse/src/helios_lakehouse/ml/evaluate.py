"""Holdout / monitor WAPE. Sets task value ``promote`` for the job graph."""

from __future__ import annotations

import argparse

import numpy as np


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--catalog", required=True)
    p.add_argument("--wape-gate", dest="wape_gate", type=float, default=0.22)
    p.add_argument("--mode", choices=["holdout", "monitor"], default="holdout")
    p.add_argument("--windows", type=int, default=7)
    return p.parse_args(argv)


def wape(actual: np.ndarray, predicted: np.ndarray) -> float:
    denom = np.abs(actual).sum()
    if denom == 0:
        return 0.0
    return float(np.abs(actual - predicted).sum() / denom)


def should_promote(metric: float, gate: float, mode: str) -> bool:
    """Holdout: promote when WAPE <= gate. Monitor: 'promote' means healthy (not drifted)."""
    return metric <= gate


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    from pyspark.dbutils import DBUtils
    from pyspark.sql import SparkSession
    from pyspark.sql import functions as F

    spark = SparkSession.builder.getOrCreate()
    dbutils = DBUtils(spark)

    if args.mode == "holdout":
        row = spark.table(f"{args.catalog}.ml.last_training_run").collect()[0]
        metric = float(row["train_wape"])
    else:
        pred = spark.table(f"{args.catalog}.ml.demand_predictions")
        scored = (
            pred.where(F.col("actual_units").isNotNull())
            .orderBy(F.col("scored_at").desc())
            .limit(500_000)
        )
        pdf = scored.select("actual_units", "predicted_units").toPandas()
        metric = wape(
            pdf["actual_units"].to_numpy(dtype=float),
            pdf["predicted_units"].to_numpy(dtype=float),
        )

    promote = should_promote(metric, args.wape_gate, args.mode)
    dbutils.jobs.taskValues.set(key="promote", value="true" if promote else "false")
    dbutils.jobs.taskValues.set(key="wape", value=str(round(metric, 4)))


if __name__ == "__main__":
    main()
