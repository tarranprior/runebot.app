"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, GitCommitHorizontal } from "lucide-react";
import type {
  ChangelogBadge,
  ChangelogItem,
  ChangelogRelease,
  CommitRef,
} from "@/lib/changelog-parser";
import { parseCommitRef } from "@/lib/changelog-parser";

const BADGE_STYLES: Record<ChangelogBadge, string> = {
  added:
    "bg-emerald-500/[.08] text-emerald-700 dark:bg-emerald-500/[.12] dark:text-emerald-400",
  changed:
    "bg-blue-500/[.08] text-blue-700 dark:bg-blue-500/[.12] dark:text-blue-400",
  fixed:
    "bg-rose-500/[.08] text-rose-700 dark:bg-rose-500/[.12] dark:text-rose-400",
  improved:
    "bg-violet-500/[.08] text-violet-700 dark:bg-violet-500/[.12] dark:text-violet-400",
  removed:
    "bg-orange-500/[.08] text-orange-700 dark:bg-orange-500/[.12] dark:text-orange-400",
  notice:
    "bg-amber-500/[.08] text-amber-700 dark:bg-amber-500/[.12] dark:text-amber-400",
};

const GRID = "grid grid-cols-[80px_20px_1fr]";
  const INLINE_MARKDOWN_ALLOWED_ELEMENTS = [
    "a",
    "br",
    "code",
    "del",
    "em",
    "span",
    "strong",
  ] as const;

  function slugifyKeyPart(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function getItemKeyBase(releaseId: string, item: ChangelogItem) {
    const keySource = item.commitUrl ?? item.text ?? item.body ?? "item";
    return `${releaseId}-${slugifyKeyPart(keySource) || "item"}`;
  }

function Badge({ type }: { type: ChangelogBadge }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.08em] ${BADGE_STYLES[type]}`}
    >
      {type}
    </span>
  );
}

function CommitChip({ commit }: { commit: CommitRef }) {
  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      title={commit.url}
      className="inline-flex w-[72px] items-center justify-center gap-1 rounded border border-blue-500/20 bg-blue-500/[.06] px-1.5 py-px font-mono text-[10px] font-medium text-blue-700/80 transition hover:border-blue-500/30 hover:bg-blue-500/[.10] dark:border-blue-400/20 dark:bg-blue-400/[.10] dark:text-blue-300/85 dark:hover:border-blue-400/35 dark:hover:bg-blue-400/[.14]"
    >
      <GitCommitHorizontal className="h-2.5 w-2.5 shrink-0" />
      <span className="truncate">{commit.label}</span>
    </a>
  );
}

function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      allowedElements={[...INLINE_MARKDOWN_ALLOWED_ELEMENTS]}
      unwrapDisallowed
      components={{
        code: ({ children }) => (
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-accent dark:bg-accent/15">
            {children}
          </code>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        del: ({ children }) => <del className="line-through">{children}</del>,
        br: () => <br />,
        span: ({ children }) => <span>{children}</span>,
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition hover:decoration-accent"
          >
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function RichMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="ml-5 list-disc space-y-1">{children}</ul>,
        ol: ({ children }) => (
          <ol className="ml-5 list-decimal space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        code: ({ children }) => (
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-accent dark:bg-accent/15">
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition hover:decoration-accent"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function NotesMarkdown({ lines }: { lines: string[] }) {
  if (!lines.length) return null;

  const content = lines.join("\n\n");

  return (
    <div className="mt-4 text-sm leading-6 text-foreground/50">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mt-2 first:mt-0">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-2 transition hover:underline"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-surface/60 px-1 font-mono text-[0.88em]">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function ChangeItemRow({
  item,
  itemKey,
  expanded,
  onToggle,
}: {
  item: ChangelogItem;
  itemKey: string;
  expanded: boolean;
  onToggle: (key: string) => void;
}) {
  const commitRef = item.commitUrl ? parseCommitRef(item.commitUrl) : null;
  const hasBody = Boolean(item.body?.trim());

  return (
    <li className={`${GRID} items-start`}>
      <div className="flex items-start justify-end pr-3 pt-[3px]">
        {commitRef ? <CommitChip commit={commitRef} /> : <span className="inline-block w-[72px]" />}
      </div>

      <div className="flex justify-center pt-[7px]">
        <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
      </div>

      <div className="pb-3 pl-5">
        <div className="flex min-w-0 items-center gap-2 text-[14.5px] leading-6 text-foreground/75">
          {item.badge && <Badge type={item.badge} />}

          <div className="min-w-0 flex-1">
            <div className="inline-flex max-w-full items-center gap-1 align-middle">
              <span className="min-w-0 truncate whitespace-nowrap align-middle">
                <InlineMarkdown>{item.text}</InlineMarkdown>
              </span>

              {hasBody && (
                <button
                  type="button"
                  onClick={() => onToggle(itemKey)}
                  aria-expanded={expanded}
                  aria-controls={`${itemKey}-details`}
                  className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-foreground/35 transition-colors duration-150 hover:text-foreground/60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {hasBody && expanded && (
          <div
            id={`${itemKey}-details`}
            className="mt-2 border-l border-surface-border/80 pl-3 text-[13.5px] leading-6 text-foreground/65"
          >
            <RichMarkdown content={item.body as string} />
          </div>
        )}
      </div>
    </li>
  );
}

function ReleaseSection({
  release,
  isFirst,
  expandedKeys,
  onToggle,
}: {
  release: ChangelogRelease;
  isFirst: boolean;
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div id={release.id} className="scroll-mt-32 pb-12 last:pb-0">
      <div className={`${GRID} mb-5 items-center`}>
        <div />

        <div className="flex justify-center">
          <div
            className={`relative z-10 h-3 w-3 rounded-full border-2 bg-background transition-colors ${
              isFirst ? "border-accent" : "border-foreground/30"
            }`}
          />
        </div>

        <div className="pl-5">
          {release.version ? (
            <>
              <p className="mb-0.5 text-[11px] font-medium uppercase tracking-widest text-foreground/35">
                {release.date}
              </p>
              <h2 className="flex flex-wrap items-baseline gap-x-2 text-xl font-bold tracking-tight text-foreground">
                <span>{release.version}</span>
                {release.versionSuffix && (
                  <span className="text-sm font-medium tracking-normal text-foreground/45">
                    {release.versionSuffix}
                  </span>
                )}
              </h2>
            </>
          ) : (
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {release.date}
            </h2>
          )}
        </div>
      </div>

      {release.items.length > 0 && (
        <ul>
          {(() => {
            const keyCounts = new Map<string, number>();

            return release.items.map((item) => {
              const baseKey = getItemKeyBase(release.id, item);
              const count = keyCounts.get(baseKey) ?? 0;
              keyCounts.set(baseKey, count + 1);
              const key = count === 0 ? baseKey : `${baseKey}-${count + 1}`;

              return (
                <ChangeItemRow
                  key={key}
                  item={item}
                  itemKey={key}
                  expanded={expandedKeys.has(key)}
                  onToggle={onToggle}
                />
              );
            });
          })()}
        </ul>
      )}

      {release.notes.length > 0 && (
        <div className="pl-[100px]">
          <NotesMarkdown lines={release.notes} />
        </div>
      )}
    </div>
  );
}

type ChangelogTimelineProps = {
  releases: ChangelogRelease[];
};

export function ChangelogTimeline({ releases }: ChangelogTimelineProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const hasReleases = useMemo(() => releases.length > 0, [releases]);

  if (!hasReleases) {
    return <p className="text-sm text-foreground/40">No changelog entries found.</p>;
  }

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[90px] top-0 w-px bg-surface-border" />

      {releases.map((release, i) => (
        <ReleaseSection
          key={release.id}
          release={release}
          isFirst={i === 0}
          expandedKeys={expandedKeys}
          onToggle={toggleItem}
        />
      ))}
    </div>
  );
}
