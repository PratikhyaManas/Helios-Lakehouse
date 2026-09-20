import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as BUNDLE_FILES, c as cn, r as Route$3 } from "./router-hLxzhsrW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/files-5bFSOBHx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KW_PY = /* @__PURE__ */ new Set([
	"and",
	"as",
	"assert",
	"async",
	"await",
	"break",
	"class",
	"continue",
	"def",
	"del",
	"elif",
	"else",
	"except",
	"False",
	"finally",
	"for",
	"from",
	"if",
	"import",
	"in",
	"is",
	"lambda",
	"None",
	"not",
	"or",
	"pass",
	"raise",
	"return",
	"True",
	"try",
	"while",
	"with",
	"yield"
]);
function pushPlain(out, s) {
	if (s) out.push({
		t: "plain",
		c: s
	});
}
function tokenize(source, lang) {
	if (lang === "python") return tokPython(source);
	if (lang === "yaml" || lang === "gitignore") return tokYaml(source);
	if (lang === "bash") return tokBash(source);
	if (lang === "toml") return tokToml(source);
	if (lang === "md") return tokMd(source);
	return [{
		t: "plain",
		c: source
	}];
}
function tokPython(src) {
	const out = [];
	const re = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b([A-Za-z_][\w]*)\b|(\d+\.?\d*)/gm;
	let last = 0;
	let m;
	while (m = re.exec(src)) {
		pushPlain(out, src.slice(last, m.index));
		if (m[1]) out.push({
			t: "cmt",
			c: m[1]
		});
		else if (m[2]) out.push({
			t: "str",
			c: m[2]
		});
		else if (m[3]) out.push({
			t: KW_PY.has(m[3]) ? "kw" : "id",
			c: m[3]
		});
		else if (m[4]) out.push({
			t: "num",
			c: m[4]
		});
		last = m.index + m[0].length;
	}
	pushPlain(out, src.slice(last));
	return out;
}
function tokYaml(src) {
	const out = [];
	const lines = src.split(/(\n)/);
	for (const line of lines) {
		if (line === "\n") {
			out.push({
				t: "plain",
				c: "\n"
			});
			continue;
		}
		const cmt = line.match(/^(.*?)(\s#.*)$/);
		const body = cmt ? cmt[1] : line;
		const comment = cmt ? cmt[2] : "";
		const key = body.match(/^(\s*)([\w./-]+)(:\s?)(.*)$/);
		if (key) {
			pushPlain(out, key[1]);
			out.push({
				t: "key",
				c: key[2]
			});
			out.push({
				t: "plain",
				c: key[3]
			});
			const rest = key[4];
			if (/^["'].*["']$/.test(rest.trim()) || rest.includes("${")) out.push({
				t: "str",
				c: rest
			});
			else if (/^(true|false|null|\d+)\s*$/.test(rest)) out.push({
				t: "num",
				c: rest
			});
			else pushPlain(out, rest);
		} else if (body.trim().startsWith("- ")) {
			const idx = body.indexOf("- ");
			pushPlain(out, body.slice(0, idx));
			out.push({
				t: "kw",
				c: "-"
			});
			pushPlain(out, body.slice(idx + 1));
		} else pushPlain(out, body);
		if (comment) out.push({
			t: "cmt",
			c: comment
		});
	}
	return out;
}
function tokBash(src) {
	const out = [];
	const re = /(#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\$\{?[A-Za-z_][\w]*\}?)|\b(if|then|fi|for|do|done|in|export|set|echo|cd)\b/gm;
	let last = 0;
	let m;
	while (m = re.exec(src)) {
		pushPlain(out, src.slice(last, m.index));
		if (m[1]) out.push({
			t: "cmt",
			c: m[1]
		});
		else if (m[2]) out.push({
			t: "str",
			c: m[2]
		});
		else if (m[3]) out.push({
			t: "num",
			c: m[3]
		});
		else if (m[4]) out.push({
			t: "kw",
			c: m[4]
		});
		last = m.index + m[0].length;
	}
	pushPlain(out, src.slice(last));
	return out;
}
function tokToml(src) {
	return tokYaml(src);
}
function tokMd(src) {
	const out = [];
	const lines = src.split(/(\n)/);
	for (const line of lines) {
		if (line === "\n") {
			out.push({
				t: "plain",
				c: "\n"
			});
			continue;
		}
		if (/^#{1,6} /.test(line)) out.push({
			t: "kw",
			c: line
		});
		else if (line.startsWith("```")) out.push({
			t: "cmt",
			c: line
		});
		else if (line.startsWith("> ")) out.push({
			t: "str",
			c: line
		});
		else if (/^\s*[-*] /.test(line)) {
			const i = line.search(/[-*]/);
			pushPlain(out, line.slice(0, i));
			out.push({
				t: "kw",
				c: line[i] ?? "-"
			});
			pushPlain(out, line.slice(i + 1));
		} else pushPlain(out, line);
	}
	return out;
}
var TOKEN_CLASS = {
	plain: "text-fg",
	kw: "text-brick",
	key: "text-[#b9c4ce]",
	str: "text-[#c4b59a]",
	cmt: "text-fg-subtle italic",
	num: "text-ok",
	id: "text-fg"
};
var CATEGORY_LABEL = {
	root: "Root",
	cicd: "CI/CD",
	resources: "Resources",
	src: "Python",
	tests: "Tests",
	scripts: "Scripts"
};
var filesCache = null;
function loadBundleFiles() {
	if (!filesCache) filesCache = fetch("/helios-files.json").then((r) => {
		if (!r.ok) throw new Error("missing bundle snapshot");
		return r.json();
	});
	return filesCache;
}
function FilesPage() {
	const { path: searchPath } = Route$3.useSearch();
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return BUNDLE_FILES;
		return BUNDLE_FILES.filter((f) => f.path.toLowerCase().includes(q) || f.summary.toLowerCase().includes(q));
	}, [query]);
	const active = filtered.find((f) => f.path === searchPath) ?? filtered[0] ?? BUNDLE_FILES[0];
	const [text, setText] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setStatus("loading");
		loadBundleFiles().then((map) => {
			if (cancelled) return;
			const value = map[active.path];
			if (typeof value !== "string") {
				setStatus("err");
				return;
			}
			setText(value);
			setStatus("ok");
		}).catch(() => {
			if (!cancelled) setStatus("err");
		});
		return () => {
			cancelled = true;
		};
	}, [active.path]);
	const tokens = (0, import_react.useMemo)(() => status === "ok" ? tokenize(text, active.lang) : [], [
		status,
		text,
		active.lang
	]);
	const groups = (0, import_react.useMemo)(() => {
		const g = /* @__PURE__ */ new Map();
		for (const f of filtered) {
			const list = g.get(f.category) ?? [];
			list.push(f);
			g.set(f.category, list);
		}
		return g;
	}, [filtered]);
	const lines = status === "ok" ? text.split("\n").length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-[1240px] grid-cols-1 gap-0 lg:grid-cols-[280px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-border lg:border-r lg:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-4 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase",
						children: [
							filtered.length,
							" / ",
							BUNDLE_FILES.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-lg font-medium tracking-[-0.02em]",
						children: "Bundle source"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Filter files"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Filter path…",
							className: "h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Bundle files",
				className: "max-h-[40vh] overflow-y-auto px-2 pb-4 lg:max-h-[calc(100dvh-11rem)]",
				children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-6 text-sm text-fg-subtle",
					children: "No files match."
				}), [...groups.entries()].map(([cat, files]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 py-1 font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase",
						children: CATEGORY_LABEL[cat]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: files.map((f) => {
						const on = f.path === active.path;
						const name = f.path.split("/").slice(-1)[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/files",
							search: { path: f.path },
							className: cn("block rounded-[var(--radius-sm)] px-3 py-2", on ? "bg-bg-subtle text-fg" : "text-fg-muted hover:bg-bg-subtle hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-mono text-[0.75rem]",
								children: name
							}), f.path !== name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-[0.6875rem] text-fg-subtle",
								children: f.path
							})]
						}) }, f.path);
					}) })]
				}, cat))]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "min-w-0 px-4 py-5 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-mono text-[0.75rem] text-fg-subtle",
					children: active.path
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-medium tracking-[-0.02em]",
					children: active.path.split("/").pop()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted",
					children: active.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-[0.6875rem] text-fg-subtle",
					children: [lines, " lines"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]",
					children: [
						status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 py-10 text-sm text-fg-subtle",
							children: "Loading file…"
						}),
						status === "err" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 py-10 text-sm text-fg-muted",
							children: "Could not load this file."
						}),
						status === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-[min(70vh,720px)] overflow-auto p-4 font-mono text-[0.75rem] leading-[1.55]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: tokens.map((tok, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: TOKEN_CLASS[tok.t] ?? "text-fg",
								children: tok.c
							}, i)) })
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { FilesPage as component };
