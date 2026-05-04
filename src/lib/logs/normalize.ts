import type {
  LogException,
  LogItem,
  LogLevel,
  LogMetadata,
  LogsPagination,
  LogsPayload,
  LogSession,
} from "@/lib/logs/types";

function asObject(input: unknown, path: string): Record<string, unknown> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new Error(`Expected object at ${path}.`);
  }

  return input as Record<string, unknown>;
}

function asArray(input: unknown, path: string): unknown[] {
  if (!Array.isArray(input)) {
    throw new Error(`Expected array at ${path}.`);
  }

  return input;
}

function expectString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new Error(`Expected string at ${path}.`);
  }

  return value;
}

function maybeString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
}

function toBaseFileName(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const segments = value.split(/[\\/]/).filter(Boolean);

  if (segments.length === 0) {
    return value;
  }

  return segments[segments.length - 1] ?? value;
}

function expectFiniteNumber(value: unknown, path: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Expected finite number at ${path}.`);
  }

  return value;
}

function expectNonNegativeInteger(value: unknown, path: string): number {
  const number = expectFiniteNumber(value, path);

  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Expected non-negative integer at ${path}.`);
  }

  return number;
}

function normalizeSessionIdValue(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? normalized : null;
  }

  if (typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= 0) {
    return String(value);
  }

  return null;
}

function normalizeLevel(value: unknown): LogLevel {
  if (typeof value !== "string") {
    return "UNKNOWN";
  }

  const normalized = value.trim().toUpperCase();

  switch (normalized) {
    case "DEBUG":
    case "SUCCESS":
    case "INFO":
    case "WARNING":
    case "ERROR":
    case "CRITICAL":
      return normalized;
    default:
      return "UNKNOWN";
  }
}

function normalizeLine(value: unknown, path: string): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  return expectNonNegativeInteger(value, path);
}

function normalizeMetadata(value: unknown, path: string): LogMetadata {
  if (value === null || value === undefined) {
    return {};
  }

  return asObject(value, path);
}

function normalizeException(value: unknown, path: string): LogException {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return asObject(value, path);
}

function normalizeLogItem(input: unknown, index: number): LogItem {
  const item = asObject(input, `items[${index}]`);
  const rawId = item.id;

  return {
    id:
      typeof rawId === "string"
        ? rawId
        : String(expectNonNegativeInteger(rawId, `items[${index}].id`)),
    timestamp: expectString(item.timestamp, `items[${index}].timestamp`),
    level: normalizeLevel(item.level),
    logger: expectString(item.logger, `items[${index}].logger`),
    module: expectString(item.module, `items[${index}].module`),
    function: expectString(item.function, `items[${index}].function`),
    line: normalizeLine(item.line, `items[${index}].line`),
    message: expectString(item.message, `items[${index}].message`),
    source: expectString(item.source, `items[${index}].source`),
    sessionId: maybeString(item.session_id ?? item.sessionId),
    traceId: maybeString(item.trace_id ?? item.traceId),
    metadata: normalizeMetadata(item.metadata, `items[${index}].metadata`),
    exception: normalizeException(item.exception, `items[${index}].exception`),
  };
}

function normalizePagination(input: unknown): LogsPagination {
  const pagination = asObject(input, "pagination");

  return {
    page: expectNonNegativeInteger(pagination.page, "pagination.page"),
    pageSize: expectNonNegativeInteger(pagination.page_size, "pagination.page_size"),
    total: expectNonNegativeInteger(pagination.total, "pagination.total"),
  };
}

function normalizeLevelCounts(value: unknown): Partial<Record<LogLevel, number>> {
  if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const raw = value as Record<string, unknown>;
  const result: Partial<Record<LogLevel, number>> = {};

  for (const [k, v] of Object.entries(raw)) {
    const level = normalizeLevel(k);

    if (level === "UNKNOWN") {
      continue;
    }

    if (typeof v === "number" && Number.isFinite(v) && v >= 0) {
      result[level] = Math.floor(v);
    }
  }

  return result;
}

function normalizeMeta(input: unknown): LogsPayload["meta"] {
  if (input === null || input === undefined) {
    return undefined;
  }

  const metaObj = asObject(input, "meta");

  const memoryBytes = metaObj.memory_bytes;
  const durationMs = metaObj.duration_ms;
  const version = metaObj.version;

  if (
    (memoryBytes !== null && memoryBytes !== undefined && typeof memoryBytes !== "number") ||
    typeof durationMs !== "number" ||
    typeof version !== "string"
  ) {
    return undefined;
  }

  return {
    memory_bytes: memoryBytes ?? null,
    duration_ms: durationMs,
    version,
  };
}

export function normalizeLogsPayload(input: unknown): LogsPayload {
  const payload = asObject(input, "payload");
  const items = asArray(payload.items, "items");

  return {
    items: items.map((item, index) => normalizeLogItem(item, index)),
    pagination: normalizePagination(payload.pagination),
    levelCounts: normalizeLevelCounts(payload.level_counts),
    meta: normalizeMeta(payload.meta),
  };
}

function normalizeLogSession(input: unknown, index: number): LogSession {
  const session = asObject(input, `sessions[${index}]`);
  const id = normalizeSessionIdValue(session.session_id) ?? normalizeSessionIdValue(session.id);

  if (!id) {
    throw new Error(`Expected non-empty session_id or id at sessions[${index}].`);
  }

  const startedAt =
    maybeString(session.started_at) ??
    maybeString(session.startedAt) ??
    maybeString(session.created_at) ??
    maybeString(session.createdAt) ??
    maybeString(session.timestamp) ??
    maybeString(session.started);

  const rawFileName =
    maybeString(session.log_file) ??
    maybeString(session.file_name) ??
    maybeString(session.filename) ??
    maybeString(session.file) ??
    maybeString(session.path);

  const fileName = toBaseFileName(rawFileName);

  return {
    id,
    startedAt,
    fileName,
    isCurrent: Boolean(session.is_current ?? session.current ?? session.active),
  };
}

export function normalizeLogSessions(input: unknown): LogSession[] {
  const root = Array.isArray(input) ? input : asObject(input, "sessions payload");
  const rawSessions = Array.isArray(root)
    ? root
    : Array.isArray(root.sessions)
      ? root.sessions
      : Array.isArray(root.payload)
        ? root.payload
        : Array.isArray((root.payload as Record<string, unknown> | undefined)?.sessions)
          ? ((root.payload as Record<string, unknown>).sessions as unknown[])
          : (() => {
              throw new Error("Expected sessions array in sessions payload.");
            })();

  return rawSessions
    .map((session, index) => normalizeLogSession(session, index))
    .sort((left, right) => {
      if (left.isCurrent !== right.isCurrent) {
        return left.isCurrent ? -1 : 1;
      }

      const leftTime = left.startedAt ? Date.parse(left.startedAt) : Number.NaN;
      const rightTime = right.startedAt ? Date.parse(right.startedAt) : Number.NaN;

      if (Number.isFinite(leftTime) && Number.isFinite(rightTime) && leftTime !== rightTime) {
        return rightTime - leftTime;
      }

      if (Number.isFinite(leftTime) !== Number.isFinite(rightTime)) {
        return Number.isFinite(leftTime) ? -1 : 1;
      }

      return right.id.localeCompare(left.id);
    });
}