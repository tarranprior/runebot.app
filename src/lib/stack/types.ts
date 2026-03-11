export type StackRepoStatus = "live" | "archived" | "planned" | "internal";
export type StackRepoKind = "bot" | "website" | "service" | "library" | "other";

export type StackConfigEntry = {
  key: string;
  label: string;
  repo: string;
  owner: string;
  status: StackRepoStatus;
  kind: StackRepoKind;
};

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

export type GeneratedStackRepoMetrics = {
  key: string;
  label: string;
  owner: string;
  repo: string;
  status: StackRepoStatus;
  kind: StackRepoKind;
  isPrivate: boolean;
  stars: number;
  commits: number;
  languages: string[];
  createdAt: string;
  pushedAt: string;
  ageDays: number;
  lifespanDays: number;
  htmlUrl: string;
};

export type GeneratedStackTotals = {
  commits: number;
  stars: number;
  languages: number;
  public: number;
};

export type GeneratedStackOverviewMetrics = {
  avgLifespanDays: number;
};

export type GeneratedStackOverviewPayload = {
  generatedAt: string;
  totals: GeneratedStackTotals;
  languages: string[];
  repos: GeneratedStackRepoMetrics[];
  overview: GeneratedStackOverviewMetrics;
};
