"""Bronze ecommerce clickstream."""

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
    name="ecommerce_events_raw",
    comment="Site and app events. JSON Autoloader from the ecommerce landing path.",
    table_properties=_PROPS,
)
@dp.expect_or_drop("has_event_name", "event_name IS NOT NULL")
def ecommerce_events_raw():
    path = landing_path("ecommerce")
    return (
        spark.readStream.format("cloudFiles")  # noqa: F821
        .option("cloudFiles.format", "json")
        .option("cloudFiles.inferColumnTypes", "true")
        .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
        .option("cloudFiles.schemaLocation", f"{path}/_schema")
        .load(path)
        .withColumn("_ingest_ts", F.current_timestamp())
        .withColumn("_source_file", F.col("_metadata.file_path"))
    )
