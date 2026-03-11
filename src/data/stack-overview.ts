export type StackOverviewCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  tone?: "green" | "amber" | "blue" | "purple" | "neutral";
  icon?: "commits" | "stars" | "languages" | "lifespan" | "surfaces";
  rows?: Array<{ label: string; value: string }>;
  rowValueStyle?: "plain" | "star" | "pill";
  chips?: string[];
};

export const runebotStackOverview: StackOverviewCard[] = [
  {
    id: "commits",
    title: "Total Commits",
    value: "181",
    subtitle: "",
    rows: [
      { label: "./runebot", value: "124" },
      { label: "./runebot.app", value: "17" },
      { label: "./runebot.org", value: "40" },
    ],
  },
  {
    id: "stars",
    title: "Total Stars",
    value: "14",
    subtitle: "",
    rowValueStyle: "star",
    rows: [
      { label: "./runebot", value: "12" },
      { label: "./runebot.app", value: "1" },
      { label: "./runebot.org", value: "1" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    value: "9",
    subtitle: "",
    chips: [
      "Python",
      "SQLite",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "YAML",
    ],
  },
  {
    id: "lifespan",
    title: "Avg. Lifespan",
    value: "696.6 days",
    subtitle: "",
    rowValueStyle: "pill",
    rows: [
      { label: "./runebot", value: "1013 days" },
      { label: "./runebot.app", value: "2 days" },
      { label: "./runebot.org", value: "1075 days" },
    ],
  },
  {
    id: "surfaces",
    title: "Public",
    value: "3",
    subtitle: "",
    rows: [
      { label: "./runebot", value: "live" },
      { label: "./runebot.app", value: "live" },
      { label: "./runebot.org", value: "archived" }
    ],
  },
];
