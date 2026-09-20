import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as RESOURCES, a as pipelineName, i as jobName, o as useTarget } from "./router-hLxzhsrW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-BSaM6ulO.js
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"Pipeline",
	"Job",
	"Experiment",
	"Registered model",
	"Serving"
];
function liveName(kind, name, targetId) {
	if (kind === "Pipeline") {
		const layer = name.replace("_ingest", "").replace("_conform", "").replace("_marts", "");
		return pipelineName(layer === "gold" ? "gold" : layer, targetId);
	}
	if (kind === "Job") return jobName(name, targetId);
	if (kind === "Serving") return `helios-demand-${targetId}`;
	if (kind === "Experiment") return `/Shared/helios/${targetId}/demand_forecast`;
	return `${targetId === "dev" ? "helios_dev" : targetId === "staging" ? "helios_staging" : "helios_prod"}.ml.${name}`;
}
function ResourcesPage() {
	const target = useTarget();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase",
				children: ["resources/*.yml · ", target.id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl",
				children: "What this target would create"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted",
				children: "Names, catalogs, and pause status interpolate from the header target. Serving is declared in every bundle; traffic only exists in prod."
			}),
			KINDS.map((kind) => {
				const items = RESOURCES.filter((r) => r.kind === kind);
				if (!items.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-medium tracking-wide text-fg-muted uppercase",
						children: [kind, items.length > 1 ? "s" : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-3 md:grid-cols-2",
						children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "truncate font-mono text-sm",
										children: liveName(r.kind, r.name, target.id)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-fg-subtle",
										children: r.layer
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-fg-muted",
									children: r.blurb
								}),
								r.kind === "Serving" && target.id !== "prod" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-mono text-[0.6875rem] text-warn",
									children: ["declared · no traffic on ", target.id]
								}),
								r.kind === "Job" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 font-mono text-[0.6875rem] text-fg-subtle",
									children: ["schedule ", target.schedules.toLowerCase()]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/files",
									search: { path: r.file },
									className: "mt-3 inline-block font-mono text-[0.75rem] text-fg hover:underline",
									children: r.file
								})
							]
						}, r.id))
					})]
				}, kind);
			})
		]
	});
}
//#endregion
export { ResourcesPage as component };
