from helios_lakehouse.common.config import HeliosConfig, landing_path, load_config


def test_fqn():
    cfg = HeliosConfig(env="dev", catalog="helios_dev", landing="/Volumes/helios_dev/ops/landing")
    assert cfg.fqn("gold", "sales_daily") == "helios_dev.gold.sales_daily"


def test_defaults_without_spark(monkeypatch):
    monkeypatch.delenv("HELIOS_CATALOG", raising=False)
    monkeypatch.delenv("HELIOS_LANDING", raising=False)
    cfg = load_config(spark=None)
    assert cfg.catalog == "helios_dev"
    assert landing_path("pos").endswith("/pos")
