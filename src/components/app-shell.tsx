import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Command, Download, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZIP_HREF, ZIP_NAME } from "@/lib/bundle-catalog";
import { TargetSwitch } from "@/components/target-switch";
import { CommandPalette } from "@/components/command-palette";
import { NightlyTicker } from "@/components/nightly-ticker";
import { StatusRail } from "@/components/status-rail";
import { useWorkspace } from "@/lib/workspace";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/resources", label: "Resources" },
  { to: "/score", label: "Score" },
  { to: "/cicd", label: "CI/CD" },
  { to: "/files", label: "Files" },
  { to: "/guide", label: "Deploy" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setPalette = useWorkspace((s) => s.setPaletteOpen);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <NightlyTicker />
      <CommandPalette />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-sm)] focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-bg-subtle shadow-[var(--shadow-border)]">
              <Layers className="size-4 text-brick" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.8125rem] font-semibold tracking-[-0.02em]">
                <span className="sm:hidden">Helios</span>
                <span className="hidden sm:inline">Helios Lakehouse</span>
              </span>
              <span className="hidden font-mono text-[0.625rem] tracking-wide text-fg-subtle uppercase md:block">
                Control room
              </span>
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-0.5 lg:flex"
          >
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150",
                    active
                      ? "bg-bg-subtle text-fg"
                      : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto lg:ml-0">
            <TargetSwitch compact />
          </div>
          <button
            type="button"
            aria-label="Open commands"
            onClick={() => setPalette(true)}
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] text-fg-muted shadow-[var(--shadow-border)] hover:bg-bg-subtle hover:text-fg"
          >
            <Command className="size-4" strokeWidth={1.75} />
          </button>
          <a
            href={ZIP_HREF}
            download={ZIP_NAME}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-3.5 pr-3 text-sm font-medium text-accent-fg shadow-[var(--shadow-border)] transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <Download className="size-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Zip</span>
          </a>
        </div>
        <nav
          aria-label="Mobile"
          className="flex gap-0.5 overflow-x-auto border-t border-border px-2 py-1 lg:hidden"
        >
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm",
                  active ? "bg-bg-subtle text-fg" : "text-fg-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <StatusRail />
      <div id="main">{children}</div>
    </div>
  );
}
