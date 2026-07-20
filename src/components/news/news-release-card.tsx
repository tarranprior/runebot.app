import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getNewsReleaseId, type NewsChangeType, type NewsRelease } from "@/data/news";

const CHANGE_STYLES: Record<
  NewsChangeType,
  { label: string; emoji?: string; badge: string; bullet: string }
> = {
  new: {
    label: "Added",
    badge: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    bullet: "bg-emerald-500/30",
  },
  improved: {
    label: "Improved",
    badge: "bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
    bullet: "bg-violet-500/30",
  },
  fixed: {
    label: "Fixed",
    badge: "bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
    bullet: "bg-rose-500/30",
  },
  notice: {
    label: "Notice",
    badge: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    bullet: "bg-amber-500/30",
  },
  removed: {
    label: "Removed",
    badge: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    bullet: "bg-orange-500/30",
  },
};

function NewsInlineText({ children }: { children: string }) {
  return (
    <ReactMarkdown
      allowedElements={["code"]}
      unwrapDisallowed
      components={{
        code: ({ children }) => (
          <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-accent dark:bg-accent/15">
            {children}
          </code>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

type NewsReleaseCardProps = {
  release: NewsRelease;
  teaser?: boolean;
};

export function NewsReleaseCard({ release, teaser = false }: NewsReleaseCardProps) {
  const highlighted = release.latest && !teaser;

  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-surface-border/60 p-4 backdrop-blur-[2px] transition-colors hover:border-surface-border/80 hover:bg-background/85 ${
        teaser
          ? "border-accent/25 ring-1 ring-inset ring-blurple/15 hover:border-accent/25 dark:border-accent/30 dark:bg-surface/55 dark:hover:border-accent/30 dark:hover:bg-surface/55"
          : highlighted
            ? "ring-1 ring-inset ring-blurple/20"
            : ""
      }`}
    >
      {teaser && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-24 h-56 w-56 rounded-full bg-blurple/[0.12] blur-3xl dark:bg-blurple/[0.14]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-64 rounded-full bg-accent/[0.04] blur-3xl dark:bg-accent/[0.06]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent dark:via-accent/20"
          />
        </>
      )}

      <div className="relative flex flex-wrap items-center gap-2.5">
        <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {release.version}
        </span>
        {release.latest && (
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold text-accent">
            Latest
          </span>
        )}
        <time className="text-sm text-foreground/50">{release.date}</time>
      </div>

      <h2
        className={`relative mt-3 font-semibold tracking-tight text-foreground ${teaser ? "text-xl sm:text-2xl" : "text-2xl"}`}
      >
        {release.title}
      </h2>
      {release.summary && (
        <p className="relative mt-2 max-w-3xl text-sm leading-7 text-foreground/65 sm:text-base">
          {release.summary}
        </p>
      )}

      {teaser ? (
        <a
          href={`#${getNewsReleaseId(release)}`}
          className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
        >
          See the full release details
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <div className="relative mt-5 grid gap-4">
          {release.changes.map((group) => {
            const style = CHANGE_STYLES[group.type];

            return (
              <section key={group.type}>
                <div>
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] ${style.badge}`}>
                    {style.emoji}
                    {style.label}
                  </span>
                </div>
                <ul className="mt-2 space-y-2 pl-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/70">
                      <span aria-hidden className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${style.bullet}`} />
                      <span><NewsInlineText>{item}</NewsInlineText></span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </article>
  );
}
