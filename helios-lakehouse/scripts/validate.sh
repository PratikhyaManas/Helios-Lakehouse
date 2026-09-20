#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python -m pytest tests/unit
ruff check src tests
databricks bundle validate -t "${1:-dev}"
