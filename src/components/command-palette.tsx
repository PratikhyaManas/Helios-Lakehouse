import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useWorkspace, type TargetId } from "@/lib/workspace";
import { ZIP_HREF, ZIP_NAME } from "@/lib/bundle-catalog";
import { cn } from "@/lib/utils";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

export function CommandPalette() {
  const open = useWorkspace((s) => s.paletteOpen);
  const setOpen = useWorkspace((s) => s.setPaletteOpen);
  const setTarget = useWorkspace((s) => s.setTarget);
  const startNightly = useWorkspace((s) => s.startNightly);
  const injectShock = useWorkspace((s) => s.injectShock);
  const setScenario = useWorkspace((s) => s.setScenario);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);

  const cmds: Cmd[] = useMemo(
    () => [
      {
        id: "nightly",
        label: "Run nightly orchestrator",
        hint: "bronze → gold → features",
        run: () => {
          startNightly();
          void navigate({ to: "/" });
        },
      },
      {
        id: "score",
        label: "Score a store-SKU",
        hint: "model serving",
        run: () => void navigate({ to: "/score" }),
      },
      {
        id: "cicd",
        label: "Replay promotion",
        hint: "CI/CD",
        run: () => void navigate({ to: "/cicd" }),
      },
      {
        id: "shock",
        label: "Labor Day weekend",
        hint: "demand shock",
        run: () => {
          injectShock();
          void navigate({ to: "/" });
        },
      },
      {
        id: "viral",
        label: "Selvedge goes viral",
        hint: "SKU-DENM-01",
        run: () => {
          setScenario("viral");
          void navigate({ to: "/" });
        },
      },
      {
        id: "prod",
        label: "Switch target to prod",
        hint: "helios_prod",
        run: () => setTarget("prod" as TargetId),
      },
      {
        id: "yml",
        label: "Open databricks.yml",
        hint: "bundle",
        run: () => void navigate({ to: "/files", search: { path: "databricks.yml" } }),
      },
      {
        id: "zip",
        label: "Download bundle zip",
        hint: ZIP_NAME,
        run: () => {
          const a = document.createElement("a");
          a.href = ZIP_HREF;
          a.download = ZIP_NAME;
          a.click();
        },
      },
    ],
    [injectShock, navigate, setScenario, setTarget, startNightly],
  );

  const filtered = cmds.filter(
    (c) =>
      !q ||
      c.label.toLowerCase().includes(q.toLowerCase()) ||
      c.hint.toLowerCase().includes(q.toLowerCase()),
  );
  const active = filtered[Math.min(hi, Math.max(filtered.length - 1, 0))];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setQ("");
      setHi(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)] bg-bg-elevated shadow-[var(--shadow-border-hover)]"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setHi(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHi((i) => Math.min(i + 1, filtered.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setHi((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter" && active) {
              setOpen(false);
              active.run();
            }
          }}
          placeholder="Run a command…"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-sm text-fg outline-none"
        />
        <ul className="max-h-72 overflow-auto py-1">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-fg-subtle">No matches</li>
          )}
          {filtered.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  c.run();
                }}
                className={cn(
                  "flex w-full items-baseline justify-between gap-3 px-4 py-2.5 text-left",
                  i === hi ? "bg-bg-hover" : "hover:bg-bg-subtle",
                )}
              >
                <span className="text-sm">{c.label}</span>
                <span className="font-mono text-[0.6875rem] text-fg-subtle">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
