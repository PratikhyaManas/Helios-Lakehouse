import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as STORES, f as demandMultiplier, g as observedUnits, m as forecastWeek, n as Route, o as useTarget, p as featuresFor, s as useWorkspace, u as SKUS } from "./router-hLxzhsrW.mjs";
import { t as Button } from "./button-DVaPCo0x.mjs";
import { a as Bar, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-BrxeEsNc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForecastPad({ initialStore, initialSku }) {
	const target = useTarget();
	const champion = useWorkspace((s) => s.champion);
	const scenario = useWorkspace((s) => s.scenario);
	const focusStore = useWorkspace((s) => s.focusStore);
	const focusSku = useWorkspace((s) => s.focusSku);
	const setFocus = useWorkspace((s) => s.setFocus);
	const [store, setStore] = (0, import_react.useState)(initialStore ?? focusStore);
	const [sku, setSku] = (0, import_react.useState)(initialSku ?? focusSku);
	const [calling, setCalling] = (0, import_react.useState)(false);
	const [payload, setPayload] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (initialStore) setStore(initialStore);
		if (initialSku) setSku(initialSku);
	}, [initialStore, initialSku]);
	const storeMeta = STORES.find((s) => s.id === store) ?? STORES[0];
	const skuMeta = SKUS.find((s) => s.id === sku) ?? SKUS[0];
	const feat = (0, import_react.useMemo)(() => featuresFor(store, sku), [store, sku]);
	const mult = demandMultiplier(storeMeta.region, skuMeta.dept, skuMeta.id, scenario);
	const weeks = (0, import_react.useMemo)(() => {
		return Array.from({ length: 12 }, (_, i) => ({
			week: `W${String(i + 1).padStart(2, "0")}`,
			model: forecastWeek(feat, i),
			observed: i === 0 ? observedUnits(store, sku, mult) : null
		}));
	}, [
		feat,
		mult,
		sku,
		store
	]);
	const total = weeks.reduce((s, w) => s + w.model, 0);
	function callEndpoint() {
		setCalling(true);
		setFocus(store, sku);
		window.setTimeout(() => {
			const body = {
				endpoint: `helios-demand-${target.id}`,
				alias: target.id === "prod" ? `Champion@v${champion}` : "Challenger",
				scenario,
				dataframe_split: {
					columns: [
						"recency_days",
						"units_l7",
						"units_l28",
						"on_hand"
					],
					data: [[
						feat.recency_days,
						feat.units_l7,
						feat.units_l28,
						feat.on_hand
					]]
				},
				predictions: weeks.map((w) => w.model),
				last_week_observed: observedUnits(store, sku, mult),
				latency_ms: 180 + feat.recency_days % 40
			};
			setPayload(JSON.stringify(body, null, 2));
			setCalling(false);
		}, 420);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase",
					children: ["Serving · ", target.id]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-lg font-medium tracking-[-0.02em]",
					children: "Score a store-SKU"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-fg-muted",
					children: "Same features the batch job writes. The endpoint is declared in every target; traffic only exists in prod."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.6875rem] text-fg-subtle",
						children: "store_id"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: store,
						onChange: (e) => setStore(e.target.value),
						className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]",
						children: STORES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.id,
								" · ",
								s.name
							]
						}, s.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.6875rem] text-fg-subtle",
						children: "sku"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: sku,
						onChange: (e) => setSku(e.target.value),
						className: "mt-1 h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]",
						children: SKUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.id,
								" · ",
								s.name
							]
						}, s.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [
						["recency_days", feat.recency_days],
						["units_l7", feat.units_l7],
						["units_l28", feat.units_l28],
						["on_hand", feat.on_hand]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-mono text-[0.625rem] text-fg-subtle",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-mono text-sm tabular-nums",
						children: v
					})] }, k))
				}),
				feat.censored && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-[0.6875rem] text-warn",
					children: "censored demand · on_hand low"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-5 w-full",
					disabled: calling,
					onClick: callEndpoint,
					children: calling ? "Scoring…" : "Call serving endpoint"
				}),
				target.id !== "prod" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-[0.6875rem] text-warn",
					children: [
						"declared · no traffic on ",
						target.id,
						" — response is simulated"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							skuMeta.name,
							" · ",
							storeMeta.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 font-mono text-[0.6875rem] text-fg-subtle",
						children: [
							"next 12 weeks · ",
							total,
							" model units"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[0.6875rem] text-fg-subtle",
						children: target.id === "prod" ? `Champion v${champion}` : "Challenger"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: weeks,
							margin: {
								top: 8,
								right: 4,
								left: -18,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "week",
									tick: {
										fill: "var(--color-fg-subtle)",
										fontSize: 10
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "var(--color-fg-subtle)",
										fontSize: 10
									},
									axisLine: false,
									tickLine: false,
									width: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "var(--color-bg-hover)" },
									contentStyle: {
										background: "var(--color-bg-elevated)",
										border: "1px solid var(--color-border)",
										borderRadius: 8,
										fontFamily: "var(--font-mono)",
										fontSize: 12,
										color: "var(--color-fg)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "model",
									fill: "var(--color-ok)",
									radius: [
										3,
										3,
										0,
										0
									],
									opacity: .8
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 max-h-44 overflow-auto font-mono text-[0.6875rem] leading-relaxed text-fg-muted",
					children: payload ?? "# POST /serving-endpoints/helios-demand/invocations\n# waiting for a call"
				})
			]
		})]
	});
}
function ScorePage() {
	const target = useTarget();
	const { store, sku } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase",
				children: ["resources/ml/serving_endpoint.yml · ", target.id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl",
				children: "Demand serving, as the job graph leaves it"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted",
				children: "Features come from the same functions the batch job uses. Scenarios on the floor warp observed demand — the model still scores the calm features unless you retrain."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastPad, {
					initialStore: store,
					initialSku: sku
				})
			})
		]
	});
}
//#endregion
export { ScorePage as component };
