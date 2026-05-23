import { getDocsEmbedMock } from "@/data/docs-mocks";
import { DiscordMessage } from "@/components/ui/discord-message";

type DocsEmbedPreviewProps = {
  id: string;
};

export function DocsEmbedPreview({ id }: DocsEmbedPreviewProps) {
  const message = getDocsEmbedMock(id);

  if (!message) {
    return (
      <div className="rounded-md border border-dashed border-fd-border/60 bg-fd-card/40 px-3 py-2 text-sm text-fd-muted-foreground">
        Docs embed preview unavailable for ID: <code>{id}</code>
      </div>
    );
  }

  return <DiscordMessage message={message} />;
}
