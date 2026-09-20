"""Catalog / volume / table path helpers.

Spark Declarative Pipelines inject configuration as spark.conf keys
prefixed with ``helios.``. Jobs pass the same values as CLI flags.
"""

from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class HeliosConfig:
    env: str
    catalog: str
    landing: str
    bronze_schema: str = "bronze"
    silver_schema: str = "silver"
    gold_schema: str = "gold"
    ml_schema: str = "ml"

    def fqn(self, schema: str, table: str) -> str:
        return f"{self.catalog}.{schema}.{table}"


def _conf(spark, key: str, default: str | None = None) -> str:
    if spark is not None:
        value = spark.conf.get(f"helios.{key}", None)
        if value:
            return value
    env_key = f"HELIOS_{key.upper()}"
    if os.environ.get(env_key):
        return os.environ[env_key]
    if default is not None:
        return default
    raise KeyError(f"Missing helios config: {key}")


def load_config(spark=None) -> HeliosConfig:
    return HeliosConfig(
        env=_conf(spark, "env", "dev"),
        catalog=_conf(spark, "catalog", "helios_dev"),
        landing=_conf(spark, "landing", "/Volumes/helios_dev/ops/landing"),
        bronze_schema=_conf(spark, "bronze_schema", "bronze"),
        silver_schema=_conf(spark, "silver_schema", "silver"),
        gold_schema=_conf(spark, "gold_schema", "gold"),
        ml_schema=_conf(spark, "ml_schema", "ml"),
    )


def landing_path(domain: str, spark=None) -> str:
    return f"{load_config(spark).landing.rstrip('/')}/{domain}"


def table_fqn(schema: str, table: str, spark=None) -> str:
    return load_config(spark).fqn(schema, table)


def bronze_table(name: str, spark=None) -> str:
    cfg = load_config(spark)
    return cfg.fqn(cfg.bronze_schema, name)
