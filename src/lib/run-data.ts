export const WAPE_SERIES = [
  { d: "09-01", v: 0.19 },
  { d: "09-02", v: 0.18 },
  { d: "09-03", v: 0.21 },
  { d: "09-04", v: 0.17 },
  { d: "09-05", v: 0.16 },
  { d: "09-06", v: 0.18 },
  { d: "09-07", v: 0.2 },
  { d: "09-08", v: 0.19 },
  { d: "09-09", v: 0.17 },
  { d: "09-10", v: 0.18 },
  { d: "09-11", v: 0.22 },
  { d: "09-12", v: 0.2 },
  { d: "09-13", v: 0.18 },
  { d: "09-14", v: 0.17 },
];

export const WAPE_GATE = 0.22;

export const DAG_NODES = [
  {
    id: "arrival",
    label: "file_arrival",
    kind: "Job",
    file: "resources/jobs/file_arrival_ingest.job.yml",
    note: "POS drop trigger, 60s debounce",
  },
  {
    id: "bronze",
    label: "bronze_ingest",
    kind: "Pipeline",
    file: "resources/pipelines/bronze_ingest.pipeline.yml",
    note: "Autoloader · four streaming tables",
  },
  {
    id: "silver",
    label: "silver_conform",
    kind: "Pipeline",
    file: "resources/pipelines/silver_conform.pipeline.yml",
    note: "SCD2 customers · conformed txns",
  },
  {
    id: "gold",
    label: "gold_marts",
    kind: "Pipeline",
    file: "resources/pipelines/gold_marts.pipeline.yml",
    note: "sales_daily · customer_360",
  },
  {
    id: "feat",
    label: "feature_engineering",
    kind: "Job",
    file: "resources/jobs/feature_engineering.job.yml",
    note: "Point-in-time demand features",
  },
  {
    id: "train",
    label: "model_training",
    kind: "Job",
    file: "resources/jobs/model_training.job.yml",
    note: "LightGBM · WAPE gate 0.22",
  },
  {
    id: "score",
    label: "batch_inference",
    kind: "Job",
    file: "resources/jobs/batch_inference.job.yml",
    note: "12-week store-SKU forecast",
  },
  {
    id: "mon",
    label: "model_monitoring",
    kind: "Job",
    file: "resources/jobs/model_monitoring.job.yml",
    note: "Drift → optional retrain",
  },
] as const;

export const NIGHTLY_ORDER = ["bronze", "silver", "gold", "feat"] as const;

export const PROMOTE_SCRIPT = [
  { step: 0, line: "$ ruff check src tests", ok: true },
  { step: 0, line: "All checks passed", ok: true },
  { step: 0, line: "$ pytest -q tests/unit", ok: true },
  { step: 0, line: "........... 11 passed", ok: true },
  { step: 0, line: "$ databricks bundle validate -t dev", ok: true },
  { step: 0, line: "Name: helios-lakehouse  Target: dev", ok: true },
  { step: 1, line: "merge develop → deploy-dev.yml", ok: true },
  { step: 1, line: "$ databricks bundle deploy -t dev --var git_sha=9f2c…", ok: true },
  { step: 1, line: "Uploading wheel helios_lakehouse-1.4.0-py3-none-any.whl", ok: true },
  { step: 1, line: "Created [dev you] helios-bronze-dev", ok: true },
  { step: 2, line: "merge staging → deploy-staging.yml", ok: true },
  { step: 2, line: "$ databricks bundle deploy -t staging", ok: true },
  { step: 2, line: "$ databricks bundle run model_training -t staging", ok: true },
  { step: 2, line: "holdout WAPE=0.171  gate=0.22  promote=true", ok: true },
  { step: 2, line: "Registered Challenger @ helios_staging.ml.demand_forecast", ok: true },
  { step: 3, line: "waiting on GitHub Environment: prod (2 reviewers)", ok: false },
  { step: 3, line: "approved by platform-admins", ok: true },
  { step: 3, line: "$ databricks bundle deploy -t prod", ok: true },
  { step: 3, line: "Serving traffic unchanged. Champion still v7.", ok: true },
] as const;
