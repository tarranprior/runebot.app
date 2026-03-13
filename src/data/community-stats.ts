import generatedCommunityStats from "@/data/generated/community-stats.json";
import {
  normalizeCommunityStatsPayload,
  toCommunityStatCards,
} from "@/lib/community-stats/normalize";
import type { CommunityStatCard } from "@/lib/community-stats/types";

const payload = normalizeCommunityStatsPayload(generatedCommunityStats);

export const runebotCommunityStats: CommunityStatCard[] = toCommunityStatCards(payload);
export const runebotCommunityStatsGeneratedAt = payload.generatedAt;
