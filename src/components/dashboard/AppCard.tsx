import { ArrowUpRight } from "lucide-react";

import type { AppCardData } from "@/types/app";

interface AppCardProps {
  app: AppCardData;
  index: number;
}

export function AppCard({ app, index }: AppCardProps) {
  const Icon = app.icon;

  if (!app.href) return null;

  const href = app.ssoBridge ? `/launch/${app.id}` : app.href;
  const openInNewTab = !app.ssoBridge;

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="portal-module group"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="portal-module-shine" aria-hidden />

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C04A3E]/10 text-[#9A3B32] transition group-hover:bg-[#C04A3E]/15">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">
          <span className="portal-module-dot" />
          Active
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900 sm:mt-6 sm:text-xl">
        {app.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {app.description}
      </p>

      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#9A3B32]">
        Open module
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
