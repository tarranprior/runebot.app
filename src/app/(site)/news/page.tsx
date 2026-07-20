import type { Metadata } from "next";
import { NewsReleaseCard } from "@/components/news/news-release-card";
import { Container } from "@/components/ui/container";
import { getNewsReleaseId, newsReleases } from "@/data/news";

export const metadata: Metadata = {
  title: "News — Runebot",
  description: "User-facing Runebot news, releases, and feature highlights.",
};

export default function NewsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <section className="flex-1 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pt-40">
        <Container>
          <header className="mx-auto max-w-4xl">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Latest News
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/65 sm:text-lg">
              Discover the latest Runebot features and improvements.
            </p>
          </header>

          {newsReleases.length > 0 && (
            <section className="mx-auto mt-10 max-w-4xl sm:mt-12" aria-labelledby="release-history-title">
              <div>
                <h2 id="release-history-title" className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Release History
                </h2>
              </div>

              <ol className="relative mt-10 ml-3 border-l border-surface-border sm:ml-4">
                {newsReleases.map((release) => (
                  <li
                    id={getNewsReleaseId(release)}
                    key={release.version}
                    className="relative scroll-mt-28 pb-10 pl-8 last:pb-0 sm:pl-10"
                  >
                    <span
                      aria-hidden
                      className={`absolute -left-[9px] top-7 h-[17px] w-[17px] rounded-full border-4 border-background ring-1 ${
                        release.latest
                          ? "bg-accent ring-accent/30"
                          : "bg-foreground/25 ring-surface-border"
                      }`}
                    />
                    <NewsReleaseCard release={release} />
                  </li>
                ))}
              </ol>
            </section>
          )}
        </Container>
      </section>
    </div>
  );
}
