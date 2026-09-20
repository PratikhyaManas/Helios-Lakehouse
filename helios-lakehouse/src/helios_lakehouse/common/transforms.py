"""Pure transforms shared by pipelines and unit tests. No Spark import."""

from __future__ import annotations

from datetime import date
from typing import Optional

MAX_LINE_AMOUNT = 1_000_000.0


def normalize_sku(sku: Optional[str]) -> Optional[str]:
    if sku is None:
        return None
    cleaned = "".join(ch for ch in sku.strip().upper() if ch.isalnum() or ch in "-_")
    return cleaned or None


def is_plausible_amount(amount: Optional[float], *, max_abs: float = MAX_LINE_AMOUNT) -> bool:
    if amount is None:
        return False
    try:
        value = float(amount)
    except (TypeError, ValueError):
        return False
    return 0 <= value <= max_abs


def store_id_ok(store_id: Optional[str]) -> bool:
    if not store_id:
        return False
    s = store_id.strip()
    return len(s) == 4 and s.isdigit()


def week_id(d: date) -> str:
    iso = d.isocalendar()
    return f"{iso.year}-W{iso.week:02d}"


def recency_days(last_purchase: date, as_of: date) -> int:
    return max(0, (as_of - last_purchase).days)


def demand_label(units: float, in_stock: bool) -> tuple[float, bool]:
    """Return (observed_units, censored). Out-of-stock sales are a lower bound."""
    observed = max(0.0, float(units))
    return observed, (not in_stock)
