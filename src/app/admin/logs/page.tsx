import { LogsWorkspace } from "@/components/ui/logs-workspace";
import { getLogSessions, getLogsPayload } from "@/lib/logs/fetch";
import type { GetLogsParams, LogItem, LogLevel, LogsPayload } from "@/lib/logs/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type LogsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Logs — Runebot",
  description: "Internal observability and development log stream for Runebot.",
};

const RANGE_TO_WINDOW_MS: Record<string, number> = {
  "15m": 15 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "6h": 6 * 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
};

const LOG_LEVEL_VALUES: LogLevel[] = [
  "DEBUG",
  "SUCCESS",
  "INFO",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "UNKNOWN",
];

function getSingleSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function toLogsParams(searchParams: Record<string, string | string[] | undefined>): GetLogsParams {
  const rawLevel = getSingleSearchParam(searchParams.level);
  const rawRange = getSingleSearchParam(searchParams.range)?.trim() || undefined;

  return {
    page: parsePositiveInteger(getSingleSearchParam(searchParams.page), 1),
    pageSize: parsePositiveInteger(getSingleSearchParam(searchParams.page_size), 50),
    level: rawLevel === undefined ? undefined : rawLevel.trim(),
    module: getSingleSearchParam(searchParams.module)?.trim() || undefined,
    search: getSingleSearchParam(searchParams.search)?.trim() || undefined,
    sessionId: getSingleSearchParam(searchParams.session_id)?.trim() || undefined,
    range: rawRange ?? "all",
  };
}

function parseLevelSelection(levelQuery: string | undefined): Set<LogLevel> | null {
  if (levelQuery === undefined) {
    return null;
  }

  const normalized = levelQuery.trim();

  if (!normalized) {
    return new Set<LogLevel>();
  }

  const selected = new Set<LogLevel>();

  for (const segment of normalized.split(",")) {
    const candidate = segment.trim().toUpperCase();

    if (LOG_LEVEL_VALUES.includes(candidate as LogLevel)) {
      selected.add(candidate as LogLevel);
    }
  }

  return selected;
}

function applyRangeToItems(items: LogItem[], range: string | undefined): LogItem[] {
  if (!range || range === "all") {
    return items;
  }

  const windowMs = RANGE_TO_WINDOW_MS[range];

  if (!windowMs) {
    return items;
  }

  const cutoff = Date.now() - windowMs;
  return items.filter((item) => {
    const timestamp = Date.parse(item.timestamp);
    return Number.isFinite(timestamp) && timestamp >= cutoff;
  });
}

function computeLevelCounts(items: LogItem[]): Partial<Record<LogLevel, number>> {
  const counts: Partial<Record<LogLevel, number>> = {};

  for (const item of items) {
    counts[item.level] = (counts[item.level] ?? 0) + 1;
  }

  return counts;
}

function filterBySelectedLevels(items: LogItem[], selectedLevels: Set<LogLevel> | null): LogItem[] {
  if (selectedLevels === null) {
    return items;
  }

  if (selectedLevels.size === 0) {
    return [];
  }

  return items.filter((item) => selectedLevels.has(item.level));
}

async function fetchAllItemsForFallback(baseParams: GetLogsParams): Promise<{items: LogItem[]; meta?: LogsPayload["meta"]}> {
  const pageSize = Math.min(Math.max(baseParams.pageSize ?? 50, 50), 500);
  const collected: LogItem[] = [];
  let resolvedMeta: LogsPayload["meta"] | undefined;

  let page = 1;
  let total = Number.POSITIVE_INFINITY;

  while (collected.length < total && page <= 200) {
    const payload = await getLogsPayload({
      ...baseParams,
      page,
      pageSize,
      level: undefined,
      range: undefined,
    });

    total = payload.pagination.total;
    collected.push(...payload.items);

    if (resolvedMeta === undefined) {
      resolvedMeta = payload.meta;
    }

    if (payload.items.length === 0) {
      break;
    }

    page += 1;
  }

  return { items: collected, meta: resolvedMeta };
}

function paginateItems(items: LogItem[], requestedPage: number, pageSize: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    total,
    items: items.slice(start, start + pageSize),
  };
}

