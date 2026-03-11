import { Container } from "@/components/ui/container";
import { ChangelogTimeline } from '@/components/ui/changelog-timeline';
import { RunebotStackOverview } from "@/components/sections/runebot-stack-overview";
import { readRootMarkdownFile } from "@/lib/markdown-content";
import { parseChangelog } from "@/lib/changelog-parser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — Runebot",
  description: "Latest changes, updates, and improvements to Runebot.",
};

export default async function ChangelogPage() {
  const markdown = await readRootMarkdownFile("CHANGELOG.md");
  const releases = parseChangelog(markdown);

  return (
    <div className="flex min-h-full flex-col">
      <section className="flex-1 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
        <Container>
          <RunebotStackOverview />

          <div className="mx-auto mt-10 max-w-3xl">
            {/* Page header */}
            <div className="mb-10">
              <h1 className="mb-3 pt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Changelog
              </h1>
              <p className="text-base text-foreground/50">
                Updates, fixes, and improvements to the Runebot stack.
              </p>
            </div>

            {/* Timeline */}
            <ChangelogTimeline releases={releases} />
          </div>
        </Container>
      </section>
    </div>
  );
}
