"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search,
  X,
  Square,
} from "lucide-react";
import { LogsTimeline } from "@/components/ui/logs-timeline";
import { LOG_LEVEL_FILTER_THEME } from "@/lib/logs/level-theme";
import { cn } from "@/lib/utils";
import type { LogLevel, LogsPayload, LogSession } from "@/lib/logs/types";

type LogsWorkspaceProps = {
  payload: LogsPayload;
  sessions: LogSession[];
  selectedSessionId: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    previousHref: string;
    nextHref: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    pageSize: number;
  };
};

function formatSessionPrimaryLabel(session: LogSession) {
  return session.fileName ?? session.id;
}

function formatSessionSecondaryLabel(session: LogSession) {
  if (session.isCurrent) {
    return "Current session";
  }

  const shortId = session.id.length > 16
    ? `${session.id.slice(0, 8)}…${session.id.slice(-6)}`
    : session.id;
  return shortId;
}

const LEVEL_FILTERS = [
  { key: "debug", ...LOG_LEVEL_FILTER_THEME.debug },
  { key: "info", ...LOG_LEVEL_FILTER_THEME.info },
  { key: "success", ...LOG_LEVEL_FILTER_THEME.success },
  { key: "warning", ...LOG_LEVEL_FILTER_THEME.warning },
  { key: "error", ...LOG_LEVEL_FILTER_THEME.error },
] as const;

type LevelFilterKey = (typeof LEVEL_FILTERS)[number]["key"];

const TIME_RANGE_PRESETS = [
  { value: "15m", label: "Last 15 min" },
  { value: "30m", label: "Last 30 min" },
  { value: "1h", label: "Last 1 hour" },
  { value: "6h", label: "Last 6 hours" },
  { value: "24h", label: "Last 24 hours" },
  { value: "all", label: "All time" },
] as const;

type TimeRangePreset = (typeof TIME_RANGE_PRESETS)[number]["value"];

