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
      footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
    },
  ],
  buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
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
      footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
    },
  ],
  buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
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
          "View and manage accounts saved with Runebot.\n\nUse the dropdown below to select an account (sets it as default), and use the buttons to manage it.\n\n**Accounts (2 of 5)**\nZezima\n{**account_name**} (Ironman)",
        fields: [
          {
            name: "Select Menu",
            value: "Zezima\nZezima\n{**account_name**} (Ironman)",
          },
        ],
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
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
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
  },
  "stats-no-gamemode-data": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The username provided doesn't appear to exist under this `account_type`. Please select a different `account_type`, or try another username.\n\n**Usage**: `/stats` or `/stats <USERNAME> [ACCOUNT_TYPE (optional)]`",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
  },
  "stats-invalid-component": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description: "This stats control is no longer valid. Please run /stats again.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
  },
  "wrong-component-user": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description: "Only the original author can use these buttons.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
  },
  "account-delete-no-default": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#5865F2",
        title: "Nothing interesting happens.",
        description: "You do not have a default account to delete.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
  },
  "account-delete-confirm": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#B72615",
        title: "Confirmation",
        description:
          "Are you sure you want to delete the account **{account_name}**? You can re-add the account with /setrsn at any time.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [
      { label: "Confirm", variant: "primary", destructive: true },
      { label: "Cancel", variant: "secondary" },
    ],
  },
  "account-manager-empty": {
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
          "View and manage accounts saved with Runebot.\n\nUse the dropdown below to select an account (sets it as default), and use the buttons to manage it.\n\n**Accounts (0 of 5)**\nYou don't have any accounts yet. Use `/setrsn` to add your first account.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [
      { label: "⟳", variant: "secondary" },
      { label: "Delete", variant: "secondary", disabled: true },
    ],
  },
  "runtime-failure": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description: "Something went wrong while handling that request. Please try again.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "no-alchemy-data": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The term you have searched for does not appear to have any `AlchemyData`. Try selecting one of the options from the list of autocomplete suggestions.\n\n**Usage**: `/alchemy <SEARCH_QUERY>`",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },

  "nonexistence": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The term you have searched for does not exist in Old School RuneScape. It may have never existed, or was added to RuneScape after the August 2007 Archive of RuneScape, which Old School RuneScape was based on, and has not been replicated.\n\nIf you are searching for a future update, please look for it at [upcoming updates](https://oldschool.runescape.wiki/w/Upcoming_updates) or create an article about it, supplying definite sources and citations.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "no-minigame-data": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The term you have searched for does not appear to have any `MinigameData`. Try selecting one of the options from the list of autocomplete suggestions, or visit [this page](https://oldschool.runescape.wiki/w/Minigames) for a full list of minigames.\n\n**Usage**: `/minigames <SEARCH_QUERY>`",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "no-monster-data": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The term you have searched for does not appear to have any `MonsterData`. Try selecting one of the options from the list of autocomplete suggestions, or visit [this page](https://oldschool.runescape.wiki/w/Bestiary) for a full list of monsters.\n\n**Usage**: `/bestiary <SEARCH_QUERY>`",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "no-quest-data": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8B8B8B",
        title: "Nothing interesting happens.",
        description:
          "The term you have searched for does not have any `QuestData`. Try selecting one of the options from the list of autocomplete suggestions, or visit [this page](https://oldschool.runescape.wiki/w/Quests/List) for a full list of quests.\n\n**Usage**: `/quests <SEARCH_QUERY>`",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "stub-article": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#60533E",
        title: "This project page is a stub.",
        description:
          "This means there is insufficient information on this article to display. However, this does not mean the stub is not a legitimate article; it just needs to be expanded or may not be supported by Runebot at this time.",
        thumbnail: "/images/docs/stub.png",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "error-no-hiscore": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#B72615",
        title: "Nothing interesting happens.",
        description:
          "The player you have searched for doesn't appear to exist on the **Hiscores**, or the **API** is currently unavailable. Please try another username or try again later.",
        thumbnail: "/images/docs/error.png",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "error-wiki-request-failed": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#B72615",
        title: "Nothing interesting happens.",
        description:
          "The Old School RuneScape Wiki could not be reached for this request. This may be due to rate limiting, temporary blocking, or an upstream availability issue. Please try again shortly.",
        thumbnail: "/images/docs/error.png",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "setrsn-success": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#5865F2",
        title: "Account has been set.",
        description:
          "Your default account has now been set to **Zezima**.\n\nYou can set a new default at any time by using `/setrsn`, or use the :account: Account Manager under `/stats` to manage all of your accounts.",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [
      {
        label: "Hiscores ↗",
        variant: "secondary",
        href: "https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=Zezima",
      },
    ],
  },
  "maximum-accounts-reached": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#B72615",
        title: "Nothing interesting happens.",
        description:
          "You have reached the maximum of **5 accounts** for your Discord account. Remove an existing account before adding a new one.",
        thumbnail: "/images/docs/error.png",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
  "no-administrator-permissions": {
    authorName: AUTHOR_NAME,
    authorAvatar: AUTHOR_AVATAR,
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#B72615",
        title: "Nothing interesting happens.",
        description:
          "This command can only be used by **administrators**. For more information on commands, use `/help`.",
        thumbnail: "/images/docs/error.png",
        footer: { text: `Runebot v${DOCS_VERSION_TEXT} • Today at 00:00` },
      },
    ],
    buttons: [{ label: "Support Server ↗", variant: "secondary", href: "https://discord.com/invite/FWjNkNuTzv" }],
  },
} satisfies Record<string, DiscordMessage>;

export type DocsEmbedMockId = keyof typeof docsEmbedMockRegistry;

export function getDocsEmbedMock(id: string): DiscordMessage | null {
  return docsEmbedMockRegistry[id as DocsEmbedMockId] ?? null;
}
