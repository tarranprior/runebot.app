import type { DefaultSession } from "next-auth";

/**
 * Auth.js v5 module augmentation.
 *
 * Extends the built-in Session and JWT types with the Discord-specific fields
 * we store during the OAuth callback. These types are used throughout the app
 * wherever session data is accessed (admin layout, getAdminSession, middleware).
 */
declare module "next-auth" {
  interface Session {
    user: {
      /** Discord snowflake user ID — stored in the JWT, used for allowlist checks. */
      discordId?: string;
      /**
       * True if discordId is currently in the ADMIN_DISCORD_IDS allowlist.
       * Recomputed from the env var on every session callback invocation, so
       * removing a user from the allowlist and redeploying takes effect
       * without waiting for their JWT to expire.
       */
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** Discord snowflake user ID, persisted into the signed JWT on sign-in. */
    discordId?: string;
  }
}
