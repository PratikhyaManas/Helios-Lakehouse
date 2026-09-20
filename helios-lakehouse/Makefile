.PHONY: test lint validate deploy-dev deploy-staging deploy-prod

test:
	python -m pytest tests/unit

lint:
	ruff check src tests
	ruff format --check src tests

validate:
	databricks bundle validate -t dev

deploy-dev:
	databricks bundle deploy -t dev

deploy-staging:
	databricks bundle deploy -t staging

deploy-prod:
	databricks bundle deploy -t prod
