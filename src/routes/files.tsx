import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BUNDLE_FILES, type BundleFile } from "@/lib/bundle-catalog";
import { TOKEN_CLASS, tokenize } from "@/lib/highlight";
import { cn } from "@/lib/utils";

type Search = { path?: string };

export const Route = createFileRoute("/files")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    path: typeof raw.path === "string" ? raw.path : undefined,
  }),
  component: FilesPage,
});

const CATEGORY_LABEL: Record<BundleFile["category"], string> = {
  root: "Root",
  cicd: "CI/CD",
  resources: "Resources",
  src: "Python",
  tests: "Tests",
  scripts: "Scripts",
};

let filesCache: Promise<Record<string, string>> | null = null;

function loadBundleFiles(): Promise<Record<string, string>> {
  if (!filesCache) {
    filesCache = fetch("/helios-files.json").then((r) => {
      if (!r.ok) throw new Error("missing bundle snapshot");
      return r.json() as Promise<Record<string, string>>;
    });
  }
  return filesCache;
}

function FilesPage() {
  const { path: searchPath } = Route.useSearch();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BUNDLE_FILES;
    return BUNDLE_FILES.filter(
      (f) => f.path.toLowerCase().includes(q) || f.summary.toLowerCase().includes(q),
    );
  }, [query]);
  const active =
    filtered.find((f) => f.path === searchPath) ?? filtered[0] ?? BUNDLE_FILES[0];
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    loadBundleFiles()
      .then((map) => {
        if (cancelled) return;
        const value = map[active.path];
        if (typeof value !== "string") {
          setStatus("err");
          return;
        }
        setText(value);
        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) setStatus("err");
      });
    return () => {
      cancelled = true;
    };
  }, [active.path]);

  const tokens = useMemo(
    () => (status === "ok" ? tokenize(text, active.lang) : []),
    [status, text, active.lang],
  );

  const groups = useMemo(() => {
    const g = new Map<BundleFile["category"], BundleFile[]>();
    for (const f of filtered) {
      const list = g.get(f.category) ?? [];
      list.push(f);
      g.set(f.category, list);
    }
    return g;
  }, [filtered]);

  const lines = status === "ok" ? text.split("\n").length : 0;

  return (
    <main className="mx-auto grid max-w-[1240px] grid-cols-1 gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-border lg:border-r lg:border-b-0">
        <div className="px-4 py-4 sm:px-5">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
            {filtered.length} / {BUNDLE_FILES.length}
          </p>
          <h1 className="mt-1 text-lg font-medium tracking-[-0.02em]">Bundle source</h1>
          <label className="mt-3 block">
            <span className="sr-only">Filter files</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter path…"
              className="h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-fg-subtle"
            />
          </label>
        </div>
        <nav
          aria-label="Bundle files"
          className="max-h-[40vh] overflow-y-auto px-2 pb-4 lg:max-h-[calc(100dvh-11rem)]"
        >
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-sm text-fg-subtle">No files match.</p>
          )}
          {[...groups.entries()].map(([cat, files]) => (
            <div key={cat} className="mb-3">
              <p className="px-3 py-1 font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
                {CATEGORY_LABEL[cat]}
              </p>
              <ul>
                {files.map((f) => {
                  const on = f.path === active.path;
                  const name = f.path.split("/").slice(-1)[0];
                  return (
                    <li key={f.path}>
                      <Link
                        to="/files"
                        search={{ path: f.path }}
                        className={cn(
                          "block rounded-[var(--radius-sm)] px-3 py-2",
                          on
                            ? "bg-bg-subtle text-fg"
                            : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                        )}
                      >
                        <span className="block truncate font-mono text-[0.75rem]">{name}</span>
                        {f.path !== name && (
                          <span className="block truncate text-[0.6875rem] text-fg-subtle">
                            {f.path}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <section className="min-w-0 px-4 py-5 sm:px-6">
        <p className="truncate font-mono text-[0.75rem] text-fg-subtle">{active.path}</p>
        <h2 className="mt-1 text-xl font-medium tracking-[-0.02em]">
          {active.path.split("/").pop()}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">{active.summary}</p>
        <p className="mt-1 font-mono text-[0.6875rem] text-fg-subtle">{lines} lines</p>
        <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border)]">
          {status === "loading" && (
            <p className="px-4 py-10 text-sm text-fg-subtle">Loading file…</p>
          )}
          {status === "err" && (
            <p className="px-4 py-10 text-sm text-fg-muted">Could not load this file.</p>
          )}
          {status === "ok" && (
            <pre className="max-h-[min(70vh,720px)] overflow-auto p-4 font-mono text-[0.75rem] leading-[1.55]">
              <code>
                {tokens.map((tok, i) => (
                  <span key={i} className={TOKEN_CLASS[tok.t] ?? "text-fg"}>
                    {tok.c}
                  </span>
                ))}
              </code>
            </pre>
          )}
        </div>
      </section>
    </main>
  );
}
