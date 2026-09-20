import { useEffect } from "react";
import { useWorkspace } from "@/lib/workspace";
import { NIGHTLY_ORDER } from "@/lib/run-data";

export function NightlyTicker() {
  const cursor = useWorkspace((s) => s.nightlyCursor);
  const tick = useWorkspace((s) => s.tickNightly);

  useEffect(() => {
    if (cursor === null) return;
    const delay = cursor === 0 ? 120 : cursor >= NIGHTLY_ORDER.length ? 400 : 680;
    const t = window.setTimeout(tick, delay);
    return () => window.clearTimeout(t);
  }, [cursor, tick]);

  return null;
}
