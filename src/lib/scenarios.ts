export const SCENARIOS = [
  {
    id: "calm",
    name: "Tuesday quiet",
    blurb: "Baseline week. Gate holds. Nightly is a formality.",
  },
  {
    id: "heat",
    name: "Southern heat",
    blurb: "Espresso and oat milk spike in the South. Jackets go unsold.",
  },
  {
    id: "viral",
    name: "Selvedge goes viral",
    blurb: "SKU-DENM-01 clears racks. Censored demand, WAPE breaks the gate.",
  },
  {
    id: "labor",
    name: "Labor Day weekend",
    blurb: "Every channel is loud. The 02:15 job has not caught up.",
  },
  {
    id: "storm",
    name: "Nor'easter",
    blurb: "Northeast dark for nine hours. Recency stretches; South is fine.",
  },
] as const;

export type ScenarioId = (typeof SCENARIOS)[number]["id"];

export function demandMultiplier(
  region: string,
  dept: string,
  skuId: string,
  scenario: ScenarioId,
): number {
  switch (scenario) {
    case "calm":
      return 1;
    case "heat":
      if (region === "South" && dept === "grocery") return 1.9;
      if (dept === "apparel" || dept === "footwear") return 0.72;
      return 1.08;
    case "viral":
      if (skuId === "SKU-DENM-01") return region === "West" || region === "Northeast" ? 2.8 : 1.9;
      return 0.94;
    case "labor":
      return dept === "grocery" ? 1.7 : 1.45;
    case "storm":
      if (region === "Northeast") return 0.32;
      if (region === "Midwest") return 0.78;
      return 1.12;
    default:
      return 1;
  }
}

export function wapeFor(scenario: ScenarioId, base = 0.17): number {
  const bump: Record<ScenarioId, number> = {
    calm: 0,
    heat: 0.05,
    viral: 0.12,
    labor: 0.14,
    storm: 0.07,
  };
  return Math.round((base + bump[scenario]) * 100) / 100;
}
