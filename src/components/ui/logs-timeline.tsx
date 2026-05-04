"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bug, Check, Copy, Info, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { jetbrainsMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import type { LogItem, LogLevel } from "@/lib/logs/types";
import { LOG_LEVEL_TEXT_STYLES } from "@/lib/logs/level-theme";
import { LOG_TOKEN_THEME } from "@/lib/logs/token-theme";

const COLUMN_COUNT = 6;
const GRID_TEMPLATE = "160px 138px minmax(220px,1.6fr) minmax(420px,3.4fr) 120px 70px";

function formatTimestamp(isoTimestamp: string) {
  const timestamp = Date.parse(isoTimestamp);

  if (Number.isNaN(timestamp)) {
    return { label: "Unknown time", title: isoTimestamp };
  }

  const date = new Date(timestamp);

  return {
    label: new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date),
    title: new Intl.DateTimeFormat(undefined, {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
}

function formatStructuredValue(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function isSlashCommandBoundaryBefore(value: string | undefined) {
  if (!value) {
    return true;
  }

  return /[\s([{"'`]/.test(value);
}

function isSlashCommandBoundaryAfter(value: string | undefined) {
  if (!value) {
    return true;
  }

  return /[\s).,!?;:\]}"'`]/.test(value);
}


// Legacy slash-command renderer (unchanged, used as fallback)
function renderMessageWithSlashCommands(message: string) {
  const tokenRegex = /`\/[a-z][\w-]*`|\/[a-z][\w-]*/gi;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of message.matchAll(tokenRegex)) {
    const token = match[0];
    const start = match.index ?? -1;
    if (start < 0) continue;
    const end = start + token.length;
    const isBacktickToken = token.startsWith("`") && token.endsWith("`");
    const command = isBacktickToken ? token.slice(1, -1) : token;
    const before = message[start - 1];
    const after = message[end];
    const isValidSlashCommand =
      isBacktickToken ||
      (isSlashCommandBoundaryBefore(before) && isSlashCommandBoundaryAfter(after));
    if (!isValidSlashCommand) continue;
    if (start > cursor) nodes.push(message.slice(cursor, start));
    nodes.push(
      <span
        key={`${start}-${command}`}
        className="mx-[1px] inline-flex items-center rounded-[5px] bg-[#5865f2]/12 px-1.5 py-0.5 text-[0.92em] font-medium text-[#4f5bdd] dark:bg-[#8ea1ff]/16 dark:text-[#d7dcff] dark:ring-white/12"
      >
        {command}
      </span>,
    );
    cursor = end;
  }
  if (nodes.length === 0) return message;
  if (cursor < message.length) nodes.push(message.slice(cursor));
  return nodes;
}

function renderSemanticToken(label: string, item: LogItem) {
  const metadata = item.metadata ?? {};

  if (label === "user") {
    const userDisplayName =
      typeof metadata.user_display_name === "string" ? metadata.user_display_name : "";
    const userName =
      typeof metadata.user_name === "string" ? metadata.user_name : "";
    const userId =
      metadata.user_id === null || metadata.user_id === undefined
        ? ""
        : String(metadata.user_id);

    const resolvedLabel = userDisplayName || userName || userId || "user";

    const titleParts = [
      userDisplayName ? `Display name: ${userDisplayName}` : null,
      userName ? `Username: ${userName}` : null,
      userId ? `User ID: ${userId}` : null,
    ].filter(Boolean);

    const token = LOG_TOKEN_THEME.user ?? LOG_TOKEN_THEME.unknown;

    return (
      <span
        className={token.className}
        data-token-kind={token.kind}
        data-token-label={label}
        data-user-display-name={userDisplayName}
        data-user-name={userName}
        data-user-id={userId}
        title={titleParts.length > 0 ? titleParts.join(" • ") : token.title ?? label}
      >
        @{resolvedLabel}
      </span>
    );
  }

  const token = LOG_TOKEN_THEME[label] ?? LOG_TOKEN_THEME.unknown;

  return (
    <span
      className={token.className}
      data-token-kind={token.kind}
      data-token-label={label}
      title={token.title ?? label}
    >
      {`<${label}>`}
    </span>
  );
}

function renderMessageWithTokens(
  item: LogItem,
  message: string,
  logParams: Array<{
    kind?: unknown;
    label?: unknown;
    value?: unknown;
    details?: unknown;
  }>,
  renderParamToken: (param: {
    kind?: unknown;
    label?: unknown;
    value?: unknown;
    details?: unknown;
  }) => React.ReactNode,
) {
  const tokenRegex = /<([a-z][\w-]*)>/gi;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of message.matchAll(tokenRegex)) {
    const fullToken = match[0];
    const label = match[1];
    const start = match.index ?? -1;

    if (start < 0) continue;

    const end = start + fullToken.length;
    const param = logParams.find(
      (candidate) => typeof candidate?.label === "string" && candidate.label === label,
    );

    if (start > cursor) {
      nodes.push(renderMessageWithSlashCommands(message.slice(cursor, start)));
    }

    if (param) {
      nodes.push(
        <span key={`${start}-${label}-param`}>
          {renderParamToken(param)}
        </span>,
      );
      cursor = end;
      continue;
    }

    nodes.push(
      <span key={`${start}-${label}-semantic`}>
        {renderSemanticToken(label, item)}
      </span>,
    );
    cursor = end;
  }

  if (nodes.length === 0) {
    return renderMessageWithSlashCommands(message);
  }

  if (cursor < message.length) {
    nodes.push(renderMessageWithSlashCommands(message.slice(cursor)));
  }

  return nodes;
}

function renderLogMessage(item: LogItem) {
  const message = item.message;
  const metadata = item.metadata ?? {};
  const logParams = Array.isArray(metadata.log_params) ? metadata.log_params : [];

  const renderParamToken = (param: {
    kind?: unknown;
    label?: unknown;
    value?: unknown;
    details?: unknown;
  }) => {
    const label = typeof param.label === "string" ? param.label : "unknown";
    const kind = typeof param.kind === "string" ? param.kind : "";
    const value =
      param.value === null || param.value === undefined ? "" : String(param.value);
    const details =
      param.details && typeof param.details === "object"
        ? JSON.stringify(param.details)
        : "{}";

    const themed = LOG_TOKEN_THEME[label] ?? LOG_TOKEN_THEME.unknown;

    return (
      <span
        className={themed.className}
        data-param-kind={kind}
        data-param-label={label}
        data-param-value={value}
        data-param-details={details}
        title={themed.title ?? label}
      >
        {`<${label}>`}
      </span>
    );
  };

  return renderMessageWithTokens(item, message, logParams, renderParamToken);
}

function JsonToken({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}

function renderJsonValueToken(rawValue: string) {
  const value = rawValue.trim();

  if (value.length === 0) {
    return null;
  }

  if (value === "{" || value === "}" || value === "[" || value === "]") {
    return <JsonToken className="text-foreground/58">{value}</JsonToken>;
  }

  if (value === "true" || value === "false") {
    return <JsonToken className="text-amber-600 dark:text-amber-300">{value}</JsonToken>;
  }

  if (value === "null") {
    return <JsonToken className="text-rose-600 dark:text-rose-300">{value}</JsonToken>;
  }

  if (/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value)) {
    return <JsonToken className="text-sky-700 dark:text-sky-300">{value}</JsonToken>;
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    return <JsonToken className="text-emerald-700 dark:text-emerald-300">{value}</JsonToken>;
  }

  return <JsonToken className="text-foreground/76">{value}</JsonToken>;
}

function renderJsonLine(line: string, index: number) {
  const indent = line.match(/^\s*/) ?? [""];
  const indentValue = indent[0];
  const trimmed = line.trim();

  if (trimmed.length === 0) {
    return <div key={index} className="h-5" aria-hidden="true" />;
  }

  const objectEntryMatch = trimmed.match(/^("(?:[^"\\]|\\.)+")(:\s)(.*?)(,?)$/);

  if (objectEntryMatch) {
    const [, key, separator, rawValue, trailingComma] = objectEntryMatch;

    return (
      <div key={index} className="whitespace-pre">
        {indentValue}
        <JsonToken className="text-violet-700 dark:text-violet-300">{key}</JsonToken>
        <JsonToken className="text-foreground/50">{separator}</JsonToken>
        {renderJsonValueToken(rawValue)}
        {trailingComma ? <JsonToken className="text-foreground/50">{trailingComma}</JsonToken> : null}
      </div>
    );
  }

  const arrayValueMatch = trimmed.match(/^(.*?)(,?)$/);

  if (arrayValueMatch) {
    const [, rawValue, trailingComma] = arrayValueMatch;

    return (
      <div key={index} className="whitespace-pre">
        {indentValue}
        {renderJsonValueToken(rawValue)}
        {trailingComma ? <JsonToken className="text-foreground/50">{trailingComma}</JsonToken> : null}
      </div>
    );
  }

  return (
    <div key={index} className="whitespace-pre text-foreground/76">
      {line}
    </div>
  );
}

function formatLevelLabel(level: LogLevel) {
  return level;
}

function truncateMiddle(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  const head = value.slice(0, Math.floor(maxLength / 2) - 1);
  const tail = value.slice(-(Math.floor(maxLength / 2) - 2));
  return `${head}...${tail}`;
}

function formatSourceLabel(source: string | null) {
  if (!source) {
    return "-";
  }

  return truncateMiddle(source, 18);
}

function formatModuleLabel(module: string) {
  return truncateMiddle(module, 22);
}

function formatContextLabel(module: string | null, functionName: string | null) {
  const normalizedModule = module?.trim();
  const normalizedFunction = functionName?.trim();

  if (normalizedModule && normalizedFunction) {
    return truncateMiddle(`${normalizedModule}:${normalizedFunction}`, 40);
  }

  if (normalizedModule) {
    return formatModuleLabel(normalizedModule);
  }

  if (normalizedFunction) {
    return truncateMiddle(normalizedFunction, 26);
  }

  return "—";
}

function getItemKey(item: LogItem) {
  return `${item.id}-${item.timestamp}-${item.level}`;
}

function SeverityLabel({ level }: { level: LogLevel }) {
  const Icon =
    level === "DEBUG"
      ? Bug
      : level === "SUCCESS"
        ? Check
        : level === "INFO"
          ? Info
          : level === "WARNING"
            ? TriangleAlert
            : level === "ERROR" || level === "CRITICAL"
              ? AlertCircle
              : Info;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]",
        LOG_LEVEL_TEXT_STYLES[level],
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 stroke-[2.25]" aria-hidden="true" />
      {formatLevelLabel(level)}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  title,
  emphasized = false,
}: {
  label: string;
  value: React.ReactNode;
  title?: string;
  emphasized?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600/72 dark:text-indigo-300/68">
        {label}
      </p>
      <p
        title={title}
        className={cn(
          "text-[11px] leading-5 text-foreground/76",
          emphasized ? "line-clamp-2 text-[11px] text-foreground/84" : "truncate",
          jetbrainsMono.className,
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-600/72 dark:text-indigo-300/68">
      {children}
    </p>
  );
}

function RawJsonBlock({ label, value }: { label: string; value: string }) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  }

  return (
    <div>
      <SectionLabel>{label}</SectionLabel>

      <div className="group relative max-h-80 overflow-auto rounded-md bg-black/[0.02] p-3.5 ring-1 ring-black/[0.06] dark:bg-surface/35 dark:ring-white/[0.08]">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-black/[0.08] bg-background/55 text-foreground/56 opacity-35 backdrop-blur-sm transition hover:text-foreground/82 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/35 group-hover:opacity-100 dark:border-white/[0.12] dark:bg-surface/70 dark:text-foreground/62 dark:hover:text-foreground/88"
          aria-label={copied ? "Copied raw JSON" : "Copy raw JSON to clipboard"}
          title={copied ? "Copied" : "Copy JSON"}
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>

        <div
          className={cn(
            "pr-10 text-[11px] leading-5",
            isDark ? "text-slate-200" : "text-slate-800",
            jetbrainsMono.className,
          )}
        >
          {value.split("\n").map((line, index) => renderJsonLine(line, index))}
        </div>
      </div>
    </div>
  );
}

function LogsExpandedRow({ item, rowId }: { item: LogItem; rowId: string }) {
  const { title: fullTimestamp } = formatTimestamp(item.timestamp);
  const rawJsonValue = formatStructuredValue(item);

  return (
    <motion.div
      id={rowId}
      role="row"
      className="bg-black/[0.018] dark:border-white/[0.05] dark:bg-surface/14"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div
        role="cell"
        className="px-4 py-5 sm:px-6"
        style={{ gridColumn: `1 / span ${COLUMN_COUNT}` }}
      >
        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-y-6">
              <SummaryCard label="Timestamp" value={fullTimestamp} />
              <SummaryCard label="Level" value={item.level} />
              <SummaryCard label="Logger" value={item.logger} />
              <SummaryCard label="Module" value={item.module} />
              <SummaryCard label="Function" value={item.function ?? "—"} />
              <SummaryCard label="Line" value={item.line !== null ? String(item.line) : "—"} />
              <SummaryCard label="Source" value={item.source ?? "—"} />
              <SummaryCard
                label="Message"
                value={renderLogMessage(item)}
                title={item.message}
                emphasized
              />
            </div>
          </div>

          <div>
            <RawJsonBlock label="JSON" value={rawJsonValue} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LogsRow({
  item,
  expanded,
  onToggle,
}: {
  item: LogItem;
  expanded: boolean;
  onToggle: (key: string) => void;
}) {
  const itemKey = getItemKey(item);
  const timestamp = formatTimestamp(item.timestamp);
  const detailsId = `${itemKey}-details`;
  const canExpand = true;

  return (
    <>
      <div
        role="row"
        style={{ gridTemplateColumns: GRID_TEMPLATE }}
        className={cn(
          "grid w-full cursor-pointer border-b border-black/[0.04] text-[12px] text-foreground/80 transition-colors hover:bg-indigo-500/[0.04] dark:border-white/[0.06] dark:hover:bg-indigo-500/[0.06]",
          expanded ? "bg-black/[0.01] dark:bg-surface/14" : "bg-transparent",
        )}
        onClick={() => {
          if (canExpand) {
            onToggle(itemKey);
          }
        }}
        aria-expanded={canExpand ? expanded : undefined}
      >
        <div role="cell" className="whitespace-nowrap px-2 py-1.5 self-center">
          <SeverityLabel level={item.level} />
        </div>

        <div
          role="cell"
          className={`whitespace-nowrap px-2 py-1.5 self-center text-[12px] text-foreground/58 ${jetbrainsMono.className}`}
        >
          <span title={timestamp.title}>{timestamp.label}</span>
        </div>

        <div
          role="cell"
          title={
            item.module && item.function
              ? `${item.module}:${item.function}`
              : item.module || item.function || undefined
          }
          className={`truncate px-2 py-1.5 self-center text-[12px] text-foreground/62 ${jetbrainsMono.className}`}
        >
          {formatContextLabel(item.module, item.function)}
        </div>

        <div role="cell" title={item.message} className="min-w-0 px-2 py-1.5 self-center">
          <p className={`truncate text-[12px] leading-5 text-muted-foreground ${jetbrainsMono.className}`}>
            {renderLogMessage(item)}
          </p>
        </div>

        <div
          role="cell"
          title={item.source ?? undefined}
          className={`truncate px-2 py-1.5 self-center text-[12px] text-foreground/58 ${jetbrainsMono.className}`}
        >
          {formatSourceLabel(item.source)}
        </div>

        <div
          role="cell"
          className={`whitespace-nowrap px-2 py-1.5 text-center self-center text-[12px] text-foreground/62 ${jetbrainsMono.className}`}
        >
          {item.line ?? "-"}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && canExpand ? <LogsExpandedRow item={item} rowId={detailsId} /> : null}
      </AnimatePresence>
    </>
  );
}

function HeaderCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="columnheader"
      className={`whitespace-nowrap px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.14em] text-foreground/44 ${className}`}
    >
      {children}
    </div>
  );
}

