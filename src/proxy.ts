import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { isAdminDiscordId } from "@/lib/auth/allowlist";

/**
 * Admin route protection middleware.
 *
 * Runs on all /admin/* requests at the Edge before any page code executes.
 * Auth.js verifies the JWT cookie and exposes the session via req.auth.
 *
 * Two-layer check:
 * 1. No session → redirect to /auth/signin with callbackUrl preserved
 * 2. Session present but user not in allowlist → redirect to home page
 *    (re-checked fresh from env so allowlist changes take effect on redeploy
 *    without waiting for JWT expiry)
 * 3. Authenticated admin → pass through to the page
 */
export default auth((req) => {
  const discordId = req.auth?.user?.discordId;

  if (!discordId) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (!isAdminDiscordId(discordId)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
