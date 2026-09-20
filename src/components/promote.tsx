import { useEffect, useMemo, useState } from "react";
import { Play, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PIPELINE_STEPS } from "@/lib/bundle-catalog";
import { PROMOTE_SCRIPT } from "@/lib/run-data";
import { cn } from "@/lib/utils";

export function Promote() {
  const [line, setLine] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);

  const current = line === null ? -1 : (PROMOTE_SCRIPT[Math.min(line, PROMOTE_SCRIPT.length - 1)]?.step ?? -1);

  useEffect(() => {
    if (line === null) return;
    if (line >= PROMOTE_SCRIPT.length) return;
    const row = PROMOTE_SCRIPT[line];
    if (row && row.step === 3 && row.line.includes("waiting") && !waiting) {
      setWaiting(true);
      return;
    }
    if (waiting) return;
    const t = window.setTimeout(() => setLine((n) => (n === null ? n : n + 1)), 420);
    return () => window.clearTimeout(t);
  }, [line, waiting]);

  const visible = useMemo(() => {
    if (line === null) return [];
    return PROMOTE_SCRIPT.slice(0, Math.min(line + 1, PROMOTE_SCRIPT.length));
  }, [line]);

  const done = line !== null && line >= PROMOTE_SCRIPT.length - 1 && !waiting;

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.02em]">Replay a promotion</h2>
          <p className="mt-1 max-w-xl text-sm text-fg-muted">
            Same four workflows as the zip. Prod stops for the environment gate —
            you are the reviewer.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {waiting && (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setWaiting(false);
                setLine((n) => (n === null ? 0 : n + 1));
              }}
            >
              <ShieldCheck className="size-3.5" strokeWidth={1.75} />
              Approve prod
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              setWaiting(false);
              setLine(0);
            }}
          >
            <Play className="size-3.5" strokeWidth={1.75} />
            {line === null || done ? "Replay" : "Restart"}
          </Button>
        </div>
      </div>

      <ol className="mt-6 grid gap-2 sm:grid-cols-4">
        {PIPELINE_STEPS.map((step, i) => (
          <li
            key={step.id}
            className={cn(
              "rounded-[var(--radius-md)] px-3 py-3 shadow-[var(--shadow-border)]",
              i === current ? "bg-bg-hover" : "bg-bg-elevated",
            )}
          >
            <span className="font-mono text-[0.625rem] text-fg-subtle">
              {String(i + 1).padStart(2, "0")} · {step.env}
            </span>
            <p className="mt-1 text-sm font-medium">{step.title}</p>
          </li>
        ))}
      </ol>

      <pre className="mt-4 max-h-64 overflow-auto rounded-[var(--radius-lg)] bg-bg-elevated p-4 font-mono text-[0.75rem] leading-relaxed text-fg-muted shadow-[var(--shadow-border)]">
        {visible.length === 0
          ? "# git push origin feature/demand-gate\n# waiting for ci-validate.yml"
          : visible.map((row, i) => (
              <span key={`${row.line}-${i}`} className={row.ok ? "block" : "block text-warn"}>
                {row.line}
              </span>
            ))}
        {done && <span className="mt-2 block text-ok">deploy-prod.yml finished</span>}
      </pre>
    </section>
  );
}
