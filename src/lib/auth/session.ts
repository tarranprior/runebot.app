import "server-only";

import { auth } from "@/lib/auth/config";
import { isAdminDiscordId } from "@/lib/auth/allowlist";

/**
 * Shape of an authenticated admin session, as resolved from a valid JWT.
 */
export type AdminSession = {
  discordId: string;
  username: string;
  isAdmin: boolean;
};

/**
 * Resolves the current admin session from the Auth.js JWT cookie.
 *
 * Returns null if the user is unauthenticated or if their Discord ID is not
 * in the ADMIN_DISCORD_IDS allowlist. isAdmin is recomputed fresh from the
 * current env allowlist on every call.
 *
 * Used in server components and the admin segment layout. Not for middleware —
 * use req.auth inside auth() middleware wrappers instead.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await auth();
  const discordId = session?.user?.discordId;

  if (!discordId) {
    return null;
  }

  return {
    discordId,
    username: session.user.name ?? "",
    isAdmin: isAdminDiscordId(discordId),
  };
}
