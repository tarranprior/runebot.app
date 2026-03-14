import { runebotStackOverview } from "@/data/stack-overview";
import { jetbrainsMono } from "@/lib/fonts";
import {
  Code2,
  FolderKanban,
  GitCommitHorizontal,
  Star,
  Timer,
} from "lucide-react";

type OverviewCardProps = {
  title: string;
  value: string;
  subtitle: string;
  tone?: "green" | "amber" | "blue" | "purple" | "neutral";
  icon?: "commits" | "stars" | "languages" | "lifespan" | "surfaces";
  rows?: Array<{ label: string; value: string }>;
  rowValueStyle?: "plain" | "star" | "pill";
  chips?: string[];
};

const TONE_STYLES = {
  green: {
    iconWrap: "border border-emerald-500/20 bg-emerald-500/15 text-emerald-500",
  },
  amber: {
    iconWrap: "border border-amber-500/20 bg-amber-500/15 text-amber-500",
  },
  blue: {
    iconWrap: "border border-blue-500/20 bg-blue-500/15 text-blue-500",
  },
  purple: {
    iconWrap: "border border-violet-500/20 bg-violet-500/15 text-violet-500",
  },
  neutral: {
    iconWrap: "border border-surface-border/90 bg-foreground/[0.08] text-foreground/70",
  },
};

const LANGUAGE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  "TypeScript": { bg: "bg-blue-500/8", border: "border-blue-500/25", text: "text-blue-600 dark:text-blue-400" },
  "Python": { bg: "bg-amber-500/8", border: "border-amber-500/25", text: "text-amber-700 dark:text-amber-300" },
  "SQLite": { bg: "bg-slate-500/8", border: "border-slate-500/25", text: "text-slate-600 dark:text-slate-400" },
  "Tailwind CSS": { bg: "bg-cyan-500/8", border: "border-cyan-500/25", text: "text-cyan-600 dark:text-cyan-400" },
  "Prisma": { bg: "bg-violet-500/8", border: "border-violet-500/25", text: "text-violet-600 dark:text-violet-400" },
  "YAML": { bg: "bg-slate-500/8", border: "border-slate-500/25", text: "text-slate-600 dark:text-slate-400" },
  "HTML": { bg: "bg-orange-500/8", border: "border-orange-500/25", text: "text-orange-600 dark:text-orange-400" },
  "CSS": { bg: "bg-blue-500/8", border: "border-blue-500/25", text: "text-blue-600 dark:text-blue-400" },
  "Kotlin": { bg: "bg-violet-500/8", border: "border-violet-500/25", text: "text-violet-600 dark:text-violet-400" },
};

const STATUS_STYLES: Record<
  string,
  {
    text: string;
    dot: string;
    ping?: string;
  }
> = {
  live: {
    text: "text-emerald-500/85",
    dot: "bg-emerald-500",
    ping: "bg-emerald-500/40",
  },
  archived: {
    text: "text-foreground/45",
    dot: "bg-foreground/35",
  },
  maintenance: {
    text: "text-amber-500/85",
    dot: "bg-amber-500",
  },
  degraded: {
    text: "text-orange-500/85",
    dot: "bg-orange-500",
    ping: "bg-orange-500/30",
  },
};

function CardIcon({ icon }: { icon?: OverviewCardProps["icon"] }) {
  switch (icon) {
    case "commits":
      return <GitCommitHorizontal className="h-4 w-4" />;
    case "stars":
      return <Star className="h-4 w-4" strokeWidth={2.25} />
    case "languages":
      return <Code2 className="h-4 w-4" />;
    case "lifespan":
      return <Timer className="h-4 w-4" />;
    case "surfaces":
      return <FolderKanban className="h-4 w-4" />;
    default:
      return null;
  }
}

function ValueMeta({
  value,
  style = "plain",
}: {
  value: string;
  style?: OverviewCardProps["rowValueStyle"];
}) {
  if (style === "star") {
    return (
      <span className="inline-flex items-center gap-1.5 text-amber-400/90">
        <Star className="h-3.5 w-3.5 fill-current stroke-none" />
        <span className={`text-[12px] font-semibold tabular-nums ${jetbrainsMono.className}`}>
          {value}
        </span>
      </span>
    );
  }

  if (style === "pill") {
    return (
      <span className={`rounded-md bg-background/70 px-1.5 py-0.5 text-[11px] leading-snug tabular-nums text-foreground/65 ${jetbrainsMono.className}`}>
        {value}
      </span>
    );
  }

  const statusKey = value.trim().toLowerCase();
  const statusStyle = STATUS_STYLES[statusKey];

  if (statusStyle) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${statusStyle.text}`}>
        <span className="relative inline-flex h-2 w-2 shrink-0 items-center justify-center">
          {statusStyle.ping && (
            <span className={`absolute inline-flex h-2 w-2 animate-ping rounded-full ${statusStyle.ping}`} />
          )}
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
        </span>
        <span className="tabular-nums">{value}</span>
      </span>
    );
  }

  return <span className="text-[12px] font-medium tabular-nums text-foreground/68">{value}</span>;
}

function OverviewCard({
  title,
  value,
  subtitle,
  tone,
  icon,
  rows,
  rowValueStyle,
  chips,
}: OverviewCardProps) {
  const theme = tone ? TONE_STYLES[tone] : undefined;

  return (
    <article className="rounded-xl border border-surface-border/60 bg-background/72 p-4 backdrop-blur-[2px] transition-colors hover:border-surface-border/80 hover:bg-background/85">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
            {title}
        </span>

        {icon && (
            <span
            className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                theme?.iconWrap ?? ""
            }`}
            >
            <CardIcon icon={icon} />
            </span>
        )}
      </div>

      <p className={`text-3xl leading-tight font-semibold tracking-tight tabular-nums text-foreground ${jetbrainsMono.className}`}>
        {value}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-foreground/50">{subtitle}</p>

      {rows && rows.length > 0 && (
        <ul className="mt-2.5 border-t border-surface-border/60 pt-2.5 space-y-1.5">
          {rows.map((row) => (
            <li key={`${row.label}-${row.value}`} className="flex items-center justify-between gap-3">
              <span
                className={`truncate text-[12px] leading-snug ${
                  rowValueStyle === "star" ? "text-foreground/48" : "text-foreground/54"
                } ${jetbrainsMono.className}`}
              >
                {row.label}
              </span>
              <ValueMeta value={row.value} style={rowValueStyle} />
            </li>
          ))}
        </ul>
      )}

      {chips && chips.length > 0 && (
        <div className="mt-2.5 border-t border-surface-border/60 pt-2.5">
          <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => {
            const colors = LANGUAGE_COLORS[chip] || { border: "border-surface-border/80", text: "text-foreground/65" };
            return (
              <span
                key={chip}
                className={`rounded-md px-2.5 py-1 text-[10px] font-medium leading-snug transition-colors ${colors.border} ${colors.text} ${jetbrainsMono.className}`}
              >
                {chip}
              </span>
            );
          })}
          </div>
        </div>
      )}
    </article>
  );
}

export function RunebotStackOverview() {
  return (
    <section className="mx-auto mb-8 max-w-[1360px]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {runebotStackOverview.map((card) => (
          <OverviewCard
            key={card.id}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            tone={card.tone}
            icon={card.icon}
            rows={card.rows}
            rowValueStyle={card.rowValueStyle}
            chips={card.chips}
          />
        ))}
      </div>
    </section>
  );
}
