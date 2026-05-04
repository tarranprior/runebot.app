/**
 * Auth.js v5 configuration — Discord OAuth with JWT sessions.
 *
 * NOT marked server-only: this module is imported by src/proxy.ts which
 * runs in the Edge runtime. All code here is Edge-compatible (no Node.js APIs).
 *
 * Exports: handlers (route handler), auth (universal session getter + middleware
 * wrapper), signIn, signOut.
 */

import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { isAdminDiscordId } from "@/lib/auth/allowlist";
import { env } from "@/lib/env";

function requireAuthEnv(name: "AUTH_DISCORD_ID" | "AUTH_DISCORD_SECRET"): string {
  const value = env[name];

  if (!value?.trim()) {
    throw new Error(`${name} must be configured when Discord auth is enabled.`);
  }

  return value;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: requireAuthEnv("AUTH_DISCORD_ID"),
      clientSecret: requireAuthEnv("AUTH_DISCORD_SECRET"),
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    /**
     * Gate Discord sign-in at the OAuth callback level.
     *
     * Only Discord user IDs present in ADMIN_DISCORD_IDS receive a session.
     * Non-allowlisted users are redirected back to the sign-in page with
     * error=AccessDenied and never get a JWT — cleaner than issuing a token
     * for users who have no valid destination in this app.
     */
    signIn({ profile }) {
      const id = (profile as Record<string, unknown> | undefined)?.id;
      return isAdminDiscordId(typeof id === "string" ? id : undefined);
    },

    /**
     * Persist the Discord user ID into the JWT on initial sign-in.
     * profile is only present on the first sign-in; subsequent requests
     * re-use the discordId already in the token.
     */
    jwt({ token, profile }) {
      if (profile) {
        const id = (profile as Record<string, unknown>).id;
        if (typeof id === "string") {
          token.discordId = id;
        }
      }
      return token;
    },

    /**
     * Expose discordId and a freshly-computed isAdmin flag on the session.
     * isAdmin is recomputed from the current env allowlist on every call —
     * revoking a user from ADMIN_DISCORD_IDS and redeploying takes effect
     * immediately without waiting for their JWT to expire.
     */
    session({ session, token }) {
      const discordId =
        typeof token.discordId === "string" ? token.discordId : undefined;
      if (discordId) {
        session.user.discordId = discordId;
        session.user.isAdmin = isAdminDiscordId(discordId);
      }
      return session;
    },
  },
});
