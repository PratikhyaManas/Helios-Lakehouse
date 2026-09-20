"""Bronze POS tickets — Autoloader, append-only, raw payload preserved."""

from __future__ import annotations

from helios_lakehouse.common.config import landing_path

try:
    from pyspark import pipelines as dp
except ImportError:  # older DLT runtimes
    import dlt as dp  # type: ignore

from pyspark.sql import functions as F

_PROPS = {
    "quality": "bronze",
    "pipelines.autoOptimize.managed": "true",
    "delta.enableChangeDataFeed": "true",
}


@dp.table(
    name="pos_transactions_raw",
    comment="Append-only POS tickets from store lanes. Schema-on-read via Autoloader.",
    table_properties=_PROPS,
)
@dp.expect_or_drop("has_source_file", "_metadata.file_path IS NOT NULL")
def pos_transactions_raw():
    path = landing_path("pos")
    return (
        spark.readStream.format("cloudFiles")  # noqa: F821 — injected by the pipeline runtime
        .option("cloudFiles.format", "json")
        .option("cloudFiles.inferColumnTypes", "true")
        .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
        .option("cloudFiles.schemaLocation", f"{path}/_schema")
        .load(path)
        .withColumn("_ingest_ts", F.current_timestamp())
        .withColumn("_source_file", F.col("_metadata.file_path"))
    )
