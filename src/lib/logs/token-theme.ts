export type LogTokenKind =
  | "operation"
  | "subject"
  | "source"
  | "service"
  | "user"
  | "generic"
  | "defer"
  | "disambiguation";

export type LogTokenPresentation = {
  kind: LogTokenKind;
  label: string;
  title?: string;
  className: string;
};

const OPERATION_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-[5px] bg-sky-400/16 px-1.5 py-0.5 text-[0.92em] font-semibold text-sky-700 dark:bg-sky-400/22 dark:text-sky-200";
const SUBJECT_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-[5px] bg-amber-400/18 px-1.5 py-0.5 text-[0.92em] font-semibold text-amber-700 dark:bg-amber-400/24 dark:text-amber-200";
const SOURCE_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-[5px] bg-emerald-400/18 px-1.5 py-0.5 text-[0.92em] font-semibold text-emerald-700 dark:bg-emerald-400/24 dark:text-emerald-200";
const SERVICE_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-[5px] bg-slate-400/14 px-1.5 py-0.5 text-[0.92em] font-semibold text-slate-700 dark:bg-slate-400/16 dark:text-slate-200";
const USER_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-full bg-indigo-500/15 px-1.5 py-[1px] text-[0.92em] font-medium text-indigo-600 hover:bg-indigo-500/25 dark:bg-indigo-400/20 dark:text-indigo-200 dark:hover:bg-indigo-400/30 transition-colors";
const GENERIC_CLASSNAME =
  "mx-[1px] inline-flex items-center rounded-[5px] bg-muted px-1.5 py-0.5 text-[0.92em] font-semibold text-foreground/82";

export const LOG_TOKEN_THEME: Record<string, LogTokenPresentation> = {
  user: {
    kind: "user",
    label: "user",
    title: "User token",
    className: USER_CLASSNAME,
  },
  lookup: {
    kind: "operation",
    label: "lookup",
    title: "Lookup operation",
    className: OPERATION_CLASSNAME,
  },
  navigate: {
    kind: "operation",
    label: "navigate",
    title: "Navigation operation",
    className: OPERATION_CLASSNAME,
  },
  refresh: {
    kind: "operation",
    label: "refresh",
    title: "Refresh operation",
    className: OPERATION_CLASSNAME,
  },
  search: {
    kind: "operation",
    label: "search",
    title: "Search operation",
    className: OPERATION_CLASSNAME,
  },
  account_manager: {
    kind: "operation",
    label: "account_manager",
    title: "Account manager operation",
    className: OPERATION_CLASSNAME,
  },
  account_manager_refresh: {
    kind: "operation",
    label: "account_manager_refresh",
    title: "Account manager refresh operation",
    className: OPERATION_CLASSNAME,
  },
  account_delete: {
    kind: "operation",
    label: "account_delete",
    title: "Account delete operation",
    className: OPERATION_CLASSNAME,
  },
  account_delete_confirm: {
    kind: "operation",
    label: "account_delete_confirm",
    title: "Account delete confirmation operation",
    className: OPERATION_CLASSNAME,
  },
  account_delete_cancel: {
    kind: "operation",
    label: "account_delete_cancel",
    title: "Account delete cancellation operation",
    className: OPERATION_CLASSNAME,
  },
  default_account_select: {
    kind: "operation",
    label: "default_account_select",
    title: "Default account selection operation",
    className: OPERATION_CLASSNAME,
  },
  set: {
    kind: "operation",
    label: "set",
    title: "Set operation",
    className: OPERATION_CLASSNAME,
  },
  username: {
    kind: "subject",
    label: "username",
    title: "Provided username",
    className: SUBJECT_CLASSNAME,
  },
  resolved_username: {
    kind: "subject",
    label: "resolved_username",
    title: "Resolved username",
    className: SUBJECT_CLASSNAME,
  },
  search_query: {
    kind: "subject",
    label: "search_query",
    title: "Search query",
    className: SUBJECT_CLASSNAME,
  },
  resolved_search_term: {
    kind: "subject",
    label: "resolved_search_term",
    title: "Resolved search term",
    className: SUBJECT_CLASSNAME,
  },
  resolved_page_title: {
    kind: "subject",
    label: "resolved_page_title",
    title: "Resolved page title",
    className: SUBJECT_CLASSNAME,
  },
  default_account: {
    kind: "source",
    label: "default_account",
    title: "Default account resolution source",
    className: SOURCE_CLASSNAME,
  },
  load_page: {
    kind: "operation",
    label: "load_page",
    title: "Load page operation",
    className: OPERATION_CLASSNAME,
  },
  parse_price_data: {
    kind: "operation",
    label: "parse_price_data",
    title: "Parse price data operation",
    className: OPERATION_CLASSNAME,
  },
  parse_hiscores: {
    kind: "operation",
    label: "parse_hiscores",
    title: "Parse hiscores operation",
    className: OPERATION_CLASSNAME,
  },
  page_title: {
    kind: "subject",
    label: "page_title",
    title: "Page title",
    className: SUBJECT_CLASSNAME,
  },
  wiki_page: {
    kind: "service",
    label: "wiki_page",
    title: "Wiki page parser source",
    className: SERVICE_CLASSNAME,
  },
  price_api: {
    kind: "service",
    label: "price_api",
    title: "Price API source",
    className: SERVICE_CLASSNAME,
  },
  hiscores_api: {
    kind: "service",
    label: "hiscores_api",
    title: "Hiscores API source",
    className: SERVICE_CLASSNAME,
  },
  defer: {
    kind: "defer",
    label: "defer",
    title: "Defer operation",
    className: OPERATION_CLASSNAME,
  },
  disambiguation: {
    kind: "disambiguation",
    label: "disambiguation",
    title: "Disambiguation operation",
    className: OPERATION_CLASSNAME,
  },
  followup_send: {
    kind: "operation",
    label: "followup_send",
    title: "Follow up send operation",
    className: OPERATION_CLASSNAME,
  },
  dropdown: {
    kind: "source",
    label: "dropdown",
    title: "Dropdown source",
    className: SOURCE_CLASSNAME,
  },
  unknown: {
    kind: "generic",
    label: "unknown",
    title: "Unknown token",
    className: GENERIC_CLASSNAME,
  },
};