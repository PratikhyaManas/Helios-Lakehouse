# Helios Lakehouse

Helios Lakehouse is the retail intelligence platform for Helios Retail Group, bringing together ingestion, transformation, forecasting, and monitoring across the data lifecycle. This workspace includes both:

- the local interactive product/workspace preview for the Helios Lakehouse experience
- the operational Databricks Asset Bundle implementation under [helios-lakehouse/README.md](helios-lakehouse/README.md)

## What this repo contains

This repository is organized as a practical working environment for the Helios Lakehouse platform:

- a browser-based demo / operational dashboard for retail scenario planning
- a Lakehouse architecture and metadata model for operational analytics
- a nested Databricks implementation for medallion pipelines, jobs, ML, and serving

## Helios Lakehouse architecture

The core platform follows a medallion design:

- Bronze: raw ingest and source consolidation
- Silver: standardized and cleaned operational datasets
- Gold: curated retail datasets for analytics and decisioning
- ML: demand forecasting and quality gate evaluation
- Serving: registered model and inference endpoints

This supports central retail capabilities such as:

- store demand forecasting
- file-arrival ingestion workflows
- nightly orchestration jobs
- data quality checks and monitors
- model registration and serving
- CI/CD promotion through dev, staging, and production targets

## Repository layout

```text
.
├── README.md
├── package.json
├── vite.config.ts
├── src/
│   ├── components/
│   ├── lib/
│   ├── routes/
│   └── styles.css
├── scripts/
├── public/
├── server/
├── migrations/
├── startup.sh
├── helios-lakehouse/
│   ├── README.md
│   ├── databricks.yml
│   ├── resources/
│   ├── src/
│   ├── tests/
│   ├── azure-pipelines.yml
│   └── pyproject.toml
└── artifacts/
```

## Working with the app preview

### Prerequisites

- Node.js 22+
- npm

### Install dependencies

```bash
npm install
```

### Start the local app

```bash
npm run dev
```

The preview app binds to port 8080 on `0.0.0.0`.

### Build and validation

```bash
npm run build
npm run typecheck
npm test
```

## Working with the Databricks implementation

The production-grade Lakehouse implementation is housed in [helios-lakehouse/README.md](helios-lakehouse/README.md). That project includes:

- Databricks Asset Bundle configuration
- pipeline and job resources
- Unity Catalog objects and monitoring
- ML training and serving configuration
- promotion flows across dev, staging, and prod

Typical setup for that subproject:

```bash
cd helios-lakehouse
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
make test
make validate
```

## Deployment and promotion model

The Helios Lakehouse process is designed for governed software delivery:

1. feature work is validated in a dev bundle
2. staging validates integration and challenger model behavior
3. main deploys reviewed, production-ready changes
4. quality gates protect serving and retraining flows

## Notes

- The local browser app is meant for workspace exploration and product visualization.
- The source-of-truth operational lakehouse implementation lives in [helios-lakehouse/README.md](helios-lakehouse/README.md).
- Environment and deployment credentials should never be committed to source control.

## License

This workspace is intended for Helios Lakehouse development and demonstration use. Please follow the repository ownership and environment-specific deployment policies before production use.
