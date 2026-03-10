import ReactMarkdown from "react-markdown";
import { cloneElement, isValidElement, type ReactNode } from "react";

type BadgeType = "added" | "changed" | "fixed" | "improved" | "removed" | "notice";

const badgeStyles: Record<BadgeType, string> = {
  added: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-500/20",
  changed: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-blue-500/20",
  fixed: "bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400 border-red-500/20",
  improved: "bg-purple-500/10 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 border-purple-500/20",
  removed: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400 border-orange-500/20",
  notice: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-500/20",
};

function Badge({ type }: { type: BadgeType }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${badgeStyles[type]}`}
    >
      {type}
    </span>
  );
}

function parseBadgeString(text: string): ReactNode {
  const badgeRegex = /\[(added|changed|fixed|improved|removed|notice)\]/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = badgeRegex.exec(text)) !== null) {
    // Add text before the badge
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the badge component
    const badgeType = match[1].toLowerCase() as BadgeType;
    parts.push(<Badge key={match.index} type={badgeType} />);

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function parseBadges(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return parseBadgeString(node);
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const parsed = parseBadges(child);

      if (isValidElement(parsed) && parsed.key == null) {
        return cloneElement(parsed, { key: index });
      }

      return parsed;
    });
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const children = node.props.children;
    if (children == null) {
      return node;
    }

    return cloneElement(node, { children: parseBadges(children) });
  }

  return node;
}

type ChangelogRendererProps = {
  content: string;
};

export function ChangelogRenderer({ content }: ChangelogRendererProps) {
  return (
    <div className="space-y-12">
      <ReactMarkdown
        components={{
          // Date headings (##)
          h2: ({ children, ...props }) => (
            <div className="border-b border-surface-border pb-4">
              <h2
                className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                {...props}
              >
                {parseBadges(children)}
              </h2>
            </div>
          ),
          // Version/Release headings (###)
          h3: ({ children, ...props }) => (
            <h3
              className="mb-4 mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              {...props}
            >
              {parseBadges(children)}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4
              className="mb-3 mt-5 text-lg font-semibold tracking-tight text-foreground"
              {...props}
            >
              {parseBadges(children)}
            </h4>
          ),
          // Paragraphs with badge support
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-7 text-foreground/80" {...props}>
              {parseBadges(children)}
            </p>
          ),
          // Enhanced unordered lists
          ul: ({ ...props }) => (
            <ul
              className="mb-6 ml-6 space-y-2.5 text-[15px] leading-7 text-foreground/80"
              {...props}
            />
          ),
          // Enhanced ordered lists
          ol: ({ ...props }) => (
            <ol
              className="mb-6 ml-6 space-y-2.5 text-[15px] leading-7 text-foreground/80"
              {...props}
            />
          ),
          // List items with badge support
          li: ({ children, ...props }) => (
            <li className="pl-2" {...props}>
              <span className="inline-flex flex-wrap items-center gap-2">
                {parseBadges(children)}
              </span>
            </li>
          ),
          // Styled links
          a: ({ ...props }) => (
            <a
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition hover:decoration-accent"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Strong text
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-foreground" {...props}>
              {parseBadges(children)}
            </strong>
          ),
          // Inline code as pills
          code: ({ ...props }) => (
            <code
              className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[0.9em] font-medium text-accent dark:bg-accent/15"
              {...props}
            />
          ),
          // Code blocks
          pre: ({ ...props }) => (
            <pre
              className="mb-6 overflow-x-auto rounded-lg bg-surface/50 p-4 text-sm leading-relaxed shadow-sm ring-1 ring-surface-border"
              {...props}
            />
          ),
          // Horizontal rules as section dividers
          hr: ({ ...props }) => (
            <hr className="my-10 border-surface-border" {...props} />
          ),
          // Blockquotes
          blockquote: ({ ...props }) => (
            <blockquote
              className="mb-6 border-l-4 border-accent/30 pl-4 italic text-foreground/70"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
