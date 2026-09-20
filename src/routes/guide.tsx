import { createFileRoute } from "@tanstack/react-router";
import { ZIP_HREF, ZIP_NAME } from "@/lib/bundle-catalog";
import { useTarget } from "@/lib/workspace";

export const Route = createFileRoute("/guide")({ component: GuidePage });

const STEPS = [
  {
    n: "01",
    t: "Unzip and point the CLI at your workspace",
    b: "Databricks CLI ≥ 0.250. Host goes in a CLI profile, never a committed token.",
  },
  {
    n: "02",
    t: "Replace the placeholder hosts and principal IDs",
    b: "databricks.yml uses fictional adb-*-helios hosts. Swap catalog names, warehouse IDs, and groups.",
  },
  {
    n: "03",
    t: "Validate from the repo root",
    b: "databricks bundle validate -t dev catches missing resource references before anything is created.",
  },
  {
    n: "04",
    t: "Deploy a personal dev copy",
    b: "databricks bundle deploy -t dev. Development mode prefixes names and pauses schedules.",
  },
  {
    n: "05",
    t: "Wire GitHub OIDC, then promote",
    b: "Federation policy for this repo. Protect the prod environment. feature → develop → staging → main.",
  },
];

export function GuidePage() {
  const target = useTarget();
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
        Deploy · currently previewing {target.id}
      </p>
      <h1 className="mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl">
        From zip to a running lakehouse
      </h1>
      <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted">
        The control room is a map of the bundle. The zip is the bundle. After
        you fill in workspace hosts it should validate with the Databricks CLI.
      </p>
      <a
        href={ZIP_HREF}
        download={ZIP_NAME}
        className="mt-6 inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-medium text-accent-fg"
      >
        Download helios-lakehouse-dab.zip
      </a>

      <ol className="mt-12 space-y-3">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)] sm:flex sm:gap-6"
          >
            <span className="font-mono text-xs text-brick">{s.n}</span>
            <div className="mt-2 sm:mt-0">
              <h2 className="text-[1.02rem] font-medium">{s.t}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.b}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-sm font-medium">Commands for {target.id}</h2>
        <pre className="mt-3 overflow-x-auto font-mono text-[0.8125rem] leading-relaxed text-fg-muted">
{`make test
databricks bundle validate -t ${target.id}
databricks bundle deploy -t ${target.id}
databricks bundle run medallion_orchestrator -t ${target.id}`}
        </pre>
      </section>
    </main>
  );
}
