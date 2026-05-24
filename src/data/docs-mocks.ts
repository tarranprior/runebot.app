import { DiscordMessage } from "@/types/discord";

const AUTHOR_NAME = "Runebot";
const AUTHOR_AVATAR = "/images/runebot-ico.png";
const DOCS_VERSION_TEXT = "1.0.7-dev.2";

export const docsEmbedMockRegistry = {
  "player-not-found": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#5865F2",
        title: "Unable to fetch player stats",
        description:
          "We could not find that player right now. Check the name and try again.",
        footer: {
          text: `Runebot v${DOCS_VERSION_TEXT}`,
        },
      },
    ],
  },
} satisfies Record<string, DiscordMessage>;

export type DocsEmbedMockId = keyof typeof docsEmbedMockRegistry;

export function getDocsEmbedMock(id: string): DiscordMessage | null {
  return docsEmbedMockRegistry[id as DocsEmbedMockId] ?? null;
}
