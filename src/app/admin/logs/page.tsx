import { LogsWorkspace } from "@/components/ui/logs-workspace";
import { AdminShell } from "@/components/admin/admin-shell.client";
import { getLogSessions, getLogsPayload } from "@/lib/logs/fetch";
import type { GetLogsParams, LogsPayload } from "@/lib/logs/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type LogsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Logs — Runebot",
  description: "Internal observability and development log stream for Runebot.",
};

const WORKING_SET_SIZE = 500;
const DEFAULT_VISIBLE_PAGE_SIZE = 50;

const RANGE_TO_WINDOW_MS: Record<string, number> = {
  "15m": 15 * 60 * 1000,
  "30m": 30 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "6h": 6 * 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
};

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

function resolveRangeBounds(range: string | undefined, now = new Date()): { startTime?: string; endTime?: string } {
  if (!range || range === "all") {
    return {};
  }

  const windowMs = RANGE_TO_WINDOW_MS[range];

  if (!windowMs) {
    return {};
  }

  const end = now.getTime();
  const start = end - windowMs;

  return {
    startTime: new Date(start).toISOString(),
    endTime: new Date(end).toISOString(),
  };
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
  let sessions: Awaited<ReturnType<typeof getLogSessions>>;

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
  const initialLocalPage = parsePositiveInteger(getSingleSearchParam(resolvedSearchParams.page), 1);
  const initialLocalPageSize = parsePositiveInteger(getSingleSearchParam(resolvedSearchParams.page_size), DEFAULT_VISIBLE_PAGE_SIZE);

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

  let resolvedPayload: LogsPayload;
  try {
    const baseParams = toLogsParams({
      ...resolvedSearchParams,
      session_id: defaultSessionId,
    });
    const { startTime, endTime } = resolveRangeBounds(baseParams.range);

    resolvedPayload = await getLogsPayload({
      ...baseParams,
      page: 1,
      pageSize: WORKING_SET_SIZE,
      level: undefined,
      search: undefined,
      startTime,
      endTime,
    });
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

  return (
    <AdminShell sessions={sessions} selectedSessionId={defaultSessionId ?? null}>
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-2 py-2 sm:px-3">
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
            <LogsWorkspace
              payload={resolvedPayload}
              initialPage={initialLocalPage}
              initialPageSize={initialLocalPageSize}
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
