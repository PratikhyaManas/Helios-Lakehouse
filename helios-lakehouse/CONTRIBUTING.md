# Contributing to Helios Lakehouse

## Branching

- `feature/<jira>` off `develop`
- `develop` deploys personal-prefixed resources to the **dev** workspace
- `staging` is the integration line
- `main` is production. Direct pushes are blocked.

## Pull requests

Use the template. Call out:

- New or renamed jobs / pipelines (IDs in YAML are the Terraform-style keys)
- Anything that changes `run_as`, grants, or serving traffic
- Whether a full refresh is required in **staging only**

CI must be green: ruff, unit tests, `databricks bundle validate -t dev`.

## Local development

```bash
databricks bundle deploy -t dev
databricks bundle run silver_conform -t dev
```

Do not deploy `-t prod` from a laptop. Production is the GitHub Environment.

## Code owners

Pipeline Python is owned by data engineering. ML jobs and `resources/ml` are owned by ML platform. Bundle wiring (`databricks.yml`, workflows) is platform only.
