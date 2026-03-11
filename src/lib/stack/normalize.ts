import type {
  GeneratedStackOverviewPayload,
  StackOverviewCard,
} from "@/lib/stack/types";

function formatDays(days: number) {
  return `${days}d`;
}

export function toStackOverviewCards(
  payload: GeneratedStackOverviewPayload,
): StackOverviewCard[] {
  return [
    {
      id: "commits",
      title: "Total Commits",
      value: String(payload.totals.commits),
      subtitle: "",
      rows: payload.repos.map((repo) => ({
        label: repo.label,
        value: String(repo.commits),
      })),
    },
    {
      id: "stars",
      title: "Total Stars",
      value: String(payload.totals.stars),
      subtitle: "",
      rowValueStyle: "star",
      rows: payload.repos.map((repo) => ({
        label: repo.label,
        value: String(repo.stars),
      })),
    },
    {
      id: "languages",
      title: "Languages",
      value: String(payload.totals.languages),
      subtitle: "",
      chips: payload.languages,
    },
    {
      id: "lifespan",
      title: "Avg. Lifespan",
      value: `${payload.overview.avgLifespanDays} days`,
      subtitle: "",
      rowValueStyle: "pill",
      rows: payload.repos.map((repo) => ({
        label: repo.label,
        value: formatDays(repo.lifespanDays),
      })),
    },
    {
      id: "surfaces",
      title: "Public",
      value: String(payload.totals.public),
      subtitle: "",
      rows: payload.repos.map((repo) => ({
        label: repo.label,
        value: repo.status,
      })),
    },
  ];
}
