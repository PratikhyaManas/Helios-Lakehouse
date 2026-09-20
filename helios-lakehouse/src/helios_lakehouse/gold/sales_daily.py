"""Store-SKU daily sales mart."""

from __future__ import annotations

from helios_lakehouse.common.config import load_config

try:
    from pyspark import pipelines as dp
except ImportError:
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F


@dp.table(
    name="sales_daily",
    comment="Grain: business_date, store_id, sku, channel. Fed to BI and demand features.",
    table_properties={
        "quality": "gold",
        "delta.enableChangeDataFeed": "true",
        "delta.dataSkippingNumIndexedCols": "4",
    },
)
@dp.expect("positive_net_sales", "net_sales >= 0")
def sales_daily():
    cfg = load_config()
    tx = spark.read.table(f"{cfg.catalog}.{cfg.silver_schema}.transactions")  # noqa: F821
    return (
        tx.withColumn("business_date", F.to_date("event_ts"))
        .groupBy("business_date", "store_id", "sku", "channel")
        .agg(
            F.sum("qty").alias("units"),
            F.sum("amount").alias("net_sales"),
            F.countDistinct("transaction_id").alias("ticket_count"),
        )
    )
