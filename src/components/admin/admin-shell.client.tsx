"use client";

import type { ReactNode } from "react";
import { AdminPrimarySidebar } from "./admin-primary-sidebar.client";
import { AdminSecondarySidebar } from "./admin-secondary-sidebar.client";
import type { LogSession } from "@/lib/logs/types";

type AdminShellProps = {
  children: ReactNode;
  sessions: LogSession[];
  selectedSessionId: string | null;
};

/**
 * Admin dashboard shell — page-scoped multi-bar sidebar layout.
 * Wraps the logs page content without touching admin layout auth.
 */
export function AdminShell({ children, sessions, selectedSessionId }: AdminShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden">
      {/* Primary icon rail — hidden on small screens */}
      <div className="hidden md:flex min-h-0 items-stretch">
        <AdminPrimarySidebar forceCollapsed={true} />
      </div>

      {/* Secondary panel — hidden on small screens */}
      <div className="hidden md:flex min-h-0 items-stretch">
        <AdminSecondarySidebar sessions={sessions} selectedSessionId={selectedSessionId} />
      </div>

      {/* Main content area */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