function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes)) {
    return "N/A";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1024;
  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`;
  }

  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function formatDurationMs(duration: number | null | undefined): string {
  if (duration === null || duration === undefined || !Number.isFinite(duration)) {
    return "N/A";
  }

  return `${Math.round(duration)}ms`;
}

function normalizeTimeRange(value: string | null): TimeRangePreset {
  if (value && TIME_RANGE_PRESETS.some((preset) => preset.value === value)) {
    return value as TimeRangePreset;
  }

  return "all";
}

function TimeRangeMenu({
  value,
  onSelect,
}: {
  value: TimeRangePreset;
  onSelect: (next: TimeRangePreset) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedPreset = TIME_RANGE_PRESETS.find((preset) => preset.value === value) ?? TIME_RANGE_PRESETS[TIME_RANGE_PRESETS.length - 1];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-black/[0.035] px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/62 transition hover:bg-black/[0.07] hover:text-foreground/84 dark:bg-white/[0.04] dark:hover:bg-white/[0.09]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Clock3 className="h-3.5 w-3.5" />
        {selectedPreset.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open ? "rotate-180" : "rotate-0")} />
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-1.5 min-w-36 rounded-md bg-background/96 p-1 ring-1 ring-black/10 backdrop-blur-sm dark:ring-white/12">
          {TIME_RANGE_PRESETS.map((preset) => {
            const isSelected = preset.value === value;

            return (
              <button
                key={preset.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  onSelect(preset.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] transition",
                  isSelected
                    ? "bg-indigo-500/[0.1] text-foreground/86 dark:bg-indigo-400/[0.14]"
                    : "text-foreground/58 hover:bg-black/[0.05] hover:text-foreground/84 dark:hover:bg-white/[0.07]",
                )}
              >
                <span>{preset.label}</span>
                {isSelected ? <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ToolButton({
  icon: Icon,
  label,
  disabled = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-black/[0.035] px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/62 transition hover:bg-black/[0.07] hover:text-foreground/84 dark:bg-white/[0.04] dark:hover:bg-white/[0.09] disabled:cursor-not-allowed disabled:opacity-35"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
  ariaLabel,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const className =
    "inline-flex h-7 cursor-pointer items-center rounded-sm px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/58 transition hover:bg-black/[0.045] hover:text-foreground/82 dark:hover:bg-white/[0.06]";

  if (disabled) {
    return (
      <span className={`${className} cursor-not-allowed opacity-35`} aria-disabled="true" aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <Link className={className} href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

function LevelFilterChip({
  label,
  count,
  active,
  activeClassName,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  activeClassName: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] transition",
        active
          ? activeClassName
          : "bg-black/[0.045] text-foreground/56 ring-black/8 hover:bg-black/[0.075] hover:text-foreground/84 hover:ring-black/12 dark:bg-white/[0.05] dark:text-foreground/58 dark:ring-white/10 dark:hover:bg-white/[0.1] dark:hover:text-foreground/84 dark:hover:ring-white/14",
      )}
      aria-pressed={active}
    >
      {active ? (
        <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
      ) : (
        <Square className="h-3.5 w-3.5 shrink-0 stroke-[2.1] opacity-70" aria-hidden="true" />
      )}
      <span>{label}</span>
      <span className="text-[10px] opacity-80">{count}</span>
    </button>
  );
}

export function LogsWorkspace({ payload, sessions, selectedSessionId, pagination }: LogsWorkspaceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const allLevelKeys = LEVEL_FILTERS.map((filter) => filter.key);

  // ─── Local filter state (no route navigation) ────────────────────────────

  const parseEnabledLevels = (): LevelFilterKey[] => {
    const rawValue = searchParams.get("level");
    if (rawValue === null) return allLevelKeys;
    return rawValue
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter((v): v is LevelFilterKey => allLevelKeys.includes(v as LevelFilterKey));
  };

  const [enabledLevels, setEnabledLevels] = useState<LevelFilterKey[]>(parseEnabledLevels);

  // Re-sync level selection when a server refetch delivers a new payload
  // (e.g. after session/range change). We only do this when payload identity changes.
  const prevPayloadRef = useRef(payload);
  useEffect(() => {
    if (payload !== prevPayloadRef.current) {
      prevPayloadRef.current = payload;
      setEnabledLevels(parseEnabledLevels());
      setLastUpdated(new Date());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const selectedRange = normalizeTimeRange(searchParams.get("range"));

  // ─── Search ───────────────────────────────────────────────────────────────

  const [searchInput, setSearchInput] = useState(() => searchParams.get("search") ?? "");
  const deferredSearch = useDeferredValue(searchInput);

  // ─── Last-updated timestamp ───────────────────────────────────────────────

  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());

  // Also stamp on first mount
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setLastUpdated(new Date());
    }
  }, []);

  // ─── Stable level counts from unfiltered payload ──────────────────────────

  const stableLevelCounts = useMemo(
    () => payload.levelCounts,
    // intentionally only recompute when payload changes, not on local filter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload],
  );

  // ─── Client-side filtered items ───────────────────────────────────────────

  const filteredItems = useMemo(() => {
    const term = deferredSearch.trim().toLowerCase();
    const allEnabled = enabledLevels.length === allLevelKeys.length;

    return payload.items.filter((item) => {
      // Level filter
      if (!allEnabled && !enabledLevels.includes(item.level.toLowerCase() as LevelFilterKey)) {
        return false;
      }

      // Search filter: check common visible/important fields
      if (term) {
        const metaString = item.metadata ? JSON.stringify(item.metadata).toLowerCase() : "";
        const exceptionString = item.exception
          ? (typeof item.exception === "string"
              ? item.exception
              : JSON.stringify(item.exception)
            ).toLowerCase()
          : "";

        const matches =
          item.message.toLowerCase().includes(term) ||
          item.module.toLowerCase().includes(term) ||
          item.logger.toLowerCase().includes(term) ||
          item.level.toLowerCase().includes(term) ||
          item.function.toLowerCase().includes(term) ||
          (item.traceId?.toLowerCase().includes(term) ?? false) ||
          (item.sessionId?.toLowerCase().includes(term) ?? false) ||
          metaString.includes(term) ||
          exceptionString.includes(term);

        if (!matches) return false;
      }

      return true;
    });
  }, [payload.items, enabledLevels, allLevelKeys.length, deferredSearch]);

  // ─── Derived helpers ──────────────────────────────────────────────────────

  const hasExplicitLevelFilter = enabledLevels.length < allLevelKeys.length;

  function buildPaginationHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    params.set("page_size", String(pagination.pageSize));

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  const hasScopedQuery =
    Boolean(deferredSearch.trim()) ||
    Boolean((searchParams.get("module") ?? "").trim()) ||
    hasExplicitLevelFilter;

  function handleToggleLevel(level: LevelFilterKey) {
    setEnabledLevels((current) => {
      const next = new Set(current);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      // Keep canonical order matching LEVEL_FILTERS
      return allLevelKeys.filter((key) => next.has(key));
    });
  }

  function handleSelectSession(sessionId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("session_id", sessionId);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleSelectRange(nextRange: TimeRangePreset) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", nextRange);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-5 overflow-hidden pt-3">
        <aside className="hidden w-56 shrink-0 lg:flex lg:flex-col">

          <div className="scrollbar-discord flex min-h-0 flex-col gap-1 overflow-y-auto pr-1">
            {sessions.length === 0 ? (
              <div className="px-2 py-2 text-[10px] uppercase tracking-[0.06em] text-foreground/40">
                No sessions yet
              </div>
            ) : (
              sessions.map((session) => {
                const isActive = session.id === selectedSessionId;

                return (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => handleSelectSession(session.id)}
                    className={cn(
                      "rounded-md flex cursor-pointer items-start gap-2 px-2 py-1.5 text-left transition-colors",
                      isActive
                        ? "bg-indigo-500/[0.09] text-foreground/88 dark:bg-indigo-400/[0.12]"
                        : "text-foreground/66 hover:bg-indigo-500/[0.04] dark:hover:bg-indigo-400/[0.07]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 h-5 w-[2px] shrink-0 rounded-full",
                        session.isCurrent
                          ? "bg-emerald-500/90"
                          : isActive
                            ? "bg-indigo-500/90 dark:bg-indigo-300/90"
                            : "bg-foreground/16",
                      )}
                      aria-hidden="true"
                    />
                    <FileText
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        isActive ? "text-indigo-500/85 dark:text-indigo-300/85" : "text-foreground/34",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[11px] font-medium tracking-[0.01em]",
                          isActive ? "text-foreground/92" : "text-foreground/82",
                        )}
                      >
                        {formatSessionPrimaryLabel(session)}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block truncate text-xs tracking-[0.03em]",
                          isActive ? "text-foreground/58" : "text-foreground/38",
                        )}
                      >
                        <span className="mr-1 text-[9px] uppercase tracking-[0.12em] text-foreground/44">
                          ID
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.02em] text-inherit">
                          {formatSessionSecondaryLabel(session)}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-visible">
          {/* Toolbar belongs to the main workspace column only. */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 pb-2 pt-1">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
              {LEVEL_FILTERS.map((filter) => (
                <LevelFilterChip
                  key={filter.key}
                  label={filter.label}
                  count={stableLevelCounts[filter.key.toUpperCase() as LogLevel] ?? 0}
                  active={enabledLevels.includes(filter.key)}
                  activeClassName={filter.activeClassName}
                  onClick={() => handleToggleLevel(filter.key)}
                />
              ))}
            </div>

            {/* Search — Escape still blurs; Enter is a no-op (filtering is live) */}
            <div className="flex h-8 min-w-[240px] flex-1 items-center gap-2 rounded-md bg-background px-2.5 text-[12px] text-foreground/42 ring-1 ring-black/10 dark:bg-background/70 dark:text-foreground/50 dark:ring-white/12">
              <Search className="h-3.5 w-3.5 shrink-0 text-foreground/36" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") e.currentTarget.blur();
                }}
                placeholder="Search messages, modules, or functions..."
                className="min-w-0 flex-1 bg-transparent text-[12px] text-foreground/82 outline-none placeholder:text-foreground/38"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => { setSearchInput(""); }}
                  className="shrink-0 cursor-pointer text-foreground/36 transition hover:text-foreground/72"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <TimeRangeMenu value={selectedRange} onSelect={handleSelectRange} />
              <ToolButton icon={Filter} label="Filter" disabled />
              <ToolButton icon={Download} label="Export" disabled />
              <button
                type="button"
                onClick={() => router.refresh()}
                className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-black/[0.035] px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/62 transition hover:bg-black/[0.07] hover:text-foreground/84 dark:bg-white/[0.04] dark:hover:bg-white/[0.09]"
                title="Refresh logs from server"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <LogsTimeline
              items={filteredItems}
              emptyStateVariant={hasScopedQuery ? "filtered" : "global"}
            />
          </div>

          <div className="flex items-center justify-between gap-3 px-2 py-1 text-[10px] text-foreground/60 dark:text-foreground/45">
            <div className="flex min-w-[180px] flex-col gap-px text-left">
              <span className="text-[12px] font-semibold text-foreground/70 dark:text-foreground/55">
                <span className="text-foreground/75 dark:text-foreground/65">Showing</span>{" "}
                <span className="text-foreground/55 dark:text-foreground/45">
                  {filteredItems.length} of {payload.items.length} loaded
                </span>
              </span>
              <span className="text-[10px] text-foreground/38 dark:text-foreground/32">
                Updated{" "}
                {lastUpdated.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <PaginationLink
                href={pagination.previousHref}
                disabled={!pagination.hasPreviousPage}
                ariaLabel="Previous page"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </PaginationLink>

              <div className="flex items-center gap-1 px-1">
                {(() => {
                  const current = pagination.currentPage;
                  const total = pagination.totalPages;
                  const items: React.ReactNode[] = [];
                  const start = Math.max(1, current - 2);
                  const end = Math.min(total, current + 2);

                  if (start > 1) {
                    items.push(
                      <span key="page-1" className="px-1.5 text-[10px] text-foreground/55 dark:text-foreground/45">
                        1
                      </span>,
                    );
                    if (start > 2) {
                      items.push(
                        <span key="ellipsis-start" className="px-1 text-[10px] text-foreground/40 dark:text-foreground/35">
                          …
                        </span>,
                      );
                    }
                  }

                  for (let page = start; page <= end; page += 1) {
                    const isCurrent = page === current;

                    if (isCurrent) {
                      items.push(
                        <span
                          key={`page-${page}`}
                          className="inline-flex h-6 min-w-[20px] items-center justify-center rounded-sm px-1.5 text-[10px] font-semibold bg-foreground/10 text-foreground/80 dark:bg-foreground/10 dark:text-foreground/80"
                          aria-current="page"
                        >
                          {page}
                        </span>,
                      );
                    } else {
                      items.push(
                        <Link
                          key={`page-${page}`}
                          href={buildPaginationHref(page)}
                          className="inline-flex h-6 min-w-[20px] items-center justify-center rounded-sm px-1.5 text-[10px] font-medium text-foreground/55 hover:bg-foreground/10 hover:text-foreground/75 dark:text-foreground/45 dark:hover:bg-foreground/15 dark:hover:text-foreground/70 cursor-pointer"
                          aria-label={`Go to page ${page}`}
                        >
                          {page}
                        </Link>,
                      );
                    }
                  }

                  if (end < total) {
                    if (end < total - 1) {
                      items.push(
                        <span key="ellipsis-end" className="px-1 text-[10px] text-foreground/40 dark:text-foreground/35">
                          …
                        </span>,
                      );
                    }
                    items.push(
                      <span key={`page-${total}`} className="px-1.5 text-[10px] text-foreground/55 dark:text-foreground/45">
                        {total}
                      </span>,
                    );
                  }

                  return items;
                })()}
              </div>

              <PaginationLink
                href={pagination.nextHref}
                disabled={!pagination.hasNextPage}
                ariaLabel="Next page"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </PaginationLink>
            </div>

            <div className="flex min-w-[200px] items-center justify-end gap-3 text-right text-[12px] font-medium text-foreground/60 dark:text-foreground/50">
              <span className="text-[12px] font-semibold text-foreground/75 dark:text-foreground/65">
                Memory{" "}
                <span className="text-foreground/60 dark:text-foreground/50">{formatBytes(payload.meta?.memory_bytes)}</span>
              </span>
              <span className="text-[12px] font-semibold text-foreground/75 dark:text-foreground/65">
                Duration{" "}
                <span className="text-foreground/60 dark:text-foreground/50">{formatDurationMs(payload.meta?.duration_ms)}</span>
              </span>
              <span className="text-[12px] font-semibold text-foreground/75 dark:text-foreground/65">
                Version{" "}
                <span className="text-foreground/60 dark:text-foreground/50">{payload.meta?.version ?? "N/A"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}