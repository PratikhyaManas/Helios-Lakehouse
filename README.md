# Helios Lakehouse

![Status](https://img.shields.io/badge/status-ready--for-demo-brightgreen)
![Node](https://img.shields.io/badge/node-22%2B-339933)
![Databricks](https://img.shields.io/badge/databricks-asset%20bundle-FF3621)
![Platform](https://img.shields.io/badge/platform-retail%20intelligence-blue)

Helios Lakehouse is a retail intelligence platform for Helios Retail Group. It combines operational data engineering, forecasting, monitoring, and a browser-based product experience into one repository.

This workspace contains two connected layers:

- a local interactive UI and dashboard for viewing the platform
- the production-ready Databricks Lakehouse implementation in [helios-lakehouse/README.md](helios-lakehouse/README.md)

## At a glance

| Capability | Status |
| --- | --- |
| Retail data platform | ✅ Ready |
| Browser-based demo experience | ✅ Included |
| Databricks Lakehouse implementation | ✅ Included |
| Medallion data architecture | ✅ Built in |
| Forecasting and model serving | ✅ Supported |
| Dev → staging → prod promotion flow | ✅ Included |

Helios Lakehouse helps teams turn retail data into operational decisions across:

- store demand forecasting
- inventory and supply planning
- nightly orchestration and ingestion
- data quality validation
- model serving and monitoring
- promotion across dev, staging, and production environments

## Architecture overview

<img src="docs/helios-lakehouse-architecture.svg" alt="Helios Lakehouse architecture diagram" width="100%" />

### Medallion flow

- Bronze: raw ingest and source consolidation
- Silver: cleaned and standardized datasets
- Gold: business-ready retail datasets for analytics and decisions
- ML: demand forecasting and model evaluation
- Serving: registered models and inference endpoints

## Repository layout

```text
.
├── README.md
├── package.json
├── vite.config.ts
├── startup.sh
├── src/
│   ├── components/
│   ├── lib/
│   ├── routes/
│   └── styles.css
├── scripts/
├── public/
├── server/
├── migrations/
├── docs/
│   └── helios-lakehouse-architecture.svg
├── helios-lakehouse/
│   ├── README.md
│   ├── databricks.yml
│   ├── resources/
│   ├── src/
│   ├── tests/
│   ├── azure-pipelines.yml
│   └── pyproject.toml
├── artifacts/
└── screenshots/
```

## Quick start

### 1) Run the local app preview

Prerequisites:

- Node.js 22+
- npm

Install and start:

```bash
npm install
npm run dev
```

The local app is served on port 8080.

### 2) Validate the repo

```bash
npm run build
npm run typecheck
npm test
```

### 3) Work with the Databricks implementation

The operational Lakehouse implementation lives in [helios-lakehouse/README.md](helios-lakehouse/README.md).

```bash
cd helios-lakehouse
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
make test
make validate
```

## Deployment model

The platform is designed for governed delivery:

1. development validates feature work and bundle changes
2. staging checks integration and challenger model behavior
3. production applies reviewed, approved changes
4. quality gates protect serving, drift monitoring, and retraining

## Typical user journey

- ingest operational data from stores and digital touchpoints
- clean and standardize it into Silver tables
- publish curated Gold datasets for analytics
- train demand forecasting models and evaluate quality gates
- promote approved changes through dev → staging → prod
- monitor service quality and retraining signals over time

## Notes

- The browser app is best for exploration, demos, and product visualization.
- The source-of-truth Lakehouse implementation lives in [helios-lakehouse/README.md](helios-lakehouse/README.md).
- Never commit credentials, tokens, or deployment secrets to source control.

## License

This workspace is intended for Helios Lakehouse development and demonstration use. Follow repository ownership and environment-specific deployment policies before production use.
