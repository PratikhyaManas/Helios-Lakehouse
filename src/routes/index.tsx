import { createFileRoute, Link } from "@tanstack/react-router";
import { ZIP_HREF, ZIP_NAME, TARGETS } from "@/lib/bundle-catalog";
import { Dag } from "@/components/dag";
import { Floor } from "@/components/floor";
import { GoldTable } from "@/components/gold-table";
import { RunBoard } from "@/components/run-board";
import { SCENARIOS } from "@/lib/scenarios";
import { useTarget, useWorkspace } from "@/lib/workspace";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const target = useTarget();
  const scenario = useWorkspace((s) => s.scenario);
  const scene = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];

  return (
    <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brick uppercase">
            Helios Retail · {target.id}
          </p>
          <h1 className="mt-1 max-w-xl text-[1.65rem] font-medium tracking-[-0.03em] sm:text-[2rem]">
            {scene.name}
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-muted">{scene.blurb}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/score"
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-bg-subtle px-4 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
          >
            Score
          </Link>
          <a
            href={ZIP_HREF}
            download={ZIP_NAME}
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-medium text-accent-fg"
          >
            Zip
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <Floor compact />
        <RunBoard />
      </div>

      <Dag />
      <GoldTable />

      <section className="mt-16">
        <h2 className="text-xl font-medium tracking-[-0.02em]">Targets in this bundle</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {TARGETS.map((t) => {
            const on = t.id === target.id;
            return (
              <li
                key={t.id}
                className={
                  on
                    ? "rounded-[var(--radius-lg)] bg-bg-hover p-5 shadow-[var(--shadow-border)]"
                    : "rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]"
                }
              >
                <p className="font-mono text-sm">{t.id}</p>
                <p className="mt-1 font-mono text-[0.75rem] text-fg-subtle">{t.catalog}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.note}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
