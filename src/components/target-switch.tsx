import { TARGETS } from "@/lib/bundle-catalog";
import { useWorkspace, type TargetId } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export function TargetSwitch({ compact = false }: { compact?: boolean }) {
  const target = useWorkspace((s) => s.target);
  const setTarget = useWorkspace((s) => s.setTarget);

  return (
    <div
      role="radiogroup"
      aria-label="Bundle target"
      className={cn(
        "inline-flex rounded-[var(--radius-sm)] bg-bg-subtle p-0.5 shadow-[var(--shadow-border)]",
        compact ? "" : "w-full sm:w-auto",
      )}
    >
      {TARGETS.map((t) => {
        const on = t.id === target;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setTarget(t.id as TargetId)}
            className={cn(
              "min-h-9 min-w-11 rounded-[calc(var(--radius-sm)-2px)] px-3 font-mono text-xs transition-colors duration-150",
              on ? "bg-bg-elevated text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {t.id}
          </button>
        );
      })}
    </div>
  );
}
