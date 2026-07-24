import { createClient } from "@/lib/supabase/client";

/**
 * Build child-app auth-bridge URL carrying the current Hub Supabase session.
 * Prefer hash so tokens stay out of most server access logs.
 */
export async function buildSsoBridgeUrl(appOrigin: string): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token || !session?.refresh_token) {
    return null;
  }

  const base = appOrigin.replace(/\/$/, "");
  const params = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  return `${base}/auth-bridge#${params.toString()}`;
}
