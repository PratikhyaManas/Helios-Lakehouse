"""Customer 360 gold table."""

from __future__ import annotations

from helios_lakehouse.common.config import load_config

try:
    from pyspark import pipelines as dp
except ImportError:
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F


@dp.table(
    name="customer_360",
    comment="One row per current customer with trailing-12-month value.",
    table_properties={"quality": "gold"},
)
def customer_360():
    cfg = load_config()
    dim = (
        spark.read.table(f"{cfg.catalog}.{cfg.silver_schema}.customers_scd2")  # noqa: F821
        .where(F.col("current_flag"))
    )
    tx = spark.read.table(f"{cfg.catalog}.{cfg.silver_schema}.transactions")  # noqa: F821
    last_year = F.current_date() - F.expr("INTERVAL 365 DAYS")
    spend = (
        tx.where(F.col("event_ts") >= last_year)
        .groupBy("customer_id")
        .agg(
            F.sum("amount").alias("ttm_spend"),
            F.countDistinct("transaction_id").alias("ttm_orders"),
            F.max("event_ts").alias("last_order_ts"),
        )
    )
    return dim.join(spend, "customer_id", "left")
