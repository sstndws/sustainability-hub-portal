import { AppCard } from "@/components/dashboard/AppCard";
import { apps } from "@/data/apps";

export function DashboardGrid() {
  const activeApps = apps.filter((app) => app.status === "active");

  return (
    <div className="space-y-8 sm:space-y-12">
      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500 sm:tracking-[0.16em]">
          KPN Downstream Sustainability
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:mt-3 sm:text-3xl lg:text-4xl">
          Sustainability Hub Portal
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
          Access active sustainability modules from a single entry point. Select
          an application below to open it.
        </p>
      </section>

      <section className="portal-module-grid">
        {activeApps.map((app, index) => (
          <AppCard key={app.id} app={app} index={index} />
        ))}
      </section>
    </div>
  );
}
