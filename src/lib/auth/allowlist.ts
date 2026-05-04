/**
 * Admin allowlist helpers.
 *
 * Reads the ADMIN_DISCORD_IDS env var — a comma-separated list of Discord
 * user IDs that are granted access to /admin/* routes.
 *
 * Future: if dynamic allowlist management is needed (e.g. adding/removing
 * staff without redeploying), the implementation inside getAdminDiscordIds()
 * can be extended with a DB fallback. The call sites in middleware and the
 * admin layout will remain unchanged.
 */

/**
 * Parses ADMIN_DISCORD_IDS into a trimmed array of non-empty Discord user ID
 * strings. Returns an empty array if the env var is unset or blank.
 */
export function getAdminDiscordIds(): string[] {
  const raw = process.env.ADMIN_DISCORD_IDS?.trim();

  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/**
 * Returns true if the given Discord user ID appears in the admin allowlist.
 * Safely handles null and undefined inputs.
 */
export function isAdminDiscordId(discordId: string | null | undefined): boolean {
  if (!discordId) {
    return false;
  }

  return getAdminDiscordIds().includes(discordId);
}
