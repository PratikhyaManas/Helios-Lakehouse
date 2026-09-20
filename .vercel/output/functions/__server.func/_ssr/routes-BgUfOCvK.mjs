import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowRight, i as Play, n as Square } from "../_libs/lucide-react.mjs";
import { D as ZIP_HREF, E as TARGETS, O as ZIP_NAME, S as WAPE_SERIES, _ as wapeFor, a as pipelineName, c as cn, d as STORES, f as demandMultiplier, g as observedUnits, h as goldSlice, i as jobName, l as SCENARIOS, m as forecastWeek, o as useTarget, p as featuresFor, s as useWorkspace, u as SKUS, v as DAG_NODES, x as WAPE_GATE, y as NIGHTLY_ORDER } from "./router-hLxzhsrW.mjs";
import { t as Button } from "./button-DVaPCo0x.mjs";
import { a as Bar, i as ReferenceLine, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BgUfOCvK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function displayName(id, label, target) {
	if (id === "bronze" || id === "silver" || id === "gold") return pipelineName(id === "gold" ? "gold" : id, target.id);
	return jobName(label, target.id);
}
function Dag() {
	const target = useTarget();
	const [active, setActive] = (0, import_react.useState)("bronze");
	const cursor = useWorkspace((s) => s.nightlyCursor);
	const log = useWorkspace((s) => s.nightlyLog);
	const start = useWorkspace((s) => s.startNightly);
	const stop = useWorkspace((s) => s.stopNightly);
	const bronzeRows = useWorkspace((s) => s.bronzeRows);
	const goldRows = useWorkspace((s) => s.goldRows);
	const running = cursor !== null;
	const litId = cursor === null ? null : cursor >= NIGHTLY_ORDER.length ? null : NIGHTLY_ORDER[cursor];
	const selected = DAG_NODES.find((n) => n.id === active) ?? DAG_NODES[1];
	const counts = {
		bronze: bronzeRows.toLocaleString(),
		silver: Math.round(bronzeRows * .87).toLocaleString(),
		gold: goldRows.toLocaleString(),
		feat: Math.round(goldRows * 2.1).toLocaleString()
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-[-0.02em]",
					children: "Nightly graph"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 max-w-xl text-sm text-fg-muted",
					children: [
						"Orchestrator sequence against",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-fg",
							children: target.catalog
						}),
						". Rows move when the run completes."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: running ? "secondary" : "primary",
					size: "sm",
					onClick: () => running ? stop() : start(),
					children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
						className: "size-3.5",
						strokeWidth: 1.75
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						className: "size-3.5",
						strokeWidth: 1.75
					}), running ? "Stop" : "Run nightly"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 flex gap-1",
				"aria-label": "Nightly sequence",
				children: NIGHTLY_ORDER.map((id, i) => {
					const node = DAG_NODES.find((n) => n.id === id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1 rounded-full", litId === id ? "bg-ok" : running && cursor !== null && i < cursor ? "bg-ok/50" : "bg-bg-subtle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate font-mono text-[0.625rem] text-fg-subtle",
							children: node?.label
						})]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
				children: DAG_NODES.map((node) => {
					const on = node.id === selected.id;
					const lit = litId === node.id;
					const orderIdx = NIGHTLY_ORDER.indexOf(node.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive(node.id),
						className: cn("flex min-h-20 w-full flex-col items-start rounded-[var(--radius-md)] px-3 py-3 text-left shadow-[var(--shadow-border)] transition-colors duration-150", on ? "bg-bg-hover" : "bg-bg-elevated hover:bg-bg-subtle", lit && "ring-1 ring-ok/70", running && orderIdx >= 0 && cursor !== null && orderIdx < cursor && "opacity-80"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex w-full items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
									children: node.kind
								}), counts[node.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.625rem] tabular-nums text-fg-subtle",
									children: counts[node.id]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 truncate font-mono text-[0.75rem] text-fg",
								children: displayName(node.id, node.label, target)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-[0.6875rem] text-fg-muted",
								children: node.note
							})
						]
					}) }, node.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.6875rem] text-fg-subtle",
							children: selected.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-mono text-sm",
							children: selected.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg-muted",
							children: selected.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/files",
							search: { path: selected.file },
							className: "mt-3 inline-block font-mono text-[0.75rem] text-fg underline-offset-2 hover:underline",
							children: selected.file
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-40 overflow-auto rounded-[var(--radius-lg)] bg-bg-elevated p-4 font-mono text-[0.6875rem] leading-relaxed text-fg-muted shadow-[var(--shadow-border)]",
					children: log.length === 0 ? `# idle · ${target.id} · ${target.schedules.toLowerCase()}` : log.join("\n")
				})]
			})
		]
	});
}
function cellTone(observed, predicted) {
	const ratio = observed / Math.max(predicted, 1);
	if (ratio >= 1.45) return "hot";
	if (ratio <= .55) return "cold";
	return "ok";
}
function Floor() {
	const scenario = useWorkspace((s) => s.scenario);
	const focusStore = useWorkspace((s) => s.focusStore);
	const focusSku = useWorkspace((s) => s.focusSku);
	const setFocus = useWorkspace((s) => s.setFocus);
	const selectedStore = STORES.find((s) => s.id === focusStore) ?? STORES[0];
	const selectedSku = SKUS.find((s) => s.id === focusSku) ?? SKUS[0];
	const mult = demandMultiplier(selectedStore.region, selectedSku.dept, selectedSku.id, scenario);
	const feat = featuresFor(selectedStore.id, selectedSku.id);
	const predicted = forecastWeek(feat, 0);
	const observed = observedUnits(selectedStore.id, selectedSku.id, mult);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-[-0.02em]",
					children: "The floor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-fg-muted",
					children: "Eight flagship stores × six SKUs. Color is observed last week versus the model. Tap a cell, then score it the way serving would."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.6875rem] text-fg-subtle",
					children: "brick = under-forecast · mute = over"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-[var(--radius-lg)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] border-separate border-spacing-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-left font-mono text-[0.625rem] font-medium text-fg-subtle",
						children: "store"
					}), SKUS.map((sku) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-1 py-1 text-center font-mono text-[0.625rem] font-medium text-fg-subtle",
						children: sku.id.replace("SKU-", "")
					}, sku.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: STORES.map((store) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						className: "whitespace-nowrap px-1 py-0.5 text-left font-mono text-[0.6875rem] font-normal text-fg-muted",
						children: [store.id, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 hidden text-fg-subtle sm:inline",
							children: store.name
						})]
					}), SKUS.map((sku) => {
						const m = demandMultiplier(store.region, sku.dept, sku.id, scenario);
						const f = featuresFor(store.id, sku.id);
						const pred = Math.max(forecastWeek(f, 0), 1);
						const obs = observedUnits(store.id, sku.id, m);
						const tone = cellTone(obs, pred);
						const on = store.id === focusStore && sku.id === focusSku;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `${store.name} ${sku.name}, ${obs} observed`,
								onClick: () => setFocus(store.id, sku.id),
								className: cn("flex h-11 w-full min-w-11 items-center justify-center rounded-[var(--radius-xs)] font-mono text-[0.6875rem] tabular-nums transition-[background-color,box-shadow] duration-150", tone === "hot" && "bg-brick text-fg", tone === "cold" && "bg-bg-subtle text-fg-muted", tone === "ok" && "bg-ok/25 text-fg", on && "ring-1 ring-accent"),
								children: obs
							})
						}, sku.id);
					})] }, store.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium",
					children: [selectedSku.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-fg-muted",
						children: [" · ", selectedStore.name]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 font-mono text-[0.6875rem] text-fg-subtle",
					children: [
						"observed ",
						observed,
						" · model ",
						predicted,
						" · ",
						selectedStore.region,
						feat.censored ? " · censored" : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/score",
					search: {
						store: selectedStore.id,
						sku: selectedSku.id
					},
					className: "inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-medium text-accent-fg",
					children: "Score this cell"
				})]
			})
		]
	});
}
function GoldTable() {
	const goldRows = useWorkspace((s) => s.goldRows);
	const lastNightly = useWorkspace((s) => s.lastNightly);
	const focusStore = useWorkspace((s) => s.focusStore);
	const [store, setStore] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => goldSlice(), []);
	const shown = (store === "all" ? rows : rows.filter((r) => r.store_id === store)).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-medium tracking-[-0.02em]",
				children: "gold.sales_daily"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-fg-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono tabular-nums text-fg",
						children: goldRows.toLocaleString()
					}),
					" ",
					"rows in Unity Catalog",
					lastNightly ? ` · last append ${new Date(lastNightly).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})}` : " · run nightly to append"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Filter store"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: store,
					onChange: (e) => setStore(e.target.value),
					className: "h-11 rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "all stores"
					}), STORES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s.id,
						children: s.id
					}, s.id))]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto rounded-[var(--radius-lg)] shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-bg-subtle font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium",
							children: "date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium",
							children: "store"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium",
							children: "sku"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium",
							children: "channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium text-right",
							children: "units"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2.5 font-medium text-right",
							children: "net_sales"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: r.store_id === focusStore ? "border-t border-border bg-bg-hover" : "border-t border-border bg-bg-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-[0.75rem] tabular-nums",
							children: r.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-[0.75rem]",
							children: r.store_id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-[0.75rem]",
							children: r.sku
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-fg-muted",
							children: r.channel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right font-mono tabular-nums",
							children: r.units
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right font-mono tabular-nums",
							children: r.net_sales.toLocaleString()
						})
					]
				}, `${r.date}-${r.store_id}-${r.sku}`)) })]
			})
		})]
	});
}
function RunBoard() {
	const target = useTarget();
	const scenario = useWorkspace((s) => s.scenario);
	const setScenario = useWorkspace((s) => s.setScenario);
	const clear = useWorkspace((s) => s.clearShock);
	const champion = useWorkspace((s) => s.champion);
	const paused = target.schedules === "Paused";
	const last = wapeFor(scenario);
	const drifting = last > WAPE_GATE;
	const series = WAPE_SERIES.map((p, i) => ({
		...p,
		v: i >= WAPE_SERIES.length - 3 ? last : p.v
	}));
	const meta = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase",
					children: target.catalog
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: drifting ? "rounded-full bg-brick-dim px-2 py-0.5 font-mono text-[0.625rem] text-brick" : paused ? "rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-warn" : "rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-ok",
					children: drifting ? "drift alert" : paused ? "schedules paused" : "schedules live"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-fg-muted",
				children: meta.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "radiogroup",
				"aria-label": "Demand scenario",
				className: "mt-4 flex flex-wrap gap-1.5",
				children: SCENARIOS.map((s) => {
					const on = s.id === scenario;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "radio",
						"aria-checked": on,
						onClick: () => setScenario(s.id),
						className: cn("h-9 rounded-full px-3 font-mono text-[0.6875rem] shadow-[var(--shadow-border)]", on ? "bg-bg-hover text-fg" : "bg-bg-subtle text-fg-muted hover:text-fg"),
						children: s.name
					}, s.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
					children: "Holdout WAPE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: `mt-1 font-mono text-lg tabular-nums ${drifting ? "text-brick" : "text-ok"}`,
					children: [last.toFixed(2), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 text-xs text-fg-subtle",
						children: ["/ ", WAPE_GATE]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
					children: "Champion"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 font-mono text-sm",
					children: target.id === "prod" ? `v${champion} · serving` : "alias only"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
				children: "Trailing WAPE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 h-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: series,
						margin: {
							top: 8,
							right: 0,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "d",
								hide: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-bg-hover)" },
								contentStyle: {
									background: "var(--color-bg-elevated)",
									border: "1px solid var(--color-border)",
									fontFamily: "var(--font-mono)",
									fontSize: 11,
									color: "var(--color-fg)"
								},
								formatter: (value) => {
									const n = typeof value === "number" ? value : Number(value);
									return [Number.isFinite(n) ? n.toFixed(2) : String(value), "WAPE"];
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: WAPE_GATE,
								stroke: "var(--color-warn)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "v",
								fill: "var(--color-ok)",
								radius: [
									2,
									2,
									0,
									0
								],
								opacity: .55
							})
						]
					})
				})
			}),
			drifting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				className: "mt-3 w-full",
				onClick: clear,
				children: "Retrain and promote Champion"
			})
		]
	});
}
function Home() {
	const target = useTarget();
	const scenario = useWorkspace((s) => s.scenario);
	const scene = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[1240px] px-4 pb-20 pt-8 sm:px-6 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.14em] text-brick uppercase",
				children: [
					"Helios Retail · ",
					target.id,
					" · ",
					scene.name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-xl text-[2.05rem] leading-[1.12] font-medium tracking-[-0.035em] sm:text-[2.6rem]",
						children: scene.id === "calm" ? "A quiet floor. Pick a weather and watch the model miss." : scene.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-[1.02rem] leading-relaxed text-fg-muted",
						children: "This is the bundle running as a shift: eight stores, six SKUs, a nightly DAG, and a serving endpoint. Improvise the week, then take the zip to a real workspace."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/score",
							className: "inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-accent px-5 pr-4 text-[0.9375rem] font-medium text-accent-fg shadow-[var(--shadow-border)] transition-opacity hover:opacity-90",
							children: ["Score a SKU", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-4",
								strokeWidth: 1.75
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ZIP_HREF,
							download: ZIP_NAME,
							className: "inline-flex h-12 items-center rounded-[var(--radius-md)] bg-bg-subtle px-5 text-[0.9375rem] font-medium text-fg shadow-[var(--shadow-border)] hover:bg-bg-hover",
							children: "Download zip"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunBoard, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Floor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dag, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldTable, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-[-0.02em]",
					children: "Targets in this bundle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 grid gap-3 md:grid-cols-3",
					children: TARGETS.map((t) => {
						const on = t.id === target.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: on ? "rounded-[var(--radius-lg)] bg-bg-hover p-5 shadow-[var(--shadow-border)]" : "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-sm",
									children: t.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-[0.75rem] text-fg-subtle",
									children: t.catalog
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-fg-muted",
									children: t.note
								})
							]
						}, t.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
