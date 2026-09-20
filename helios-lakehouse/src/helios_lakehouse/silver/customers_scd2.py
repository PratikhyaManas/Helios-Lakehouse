"""Customer SCD2 dimension from CRM bronze."""

from __future__ import annotations

from helios_lakehouse.common.config import load_config

try:
    from pyspark import pipelines as dp
except ImportError:
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F
from pyspark.sql.window import Window


@dp.table(
    name="customers_scd2",
    comment="SCD2 customer dimension. current_flag marks the live row.",
    table_properties={"quality": "silver", "delta.enableChangeDataFeed": "true"},
)
@dp.expect_or_drop("has_customer_id", "customer_id IS NOT NULL")
def customers_scd2():
    cfg = load_config()
    src = spark.read.table(f"{cfg.catalog}.{cfg.bronze_schema}.customer_profiles_raw")  # noqa: F821
    w = Window.partitionBy("customer_id").orderBy(F.col("_ingest_ts").asc())
    ranked = src.withColumn("_rn", F.row_number().over(w)).withColumn(
        "valid_from", F.col("_ingest_ts")
    )
    nxt = Window.partitionBy("customer_id").orderBy("valid_from")
    return (
        ranked.withColumn("valid_to", F.lead("valid_from").over(nxt))
        .withColumn("current_flag", F.col("valid_to").isNull())
        .drop("_rn")
    )
