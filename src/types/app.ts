import type { LucideIcon } from "lucide-react";

export type AppStatus = "active" | "coming-soon";

export interface AppCardData {
  id: string;
  title: string;
  description: string;
  href?: string;
  /** When true, open via Supabase session bridge (/auth-bridge) instead of a plain link. */
  ssoBridge?: boolean;
  status: AppStatus;
  icon: LucideIcon;
}
