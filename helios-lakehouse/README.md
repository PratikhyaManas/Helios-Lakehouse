# Helios Lakehouse

Enterprise **Databricks Asset Bundle** for Helios Retail Group — 1,400 stores plus ecommerce. One repository declares the jobs, Lakeflow pipelines, Unity Catalog objects, MLflow experiment, registered model, serving endpoint, quality monitors, and the CI that promotes them.

This is the working example behind *Databricks Asset Bundles + CI/CD: Infra as Code for Jobs, Pipelines & ML in One Repo*.

## What is in the box

| Layer | How it ships |
| --- | --- |
| Bronze / silver / gold | Spark Declarative Pipelines (`resources/pipelines`, `src/helios_lakehouse/{bronze,silver,gold}`) |
| Nightly DAG + file-arrival ingest | Lakeflow Jobs (`resources/jobs`) |
| Demand forecast | Feature job, training job with a WAPE gate, batch inference, drift monitor |
| Registry + serving | Unity Catalog registered model + serverless endpoint (prod) |
| Data quality | Lakeflow expectations + Lakehouse Monitoring on gold and inference |
| Delivery | GitHub Actions with OIDC; Azure DevOps YAML included |

```
feature/*  →  develop (dev deploy)
                 ↓
              staging (integration + Challenger)
                 ↓
               main  (reviewed prod deploy)
```

## Layout

```
databricks.yml          # bundle, variables, three targets
resources/              # jobs, pipelines, UC, ML, monitors
src/helios_lakehouse/   # Python that the resources run
tests/unit/             # no Spark required
.github/workflows/      # validate, deploy-dev, staging, prod
azure-pipelines.yml     # same promotion path on Azure DevOps
```

## Prerequisites

- Databricks CLI `>= 0.250.0`
- Python 3.11
- A workspace with Unity Catalog
- A service principal per shared target (staging, prod)
- GitHub OIDC federation (or Azure DevOps federated credentials)

Replace every `REPLACE_ME_*` host, warehouse ID, and principal UUID in `databricks.yml` before the first deploy.

## Local loop

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
make test
make validate          # databricks bundle validate -t dev
make deploy-dev        # personal-prefixed copies, schedules paused
databricks bundle run bronze_ingest -t dev
```

Development mode prefixes resource names with `[dev <you>]` and pauses jobs. You cannot accidentally share a cluster or unpause a prod schedule from a laptop.

## CI/CD

| Workflow | Trigger | Target | Notes |
| --- | --- | --- | --- |
| `ci-validate.yml` | pull request | validate against `dev` | ruff, pytest, `bundle validate` |
| `deploy-dev.yml` | push to `develop` | `dev` | deploy + optional smoke run |
| `deploy-staging.yml` | push to `staging` | `staging` | deploy, run training as Challenger |
| `deploy-prod.yml` | push to `main` | `prod` | GitHub Environment approval required |

Authentication is **OIDC**. Repository variables:

- `DATABRICKS_HOST_DEV` / `_STAGING` / `_PROD`
- `DATABRICKS_CLIENT_ID` (per environment if you split principals)

No `DATABRICKS_TOKEN` in GitHub secrets.

## Promotion rules

1. Pipelines never `full_refresh` gold in production from CI.
2. The training job registers a model version only when holdout WAPE ≤ 0.22.
3. Staging writes alias `Challenger`. Prod serving pins `Champion`.
4. The monitor job can trigger a retrain; it cannot deploy serving.

## Identity

- **dev** `run_as` the deploying user (personal copies).
- **staging / prod** `run_as` the target service principal.
- Bundle permissions: platform admins `CAN_MANAGE`, engineers `CAN_RUN`, scientists `CAN_VIEW`.

## License

Internal Helios Retail Group example. Adapt freely for your own lakehouse.
