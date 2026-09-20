import { createFileRoute, Link } from "@tanstack/react-router";
import { RESOURCES } from "@/lib/bundle-catalog";
import { jobName, pipelineName, useTarget } from "@/lib/workspace";

export const Route = createFileRoute("/resources")({ component: ResourcesPage });

const KINDS = ["Pipeline", "Job", "Experiment", "Registered model", "Serving"] as const;

function liveName(kind: string, name: string, targetId: "dev" | "staging" | "prod") {
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

  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
        resources/*.yml · {target.id}
      </p>
      <h1 className="mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl">
        What this target would create
      </h1>
      <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted">
        Names, catalogs, and pause status interpolate from the header target.
        Serving is declared in every bundle; traffic only exists in prod.
      </p>

      {KINDS.map((kind) => {
        const items = RESOURCES.filter((r) => r.kind === kind);
        if (!items.length) return null;
        return (
          <section key={kind} className="mt-10">
            <h2 className="text-sm font-medium tracking-wide text-fg-muted uppercase">
              {kind}
              {items.length > 1 ? "s" : ""}
            </h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {items.map((r) => (
                <li
                  key={r.id}
                  className="rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="truncate font-mono text-sm">
                      {liveName(r.kind, r.name, target.id)}
                    </h3>
                    <span className="shrink-0 rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-fg-subtle">
                      {r.layer}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.blurb}</p>
                  {r.kind === "Serving" && target.id !== "prod" && (
                    <p className="mt-2 font-mono text-[0.6875rem] text-warn">
                      declared · no traffic on {target.id}
                    </p>
                  )}
                  {r.kind === "Job" && (
                    <p className="mt-2 font-mono text-[0.6875rem] text-fg-subtle">
                      schedule {target.schedules.toLowerCase()}
                    </p>
                  )}
                  <Link
                    to="/files"
                    search={{ path: r.file }}
                    className="mt-3 inline-block font-mono text-[0.75rem] text-fg hover:underline"
                  >
                    {r.file}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
