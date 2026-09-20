import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  SKUS,
  STORES,
  featuresFor,
  forecastWeek,
  observedUnits,
  type SkuId,
  type StoreId,
} from "@/lib/retail-data";
import { demandMultiplier } from "@/lib/scenarios";
import { useTarget, useWorkspace } from "@/lib/workspace";

export function ForecastPad({
  initialStore,
  initialSku,
}: {
  initialStore?: StoreId;
  initialSku?: SkuId;
}) {
  const target = useTarget();
  const champion = useWorkspace((s) => s.champion);
  const scenario = useWorkspace((s) => s.scenario);
  const focusStore = useWorkspace((s) => s.focusStore);
  const focusSku = useWorkspace((s) => s.focusSku);
  const setFocus = useWorkspace((s) => s.setFocus);
  const [store, setStore] = useState<StoreId>(initialStore ?? focusStore);
  const [sku, setSku] = useState<SkuId>(initialSku ?? focusSku);
  const [calling, setCalling] = useState(false);
  const [payload, setPayload] = useState<string | null>(null);

  useEffect(() => {
    if (initialStore) setStore(initialStore);
    if (initialSku) setSku(initialSku);
  }, [initialStore, initialSku]);

  const storeMeta = STORES.find((s) => s.id === store) ?? STORES[0];
  const skuMeta = SKUS.find((s) => s.id === sku) ?? SKUS[0];
  const feat = useMemo(() => featuresFor(store, sku), [store, sku]);
  const mult = demandMultiplier(storeMeta.region, skuMeta.dept, skuMeta.id, scenario);
  const weeks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      week: `W${String(i + 1).padStart(2, "0")}`,
      model: forecastWeek(feat, i),
      observed: i === 0 ? observedUnits(store, sku, mult) : null,
    }));
  }, [feat, mult, sku, store]);
  const total = weeks.reduce((s, w) => s + w.model, 0);

  function callEndpoint() {
    setCalling(true);
    setFocus(store, sku);
    window.setTimeout(() => {
      const body = {
        endpoint: `helios-demand-${target.id}`,
        alias: target.id === "prod" ? `Champion@v${champion}` : "Challenger",
        scenario,
        dataframe_split: {
          columns: ["recency_days", "units_l7", "units_l28", "on_hand"],
          data: [[feat.recency_days, feat.units_l7, feat.units_l28, feat.on_hand]],
        },
        predictions: weeks.map((w) => w.model),
        last_week_observed: observedUnits(store, sku, mult),
        latency_ms: 180 + (feat.recency_days % 40),
      };
      setPayload(JSON.stringify(body, null, 2));
      setCalling(false);
    }, 420);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-fg-subtle uppercase">
          Serving · {target.id}
        </p>
        <h2 className="mt-1 text-lg font-medium tracking-[-0.02em]">Score a store-SKU</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Same features the batch job writes. The endpoint is declared in every
          target; traffic only exists in prod.
        </p>
        <label className="mt-4 block text-sm">
          <span className="font-mono text-[0.6875rem] text-fg-subtle">store_id</span>
          <select
            value={store}
            onChange={(e) => setStore(e.target.value as StoreId)}
            className="mt-1 h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]"
          >
            {STORES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} · {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-sm">
          <span className="font-mono text-[0.6875rem] text-fg-subtle">sku</span>
          <select
            value={sku}
            onChange={(e) => setSku(e.target.value as SkuId)}
            className="mt-1 h-11 w-full rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]"
          >
            {SKUS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} · {s.name}
              </option>
            ))}
          </select>
        </label>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {(
            [
              ["recency_days", feat.recency_days],
              ["units_l7", feat.units_l7],
              ["units_l28", feat.units_l28],
              ["on_hand", feat.on_hand],
            ] as const
          ).map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[0.625rem] text-fg-subtle">{k}</dt>
              <dd className="font-mono text-sm tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        {feat.censored && (
          <p className="mt-2 font-mono text-[0.6875rem] text-warn">
            censored demand · on_hand low
          </p>
        )}
        <Button
          type="button"
          className="mt-5 w-full"
          disabled={calling}
          onClick={callEndpoint}
        >
          {calling ? "Scoring…" : "Call serving endpoint"}
        </Button>
        {target.id !== "prod" && (
          <p className="mt-2 font-mono text-[0.6875rem] text-warn">
            declared · no traffic on {target.id} — response is simulated
          </p>
        )}
      </div>
      <div className="rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-sm font-medium">
              {skuMeta.name} · {storeMeta.name}
            </p>
            <p className="mt-0.5 font-mono text-[0.6875rem] text-fg-subtle">
              next 12 weeks · {total} model units
            </p>
          </div>
          <p className="font-mono text-[0.6875rem] text-fg-subtle">
            {target.id === "prod" ? `Champion v${champion}` : "Challenger"}
          </p>
        </div>
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeks} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
              <XAxis
                dataKey="week"
                tick={{ fill: "var(--color-fg-subtle)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-fg-subtle)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: "var(--color-bg-hover)" }}
                contentStyle={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-fg)",
                }}
              />
              <Bar dataKey="model" fill="var(--color-ok)" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <pre className="mt-4 max-h-44 overflow-auto font-mono text-[0.6875rem] leading-relaxed text-fg-muted">
          {payload ?? "# POST /serving-endpoints/helios-demand/invocations\n# waiting for a call"}
        </pre>
      </div>
    </div>
  );
}
