"""Bronze CRM customer extract (nightly batch via Autoloader)."""

from __future__ import annotations

from helios_lakehouse.common.config import landing_path

try:
    from pyspark import pipelines as dp
except ImportError:
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F

_PROPS = {
    "quality": "bronze",
    "pipelines.autoOptimize.managed": "true",
    "delta.enableChangeDataFeed": "true",
}


@dp.table(
    name="customer_profiles_raw",
    comment="Nightly CRM dump. Duplicate customer_id versions kept; SCD2 happens in silver.",
    table_properties=_PROPS,
)
@dp.expect_or_drop("has_customer_id", "customer_id IS NOT NULL")
def customer_profiles_raw():
    path = landing_path("crm")
    return (
        spark.readStream.format("cloudFiles")  # noqa: F821
        .option("cloudFiles.format", "json")
        .option("cloudFiles.inferColumnTypes", "true")
        .option("cloudFiles.schemaLocation", f"{path}/_schema")
        .load(path)
        .withColumn("_ingest_ts", F.current_timestamp())
        .withColumn("_source_file", F.col("_metadata.file_path"))
    )
