#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
TARGET="${1:?usage: deploy.sh <dev|staging|prod>}"
SHA="${2:-local}"
databricks bundle validate -t "$TARGET"
databricks bundle deploy -t "$TARGET" --var "git_sha=${SHA}"
