import { createFileRoute } from "@tanstack/react-router";
import { ForecastPad } from "@/components/forecast-pad";
import { SKUS, STORES, type SkuId, type StoreId } from "@/lib/retail-data";
import { useTarget } from "@/lib/workspace";

type Search = { store?: StoreId; sku?: SkuId };

function isStore(v: unknown): v is StoreId {
  return typeof v === "string" && STORES.some((s) => s.id === v);
}
function isSku(v: unknown): v is SkuId {
  return typeof v === "string" && SKUS.some((s) => s.id === v);
}

export const Route = createFileRoute("/score")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    store: isStore(raw.store) ? raw.store : undefined,
    sku: isSku(raw.sku) ? raw.sku : undefined,
  }),
  component: ScorePage,
});

function ScorePage() {
  const target = useTarget();
  const { store, sku } = Route.useSearch();
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
        resources/ml/serving_endpoint.yml · {target.id}
      </p>
      <h1 className="mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl">
        Demand serving, as the job graph leaves it
      </h1>
      <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted">
        Features come from the same functions the batch job uses. Scenarios on
        the floor warp observed demand — the model still scores the calm
        features unless you retrain.
      </p>
      <div className="mt-8">
        <ForecastPad initialStore={store} initialSku={sku} />
      </div>
    </main>
  );
}
