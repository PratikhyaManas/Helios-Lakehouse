import { useMemo, useState } from "react";
import { goldSlice, STORES, type StoreId } from "@/lib/retail-data";
import { useWorkspace } from "@/lib/workspace";

export function GoldTable() {
  const goldRows = useWorkspace((s) => s.goldRows);
  const lastNightly = useWorkspace((s) => s.lastNightly);
  const focusStore = useWorkspace((s) => s.focusStore);
  const [store, setStore] = useState<StoreId | "all">("all");
  const rows = useMemo(() => goldSlice(), []);
  const filtered = store === "all" ? rows : rows.filter((r) => r.store_id === store);
  const shown = filtered.slice(0, 12);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.02em]">gold.sales_daily</h2>
          <p className="mt-1 text-sm text-fg-muted">
            <span className="font-mono tabular-nums text-fg">{goldRows.toLocaleString()}</span>{" "}
            rows in Unity Catalog
            {lastNightly
              ? ` · last append ${new Date(lastNightly).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : " · run nightly to append"}
          </p>
        </div>
        <label className="text-sm">
          <span className="sr-only">Filter store</span>
          <select
            value={store}
            onChange={(e) => setStore(e.target.value as StoreId | "all")}
            className="h-11 rounded-[var(--radius-sm)] bg-bg-subtle px-3 font-mono text-sm text-fg shadow-[var(--shadow-border)]"
          >
            <option value="all">all stores</option>
            {STORES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 overflow-x-auto rounded-[var(--radius-lg)] shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-bg-subtle font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase">
            <tr>
              <th className="px-3 py-2.5 font-medium">date</th>
              <th className="px-3 py-2.5 font-medium">store</th>
              <th className="px-3 py-2.5 font-medium">sku</th>
              <th className="px-3 py-2.5 font-medium">channel</th>
              <th className="px-3 py-2.5 font-medium text-right">units</th>
              <th className="px-3 py-2.5 font-medium text-right">net_sales</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr
                key={`${r.date}-${r.store_id}-${r.sku}`}
                className={
                  r.store_id === focusStore
                    ? "border-t border-border bg-bg-hover"
                    : "border-t border-border bg-bg-elevated"
                }
              >
                <td className="px-3 py-2 font-mono text-[0.75rem] tabular-nums">{r.date}</td>
                <td className="px-3 py-2 font-mono text-[0.75rem]">{r.store_id}</td>
                <td className="px-3 py-2 font-mono text-[0.75rem]">{r.sku}</td>
                <td className="px-3 py-2 text-fg-muted">{r.channel}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">{r.units}</td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">
                  {r.net_sales.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
