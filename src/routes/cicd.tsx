import { createFileRoute, Link } from "@tanstack/react-router";
import { Promote } from "@/components/promote";

export const Route = createFileRoute("/cicd")({ component: CicdPage });

function CicdPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-fg-subtle uppercase">
        .github/workflows
      </p>
      <h1 className="mt-2 text-[1.75rem] font-medium tracking-[-0.03em] sm:text-3xl">
        Promotion is a merge, not a click
      </h1>
      <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-fg-muted">
        Four GitHub Actions workflows, OIDC only. Prod cannot deploy until two
        platform admins approve the environment. Press Replay and be one of them.
      </p>

      <Promote />

      <section className="mt-12">
        <h2 className="text-xl font-medium tracking-[-0.02em]">Auth model</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              t: "GitHub OIDC",
              b: "No PATs. Federation policy on the service principal trusts this repo and these workflow names.",
            },
            {
              t: "Environment gates",
              b: "prod requires reviewers. staging auto-deploys and trains Challenger. develop is unguarded personal copies.",
            },
            {
              t: "run_as",
              b: "Dev is you so name prefixes work. Staging and prod are dedicated principals with UC on their catalog only.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-[var(--radius-lg)] bg-bg-elevated p-5 shadow-[var(--shadow-border)]"
            >
              <h3 className="text-sm font-medium">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.b}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-fg-muted">
        Workflow source:{" "}
        <Link
          to="/files"
          search={{ path: ".github/workflows/ci-validate.yml" }}
          className="font-mono text-fg hover:underline"
        >
          .github/workflows/ci-validate.yml
        </Link>
      </p>
    </main>
  );
}
