import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Layers, o as Download, s as Command, t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bundle-catalog-D8em0ns_.js
var ZIP_HREF = "/downloads/helios-lakehouse-dab.zip";
var ZIP_NAME = "helios-lakehouse-dab.zip";
var BUNDLE_FILES = [
	{
		path: "README.md",
		lang: "md",
		category: "root",
		summary: "How the one-repo lakehouse is structured and deployed"
	},
	{
		path: "databricks.yml",
		lang: "yaml",
		category: "root",
		summary: "Bundle entry: targets, variables, permissions, artifacts"
	},
	{
		path: "pyproject.toml",
		lang: "toml",
		category: "root",
		summary: "Python package, wheel build, lint and test extras"
	},
	{
		path: "Makefile",
		lang: "text",
		category: "root",
		summary: "validate / deploy / test shortcuts"
	},
	{
		path: ".gitignore",
		lang: "gitignore",
		category: "root",
		summary: "Venv, dist, secrets, Databricks local state"
	},
	{
		path: ".pre-commit-config.yaml",
		lang: "yaml",
		category: "root",
		summary: "Ruff, yamlfmt, trailing whitespace"
	},
	{
		path: "CODEOWNERS",
		lang: "text",
		category: "root",
		summary: "Platform vs domain ownership"
	},
	{
		path: "CONTRIBUTING.md",
		lang: "md",
		category: "root",
		summary: "PR path, target promotion, run_as rules"
	},
	{
		path: ".env.example",
		lang: "text",
		category: "root",
		summary: "Local CLI host placeholders — no secrets"
	},
	{
		path: ".github/workflows/ci-validate.yml",
		lang: "yaml",
		category: "cicd",
		summary: "PR: lint, unit tests, bundle validate"
	},
	{
		path: ".github/workflows/deploy-dev.yml",
		lang: "yaml",
		category: "cicd",
		summary: "Push to develop → deploy + smoke run"
	},
	{
		path: ".github/workflows/deploy-staging.yml",
		lang: "yaml",
		category: "cicd",
		summary: "Merge to staging → deploy and integration job"
	},
	{
		path: ".github/workflows/deploy-prod.yml",
		lang: "yaml",
		category: "cicd",
		summary: "Main + environment approval → production"
	},
	{
		path: ".github/PULL_REQUEST_TEMPLATE.md",
		lang: "md",
		category: "cicd",
		summary: "Impact checklist for jobs / pipelines / ML"
	},
	{
		path: "azure-pipelines.yml",
		lang: "yaml",
		category: "cicd",
		summary: "Azure DevOps equivalent of the GitHub path"
	},
	{
		path: "resources/unity/schemas.yml",
		lang: "yaml",
		category: "resources",
		summary: "Bronze / silver / gold / ml Unity Catalog schemas"
	},
	{
		path: "resources/unity/volumes.yml",
		lang: "yaml",
		category: "resources",
		summary: "Landing and feature volumes"
	},
	{
		path: "resources/pipelines/bronze_ingest.pipeline.yml",
		lang: "yaml",
		category: "resources",
		summary: "Autoloader bronze Lakeflow pipeline"
	},
	{
		path: "resources/pipelines/silver_conform.pipeline.yml",
		lang: "yaml",
		category: "resources",
		summary: "SCD2 + conformed silver pipeline"
	},
	{
		path: "resources/pipelines/gold_marts.pipeline.yml",
		lang: "yaml",
		category: "resources",
		summary: "Daily sales, customer 360, store marts"
	},
	{
		path: "resources/jobs/medallion_orchestrator.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "Nightly bronze → silver → gold DAG"
	},
	{
		path: "resources/jobs/file_arrival_ingest.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "File-arrival trigger for POS drops"
	},
	{
		path: "resources/jobs/feature_engineering.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "Demand feature table refresh"
	},
	{
		path: "resources/jobs/model_training.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "Train, evaluate, register LightGBM demand model"
	},
	{
		path: "resources/jobs/batch_inference.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "Weekly store-SKU forecast scoring"
	},
	{
		path: "resources/jobs/model_monitoring.job.yml",
		lang: "yaml",
		category: "resources",
		summary: "Drift check that can trigger retrain"
	},
	{
		path: "resources/ml/experiment.yml",
		lang: "yaml",
		category: "resources",
		summary: "MLflow experiment for demand forecast"
	},
	{
		path: "resources/ml/registered_model.yml",
		lang: "yaml",
		category: "resources",
		summary: "Unity Catalog registered model + grants"
	},
	{
		path: "resources/ml/serving_endpoint.yml",
		lang: "yaml",
		category: "resources",
		summary: "Model serving endpoint (prod only)"
	},
	{
		path: "resources/quality/monitors.yml",
		lang: "yaml",
		category: "resources",
		summary: "Lakehouse monitors on gold + inference"
	},
	{
		path: "src/helios_lakehouse/__init__.py",
		lang: "python",
		category: "src",
		summary: "Package version"
	},
	{
		path: "src/helios_lakehouse/common/config.py",
		lang: "python",
		category: "src",
		summary: "Catalog / volume / table path helpers"
	},
	{
		path: "src/helios_lakehouse/common/transforms.py",
		lang: "python",
		category: "src",
		summary: "Pure functions used by pipelines and tests"
	},
	{
		path: "src/helios_lakehouse/common/expectations.py",
		lang: "python",
		category: "src",
		summary: "Reusable data-quality predicates"
	},
	{
		path: "src/helios_lakehouse/bronze/pos_transactions.py",
		lang: "python",
		category: "src",
		summary: "POS Autoloader streaming table"
	},
	{
		path: "src/helios_lakehouse/bronze/ecommerce_events.py",
		lang: "python",
		category: "src",
		summary: "Clickstream Autoloader table"
	},
	{
		path: "src/helios_lakehouse/bronze/inventory_snapshots.py",
		lang: "python",
		category: "src",
		summary: "Hourly on-hand snapshots"
	},
	{
		path: "src/helios_lakehouse/bronze/customer_profiles.py",
		lang: "python",
		category: "src",
		summary: "CRM customer extract"
	},
	{
		path: "src/helios_lakehouse/silver/transactions_conformed.py",
		lang: "python",
		category: "src",
		summary: "Unified POS + ecom transactions"
	},
	{
		path: "src/helios_lakehouse/silver/customers_scd2.py",
		lang: "python",
		category: "src",
		summary: "Customer SCD2 dimension"
	},
	{
		path: "src/helios_lakehouse/gold/sales_daily.py",
		lang: "python",
		category: "src",
		summary: "Store-SKU daily sales mart"
	},
	{
		path: "src/helios_lakehouse/gold/customer_360.py",
		lang: "python",
		category: "src",
		summary: "Customer 360 gold table"
	},
	{
		path: "src/helios_lakehouse/features/demand_features.py",
		lang: "python",
		category: "src",
		summary: "Feature table for demand model"
	},
	{
		path: "src/helios_lakehouse/ml/train_demand.py",
		lang: "python",
		category: "src",
		summary: "Training entrypoint with MLflow"
	},
	{
		path: "src/helios_lakehouse/ml/evaluate.py",
		lang: "python",
		category: "src",
		summary: "Holdout metrics and promotion gate"
	},
	{
		path: "src/helios_lakehouse/ml/register.py",
		lang: "python",
		category: "src",
		summary: "UC model registration + alias"
	},
	{
		path: "src/helios_lakehouse/ml/infer_batch.py",
		lang: "python",
		category: "src",
		summary: "Batch scoring writer"
	},
	{
		path: "tests/conftest.py",
		lang: "python",
		category: "tests",
		summary: "Shared fixtures"
	},
	{
		path: "tests/unit/test_transforms.py",
		lang: "python",
		category: "tests",
		summary: "SKU, amount, week_id unit tests"
	},
	{
		path: "tests/unit/test_features.py",
		lang: "python",
		category: "tests",
		summary: "Recency / demand label tests"
	},
	{
		path: "tests/unit/test_config.py",
		lang: "python",
		category: "tests",
		summary: "Path helper tests"
	},
	{
		path: "scripts/validate.sh",
		lang: "bash",
		category: "scripts",
		summary: "Local lint + bundle validate"
	},
	{
		path: "scripts/deploy.sh",
		lang: "bash",
		category: "scripts",
		summary: "Target-aware deploy wrapper"
	}
];
var RESOURCES = [
	{
		id: "bronze",
		kind: "Pipeline",
		name: "bronze_ingest",
		layer: "Bronze",
		file: "resources/pipelines/bronze_ingest.pipeline.yml",
		blurb: "Autoloader from the landing volume. Four streaming tables, schema evolution, CDF on."
	},
	{
		id: "silver",
		kind: "Pipeline",
		name: "silver_conform",
		layer: "Silver",
		file: "resources/pipelines/silver_conform.pipeline.yml",
		blurb: "Conformed transactions, product master, customer SCD2. Expectations drop poison rows."
	},
	{
		id: "gold",
		kind: "Pipeline",
		name: "gold_marts",
		layer: "Gold",
		file: "resources/pipelines/gold_marts.pipeline.yml",
		blurb: "Daily sales, customer 360, store performance. Served to BI and features."
	},
	{
		id: "orch",
		kind: "Job",
		name: "medallion_orchestrator",
		layer: "Orchestration",
		file: "resources/jobs/medallion_orchestrator.job.yml",
		blurb: "02:15 America/New_York. Refreshes bronze → silver → gold, then kicks features."
	},
	{
		id: "arrival",
		kind: "Job",
		name: "file_arrival_ingest",
		layer: "Ingest",
		file: "resources/jobs/file_arrival_ingest.job.yml",
		blurb: "File-arrival trigger on POS drops. Debounced 60s after last write."
	},
	{
		id: "feat",
		kind: "Job",
		name: "feature_engineering",
		layer: "ML",
		file: "resources/jobs/feature_engineering.job.yml",
		blurb: "Point-in-time demand features written to the ml schema."
	},
	{
		id: "train",
		kind: "Job",
		name: "model_training",
		layer: "ML",
		file: "resources/jobs/model_training.job.yml",
		blurb: "Train LightGBM, evaluate, register only if WAPE gate passes."
	},
	{
		id: "score",
		kind: "Job",
		name: "batch_inference",
		layer: "ML",
		file: "resources/jobs/batch_inference.job.yml",
		blurb: "Scores next-12-week demand for every in-range store-SKU."
	},
	{
		id: "mon",
		kind: "Job",
		name: "model_monitoring",
		layer: "MLOps",
		file: "resources/jobs/model_monitoring.job.yml",
		blurb: "Daily WAPE check. Condition task retrains on sustained drift."
	},
	{
		id: "exp",
		kind: "Experiment",
		name: "demand_forecast",
		layer: "ML",
		file: "resources/ml/experiment.yml",
		blurb: "MLflow experiment path, one per target."
	},
	{
		id: "model",
		kind: "Registered model",
		name: "demand_forecast",
		layer: "ML",
		file: "resources/ml/registered_model.yml",
		blurb: "Unity Catalog model with Champion / Challenger aliases."
	},
	{
		id: "serve",
		kind: "Serving",
		name: "helios-demand",
		layer: "ML",
		file: "resources/ml/serving_endpoint.yml",
		blurb: "Serverless endpoint, scale-to-zero, prod target only."
	}
];
var TARGETS = [
	{
		id: "dev",
		mode: "development",
		catalog: "helios_dev",
		host: "adb-dev-helios.azuredatabricks.net",
		runAs: "the deploying user",
		schedules: "Paused",
		prefix: "[dev <user>] ",
		note: "Personal copies. Full refresh allowed. No shared blast radius."
	},
	{
		id: "staging",
		mode: "production",
		catalog: "helios_staging",
		host: "adb-staging-helios.azuredatabricks.net",
		runAs: "staging service principal",
		schedules: "Running",
		prefix: "none",
		note: "Shared workspace. Integration tests and Champion promotion happen here."
	},
	{
		id: "prod",
		mode: "production",
		catalog: "helios_prod",
		host: "adb-prod-helios.azuredatabricks.net",
		runAs: "prod service principal",
		schedules: "Running",
		prefix: "none",
		note: "Git-locked to main. Environment reviewers required before deploy."
	}
];
var PIPELINE_STEPS = [
	{
		id: "pr",
		title: "Pull request",
		env: "dev",
		actions: [
			"ruff",
			"pytest -q tests/unit",
			"databricks bundle validate -t dev"
		]
	},
	{
		id: "dev",
		title: "Merge to develop",
		env: "dev",
		actions: ["bundle deploy -t dev", "bundle run medallion_orchestrator --refresh"]
	},
	{
		id: "stg",
		title: "Merge to staging",
		env: "staging",
		actions: [
			"bundle deploy -t staging",
			"run model_training (Challenger)",
			"quality monitor refresh"
		]
	},
	{
		id: "prod",
		title: "Release to main",
		env: "prod",
		actions: [
			"environment approval",
			"bundle deploy -t prod",
			"no automatic full refresh"
		]
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/run-data-DaSSE45H.js
var WAPE_SERIES = [
	{
		d: "09-01",
		v: .19
	},
	{
		d: "09-02",
		v: .18
	},
	{
		d: "09-03",
		v: .21
	},
	{
		d: "09-04",
		v: .17
	},
	{
		d: "09-05",
		v: .16
	},
	{
		d: "09-06",
		v: .18
	},
	{
		d: "09-07",
		v: .2
	},
	{
		d: "09-08",
		v: .19
	},
	{
		d: "09-09",
		v: .17
	},
	{
		d: "09-10",
		v: .18
	},
	{
		d: "09-11",
		v: .22
	},
	{
		d: "09-12",
		v: .2
	},
	{
		d: "09-13",
		v: .18
	},
	{
		d: "09-14",
		v: .17
	}
];
var WAPE_GATE = .22;
var DAG_NODES = [
	{
		id: "arrival",
		label: "file_arrival",
		kind: "Job",
		file: "resources/jobs/file_arrival_ingest.job.yml",
		note: "POS drop trigger, 60s debounce"
	},
	{
		id: "bronze",
		label: "bronze_ingest",
		kind: "Pipeline",
		file: "resources/pipelines/bronze_ingest.pipeline.yml",
		note: "Autoloader · four streaming tables"
	},
	{
		id: "silver",
		label: "silver_conform",
		kind: "Pipeline",
		file: "resources/pipelines/silver_conform.pipeline.yml",
		note: "SCD2 customers · conformed txns"
	},
	{
		id: "gold",
		label: "gold_marts",
		kind: "Pipeline",
		file: "resources/pipelines/gold_marts.pipeline.yml",
		note: "sales_daily · customer_360"
	},
	{
		id: "feat",
		label: "feature_engineering",
		kind: "Job",
		file: "resources/jobs/feature_engineering.job.yml",
		note: "Point-in-time demand features"
	},
	{
		id: "train",
		label: "model_training",
		kind: "Job",
		file: "resources/jobs/model_training.job.yml",
		note: "LightGBM · WAPE gate 0.22"
	},
	{
		id: "score",
		label: "batch_inference",
		kind: "Job",
		file: "resources/jobs/batch_inference.job.yml",
		note: "12-week store-SKU forecast"
	},
	{
		id: "mon",
		label: "model_monitoring",
		kind: "Job",
		file: "resources/jobs/model_monitoring.job.yml",
		note: "Drift → optional retrain"
	}
];
var NIGHTLY_ORDER = [
	"bronze",
	"silver",
	"gold",
	"feat"
];
var PROMOTE_SCRIPT = [
	{
		step: 0,
		line: "$ ruff check src tests",
		ok: true
	},
	{
		step: 0,
		line: "All checks passed",
		ok: true
	},
	{
		step: 0,
		line: "$ pytest -q tests/unit",
		ok: true
	},
	{
		step: 0,
		line: "........... 11 passed",
		ok: true
	},
	{
		step: 0,
		line: "$ databricks bundle validate -t dev",
		ok: true
	},
	{
		step: 0,
		line: "Name: helios-lakehouse  Target: dev",
		ok: true
	},
	{
		step: 1,
		line: "merge develop → deploy-dev.yml",
		ok: true
	},
	{
		step: 1,
		line: "$ databricks bundle deploy -t dev --var git_sha=9f2c…",
		ok: true
	},
	{
		step: 1,
		line: "Uploading wheel helios_lakehouse-1.4.0-py3-none-any.whl",
		ok: true
	},
	{
		step: 1,
		line: "Created [dev you] helios-bronze-dev",
		ok: true
	},
	{
		step: 2,
		line: "merge staging → deploy-staging.yml",
		ok: true
	},
	{
		step: 2,
		line: "$ databricks bundle deploy -t staging",
		ok: true
	},
	{
		step: 2,
		line: "$ databricks bundle run model_training -t staging",
		ok: true
	},
	{
		step: 2,
		line: "holdout WAPE=0.171  gate=0.22  promote=true",
		ok: true
	},
	{
		step: 2,
		line: "Registered Challenger @ helios_staging.ml.demand_forecast",
		ok: true
	},
	{
		step: 3,
		line: "waiting on GitHub Environment: prod (2 reviewers)",
		ok: false
	},
	{
		step: 3,
		line: "approved by platform-admins",
		ok: true
	},
	{
		step: 3,
		line: "$ databricks bundle deploy -t prod",
		ok: true
	},
	{
		step: 3,
		line: "Serving traffic unchanged. Champion still v7.",
		ok: true
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/retail-data-Cg1GPMZj.js
var SCENARIOS = [
	{
		id: "calm",
		name: "Tuesday quiet",
		blurb: "Baseline week. Gate holds. Nightly is a formality."
	},
	{
		id: "heat",
		name: "Southern heat",
		blurb: "Espresso and oat milk spike in the South. Jackets go unsold."
	},
	{
		id: "viral",
		name: "Selvedge goes viral",
		blurb: "SKU-DENM-01 clears racks. Censored demand, WAPE breaks the gate."
	},
	{
		id: "labor",
		name: "Labor Day weekend",
		blurb: "Every channel is loud. The 02:15 job has not caught up."
	},
	{
		id: "storm",
		name: "Nor'easter",
		blurb: "Northeast dark for nine hours. Recency stretches; South is fine."
	}
];
function demandMultiplier(region, dept, skuId, scenario) {
	switch (scenario) {
		case "calm": return 1;
		case "heat":
			if (region === "South" && dept === "grocery") return 1.9;
			if (dept === "apparel" || dept === "footwear") return .72;
			return 1.08;
		case "viral":
			if (skuId === "SKU-DENM-01") return region === "West" || region === "Northeast" ? 2.8 : 1.9;
			return .94;
		case "labor": return dept === "grocery" ? 1.7 : 1.45;
		case "storm":
			if (region === "Northeast") return .32;
			if (region === "Midwest") return .78;
			return 1.12;
		default: return 1;
	}
}
function wapeFor(scenario, base = .17) {
	return Math.round((base + {
		calm: 0,
		heat: .05,
		viral: .12,
		labor: .14,
		storm: .07
	}[scenario]) * 100) / 100;
}
var STORES = [
	{
		id: "0142",
		name: "Brooklyn Atlantic",
		region: "Northeast"
	},
	{
		id: "1088",
		name: "Chicago River",
		region: "Midwest"
	},
	{
		id: "2201",
		name: "Austin Domain",
		region: "South"
	},
	{
		id: "3310",
		name: "Seattle Pike",
		region: "West"
	},
	{
		id: "4402",
		name: "Miami Brickell",
		region: "South"
	},
	{
		id: "5519",
		name: "Denver RiNo",
		region: "West"
	},
	{
		id: "6620",
		name: "Boston Seaport",
		region: "Northeast"
	},
	{
		id: "7704",
		name: "SF Fillmore",
		region: "West"
	}
];
var SKUS = [
	{
		id: "SKU-ESPR-12",
		name: "Helios espresso 12oz",
		dept: "grocery"
	},
	{
		id: "SKU-OAT-32",
		name: "Oat milk 32oz",
		dept: "grocery"
	},
	{
		id: "SKU-DENM-01",
		name: "Selvedge jacket",
		dept: "apparel"
	},
	{
		id: "SKU-RUN-08",
		name: "Trail runner",
		dept: "footwear"
	},
	{
		id: "SKU-LED-4P",
		name: "LED bulb 4-pack",
		dept: "home"
	},
	{
		id: "SKU-TOWEL-B",
		name: "Turkish bath towel",
		dept: "home"
	}
];
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i += 1) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function featuresFor(store, sku) {
	const h = hash(`${store}:${sku}`);
	const onHand = 6 + h % 90;
	return {
		recency_days: 1 + h % 14,
		units_l7: 6 + h % 48,
		units_l28: 28 + h % 180,
		on_hand: onHand,
		censored: onHand < 8
	};
}
function observedUnits(store, sku, multiplier) {
	const feat = featuresFor(store, sku);
	return Math.max(0, Math.round(feat.units_l7 * multiplier));
}
function forecastWeek(feat, week) {
	const seasonal = 1 + .1 * Math.sin(week / 12 * Math.PI * 2);
	const base = .52 * feat.units_l7 + .12 * (feat.units_l28 / 4);
	const stock = feat.censored ? .72 : 1;
	return Math.max(0, Math.round((base * seasonal + week * 3 % 5 - 1) * stock));
}
var DAY_MS = 864e5;
function goldSlice(asOf = /* @__PURE__ */ new Date(), days = 5) {
	const rows = [];
	for (let d = days - 1; d >= 0; d -= 1) {
		const date = (/* @__PURE__ */ new Date(asOf.getTime() - d * DAY_MS)).toISOString().slice(0, 10);
		for (const store of STORES) for (const sku of SKUS) {
			const h = hash(`${date}:${store.id}:${sku.id}`);
			if (h % 5 === 0) continue;
			const units = 2 + h % 18;
			const price = 8 + h % 40;
			rows.push({
				date,
				store_id: store.id,
				store: store.name,
				sku: sku.id,
				sku_name: sku.name,
				channel: h % 7 === 0 ? "ecom" : "pos",
				units,
				net_sales: units * price
			});
		}
	}
	return rows;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-hLxzhsrW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var BASE_GOLD = 612440;
var BASE_BRONZE = 4812330;
var useWorkspace = create()(persist((set, get) => ({
	target: "dev",
	setTarget: (target) => set({ target }),
	goldRows: BASE_GOLD,
	bronzeRows: BASE_BRONZE,
	lastNightly: null,
	nightlyCursor: null,
	nightlyLog: [],
	startNightly: () => {
		const { target } = get();
		set({
			nightlyCursor: 0,
			nightlyLog: [`$ databricks bundle run medallion_orchestrator -t ${target}`]
		});
	},
	stopNightly: () => set({ nightlyCursor: null }),
	tickNightly: () => {
		const { nightlyCursor, target, goldRows, bronzeRows, nightlyLog } = get();
		if (nightlyCursor === null) return;
		const catalog = TARGETS.find((t) => t.id === target)?.catalog ?? "helios_dev";
		if (nightlyCursor >= NIGHTLY_ORDER.length) {
			set({
				nightlyCursor: null,
				lastNightly: (/* @__PURE__ */ new Date()).toISOString(),
				goldRows: goldRows + 18402,
				bronzeRows: bronzeRows + 22110,
				nightlyLog: [...nightlyLog, "orchestrator complete · features refreshed"]
			});
			return;
		}
		const id = NIGHTLY_ORDER[nightlyCursor];
		set({
			nightlyCursor: nightlyCursor + 1,
			nightlyLog: [...nightlyLog, `refresh ${id} on ${catalog}`]
		});
	},
	scenario: "calm",
	setScenario: (scenario) => set({
		scenario,
		shocked: scenario !== "calm"
	}),
	shocked: false,
	injectShock: () => set({
		scenario: "labor",
		shocked: true
	}),
	clearShock: () => set((s) => ({
		shocked: false,
		scenario: "calm",
		champion: s.champion + 1
	})),
	champion: 7,
	focusStore: "0142",
	focusSku: "SKU-ESPR-12",
	setFocus: (focusStore, focusSku) => set({
		focusStore,
		focusSku
	}),
	paletteOpen: false,
	setPaletteOpen: (paletteOpen) => set({ paletteOpen })
}), {
	name: "helios-workspace",
	partialize: (s) => ({
		target: s.target,
		champion: s.champion,
		goldRows: s.goldRows,
		bronzeRows: s.bronzeRows,
		scenario: s.scenario
	})
}));
function useTarget() {
	const id = useWorkspace((s) => s.target);
	return TARGETS.find((t) => t.id === id) ?? TARGETS[0];
}
function jobName(base, target) {
	if (target === "dev") return `[dev you] ${base}`;
	return `[${target}] ${base}`;
}
function pipelineName(layer, target) {
	const raw = `helios-${layer}-${target}`;
	return target === "dev" ? `[dev you] ${raw}` : raw;
}
function TargetSwitch({ compact = false }) {
	const target = useWorkspace((s) => s.target);
	const setTarget = useWorkspace((s) => s.setTarget);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": "Bundle target",
		className: cn("inline-flex rounded-[var(--radius-sm)] bg-bg-subtle p-0.5 shadow-[var(--shadow-border)]", compact ? "" : "w-full sm:w-auto"),
		children: TARGETS.map((t) => {
			const on = t.id === target;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": on,
				onClick: () => setTarget(t.id),
				className: cn("min-h-9 min-w-11 rounded-[calc(var(--radius-sm)-2px)] px-3 font-mono text-xs transition-colors duration-150", on ? "bg-bg-elevated text-fg" : "text-fg-muted hover:text-fg"),
				children: t.id
			}, t.id);
		})
	});
}
function CommandPalette() {
	const open = useWorkspace((s) => s.paletteOpen);
	const setOpen = useWorkspace((s) => s.setPaletteOpen);
	const setTarget = useWorkspace((s) => s.setTarget);
	const startNightly = useWorkspace((s) => s.startNightly);
	const injectShock = useWorkspace((s) => s.injectShock);
	const setScenario = useWorkspace((s) => s.setScenario);
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [hi, setHi] = (0, import_react.useState)(0);
	const filtered = (0, import_react.useMemo)(() => [
		{
			id: "nightly",
			label: "Run nightly orchestrator",
			hint: "bronze → gold → features",
			run: () => {
				startNightly();
				navigate({ to: "/" });
			}
		},
		{
			id: "score",
			label: "Score a store-SKU",
			hint: "model serving",
			run: () => void navigate({ to: "/score" })
		},
		{
			id: "cicd",
			label: "Replay promotion",
			hint: "CI/CD",
			run: () => void navigate({ to: "/cicd" })
		},
		{
			id: "shock",
			label: "Labor Day weekend",
			hint: "demand shock",
			run: () => {
				injectShock();
				navigate({ to: "/" });
			}
		},
		{
			id: "viral",
			label: "Selvedge goes viral",
			hint: "SKU-DENM-01",
			run: () => {
				setScenario("viral");
				navigate({ to: "/" });
			}
		},
		{
			id: "prod",
			label: "Switch target to prod",
			hint: "helios_prod",
			run: () => setTarget("prod")
		},
		{
			id: "yml",
			label: "Open databricks.yml",
			hint: "bundle",
			run: () => void navigate({
				to: "/files",
				search: { path: "databricks.yml" }
			})
		},
		{
			id: "zip",
			label: "Download bundle zip",
			hint: ZIP_NAME,
			run: () => {
				const a = document.createElement("a");
				a.href = ZIP_HREF;
				a.download = ZIP_NAME;
				a.click();
			}
		}
	], [
		injectShock,
		navigate,
		setScenario,
		setTarget,
		startNightly
	]).filter((c) => !q || c.label.toLowerCase().includes(q.toLowerCase()) || c.hint.toLowerCase().includes(q.toLowerCase()));
	const active = filtered[Math.min(hi, Math.max(filtered.length - 1, 0))];
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(!open);
			}
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, setOpen]);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setQ("");
			setHi(0);
		}
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-sm",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-label": "Command palette",
			className: "w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border-hover)]",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setHi(0);
				},
				onKeyDown: (e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setHi((i) => Math.min(i + 1, filtered.length - 1));
					}
					if (e.key === "ArrowUp") {
						e.preventDefault();
						setHi((i) => Math.max(i - 1, 0));
					}
					if (e.key === "Enter" && active) {
						setOpen(false);
						active.run();
					}
				},
				placeholder: "Run a command…",
				className: "h-12 w-full border-b border-border bg-transparent px-4 text-sm text-fg outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "max-h-72 overflow-auto py-1",
				children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-3 text-sm text-fg-subtle",
					children: "No matches"
				}), filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setOpen(false);
						c.run();
					},
					className: cn("flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left", i === hi ? "bg-bg-hover" : "hover:bg-bg-subtle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: c.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.6875rem] text-fg-subtle",
						children: c.hint
					})]
				}) }, c.id))]
			})]
		})
	});
}
function NightlyTicker() {
	const cursor = useWorkspace((s) => s.nightlyCursor);
	const tick = useWorkspace((s) => s.tickNightly);
	(0, import_react.useEffect)(() => {
		if (cursor === null) return;
		const delay = cursor === 0 ? 120 : cursor >= NIGHTLY_ORDER.length ? 400 : 680;
		const t = window.setTimeout(tick, delay);
		return () => window.clearTimeout(t);
	}, [cursor, tick]);
	return null;
}
function etClock(now) {
	return new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(now);
}
function nextNightlyLabel(now) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/New_York",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).formatToParts(now);
	const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
	const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
	let delta = 135 - (hour * 60 + minute);
	if (delta <= 0) delta += 1440;
	const h = Math.floor(delta / 60);
	const m = delta % 60;
	return `${h}h ${String(m).padStart(2, "0")}m to 02:15`;
}
function StatusRail() {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const scenario = useWorkspace((s) => s.scenario);
	const cursor = useWorkspace((s) => s.nightlyCursor);
	const meta = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];
	const wape = wapeFor(scenario);
	const running = cursor !== null && cursor < NIGHTLY_ORDER.length ? NIGHTLY_ORDER[cursor] : cursor !== null ? "wrap" : null;
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1240px] items-center gap-4 overflow-x-auto px-4 py-1.5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-1.5 text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "helios-live size-1.5 rounded-full bg-ok" }),
						etClock(now),
						" ET"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0",
					children: nextNightlyLabel(now)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-fg",
					children: meta.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: wape > .22 ? "shrink-0 text-brick" : "shrink-0",
					children: ["WAPE ", wape.toFixed(2)]
				}),
				running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-ok",
					children: ["running ", running]
				})
			]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Overview"
	},
	{
		to: "/resources",
		label: "Resources"
	},
	{
		to: "/score",
		label: "Score"
	},
	{
		to: "/cicd",
		label: "CI/CD"
	},
	{
		to: "/files",
		label: "Files"
	},
	{
		to: "/guide",
		label: "Deploy"
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const setPalette = useWorkspace((s) => s.setPaletteOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightlyTicker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-sm)] focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-bg-subtle shadow-[var(--shadow-border)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {
									className: "size-4 text-brick",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-[0.8125rem] font-semibold tracking-[-0.02em]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sm:hidden",
										children: "Helios"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Helios Lakehouse"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase md:block",
									children: "Control room"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "Primary",
							className: "ml-auto hidden items-center gap-0.5 lg:flex",
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: cn("rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150", active ? "bg-bg-subtle text-fg" : "text-fg-muted hover:bg-bg-subtle hover:text-fg"),
									children: item.label
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto lg:ml-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetSwitch, { compact: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Open commands",
							onClick: () => setPalette(true),
							className: "inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] text-fg-muted shadow-[var(--shadow-border)] hover:bg-bg-subtle hover:text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {
								className: "size-4",
								strokeWidth: 1.75
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: ZIP_HREF,
							download: ZIP_NAME,
							className: "inline-flex h-10 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-3.5 pr-3 text-sm font-medium text-accent-fg shadow-[var(--shadow-border)] transition-opacity hover:opacity-90 active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								className: "size-4",
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Zip"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Mobile",
					className: "flex gap-0.5 overflow-x-auto border-t border-border px-2 py-1 lg:hidden",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm", active ? "bg-bg-subtle text-fg" : "text-fg-muted"),
							children: item.label
						}, item.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main",
				children
			})
		]
	});
}
var styles_default = "/assets/styles-CbT4eTDA.css";
var APP_NAME = "Helios Lakehouse";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Enterprise Databricks Asset Bundles — jobs, pipelines, and ML as code in one repo."
			},
			{
				name: "theme-color",
				content: "#0b0d10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-BgUfOCvK.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./cicd-C9P_ErBd.mjs");
