import { getDocsEmbedMock } from "@/data/docs-mocks";
import { DiscordMessage } from "@/components/ui/discord-message";

type DocsEmbedPreviewProps = {
  id: string;
  className?: string;
  ephemeral?: boolean;
};

export function DocsEmbedPreview({ id, className = "", ephemeral = false }: DocsEmbedPreviewProps) {
  const message = getDocsEmbedMock(id);

  if (!message) {
    return (
      <div className="rounded-md border border-dashed border-fd-border/60 bg-fd-card/40 px-3 py-2 text-sm text-fd-muted-foreground">
        Docs embed preview unavailable for ID: <code>{id}</code>
      </div>
    );
  }

  if (ephemeral) {
    return (
      <div className={`mx-auto w-full ${className}`}>
        {/* Backdrop uses the same horizontal padding as site Container so it lines up with codeblocks */}
        <div className="w-full bg-[#5865F2]/10 px-4 sm:px-6 lg:px-8 py-3 relative overflow-hidden">
          {/* thin straight left bar flush with the backdrop's left edge and full height */}
          <div className="absolute left-0 inset-y-0 w-px bg-[#5865F2] rounded-none" />

          <div className="max-w-[520px]">
            <DiscordMessage message={message} />
          </div>

          <div className="mt-2 ml-[calc(40px_+_0.75rem)] text-[11px] text-fd-muted-foreground">
            Only you can see this · <span className="text-[#5865F2]">Dismiss message</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <DiscordMessage message={message} />
    </div>
  );
}
