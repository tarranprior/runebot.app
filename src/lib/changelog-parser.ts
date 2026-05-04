export type ChangelogBadge =
  | "added"
  | "changed"
  | "fixed"
  | "improved"
  | "removed"
  | "notice";

export type ChangelogItem = {
  /** Full URL to a commit on any Git host, e.g. GitHub /commit/{sha} */
  commitUrl?: string;
  badge?: ChangelogBadge;
  /** Remaining text after the commit/badge prefix — may contain inline markdown */
  text: string;
  /** Optional extra markdown lines belonging to this item (collapsed by default in UI) */
  body?: string;
};

export type ChangelogReleaseGroup = {
  /** Slug used as the HTML anchor (`id`) for this grouped subsection */
  id: string;
  date: string;
  version?: string;
  versionSuffix?: string;
  releaseLinks?: Array<{ label: string; url: string }>;
  items: ChangelogItem[];
  notes: string[];
};

export type ChangelogRelease = {
  /** Slug used as the HTML anchor (`id`) for this section */
  id: string;
  /** Human-readable date string from the heading, e.g. "Oct 14, 2023" */
  date: string;
  /** Optional release label from a bold line below the heading, e.g. "Runebot v1.0.5" */
  version?: string;
  /** Optional suffix after the bold version label, e.g. "(Current)" */
  versionSuffix?: string;
  /** Optional linked chips declared on the release title line, e.g. [Tag](https://...) */
  releaseLinks?: Array<{ label: string; url: string }>;
  items: ChangelogItem[];
  /** Optional grouped subsections declared with `### Date` inside a release section */
  groups?: ChangelogReleaseGroup[];
  /** Trailing non-list lines (may contain markdown, e.g. "See the release notes @ [link](url)") */
  notes: string[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const VALID_BADGES = new Set<string>([
  "added",
  "changed",
  "fixed",
  "improved",
  "removed",
  "notice",
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toUniqueId(base: string, fallback: string, counts: Map<string, number>) {
  const normalized = slugify(base) || fallback;
  const count = counts.get(normalized) ?? 0;
  counts.set(normalized, count + 1);
  return count === 0 ? normalized : `${normalized}-${count + 1}`;
}

function createRelease(date: string): ChangelogRelease {
  return {
    id: "",
    date,
    items: [],
    notes: [],
  };
}

function createGroup(date: string): ChangelogReleaseGroup {
  return {
    id: "",
    date,
    items: [],
    notes: [],
  };
}

/**
 * Parse a single list-item string into its three optional parts:
 *   `{https://…}` → commitUrl
 *   `[badge]`     → badge type
 *   the rest      → text (may still contain inline markdown)
 *
 * Examples:
 *   "{https://github.com/x/y/commit/abc1234} [added] Users can now…"
 *   "[fixed] Resolved crash when…"
 *   "Improved performance of /stats"
 */
function parseItem(raw: string): ChangelogItem {
  let rest = raw.trim();

  // 1. Optional commit URL: {url}
  let commitUrl: string | undefined;
  const commitMatch = rest.match(/^\{([^}]+)\}\s*/);
  if (commitMatch) {
    commitUrl = commitMatch[1].trim();
    rest = rest.slice(commitMatch[0].length);
  }

  // 2. Optional badge: [type]
  let badge: ChangelogBadge | undefined;
  const badgeMatch = rest.match(/^\[(\w+)\]\s*/i);
  if (badgeMatch && VALID_BADGES.has(badgeMatch[1].toLowerCase())) {
    badge = badgeMatch[1].toLowerCase() as ChangelogBadge;
    rest = rest.slice(badgeMatch[0].length);
  }

  return { commitUrl, badge, text: rest };
}

function parseReleaseMeta(raw: string | undefined) {
  if (!raw) {
    return {
      versionSuffix: undefined,
      releaseLinks: undefined,
    };
  }

  const releaseLinks = Array.from(
    raw.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g),
    (match) => ({
      label: match[1].trim(),
      url: match[2].trim(),
    }),
  );

  const versionSuffix = raw.replace(/\s*\[[^\]]+\]\([^)]+\)/g, "").trim() || undefined;

  return {
    versionSuffix,
    releaseLinks: releaseLinks.length > 0 ? releaseLinks : undefined,
  };
}

// ─── Main parser ──────────────────────────────────────────────────────────────

/**
 * Parse the full CHANGELOG.md string into an ordered array of releases.
 *
 * Expected markdown structure:
 *
 *   ## October 14, 2023
 *
 *   **Runebot v1.0.5**
 *
 *   ### October 13, 2023
 *
 *   **Runebot v1.0.5-dev.1**
 *
 *   * {commitUrl} [added] Description
 *   * [fixed] Another change
 *
 *   See the release notes @ [link](url)
 *
 *   ---
 *
 * Sections are separated by `---` horizontal rules, which is the recommended format.
 * `##` starts a top-level release, and `###` starts a grouped subsection within the
 * current top-level release.
 */