var Route$4 = createFileRoute("/cicd")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./files-5bFSOBHx.mjs");
var Route$3 = createFileRoute("/files")({
	validateSearch: (raw) => ({ path: typeof raw.path === "string" ? raw.path : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$2 = createFileRoute("/guide")({ component: GuidePage });
var STEPS = [
	{
		n: "01",
		t: "Unzip and point the CLI at your workspace",
		b: "Databricks CLI ≥ 0.250. Host goes in a CLI profile, never a committed token."
	},
	{
		n: "02",
		t: "Replace the placeholder hosts and principal IDs",
		b: "databricks.yml uses fictional adb-*-helios hosts. Swap catalog names, warehouse IDs, and groups."
	},
	{
		n: "03",
		t: "Validate from the repo root",
		b: "databricks bundle validate -t dev catches missing resource references before anything is created."
	},
	{
		n: "04",
		t: "Deploy a personal dev copy",
		b: "databricks bundle deploy -t dev. Development mode prefixes names and pauses schedules."
	},
	{
		n: "05",
		t: "Wire GitHub OIDC, then promote",
		b: "Federation policy for this repo. Protect the prod environment. feature → develop → staging → main."
	}
];
function GuidePage() {
	const target = useTarget();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase",
				children: ["Deploy · currently previewing ", target.id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl",
				children: "From zip to a running lakehouse"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted",
				children: "The control room is a map of the bundle. The zip is the bundle. After you fill in workspace hosts it should validate with the Databricks CLI."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: ZIP_HREF,
				download: ZIP_NAME,
				className: "mt-6 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Download helios-lakehouse-dab.zip"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 space-y-3",
				children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] sm:flex sm:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-brick",
						children: s.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 sm:mt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[1.02rem] font-medium",
							children: s.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm leading-relaxed text-fg-muted",
							children: s.b
						})]
					})]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-sm font-medium",
					children: ["Commands for ", target.id]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-fg-muted",
					children: `make test
databricks bundle validate -t ${target.id}
databricks bundle deploy -t ${target.id}
databricks bundle run medallion_orchestrator -t ${target.id}`
				})]
			})
		]
	});
}
var $$splitComponentImporter$1 = () => import("./resources-BSaM6ulO.mjs");
var Route$1 = createFileRoute("/resources")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./score-BrxeEsNc.mjs");
function isStore(v) {
	return typeof v === "string" && STORES.some((s) => s.id === v);
}
function isSku(v) {
	return typeof v === "string" && SKUS.some((s) => s.id === v);
}
var Route = createFileRoute("/score")({
	validateSearch: (raw) => ({
		store: isStore(raw.store) ? raw.store : void 0,
		sku: isSku(raw.sku) ? raw.sku : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	CicdRoute: Route$4.update({
		id: "/cicd",
		path: "/cicd",
		getParentRoute: () => Route$6
	}),
	FilesRoute: Route$3.update({
		id: "/files",
		path: "/files",
		getParentRoute: () => Route$6
	}),
	GuideRoute: Route$2.update({
		id: "/guide",
		path: "/guide",
		getParentRoute: () => Route$6
	}),
	ResourcesRoute: Route$1.update({
		id: "/resources",
		path: "/resources",
		getParentRoute: () => Route$6
	}),
	ScoreRoute: Route.update({
		id: "/score",
		path: "/score",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { BUNDLE_FILES as C, ZIP_HREF as D, TARGETS as E, ZIP_NAME as O, WAPE_SERIES as S, RESOURCES as T, wapeFor as _, pipelineName as a, PROMOTE_SCRIPT as b, cn as c, STORES as d, demandMultiplier as f, observedUnits as g, goldSlice as h, jobName as i, SCENARIOS as l, forecastWeek as m, Route as n, useTarget as o, featuresFor as p, Route$3 as r, useWorkspace as s, router_exports as t, SKUS as u, DAG_NODES as v, PIPELINE_STEPS as w, WAPE_GATE as x, NIGHTLY_ORDER as y };
