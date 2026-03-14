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

export type ChangelogRelease = {
  /** Slug used as the HTML anchor (`id`) for this section */
  id: string;
  /** Human-readable date string from the heading, e.g. "Oct 14, 2023" */
  date: string;
  /** Optional release label from a bold line below the heading, e.g. "Runebot v1.0.5" */
  version?: string;
  /** Optional suffix after the bold version label, e.g. "(Current)" */
  versionSuffix?: string;
  items: ChangelogItem[];
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

// ─── Main parser ──────────────────────────────────────────────────────────────

/**
 * Parse the full CHANGELOG.md string into an ordered array of releases.
 *
 * Expected markdown structure (any heading level 2–3 begins a release):
 *
 *   ## October 14, 2023
 *
 *   **Runebot v1.0.5**
 *
 *   * {commitUrl} [added] Description
 *   * [fixed] Another change
 *
 *   See the release notes @ [link](url)
 *
 *   ---
 *
 * Sections are separated by `---` horizontal rules, which is the recommended
 * format. Sections without a `---` separator are also handled via re-scanning
 * h2/h3 headings.
 */
export function parseChangelog(markdown: string): ChangelogRelease[] {
  // Split on horizontal rules first; each block is one release section.
  const sections = markdown.split(/\n\s*---\s*\n/);
  const releases: ChangelogRelease[] = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    if (!lines.length) continue;

    let date = "";
    let version: string | undefined;
    let versionSuffix: string | undefined;
    const items: ChangelogItem[] = [];
    const notes: string[] = [];
    let pastItems = false;
    let currentItem: ChangelogItem | null = null;

    for (const line of lines) {
      const t = line.trim();
      if (!t) continue;

      // Heading: ## Date  or  ### Date
      const headingMatch = t.match(/^#{2,3}\s+(.+)$/);
      if (headingMatch) {
        date = headingMatch[1].trim();
        continue;
      }

      // Bold version label with optional suffix: **Runebot v1.0.6** (Current)
      const boldMatch = t.match(/^\*\*(.+?)\*\*(?:\s+(.*))?$/);
      if (boldMatch && !pastItems) {
        version = boldMatch[1].trim();
        versionSuffix = boldMatch[2]?.trim() || undefined;
        continue;
      }

      // List item (unordered: * or -)
      const listMatch = line.match(/^(\s*)[*\-]\s+(.*)$/);
      if (listMatch && listMatch[1].length === 0) {
        pastItems = true;
        const parsed = parseItem(listMatch[2]);
        items.push(parsed);
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
        notes.push(t);
        currentItem = null;
      }
    }

    if (!date && releases.length === 0 && version) {
      date = "Undated";
    }

    if (date || version || items.length > 0) {
      releases.push({
        id: slugify(
          [version, date].filter(Boolean).join("-") ||
            `release-${releases.length}`,
        ),
        date,
        version,
        versionSuffix,
        items,
        notes,
      });
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
