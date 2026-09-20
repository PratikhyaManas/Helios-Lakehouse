import { Link } from "@tanstack/react-router";
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
import { useWorkspace } from "@/lib/workspace";
import { cn } from "@/lib/utils";

function cellTone(observed: number, predicted: number) {
  const denom = Math.max(predicted, 1);
  const ratio = observed / denom;
  if (ratio >= 1.45) return "hot";
  if (ratio <= 0.55) return "cold";
  return "ok";
}

export function Floor({ compact = false }: { compact?: boolean }) {
  const scenario = useWorkspace((s) => s.scenario);
  const focusStore = useWorkspace((s) => s.focusStore);
  const focusSku = useWorkspace((s) => s.focusSku);
  const setFocus = useWorkspace((s) => s.setFocus);

  const selectedStore = STORES.find((s) => s.id === focusStore) ?? STORES[0];
  const selectedSku = SKUS.find((s) => s.id === focusSku) ?? SKUS[0];
  const mult = demandMultiplier(
    selectedStore.region,
    selectedSku.dept,
    selectedSku.id,
    scenario,
  );
  const feat = featuresFor(selectedStore.id, selectedSku.id);
  const predicted = forecastWeek(feat, 0);
  const observed = observedUnits(selectedStore.id, selectedSku.id, mult);

  return (
    <section className={compact ? "" : "mt-10"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.02em]">The floor</h2>
          <p className="mt-1 max-w-xl text-sm text-fg-muted">
            Eight flagship stores × six SKUs. Color is observed last week versus
            the model. Tap a cell, then score it the way serving would.
          </p>
        </div>
        <p className="font-mono text-[0.6875rem] text-fg-subtle">
          brick = under-forecast · mute = over
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] bg-bg-elevated p-3 shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[640px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="px-1 py-1 text-left font-mono text-[0.625rem] font-medium text-fg-subtle">
                store
              </th>
              {SKUS.map((sku) => (
                <th
                  key={sku.id}
                  className="px-1 py-1 text-center font-mono text-[0.625rem] font-medium text-fg-subtle"
                >
                  {sku.id.replace("SKU-", "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STORES.map((store) => (
              <tr key={store.id}>
                <th className="whitespace-nowrap px-1 py-0.5 text-left font-mono text-[0.6875rem] font-normal text-fg-muted">
                  {store.id}
                  <span className="ml-2 hidden text-fg-subtle sm:inline">{store.name}</span>
                </th>
                {SKUS.map((sku) => {
                  const m = demandMultiplier(store.region, sku.dept, sku.id, scenario);
                  const f = featuresFor(store.id, sku.id);
                  const pred = Math.max(forecastWeek(f, 0), 1);
                  const obs = observedUnits(store.id, sku.id, m);
                  const tone = cellTone(obs, pred);
                  const on = store.id === focusStore && sku.id === focusSku;
                  return (
                    <td key={sku.id} className="p-0">
                      <button
                        type="button"
                        aria-label={`${store.name} ${sku.name}, ${obs} observed`}
                        onClick={() => setFocus(store.id as StoreId, sku.id as SkuId)}
                        className={cn(
                          "flex h-11 w-full min-w-11 items-center justify-center rounded-[var(--radius-xs)] font-mono text-[0.6875rem] tabular-nums transition-[background-color,box-shadow] duration-150",
                          tone === "hot" && "bg-brick text-fg",
                          tone === "cold" && "bg-bg-subtle text-fg-muted",
                          tone === "ok" && "bg-ok/25 text-fg",
                          on && "ring-1 ring-accent",
                        )}
                      >
                        {obs}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
        <div>
          <p className="text-sm font-medium">
            {selectedSku.name}
            <span className="text-fg-muted"> · {selectedStore.name}</span>
          </p>
          <p className="mt-0.5 font-mono text-[0.6875rem] text-fg-subtle">
            observed {observed} · model {predicted} · {selectedStore.region}
            {feat.censored ? " · censored" : ""}
          </p>
        </div>
        <Link
          to="/score"
          search={{ store: selectedStore.id, sku: selectedSku.id }}
          className="inline-flex h-11 items-center rounded-[var(--radius-sm)] bg-accent px-4 text-sm font-medium text-accent-fg"
        >
          Score this cell
        </Link>
      </div>
    </section>
  );
}
