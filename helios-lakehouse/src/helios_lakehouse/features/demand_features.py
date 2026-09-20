"""Point-in-time demand features. Callable as a job entrypoint."""

from __future__ import annotations

import argparse
from datetime import date, datetime

from helios_lakehouse.common.transforms import demand_label, recency_days, week_id


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Build Helios demand features")
    p.add_argument("--catalog", required=True)
    p.add_argument("--as-of", dest="as_of", required=True, help="YYYY-MM-DD")
    p.add_argument("--lookback-weeks", type=int, default=52)
    return p.parse_args(argv)


def feature_row(
    *,
    sku: str,
    store_id: str,
    as_of: date,
    last_sale: date | None,
    units_l7: float,
    units_l28: float,
    on_hand: float,
) -> dict:
    in_stock = on_hand > 0
    observed, censored = demand_label(units_l7, in_stock)
    return {
        "sku": sku,
        "store_id": store_id,
        "week_id": week_id(as_of),
        "recency_days": recency_days(last_sale, as_of) if last_sale else 999,
        "units_l7": observed,
        "units_l28": max(0.0, units_l28),
        "on_hand": on_hand,
        "censored_demand": censored,
        "as_of": as_of.isoformat(),
    }


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    as_of = datetime.strptime(args.as_of, "%Y-%m-%d").date()
    from pyspark.sql import SparkSession
    from pyspark.sql import functions as F

    spark = SparkSession.builder.getOrCreate()
    catalog = args.catalog
    sales = spark.table(f"{catalog}.gold.sales_daily")
    inv = spark.table(f"{catalog}.bronze.inventory_snapshots_raw")

    cutoff = F.date_sub(F.lit(as_of.isoformat()), args.lookback_weeks * 7)
    recent = sales.where(F.col("business_date") >= cutoff)

    agg = recent.groupBy("store_id", "sku").agg(
        F.sum(F.when(F.col("business_date") >= F.date_sub(F.lit(as_of.isoformat()), 7), F.col("units"))).alias(
            "units_l7"
        ),
        F.sum(F.when(F.col("business_date") >= F.date_sub(F.lit(as_of.isoformat()), 28), F.col("units"))).alias(
            "units_l28"
        ),
        F.max("business_date").alias("last_sale"),
    )
    on_hand = (
        inv.withColumn("rn", F.row_number().over(
            __import__("pyspark.sql.window").window.Window.partitionBy("store_id", "sku").orderBy(
                F.col("_ingest_ts").desc()
            )
        ))
        .where(F.col("rn") == 1)
        .select("store_id", "sku", F.col("on_hand").cast("double"))
    )
    out = agg.join(on_hand, ["store_id", "sku"], "left").fillna({"on_hand": 0.0, "units_l7": 0.0, "units_l28": 0.0})
    out = out.withColumn("week_id", F.lit(week_id(as_of))).withColumn("as_of", F.lit(as_of.isoformat()))
    (
        out.write.mode("overwrite")
        .option("overwriteSchema", "true")
        .saveAsTable(f"{catalog}.ml.demand_features")
    )


if __name__ == "__main__":
    main()
