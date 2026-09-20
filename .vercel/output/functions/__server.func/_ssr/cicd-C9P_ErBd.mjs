import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Play, r as ShieldCheck } from "../_libs/lucide-react.mjs";
import { b as PROMOTE_SCRIPT, c as cn, w as PIPELINE_STEPS } from "./router-hLxzhsrW.mjs";
import { t as Button } from "./button-DVaPCo0x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cicd-C9P_ErBd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Promote() {
	const [line, setLine] = (0, import_react.useState)(null);
	const [waiting, setWaiting] = (0, import_react.useState)(false);
	const current = line === null ? -1 : PROMOTE_SCRIPT[Math.min(line, PROMOTE_SCRIPT.length - 1)]?.step ?? -1;
	(0, import_react.useEffect)(() => {
		if (line === null) return;
		if (line >= PROMOTE_SCRIPT.length) return;
		const row = PROMOTE_SCRIPT[line];
		if (row && row.step === 3 && row.line.includes("waiting") && !waiting) {
			setWaiting(true);
			return;
		}
		if (waiting) return;
		const t = window.setTimeout(() => setLine((n) => n === null ? n : n + 1), 420);
		return () => window.clearTimeout(t);
	}, [line, waiting]);
	const visible = (0, import_react.useMemo)(() => {
		if (line === null) return [];
		return PROMOTE_SCRIPT.slice(0, Math.min(line + 1, PROMOTE_SCRIPT.length));
	}, [line]);
	const done = line !== null && line >= PROMOTE_SCRIPT.length - 1 && !waiting;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-[-0.02em]",
					children: "Replay a promotion"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-fg-muted",
					children: "Same four workflows as the zip. Prod stops for the environment gate — you are the reviewer."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [waiting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						onClick: () => {
							setWaiting(false);
							setLine((n) => n === null ? 0 : n + 1);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							className: "size-3.5",
							strokeWidth: 1.75
						}), "Approve prod"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: () => {
							setWaiting(false);
							setLine(0);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "size-3.5",
							strokeWidth: 1.75
						}), line === null || done ? "Replay" : "Restart"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 grid gap-2 sm:grid-cols-4",
				children: PIPELINE_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("rounded-[var(--radius-md)] px-3 py-3 shadow-[var(--shadow-border)]", i === current ? "bg-bg-hover" : "bg-bg-elevated"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[0.625rem] text-fg-subtle",
						children: [
							String(i + 1).padStart(2, "0"),
							" · ",
							step.env
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-medium",
						children: step.title
					})]
				}, step.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				className: "mt-4 max-h-64 overflow-auto rounded-[var(--radius-lg)] bg-bg-elevated p-4 font-mono text-[0.75rem] leading-relaxed text-fg-muted shadow-[var(--shadow-border)]",
				children: [visible.length === 0 ? "# git push origin feature/demand-gate\n# waiting for ci-validate.yml" : visible.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: row.ok ? "block" : "block text-warn",
					children: row.line
				}, `${row.line}-${i}`)), done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block text-ok",
					children: "deploy-prod.yml finished"
				})]
			})
		]
	});
}
function CicdPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase",
				children: ".github/workflows"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl",
				children: "Promotion is a merge, not a click"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted",
				children: "Four GitHub Actions workflows, OIDC only. Prod cannot deploy until two platform admins approve the environment. Press Replay and be one of them."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promote, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium tracking-[-0.02em]",
					children: "Auth model"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 md:grid-cols-3",
					children: [
						{
							t: "GitHub OIDC",
							b: "No PATs. Federation policy on the service principal trusts this repo and these workflow names."
						},
						{
							t: "Environment gates",
							b: "prod requires reviewers. staging auto-deploys and trains Challenger. develop is unguarded personal copies."
						},
						{
							t: "run_as",
							b: "Dev is you so name prefixes work. Staging and prod are dedicated principals with UC on their catalog only."
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: c.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-fg-muted",
							children: c.b
						})]
					}, c.t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-fg-muted",
				children: [
					"Workflow source:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/files",
						search: { path: ".github/workflows/ci-validate.yml" },
						className: "font-mono text-fg hover:underline",
						children: ".github/workflows/ci-validate.yml"
					})
				]
			})
		]
	});
}
//#endregion
export { CicdPage as component };
