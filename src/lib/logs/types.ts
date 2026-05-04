export type LogLevel =
  | "DEBUG"
  | "SUCCESS"
  | "INFO"
  | "WARNING"
  | "ERROR"
  | "CRITICAL"
  | "UNKNOWN";

export type LogMetadata = Record<string, unknown>;
export type LogException = Record<string, unknown> | string | null;

export type LogItem = {
  id: string;
  timestamp: string;
  level: LogLevel;
  logger: string;
  module: string;
  function: string;
  line: number | null;
  message: string;
  source: string;
  sessionId: string | null;
  traceId: string | null;
  metadata: LogMetadata;
  exception: LogException;
};

export type LogSession = {
  id: string;
  startedAt: string | null;
  fileName: string | null;
  isCurrent: boolean;
};

export type LogsPagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type LogsPayload = {
  items: LogItem[];
  pagination: LogsPagination;
  levelCounts: Partial<Record<LogLevel, number>>;
  meta?: {
    memory_bytes: number | null;
    duration_ms: number;
    version: string;
  };
};

export type GetLogsParams = {
  page?: number;
  pageSize?: number;
  level?: string;
  module?: string;
  search?: string;
  sessionId?: string;
  range?: string;
};