type LogsTimelineProps = {
  items: LogItem[];
  emptyStateVariant?: "filtered" | "global";
};

function LogsEmptyState({ variant }: { variant: "filtered" | "global" }) {
  const title = variant === "filtered" ? "No matching logs" : "No logs available yet";
  const description =
    variant === "filtered"
      ? "Try clearing the search or changing the selected log level."
      : "Logs will appear here once the pipeline ingests entries.";

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-lg bg-black/[0.02] px-5 py-7 text-center ring-1 ring-black/8 dark:bg-white/[0.03] dark:ring-white/10">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground/72">{title}</p>
        <p className="mt-2 text-[12px] leading-6 text-foreground/52">{description}</p>
      </div>
    </div>
  );
}

export function LogsTimeline({ items, emptyStateVariant = "global" }: LogsTimelineProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  function handleToggle(key: string) {
    setExpandedKeys((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }

  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
      <div className="min-h-0 w-full flex-1 overflow-x-auto">
          <div className="flex h-full min-h-0 w-full min-w-[980px] flex-col" role="table" aria-label="Logs table">
            <div className="shrink-0 border-b border-black/[0.07] bg-background/72 backdrop-blur-md dark:border-white/[0.11] dark:bg-background/72">
              <div role="row" className="grid w-full" style={{ gridTemplateColumns: GRID_TEMPLATE }}>
                <HeaderCell>Level</HeaderCell>
                <HeaderCell>Time</HeaderCell>
                <HeaderCell>Context</HeaderCell>
                <HeaderCell>Message</HeaderCell>
                <HeaderCell>Source</HeaderCell>
                <HeaderCell className="text-center">Line</HeaderCell>
              </div>
            </div>

            <div className="scrollbar-discord min-h-0 w-full flex-1 overflow-y-auto" role="rowgroup">
              {items.length === 0 ? (
                <LogsEmptyState variant={emptyStateVariant} />
              ) : (
                items.map((item) => {
                  const key = getItemKey(item);

                  return (
                    <LogsRow
                      key={key}
                      item={item}
                      expanded={expandedKeys.has(key)}
                      onToggle={handleToggle}
                    />
                  );
                })
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
