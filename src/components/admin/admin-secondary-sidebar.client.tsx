"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FileText,
  Filter,
  BarChart3,
  Settings,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogSession } from "@/lib/logs/types";

type SecondaryLink = {
  label: string;
  href?: string;
  icon?: React.ElementType;
  matchNested?: boolean;
  disabled?: boolean;
};

type AdminSecondarySidebarProps = {
  sessions: LogSession[];
  selectedSessionId: string | null;
};

function isActive(pathname: string, href: string, matchNested = true) {
  if (!matchNested) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function formatSessionPrimary(session: LogSession): string {
  return session.fileName ?? session.id;
}

function formatSessionSecondary(session: LogSession): string {
  return session.id;
}

const LOGS_NAV: SecondaryLink[] = [
  { href: "/admin/logs", label: "Sessions", icon: FileText, matchNested: false },
  { label: "Filters", icon: Filter, disabled: true },
  { label: "Reports", icon: BarChart3, disabled: true },
  { label: "Settings", icon: Settings, disabled: true },
];

export function AdminSecondarySidebar({ sessions, selectedSessionId }: AdminSecondarySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionSearch, setSessionSearch] = useState("");

  const filteredSessions = useMemo(() => {
    const q = sessionSearch.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        (s.fileName?.toLowerCase().includes(q) ?? false),
    );
  }, [sessions, sessionSearch]);

  function handleSelectSession(sessionId: string) {
    if (sessionId === selectedSessionId) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("session_id", sessionId);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <aside className="flex h-full w-[260px] min-w-[260px] flex-col border-r border-surface-border bg-background">
      {/* Section header */}
      <div className="border-b border-surface-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-foreground/90">Logs</div>
          <span className="rounded-full border border-blurple/20 bg-blurple/[0.08] px-2 py-0.5 text-[10px] font-semibold text-blurple">
            Beta
          </span>
        </div>
        <div className="mt-0.5 text-[14px] text-foreground/44">
          View and manage log sessions, filters, and reports.
        </div>
      </div>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-discord">
        {/* Nav links */}
        <nav className="px-3 py-3">
          <ul className="space-y-0.5">
            {LOGS_NAV.map((l) => {
              const Icon = l.icon;
              const active = l.href ? isActive(pathname, l.href, l.matchNested ?? true) : false;
              return (
                <li key={l.href ?? l.label}>
                  {l.href ? (
                    <Link
                      href={l.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-blurple/[0.08] text-blurple dark:bg-blurple/[0.13]"
                          : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground/90",
                      )}
                    >
                      {Icon ? (
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            active ? "text-blurple" : "text-foreground/40",
                          )}
                        />
                      ) : (
                        <span className="h-4 w-4 shrink-0" />
                      )}
                      <span className="font-semibold">{l.label}</span>
                    </Link>
                  ) : (
                    <span
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/35"
                      aria-disabled="true"
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4 shrink-0 text-foreground/25" />
                      ) : (
                        <span className="h-4 w-4 shrink-0" />
                      )}
                      <span className="font-semibold">{l.label}</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sessions */}
        <div className="border-t border-surface-border px-3 py-3">

          {/* Search */}
          <div className="pb-2 px-0.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/36" />
              <input
                value={sessionSearch}
                onChange={(e) => setSessionSearch(e.target.value)}
                placeholder="Search sessions…"
                className={cn(
                  "h-8 w-full rounded-lg border border-surface-border bg-surface pl-9 pr-9",
                  "text-[12px] text-foreground/82 placeholder:text-foreground/38",
                  "focus:outline-none focus:ring-2 focus:ring-blurple/30",
                )}
              />
              {sessionSearch && (
                <button
                  type="button"
                  onClick={() => setSessionSearch("")}
                  className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-foreground/36 transition hover:text-foreground/72"
                  aria-label="Clear session search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Session rows */}
          {sessions.length === 0 ? (
            <div className="px-2 py-3 text-[12px] text-foreground/40">
              No sessions yet
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="px-2 py-3 text-[12px] text-foreground/40">
              No sessions match your search
            </div>
          ) : (
            <div className="space-y-px">
              {filteredSessions.map((session) => {
                const active = session.id === selectedSessionId;
                return (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => handleSelectSession(session.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-[7px] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blurple/30",
                      active
                        ? "bg-foreground/[0.05]"
                        : "hover:bg-foreground/[0.03]",
                    )}
                  >
                    {/*
                     * Badge: consistent surface regardless of active state so it
                     * reads as part of the entity rather than a floating indicator.
                     * Only the icon color shifts to signal state.
                     */}
                    <span className="grid h-8 w-8 shrink-0 place-items-center">
                      <FileText
                        className={cn(
                          "h-3.5 w-3.5",
                          session.isCurrent
                            ? "text-emerald-500/70"
                            : active
                              ? "text-foreground/65"
                              : "text-foreground/30",
                        )}
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground/72">
                        {formatSessionPrimary(session)}
                      </div>
                      <div className="truncate text-[12px] text-foreground/42">
                        {formatSessionSecondary(session)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