export function parseChangelog(markdown: string): ChangelogRelease[] {
  // Split on horizontal rules first; each block is one release section.
  const sections = markdown.split(/\n\s*---\s*\n/);
  const releases: ChangelogRelease[] = [];
  const releaseIdCounts = new Map<string, number>();

  const finalizeRelease = (release: ChangelogRelease, releaseIndex: number) => {
    if (!release.date && releaseIndex === 0 && release.version) {
      release.date = "Undated";
    }

    release.id = toUniqueId(
      [release.version, release.date].filter(Boolean).join("-"),
      `release-${releaseIndex}`,
      releaseIdCounts,
    );

    if (release.groups?.length) {
      const groupIdCounts = new Map<string, number>();
      release.groups = release.groups.map((group, groupIndex) => ({
        ...group,
        id: toUniqueId(
          `${release.id}-${[group.version, group.date].filter(Boolean).join("-")}`,
          `${release.id}-group-${groupIndex + 1}`,
          groupIdCounts,
        ),
      }));
    }

    return release;
  };

  for (const section of sections) {
    const lines = section.trim().split("\n");
    if (!lines.length) continue;

    let currentRelease: ChangelogRelease | null = null;
    let currentGroup: ChangelogReleaseGroup | null = null;
    let currentItem: ChangelogItem | null = null;

    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;

      // Heading: ## Date (top-level release) or ### Date (grouped subsection)
      const headingMatch = t.match(/^(#{2,3})\s+(.+)$/);
      if (headingMatch) {
        const headingLevel = headingMatch[1].length;
        const headingDate = headingMatch[2].trim();

        if (headingLevel === 2 || !currentRelease) {
          if (currentRelease) {
            releases.push(finalizeRelease(currentRelease, releases.length));
          }
          currentRelease = createRelease(headingDate);
          currentGroup = null;
          currentItem = null;
          continue;
        }

        const group = createGroup(headingDate);
        currentRelease.groups = currentRelease.groups ?? [];
        currentRelease.groups.push(group);
        currentGroup = group;
        currentItem = null;
        continue;
      }

      if (!currentRelease) {
        continue;
      }

      const activeTarget = currentGroup ?? currentRelease;

      // Bold version label with optional suffix: **Runebot v1.0.6** (Current)
      const boldMatch = t.match(/^\*\*(.+?)\*\*(?:\s+(.*))?$/);
      if (
        boldMatch &&
        !activeTarget.version &&
        activeTarget.items.length === 0 &&
        activeTarget.notes.length === 0
      ) {
        activeTarget.version = boldMatch[1].trim();
        const releaseMeta = parseReleaseMeta(boldMatch[2]?.trim());
        activeTarget.versionSuffix = releaseMeta.versionSuffix;
        activeTarget.releaseLinks = releaseMeta.releaseLinks;
        continue;
      }

      // List item (unordered: * or -) always belongs to the active target.
      const listMatch = line.match(/^(\s*)[*\-]\s+(.*)$/);
      if (listMatch && listMatch[1].length === 0) {
        const parsed = parseItem(listMatch[2]);
        activeTarget.items.push(parsed);
        currentItem = parsed;
        continue;
      }

      // Indented continuation lines belong to the most recent list item body.
      if (currentItem && /^\s{2,}\S/.test(line)) {
        const bodyLine = line.replace(/^\s{2}/, "");
        currentItem.body = currentItem.body
          ? `${currentItem.body}\n${bodyLine}`
          : bodyLine;
        continue;
      }

      // Everything else is a trailing note
      if (t) {
        activeTarget.notes.push(t);
        currentItem = null;
      }
    }

    if (currentRelease) {
      releases.push(finalizeRelease(currentRelease, releases.length));
    }
  }

  return releases.filter((r) => r.date || r.version || r.items.length > 0);
}

// ─── Commit chip helpers ──────────────────────────────────────────────────────

export type CommitRef = {
  /** Short display label, e.g. "abc1234" for a GitHub SHA or last path segment */
  label: string;
  url: string;
};

/**
 * Derive a short, human-readable label from a commit URL:
 * - GitHub /commit/{sha} → first 7 chars of sha
 * - Any other URL         → last path segment (truncated to 12 chars)
 */
export function parseCommitRef(url: string): CommitRef {
  const githubMatch = url.match(
    /github\.com\/[^/]+\/[^/]+\/commit\/([a-f0-9]{7,40})/i,
  );
  if (githubMatch) {
    return { label: githubMatch[1].slice(0, 7), url };
  }

  const parts = url.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "commit";
  return { label: last.slice(0, 12), url };
}
