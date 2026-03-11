import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DAY_MS = 24 * 60 * 60 * 1000;
const GITHUB_API_BASE = "https://api.github.com";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "src", "data", "generated", "stack-overview.json");

type GithubRepoResponse = {
  html_url: string;
  private: boolean;
  stargazers_count: number;
  created_at: string;
  pushed_at: string;
};

function getGithubToken() {
  return process.env.GITHUB_FINE_GRAINED_TOKEN ?? process.env.GITHUB_TOKEN;
}

function createGithubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "runebot-stack-overview-generator",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchJson<T>(url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub API request failed (${response.status}) for ${url}\n${body.slice(0, 400)}`,
    );
  }

  return (await response.json()) as T;
}

async function fetchRepo(owner: string, repo: string, headers: Record<string, string>) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
  return fetchJson<GithubRepoResponse>(url, headers);
}

async function fetchRepoLanguages(
  owner: string,
  repo: string,
  headers: Record<string, string>,
): Promise<string[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`;
  const languageMap = await fetchJson<Record<string, number>>(url, headers);

  return Object.keys(languageMap).sort((a, b) => a.localeCompare(b));
}

async function fetchRepoCommitCount(
  owner: string,
  repo: string,
  headers: Record<string, string>,
): Promise<number> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=1`;
  const response = await fetch(url, { headers });

  if (response.status === 409) {
    return 0;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Failed to fetch commits for ${owner}/${repo} (${response.status})\n${body.slice(0, 400)}`,
    );
  }

  const linkHeader = response.headers.get("link");

  // Pragmatic commit counting: GitHub paginates commits; with per_page=1,
  // the "last" page number in the Link header is a good approximation
  // of commit count for the default branch history.
  if (linkHeader) {
    const lastPageMatch = linkHeader.match(/[?&]page=(\d+)>; rel="last"/);
    if (lastPageMatch) {
      return Number.parseInt(lastPageMatch[1], 10);
    }
  }

  const commits = (await response.json()) as Array<unknown>;
  return commits.length;
}

function toRoundedDays(startIso: string, endIso: string) {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  const diff = Math.max(0, end - start);
  return Math.round(diff / DAY_MS);
}

async function main() {
  // @ts-expect-error - Node executes this .ts import at runtime via --experimental-strip-types.
  const { runebotStackConfig } = await import("../src/data/stack-config.ts");

  const token = getGithubToken();

  if (!token) {
    console.warn(
      "No GitHub token found. Continuing with unauthenticated requests (lower rate limits).",
    );
  }

  const headers = createGithubHeaders(token);
  const now = new Date();
  const nowIso = now.toISOString();

  const repos = [];

  for (const entry of runebotStackConfig) {
    const [repoInfo, languages, commits] = await Promise.all([
      fetchRepo(entry.owner, entry.repo, headers),
      fetchRepoLanguages(entry.owner, entry.repo, headers),
      fetchRepoCommitCount(entry.owner, entry.repo, headers),
    ]);

    const ageDays = toRoundedDays(repoInfo.created_at, nowIso);
    const lifespanEndIso = entry.status === "archived" ? repoInfo.pushed_at : nowIso;
    const lifespanDays = toRoundedDays(repoInfo.created_at, lifespanEndIso);

    repos.push({
      key: entry.key,
      label: entry.label,
      owner: entry.owner,
      repo: entry.repo,
      status: entry.status,
      kind: entry.kind,
      isPrivate: repoInfo.private,
      stars: repoInfo.stargazers_count,
      commits,
      languages,
      createdAt: repoInfo.created_at,
      pushedAt: repoInfo.pushed_at,
      ageDays,
      lifespanDays,
      htmlUrl: repoInfo.html_url,
    });
  }

  const uniqueLanguages = Array.from(new Set(repos.flatMap((repo) => repo.languages))).sort((a, b) =>
    a.localeCompare(b),
  );

  const totals = {
    commits: repos.reduce((sum, repo) => sum + repo.commits, 0),
    stars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    languages: uniqueLanguages.length,
    public: repos.filter((repo) => !repo.isPrivate).length,
  };

  const overview = {
    avgLifespanDays:
      repos.length === 0
        ? 0
        : Math.round(repos.reduce((sum, repo) => sum + repo.lifespanDays, 0) / repos.length),
  };

  const payload = {
    generatedAt: nowIso,
    totals,
    languages: uniqueLanguages,
    repos,
    overview,
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Generated stack overview: ${path.relative(projectRoot, outputPath)}`);
}

main().catch((error) => {
  console.error("Failed to generate stack overview.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
