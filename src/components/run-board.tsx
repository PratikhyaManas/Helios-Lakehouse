import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { WAPE_GATE, WAPE_SERIES } from "@/lib/run-data";
import { SCENARIOS, wapeFor, type ScenarioId } from "@/lib/scenarios";
import { useTarget, useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export function RunBoard() {
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
    v: i >= WAPE_SERIES.length - 3 ? last : p.v,
  }));
  const meta = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];

  return (
    <aside className="rounded-[var(--radius-xl)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">
          {target.catalog}
        </p>
        <span
          className={
            drifting
              ? "rounded-full bg-brick-dim px-2 py-0.5 font-mono text-[0.625rem] text-brick"
              : paused
                ? "rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-warn"
                : "rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[0.625rem] text-ok"
          }
        >
          {drifting ? "drift alert" : paused ? "schedules paused" : "schedules live"}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg-muted">{meta.blurb}</p>

      <div
        role="radiogroup"
        aria-label="Demand scenario"
        className="mt-4 flex flex-wrap gap-1.5"
      >
        {SCENARIOS.map((s) => {
          const on = s.id === scenario;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setScenario(s.id as ScenarioId)}
              className={cn(
                "h-9 rounded-full px-3 font-mono text-[0.6875rem] shadow-[var(--shadow-border)]",
                on ? "bg-bg-hover text-fg" : "bg-bg-subtle text-fg-muted hover:text-fg",
              )}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <dt className="font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
            Holdout WAPE
          </dt>
          <dd className={`mt-1 font-mono text-lg tabular-nums ${drifting ? "text-brick" : "text-ok"}`}>
            {last.toFixed(2)}
            <span className="ml-1 text-xs text-fg-subtle">/ {WAPE_GATE}</span>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
            Champion
          </dt>
          <dd className="mt-1 font-mono text-sm">
            {target.id === "prod" ? `v${champion} · serving` : "alias only"}
          </dd>
        </div>
      </dl>
      <p className="mt-4 font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
        Trailing WAPE
      </p>
      <div className="mt-1 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="d" hide />
            <Tooltip
              cursor={{ fill: "var(--color-bg-hover)" }}
              contentStyle={{
                background: "var(--color-bg-elevated)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-fg)",
              }}
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                return [Number.isFinite(n) ? n.toFixed(2) : String(value), "WAPE"];
              }}
            />
            <ReferenceLine y={WAPE_GATE} stroke="var(--color-warn)" strokeDasharray="3 3" />
            <Bar dataKey="v" fill="var(--color-ok)" radius={[2, 2, 0, 0]} opacity={0.55} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {drifting && (
        <Button type="button" size="sm" className="mt-3 w-full" onClick={clear}>
          Retrain and promote Champion
        </Button>
      )}
    </aside>
  );
}
