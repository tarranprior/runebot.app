import { LoadingOverlay } from "@/components/ui/loading-overlay";

/**
 * App Router segment loading UI for /admin and its children.
 * Shown while the initial server page (e.g. /admin/logs) is streaming in.
 */
export default function AdminLoading() {
  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center">
      <LoadingOverlay variant="standalone" />
    </div>
  );
}
