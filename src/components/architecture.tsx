const LAYERS = [
  {
    id: "landing",
    label: "Landing",
    items: ["POS JSON", "eCom events", "Inventory", "CRM extract"],
  },
  {
    id: "bronze",
    label: "Bronze pipeline",
    items: ["pos_raw", "ecom_raw", "inventory_raw", "customers_raw"],
  },
  {
    id: "silver",
    label: "Silver pipeline",
    items: ["transactions", "customers_scd2", "products", "inventory_daily"],
  },
  {
    id: "gold",
    label: "Gold pipeline",
    items: ["sales_daily", "customer_360", "store_perf"],
  },
  {
    id: "ml",
    label: "ML jobs",
    items: ["features", "train + gate", "batch infer", "monitor"],
  },
];

export function Architecture() {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-medium tracking-[-0.02em]">The graph this repo deploys</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
        One orchestrator job sequences the three Lakeflow pipelines, then the
        feature job. Training, scoring, and monitoring are separate scheduled
        jobs that read the same Unity Catalog tables.
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {LAYERS.map((layer, i) => (
          <li
            key={layer.id}
            className="relative rounded-[var(--radius-lg)] bg-bg-elevated p-4 shadow-[var(--shadow-border)]"
          >
            <span className="font-mono text-[0.625rem] tabular-nums text-fg-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 text-sm font-medium">{layer.label}</h3>
            <ul className="mt-3 space-y-1.5">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[var(--radius-xs)] bg-bg-subtle px-2 py-1.5 font-mono text-[0.6875rem] text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
