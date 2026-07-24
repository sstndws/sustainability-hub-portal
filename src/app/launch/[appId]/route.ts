import { NextResponse, type NextRequest } from "next/server";

import { apps } from "@/data/apps";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side SSO launch: read Hub session from cookies, then send the user to
 * the child app /auth-bridge with tokens (query string — required for HTTP redirects).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ appId: string }> },
) {
  const { appId } = await context.params;
  const app = apps.find(
    (item) =>
      item.id === appId &&
      item.status === "active" &&
      item.ssoBridge &&
      item.href,
  );

  if (!app?.href) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const supabase = await createClient();
  if (!supabase) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `/launch/${appId}`);
    return NextResponse.redirect(loginUrl);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token || !session?.refresh_token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `/launch/${appId}`);
    return NextResponse.redirect(loginUrl);
  }

  const target = new URL(`${app.href.replace(/\/$/, "")}/auth-bridge`);
  target.searchParams.set("access_token", session.access_token);
  target.searchParams.set("refresh_token", session.refresh_token);

  return NextResponse.redirect(target);
}
