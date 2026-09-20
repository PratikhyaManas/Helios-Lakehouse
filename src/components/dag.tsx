import { Link } from "@tanstack/react-router";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DAG_NODES, NIGHTLY_ORDER } from "@/lib/run-data";
import { jobName, pipelineName, useTarget, useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";
import { useState } from "react";

function displayName(id: string, label: string, target: ReturnType<typeof useTarget>) {
  if (id === "bronze" || id === "silver" || id === "gold") {
    return pipelineName(id === "gold" ? "gold" : id, target.id);
  }
  return jobName(label, target.id);
}

export function Dag() {
  const target = useTarget();
  const [active, setActive] = useState<string>("bronze");
  const cursor = useWorkspace((s) => s.nightlyCursor);
  const log = useWorkspace((s) => s.nightlyLog);
  const start = useWorkspace((s) => s.startNightly);
  const stop = useWorkspace((s) => s.stopNightly);
  const bronzeRows = useWorkspace((s) => s.bronzeRows);
  const goldRows = useWorkspace((s) => s.goldRows);

  const running = cursor !== null;
  const litId =
    cursor === null
      ? null
      : cursor >= NIGHTLY_ORDER.length
        ? null
        : NIGHTLY_ORDER[cursor];
  const selected = DAG_NODES.find((n) => n.id === active) ?? DAG_NODES[1];

  const counts: Record<string, string> = {
    bronze: bronzeRows.toLocaleString(),
    silver: Math.round(bronzeRows * 0.87).toLocaleString(),
    gold: goldRows.toLocaleString(),
    feat: Math.round(goldRows * 2.1).toLocaleString(),
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.02em]">Nightly graph</h2>
          <p className="mt-1 max-w-xl text-sm text-fg-muted">
            Orchestrator sequence against{" "}
            <span className="font-mono text-fg">{target.catalog}</span>. Rows move
            when the run completes.
          </p>
        </div>
        <Button
          type="button"
          variant={running ? "secondary" : "primary"}
          size="sm"
          onClick={() => (running ? stop() : start())}
        >
          {running ? <Square className="size-3.5" strokeWidth={1.75} /> : <Play className="size-3.5" strokeWidth={1.75} />}
          {running ? "Stop" : "Run nightly"}
        </Button>
      </div>

      <ol className="mt-5 flex gap-1" aria-label="Nightly sequence">
        {NIGHTLY_ORDER.map((id, i) => {
          const node = DAG_NODES.find((n) => n.id === id);
          const done = running && cursor !== null && i < cursor;
          const lit = litId === id;
          return (
            <li key={id} className="min-w-0 flex-1">
              <div
                className={cn(
                  "h-1 rounded-full",
                  lit ? "bg-ok" : done ? "bg-ok/50" : "bg-bg-subtle",
                )}
              />
              <p className="mt-1 truncate font-mono text-[0.625rem] text-fg-subtle">
                {node?.label}
              </p>
            </li>
          );
        })}
      </ol>

      <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {DAG_NODES.map((node) => {
          const on = node.id === selected.id;
          const lit = litId === node.id;
          const orderIdx = (NIGHTLY_ORDER as readonly string[]).indexOf(node.id);
          const done = running && orderIdx >= 0 && cursor !== null && orderIdx < cursor;
          return (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => setActive(node.id)}
                className={cn(
                  "flex min-h-20 w-full flex-col items-start rounded-[var(--radius-md)] px-3 py-3 text-left shadow-[var(--shadow-border)] transition-colors duration-150",
                  on ? "bg-bg-hover" : "bg-bg-elevated hover:bg-bg-subtle",
                  lit && "ring-1 ring-ok/70",
                  done && "opacity-80",
                )}
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
                    {node.kind}
                  </span>
                  {counts[node.id] && (
                    <span className="font-mono text-[0.625rem] tabular-nums text-fg-subtle">
                      {counts[node.id]}
                    </span>
                  )}
                </span>
                <span className="mt-1 truncate font-mono text-[0.75rem] text-fg">
                  {displayName(node.id, node.label, target)}
                </span>
                <span className="mt-1 text-[0.6875rem] text-fg-muted">{node.note}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[0.6875rem] text-fg-subtle">{selected.kind}</p>
          <h3 className="mt-1 font-mono text-sm">{selected.label}</h3>
          <p className="mt-2 text-sm text-fg-muted">{selected.note}</p>
          <Link
            to="/files"
            search={{ path: selected.file }}
            className="mt-3 inline-block font-mono text-[0.75rem] text-fg underline-offset-2 hover:underline"
          >
            {selected.file}
          </Link>
        </div>
        <pre className="max-h-40 overflow-auto rounded-[var(--radius-lg)] bg-bg-elevated p-4 font-mono text-[0.6875rem] leading-relaxed text-fg-muted shadow-[var(--shadow-border)]">
          {log.length === 0
            ? `# idle · ${target.id} · ${target.schedules.toLowerCase()}`
            : log.join("\n")}
        </pre>
      </div>
    </section>
  );
}
