from datetime import date

from helios_lakehouse.common.transforms import demand_label, recency_days
from helios_lakehouse.features.demand_features import feature_row
from helios_lakehouse.ml.evaluate import should_promote, wape
import numpy as np


def test_recency():
    assert recency_days(date(2026, 1, 1), date(2026, 1, 11)) == 10


def test_censored_demand_when_oos():
    units, censored = demand_label(3, in_stock=False)
    assert units == 3.0
    assert censored is True


def test_feature_row_week_and_recency():
    row = feature_row(
        sku="SKU-1",
        store_id="0142",
        as_of=date(2026, 1, 12),
        last_sale=date(2026, 1, 5),
        units_l7=4,
        units_l28=18,
        on_hand=12,
    )
    assert row["week_id"] == "2026-W03"
    assert row["recency_days"] == 7
    assert row["censored_demand"] is False


def test_wape_gate():
    actual = np.array([10.0, 10.0])
    pred = np.array([8.0, 12.0])
    assert round(wape(actual, pred), 4) == 0.2
    assert should_promote(0.20, 0.22, "holdout")
    assert not should_promote(0.30, 0.22, "holdout")
