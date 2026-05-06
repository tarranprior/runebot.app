import { LoadingOverlay } from "@/components/ui/loading-overlay";

/**
 * Segment loading UI for /admin/logs.
 * Keeps admin chrome visible while the logs payload is fetched server-side.
 */
export default function AdminLogsLoading() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-2 py-2 sm:px-3">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          <LoadingOverlay variant="standalone" />
        </div>
      </div>
    </div>
  );
}
