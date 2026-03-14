import { StatisticsClient } from "@/components/sections/statistics-client";
import { getCommunityStatsPayload } from "@/lib/community-stats/fetch";
import { toCommunityStatCards } from "@/lib/community-stats/normalize";

export async function Statistics() {
  const payload = await getCommunityStatsPayload();
  const stats = toCommunityStatCards(payload);

  return <StatisticsClient stats={stats} generatedAt={payload.generatedAt} />;
}
