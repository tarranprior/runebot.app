import "server-only";

import { normalizeCommunityStatsPayload } from "@/lib/community-stats/normalize";
import type { GeneratedCommunityStatsPayload } from "@/lib/community-stats/types";

const DEFAULT_COMMUNITY_STATS_API_URL = "https://api.runebot.app/community-stats";

function getCommunityStatsApiUrl() {
  return process.env.COMMUNITY_STATS_API_URL?.trim() || DEFAULT_COMMUNITY_STATS_API_URL;
}

export async function getCommunityStatsPayload(): Promise<GeneratedCommunityStatsPayload> {
  const endpoint = getCommunityStatsApiUrl();

  const response = await fetch(endpoint, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch community stats (${response.status}) from ${endpoint}. ${errorBody.slice(0, 400)}`,
    );
  }

  let rawPayload: unknown;

  try {
    rawPayload = await response.json();
  } catch (error) {
    throw new Error(
      `Community stats API returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  return normalizeCommunityStatsPayload(rawPayload);
}
