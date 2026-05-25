import { DiscordMessage } from "@/types/discord";
import { priceLookupMocks, wikiLookupMocks } from "@/data/feature-mocks";

const AUTHOR_NAME = "Runebot";
const AUTHOR_AVATAR = "/images/runebot-ico.png";
const DOCS_VERSION_TEXT = "1.0.7-dev.2";

const priceOldSchoolBondMock = priceLookupMocks.find(
  (mock) => mock.embeds?.[0]?.title === "Old school bond (ID: 13190)"
);

if (!priceOldSchoolBondMock) {
  throw new Error("Missing docs preview mock: Old school bond price lookup");
}

const wikiInfernalCapeMock = wikiLookupMocks.find(
  (mock) => mock.embeds?.[0]?.title === "Infernal cape"
);

if (!wikiInfernalCapeMock) {
  throw new Error("Missing docs preview mock: Infernal cape wiki lookup");
}

const invalidUsernameMock = {
  authorName: AUTHOR_NAME,
  authorAvatar: AUTHOR_AVATAR,
  isBot: true,
  timestamp: "Today at 00:00",
  embeds: [
    {
      embedColor: "#B72615",
      title: "Nothing interesting happens.",
      description:
        "The username provided is not valid. Please check the length and allowed characters, then try again.",
      thumbnail: "https://oldschool.runescape.wiki/images/Bank_filler_detail.png",
      footer: {
        text: `Runebot v${DOCS_VERSION_TEXT}`,
      },
    },
  ],
  buttons: [{ label: "Support Server ↗", variant: "secondary" }],
} satisfies DiscordMessage;

const noSavedAccountsMock = {
  authorName: AUTHOR_NAME,
  authorAvatar: AUTHOR_AVATAR,
  isBot: true,
  timestamp: "Today at 00:00",
  embeds: [
    {
      embedColor: "#8B8B8B",
      title: "Nothing interesting happens.",
      description:
        "You don't have any accounts yet. Use `/setrsn` to add your first account, or add the `username` argument to `/stats`.\n\n**Usage:** `/stats` or `/stats <USERNAME> [ACCOUNT_TYPE (optional)]`",
      footer: {
        text: `Runebot v${DOCS_VERSION_TEXT}`,
      },
    },
  ],
  buttons: [{ label: "Support Server ↗", variant: "secondary" }],
} satisfies DiscordMessage;

export const docsEmbedMockRegistry = {
  "price-old-school-bond": priceOldSchoolBondMock,
  "wiki-infernal-cape": wikiInfernalCapeMock,
  "error-invalid-username": invalidUsernameMock,
  "error-no-saved-accounts": noSavedAccountsMock,
  "account-manager": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 20:50",
    embeds: [
      {
        embedColor: "#5865F2",
        title: "Account Manager (Beta)",
        titleIconUrl: "/images/features/emotes/account.png",
        description:
          "View and manage accounts saved with Runebot.\n\nUse the dropdown below to select an account (sets it as default), and use the buttons to manage it.\n\n**Accounts (2 of 5)**\nFirmwares\nMyIronman (Ironman)",
        fields: [
          {
            name: "Select Menu",
            value: "Firmwares\nFirmwares\nMyIronman (Ironman)",
          },
        ],
        footer: {
          text: `Runebot v${DOCS_VERSION_TEXT}`,
        },
      },
    ],
    buttons: [
      { label: "⟳", variant: "secondary" },
      { label: "Delete", variant: "secondary" },
    ],
  },
  "generic-blurple": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#5865F2",
        title: "Runebot preview",
        description:
          "This is a generic Runebot embed preview. Replace this with a real command, notice, or exception response when documenting behaviour.",
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
