import { useEffect, useState } from "react";
import { SCENARIOS, wapeFor } from "@/lib/scenarios";
import { NIGHTLY_ORDER } from "@/lib/run-data";
import { useWorkspace } from "@/lib/workspace";

function etClock(now: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
}

function nextNightlyLabel(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const mins = hour * 60 + minute;
  const target = 2 * 60 + 15;
  let delta = target - mins;
  if (delta <= 0) delta += 24 * 60;
  const h = Math.floor(delta / 60);
  const m = delta % 60;
  return `${h}h ${String(m).padStart(2, "0")}m to 02:15`;
}

export function StatusRail() {
  const [now, setNow] = useState(() => new Date());
  const scenario = useWorkspace((s) => s.scenario);
  const cursor = useWorkspace((s) => s.nightlyCursor);
  const meta = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0];
  const wape = wapeFor(scenario);
  const running =
    cursor !== null && cursor < NIGHTLY_ORDER.length
      ? NIGHTLY_ORDER[cursor]
      : cursor !== null
        ? "wrap"
        : null;

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="border-b border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 overflow-x-auto px-4 py-1.5 font-mono text-[0.6875rem] tracking-wide text-fg-subtle sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5 text-fg">
          <span className="helios-live size-1.5 rounded-full bg-ok" />
          {etClock(now)} ET
        </span>
        <span className="shrink-0">{nextNightlyLabel(now)}</span>
        <span className="shrink-0 text-fg">{meta.name}</span>
        <span className={wape > 0.22 ? "shrink-0 text-brick" : "shrink-0"}>
          WAPE {wape.toFixed(2)}
        </span>
        {running && (
          <span className="shrink-0 text-ok">running {running}</span>
        )}
      </div>
    </div>
  );
}
