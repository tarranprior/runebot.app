export type NewsChangeType =
  | "new"
  | "improved"
  | "fixed"
  | "notice"
  | "removed";

export type NewsChangeGroup = {
  type: NewsChangeType;
  items: string[];
};

export type NewsRelease = {
  version: string;
  title: string;
  date: string;
  summary: string;
  changes: NewsChangeGroup[];
  latest?: boolean;
};

export function getNewsReleaseId(release: Pick<NewsRelease, "version">) {
  return `release-${release.version.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export const newsReleases: NewsRelease[] = [
  {
    version: "v1.0.6",
    title: "Account Manager & Refresh Controls",
    date: "March 17, 2026",
    summary: "",
    latest: true,
    changes: [
      {
        type: "new",
        items: [
          "A new Account Manager lets you save and switch between up to five RuneScape accounts.",
          "Refresh and delete controls make it easier to keep saved accounts organised.",
        ],
      },
      {
        type: "improved",
        items: [
          "Refresh buttons are now available on both stats and price results.",
          "Account type icons and clearer prompts make choosing a default account simpler.",
        ],
      },
      {
        type: "fixed",
        items: [
          "Price timestamps now display correctly.",
          "Saved accounts can no longer be duplicated by changing username letter case.",
        ],
      },
      {
        type: "notice",
        items: [
          "The old `/unsetrsn` workflow is being replaced by the Account Manager's delete controls.",
        ],
      },
    ],
  },
  {
    version: "v1.0.5",
    title: "Verified Application & Stats Improvements",
    date: "October 14, 2023",
    summary: "",
    changes: [
      {
        type: "new",
        items: [
          "Save a RuneScape username with `/setrsn` for faster lookups.",
          "Explore additional bosses, clue scrolls, and Bounty Hunter scores in `/stats`.",
          "Look up stats using a linked Discord username.",
        ],
      },
      {
        type: "improved",
        items: [
          "Stats categories now use buttons for quicker navigation.",
          "Ironman account icons, timestamps, and clearer validation improve result readability.",
        ],
      },
      {
        type: "notice",
        items: ["Runebot is now a verified Discord application."],
      },
    ],
  },
  {
    version: "v1.0.4",
    title: "Public Launch",
    date: "June 2, 2023",
    summary: "",
    changes: [
      {
        type: "new",
        items: [
          "Look up a player's skills and activities with `/stats`.",
          "Use autocomplete across commands including `/wikipedia`, `/price`, and `/quests`.",
        ],
      },
      {
        type: "improved",
        items: [
          "Searches are more resilient when matching player names and RuneScape content.",
          "Result embeds now include consistent footers and clearer presentation.",
        ],
      },
    ],
  },
];
