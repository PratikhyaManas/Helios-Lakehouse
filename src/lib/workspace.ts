import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TARGETS } from "./bundle-catalog";
import { NIGHTLY_ORDER } from "./run-data";
import type { ScenarioId } from "./scenarios";
import type { SkuId, StoreId } from "./retail-data";

export type TargetId = (typeof TARGETS)[number]["id"];

type WorkspaceState = {
  target: TargetId;
  setTarget: (target: TargetId) => void;
  goldRows: number;
  bronzeRows: number;
  lastNightly: string | null;
  nightlyCursor: number | null;
  nightlyLog: string[];
  startNightly: () => void;
  stopNightly: () => void;
  tickNightly: () => void;
  scenario: ScenarioId;
  setScenario: (scenario: ScenarioId) => void;
  shocked: boolean;
  injectShock: () => void;
  clearShock: () => void;
  champion: number;
  focusStore: StoreId;
  focusSku: SkuId;
  setFocus: (store: StoreId, sku: SkuId) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

const BASE_GOLD = 612_440;
const BASE_BRONZE = 4_812_330;

export const useWorkspace = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      target: "dev",
      setTarget: (target) => set({ target }),
      goldRows: BASE_GOLD,
      bronzeRows: BASE_BRONZE,
      lastNightly: null,
      nightlyCursor: null,
      nightlyLog: [],
      startNightly: () => {
        const { target } = get();
        set({
          nightlyCursor: 0,
          nightlyLog: [`$ databricks bundle run medallion_orchestrator -t ${target}`],
        });
      },
      stopNightly: () => set({ nightlyCursor: null }),
      tickNightly: () => {
        const { nightlyCursor, target, goldRows, bronzeRows, nightlyLog } = get();
        if (nightlyCursor === null) return;
        const catalog = TARGETS.find((t) => t.id === target)?.catalog ?? "helios_dev";
        if (nightlyCursor >= NIGHTLY_ORDER.length) {
          set({
            nightlyCursor: null,
            lastNightly: new Date().toISOString(),
            goldRows: goldRows + 18_402,
            bronzeRows: bronzeRows + 22_110,
            nightlyLog: [...nightlyLog, "orchestrator complete · features refreshed"],
          });
          return;
        }
        const id = NIGHTLY_ORDER[nightlyCursor];
        set({
          nightlyCursor: nightlyCursor + 1,
          nightlyLog: [...nightlyLog, `refresh ${id} on ${catalog}`],
        });
      },
      scenario: "calm",
      setScenario: (scenario) => set({ scenario, shocked: scenario !== "calm" }),
      shocked: false,
      injectShock: () => set({ scenario: "labor", shocked: true }),
      clearShock: () =>
        set((s) => ({
          shocked: false,
          scenario: "calm",
          champion: s.champion + 1,
        })),
      champion: 7,
      focusStore: "0142",
      focusSku: "SKU-ESPR-12",
      setFocus: (focusStore, focusSku) => set({ focusStore, focusSku }),
      paletteOpen: false,
      setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
    }),
    {
      name: "helios-workspace",
      partialize: (s) => ({
        target: s.target,
        champion: s.champion,
        goldRows: s.goldRows,
        bronzeRows: s.bronzeRows,
        scenario: s.scenario,
      }),
    },
  ),
);

export function useTarget() {
  const id = useWorkspace((s) => s.target);
  const meta = TARGETS.find((t) => t.id === id) ?? TARGETS[0];
  return meta;
}

export function jobName(base: string, target: TargetId) {
  if (target === "dev") return `[dev you] ${base}`;
  return `[${target}] ${base}`;
}

export function pipelineName(layer: string, target: TargetId) {
  const raw = `helios-${layer}-${target}`;
  return target === "dev" ? `[dev you] ${raw}` : raw;
}