function buildLogsHref(
  searchParams: Record<string, string | string[] | undefined>,
  overrides: Record<string, string | number | undefined>,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry !== undefined) {
          params.append(key, entry);
        }
      }
      continue;
    }

    if (value !== undefined && (value !== "" || key === "level")) {
      params.set(key, value);
    }
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined || (value === "" && key !== "level")) {
      params.delete(key);
      continue;
    }

    params.set(key, String(value));
  }

  const query = params.toString();
  return query ? `/admin/logs?${query}` : "/admin/logs";
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-lg font-semibold tracking-tight text-foreground">Unable to load logs</p>
      <p className="mt-2 text-sm leading-7 text-foreground/55">
        Check that the local logs service is running and that RUNEBOT_LOGS_API_URL points to a reachable endpoint.
      </p>
      <pre className="mt-5 overflow-x-auto bg-surface/65 p-4 text-left text-[12px] leading-5 text-foreground/70 ring-1 ring-surface-border/70">
        {message}
      </pre>
    </div>
  );
}

export default async function AdminLogsPage({ searchParams }: LogsPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  let sessions;

  try {
    sessions = await getLogSessions();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown logs fetch error.";

    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <ErrorState message={message} />
        </div>
      </div>
    );
  }

  const selectedSessionId = getSingleSearchParam(resolvedSearchParams.session_id)?.trim() || undefined;
  const defaultSessionId = selectedSessionId || sessions[0]?.id;
  const explicitLevel = getSingleSearchParam(resolvedSearchParams.level);
  const isAllLevelsUnchecked = explicitLevel !== undefined && explicitLevel.trim() === "";

  if (!selectedSessionId && defaultSessionId) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (Array.isArray(value)) {
        for (const entry of value) {
          if (entry) {
            params.append(key, entry);
          }
        }
        continue;
      }

      if (value) {
        params.set(key, value);
      }
    }

    params.set("session_id", defaultSessionId);
    params.delete("page");
    redirect(`/admin/logs?${params.toString()}`);
  }

  try {
    const baseParams = toLogsParams({
      ...resolvedSearchParams,
      session_id: defaultSessionId,
    });
    const rangeFallbackEnabled = Boolean(baseParams.range && baseParams.range !== "all");
    const requestedPage = baseParams.page ?? 1;
    const requestedPageSize = baseParams.pageSize ?? 50;

    let resolvedPayload: LogsPayload;
    let currentPage: number;
    let totalPages: number;

    if (rangeFallbackEnabled) {
      const { items: allItems, meta } = await fetchAllItemsForFallback(baseParams);
      const rangeFilteredItems = applyRangeToItems(allItems, baseParams.range);
      const levelCounts = computeLevelCounts(rangeFilteredItems);
      const selectedLevels = parseLevelSelection(explicitLevel?.trim());
      const visibleItems = isAllLevelsUnchecked
        ? []
        : filterBySelectedLevels(rangeFilteredItems, selectedLevels);
      const paged = paginateItems(visibleItems, requestedPage, requestedPageSize);

      resolvedPayload = {
        items: paged.items,
        pagination: {
          page: paged.currentPage,
          pageSize: requestedPageSize,
          total: paged.total,
        },
        levelCounts,
        meta,
      };

      currentPage = paged.currentPage;
      totalPages = paged.totalPages;
    } else {
      const payload = isAllLevelsUnchecked
        ? (() => {
            const allLevelsPayload = getLogsPayload({
              ...baseParams,
              page: 1,
              level: undefined,
            });

            return allLevelsPayload.then((result) => ({
              ...result,
              items: [],
              pagination: {
                page: 1,
                pageSize: result.pagination.pageSize,
                total: 0,
              },
            }));
          })()
        : getLogsPayload(baseParams);

      resolvedPayload = await payload;
      totalPages = Math.max(1, Math.ceil(resolvedPayload.pagination.total / resolvedPayload.pagination.pageSize));
      currentPage = resolvedPayload.pagination.page;
    }

    return (
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-2 py-2 sm:px-3">
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            <LogsWorkspace
              payload={resolvedPayload}
              sessions={sessions}
              selectedSessionId={defaultSessionId ?? null}
              pagination={{
                currentPage,
                totalPages,
                previousHref: buildLogsHref(resolvedSearchParams, {
                  page: currentPage - 1,
                  page_size: resolvedPayload.pagination.pageSize,
                }),
                nextHref: buildLogsHref(resolvedSearchParams, {
                  page: currentPage + 1,
                  page_size: resolvedPayload.pagination.pageSize,
                }),
                hasPreviousPage: currentPage > 1,
                hasNextPage: currentPage < totalPages,
                pageSize: resolvedPayload.pagination.pageSize,
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown logs fetch error.";

    return (
      <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <ErrorState message={message} />
        </div>
      </div>
    );
  }
}
