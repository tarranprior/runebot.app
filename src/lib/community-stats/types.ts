export type GeneratedCommunityStats = {
  servers: number;
  channels: number;
  users: number;
  uptimeSeconds: number;
};

export type GeneratedCommunityStatsMeta = {
  source: string;
  version?: string;
};

export type GeneratedCommunityStatsPayload = {
  generatedAt: string;
  stats: GeneratedCommunityStats;
  meta: GeneratedCommunityStatsMeta;
};

export type RuntimeUnit = "s" | "m" | "h" | "d";

export type RuntimeDisplay = {
  value: number;
  unit: RuntimeUnit;
};

export type CommunityStatCard = {
  key: "servers" | "channels" | "users" | "runtime";
  label: "Servers" | "Channels" | "Users" | "Runtime";
  value: number;
  suffix?: string;
};
