"""Reusable data-quality predicates (SQL snippets for @dp.expect)."""

HAS_SOURCE_FILE = "_metadata.file_path IS NOT NULL"
VALID_STORE = "store_id RLIKE '^[0-9]{4}$'"
NON_NEGATIVE_QTY = "qty >= 0"
NON_NULL_SKU = "sku IS NOT NULL AND length(sku) > 0"
VALID_EVENT_TS = "event_ts IS NOT NULL"
