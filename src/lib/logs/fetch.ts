import "server-only";

import { env } from "@/lib/env";
import { normalizeLogsPayload, normalizeLogSessions } from "@/lib/logs/normalize";
import type { GetLogsParams, LogsPayload, LogSession } from "@/lib/logs/types";

const DEFAULT_LOGS_API_URL = "http://127.0.0.1:8080/logs";
const DEFAULT_LOGS_SESSIONS_API_URL = "http://127.0.0.1:8080/logs/sessions";

function getLogsApiUrl() {
  return env.RUNEBOT_LOGS_API_URL?.trim() || DEFAULT_LOGS_API_URL;
}

function getLogsSessionsApiUrl() {
  const explicitUrl = env.RUNEBOT_LOGS_SESSIONS_API_URL?.trim();

  if (explicitUrl) {
    return explicitUrl;
  }

  const logsUrl = new URL(getLogsApiUrl());

  if (logsUrl.pathname.endsWith("/logs")) {
    logsUrl.pathname = `${logsUrl.pathname.replace(/\/$/, "")}/sessions`;
    logsUrl.search = "";
    return logsUrl.toString();
  }

  return DEFAULT_LOGS_SESSIONS_API_URL;
}

function getLogsApiToken() {
  const token = env.RUNEBOT_LOGS_API_TOKEN.trim();

  if (!token) {
    throw new Error(
      "RUNEBOT_LOGS_API_TOKEN is set but empty.",
    );
  }

  return token;
}

function appendParam(params: URLSearchParams, key: string, value: string | number | undefined) {
  if (value === undefined) {
    return;
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return;
  }

  params.set(key, normalizedValue);
}

function buildLogsEndpoint({ page, pageSize, level, module, search, sessionId, range }: GetLogsParams) {
  const url = new URL(getLogsApiUrl());

  appendParam(url.searchParams, "page", page);
  appendParam(url.searchParams, "page_size", pageSize);
  appendParam(url.searchParams, "level", level);
  appendParam(url.searchParams, "module", module);
  appendParam(url.searchParams, "search", search);
  appendParam(url.searchParams, "session_id", sessionId);
  // Bot /logs does not yet enforce range filtering, so frontend fallback handles range windows.
  appendParam(url.searchParams, "range", range);

  return url.toString();
}

async function fetchLogsApiJson(endpoint: string): Promise<unknown> {
  const token = getLogsApiToken();

  const response = await fetch(endpoint, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch logs (${response.status}) from ${endpoint}. ${errorBody.slice(0, 400)}`,
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error(
      `Logs API returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function getLogsPayload(params: GetLogsParams = {}): Promise<LogsPayload> {
  const endpoint = buildLogsEndpoint(params);
  const rawPayload = await fetchLogsApiJson(endpoint);

  return normalizeLogsPayload(rawPayload);
}

export async function getLogSessions(): Promise<LogSession[]> {
  const endpoint = getLogsSessionsApiUrl();
  const rawPayload = await fetchLogsApiJson(endpoint);
  return normalizeLogSessions(rawPayload);
}
