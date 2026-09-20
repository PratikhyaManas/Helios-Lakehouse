from datetime import date

from helios_lakehouse.common.transforms import (
    is_plausible_amount,
    normalize_sku,
    store_id_ok,
    week_id,
)


def test_normalize_sku_strips_and_uppercases():
    assert normalize_sku("  sku-12ab ") == "SKU-12AB"


def test_normalize_sku_empty():
    assert normalize_sku("   ") is None
    assert normalize_sku(None) is None


def test_plausible_amount():
    assert is_plausible_amount(0)
    assert is_plausible_amount(19.99)
    assert not is_plausible_amount(-1)
    assert not is_plausible_amount(2_000_000)
    assert not is_plausible_amount(None)


def test_store_id():
    assert store_id_ok("0142")
    assert not store_id_ok("142")
    assert not store_id_ok("A142")


def test_week_id():
    assert week_id(date(2026, 1, 5)) == "2026-W02"
