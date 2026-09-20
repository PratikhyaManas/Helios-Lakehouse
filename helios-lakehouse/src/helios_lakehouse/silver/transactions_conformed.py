"""Unified POS + ecommerce transactions."""

from __future__ import annotations

from helios_lakehouse.common.config import load_config

try:
    from pyspark import pipelines as dp
except ImportError:
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F


@dp.table(
    name="transactions",
    comment="Conformed sales lines from POS and ecommerce. SKU uppercased, bad amounts dropped.",
    table_properties={
        "quality": "silver",
        "delta.enableChangeDataFeed": "true",
    },
)
@dp.expect_or_drop("valid_store", "store_id RLIKE '^[0-9]{4}$' OR channel = 'ecom'")
@dp.expect_or_drop("non_negative_qty", "qty >= 0")
@dp.expect("sku_present", "sku IS NOT NULL")
def transactions():
    cfg = load_config()
    pos = spark.read.table(f"{cfg.catalog}.{cfg.bronze_schema}.pos_transactions_raw")  # noqa: F821
    ecom = spark.read.table(f"{cfg.catalog}.{cfg.bronze_schema}.ecommerce_events_raw")  # noqa: F821

    pos_lines = pos.select(
        F.col("txn_id").alias("transaction_id"),
        F.upper(F.trim("sku")).alias("sku"),
        F.col("store_id"),
        F.lit("pos").alias("channel"),
        F.col("qty").cast("double"),
        F.col("amount").cast("double"),
        F.col("event_ts").cast("timestamp").alias("event_ts"),
        F.col("customer_id"),
    )

    ecom_orders = (
        ecom.where(F.col("event_name") == "order_completed")
        .select(
            F.col("order_id").alias("transaction_id"),
            F.upper(F.trim("sku")).alias("sku"),
            F.lit(None).cast("string").alias("store_id"),
            F.lit("ecom").alias("channel"),
            F.col("qty").cast("double"),
            F.col("amount").cast("double"),
            F.col("event_ts").cast("timestamp"),
            F.col("customer_id"),
        )
    )
    return pos_lines.unionByName(ecom_orders)
