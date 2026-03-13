import type {
  CommunityStatCard,
  GeneratedCommunityStats,
  GeneratedCommunityStatsMeta,
  GeneratedCommunityStatsPayload,
  RuntimeDisplay,
} from "@/lib/community-stats/types";

function asObject(input: unknown, path: string): Record<string, unknown> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new Error(`Expected object at ${path}.`);
  }

  return input as Record<string, unknown>;
}

function expectString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new Error(`Expected string at ${path}.`);
  }

  return value;
}

function expectOptionalString(value: unknown, path: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return expectString(value, path);
}

function expectNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Expected finite number at ${path}.`);
  }

  if (value < 0) {
    throw new Error(`Expected non-negative number at ${path}.`);
  }

  return value;
}

function normalizeStats(input: unknown): GeneratedCommunityStats {
  const stats = asObject(input, "stats");

  return {
    servers: expectNumber(stats.servers, "stats.servers"),
    channels: expectNumber(stats.channels, "stats.channels"),
    users: expectNumber(stats.users, "stats.users"),
    uptimeSeconds: expectNumber(stats.uptimeSeconds, "stats.uptimeSeconds"),
  };
}

function normalizeMeta(input: unknown): GeneratedCommunityStatsMeta {
  const meta = asObject(input, "meta");

  return {
    source: expectString(meta.source, "meta.source"),
    version: expectOptionalString(meta.version, "meta.version"),
  };
}

export function normalizeCommunityStatsPayload(input: unknown): GeneratedCommunityStatsPayload {
  const payload = asObject(input, "payload");

  return {
    generatedAt: expectString(payload.generatedAt, "generatedAt"),
    stats: normalizeStats(payload.stats),
    meta: normalizeMeta(payload.meta),
  };
}

export function toRuntimeDisplay(uptimeSeconds: number): RuntimeDisplay {
  if (uptimeSeconds >= 24 * 60 * 60) {
    return { value: Math.floor(uptimeSeconds / (24 * 60 * 60)), unit: "d" };
  }

  if (uptimeSeconds >= 60 * 60) {
    return { value: Math.floor(uptimeSeconds / (60 * 60)), unit: "h" };
  }

  if (uptimeSeconds >= 60) {
    return { value: Math.floor(uptimeSeconds / 60), unit: "m" };
  }

  return { value: Math.floor(uptimeSeconds), unit: "s" };
}

export function toCommunityStatCards(payload: GeneratedCommunityStatsPayload): CommunityStatCard[] {
  const runtime = toRuntimeDisplay(payload.stats.uptimeSeconds);

  return [
    {
      key: "servers",
      label: "Servers",
      value: payload.stats.servers,
    },
    {
      key: "channels",
      label: "Channels",
      value: payload.stats.channels,
    },
    {
      key: "users",
      label: "Users",
      value: payload.stats.users,
    },
    {
      key: "runtime",
      label: "Runtime",
      value: runtime.value,
      suffix: runtime.unit,
    },
  ];
}
