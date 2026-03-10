import { Container } from "@/components/ui/container";
import { ChangelogRenderer } from "@/components/ui/changelog-renderer";
import { readRootMarkdownFile } from "@/lib/markdown-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Runebot",
  description: "Latest changes, updates, and improvements to Runebot.",
};

export default async function ChangelogPage() {
  const content = await readRootMarkdownFile("CHANGELOG.md");

  return (
    <div className="flex min-h-full flex-col">
      <section className="flex-1 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-16">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Changelog
              </h1>
              <p className="mx-auto text-lg text-foreground/60">
                Latest updates, improvements, and changes to Runebot.
              </p>
            </div>

            {/* Changelog Content */}
            <article className="mx-auto max-w-3xl">
              <ChangelogRenderer content={content} />
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
