export const STORES = [
  { id: "0142", name: "Brooklyn Atlantic", region: "Northeast" },
  { id: "1088", name: "Chicago River", region: "Midwest" },
  { id: "2201", name: "Austin Domain", region: "South" },
  { id: "3310", name: "Seattle Pike", region: "West" },
  { id: "4402", name: "Miami Brickell", region: "South" },
  { id: "5519", name: "Denver RiNo", region: "West" },
  { id: "6620", name: "Boston Seaport", region: "Northeast" },
  { id: "7704", name: "SF Fillmore", region: "West" },
] as const;

export const SKUS = [
  { id: "SKU-ESPR-12", name: "Helios espresso 12oz", dept: "grocery" },
  { id: "SKU-OAT-32", name: "Oat milk 32oz", dept: "grocery" },
  { id: "SKU-DENM-01", name: "Selvedge jacket", dept: "apparel" },
  { id: "SKU-RUN-08", name: "Trail runner", dept: "footwear" },
  { id: "SKU-LED-4P", name: "LED bulb 4-pack", dept: "home" },
  { id: "SKU-TOWEL-B", name: "Turkish bath towel", dept: "home" },
] as const;

export type StoreId = (typeof STORES)[number]["id"];
export type SkuId = (typeof SKUS)[number]["id"];

export type Features = {
  recency_days: number;
  units_l7: number;
  units_l28: number;
  on_hand: number;
  censored: boolean;
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function featuresFor(store: StoreId, sku: SkuId): Features {
  const h = hash(`${store}:${sku}`);
  const onHand = 6 + (h % 90);
  return {
    recency_days: 1 + (h % 14),
    units_l7: 6 + (h % 48),
    units_l28: 28 + (h % 180),
    on_hand: onHand,
    censored: onHand < 8,
  };
}

export function observedUnits(
  store: StoreId,
  sku: SkuId,
  multiplier: number,
): number {
  const feat = featuresFor(store, sku);
  return Math.max(0, Math.round(feat.units_l7 * multiplier));
}

export function forecastWeek(feat: Features, week: number): number {
  const seasonal = 1 + 0.1 * Math.sin((week / 12) * Math.PI * 2);
  const base = 0.52 * feat.units_l7 + 0.12 * (feat.units_l28 / 4);
  const stock = feat.censored ? 0.72 : 1;
  return Math.max(0, Math.round((base * seasonal + ((week * 3) % 5) - 1) * stock));
}

export function horizon(store: StoreId, sku: SkuId, weeks = 12) {
  const feat = featuresFor(store, sku);
  return Array.from({ length: weeks }, (_, i) => ({
    week: `W${String(i + 1).padStart(2, "0")}`,
    units: forecastWeek(feat, i),
  }));
}

export type GoldRow = {
  date: string;
  store_id: StoreId;
  store: string;
  sku: SkuId;
  sku_name: string;
  channel: "pos" | "ecom";
  units: number;
  net_sales: number;
};

const DAY_MS = 86_400_000;

export function goldSlice(asOf = new Date(), days = 5): GoldRow[] {
  const rows: GoldRow[] = [];
  for (let d = days - 1; d >= 0; d -= 1) {
    const date = new Date(asOf.getTime() - d * DAY_MS).toISOString().slice(0, 10);
    for (const store of STORES) {
      for (const sku of SKUS) {
        const h = hash(`${date}:${store.id}:${sku.id}`);
        if (h % 5 === 0) continue;
        const units = 2 + (h % 18);
        const price = 8 + (h % 40);
        rows.push({
          date,
          store_id: store.id,
          store: store.name,
          sku: sku.id,
          sku_name: sku.name,
          channel: h % 7 === 0 ? "ecom" : "pos",
          units,
          net_sales: units * price,
        });
      }
    }
  }
  return rows;
}

export const SERVING_PATH = "helios-demand-prod";
