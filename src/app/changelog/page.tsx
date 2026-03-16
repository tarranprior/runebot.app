import { Container } from "@/components/ui/container";
import { ChangelogTimeline } from "@/components/ui/changelog-timeline";
import { RunebotStackOverview } from "@/components/sections/runebot-stack-overview";
import { readRootMarkdownFile } from "@/lib/markdown-content";
import { parseChangelog, type ChangelogRelease } from "@/lib/changelog-parser";
import type { Metadata } from "next";

const IN_DEVELOPMENT_TITLE_PATTERN =
  /-dev\.|-beta\.|-rc\.|\(in development\)|\(unreleased\)/i;

const STABLE_RELEASE_TITLE_PATTERN = /\(current\)/i;

function isInDevelopmentRelease(release: ChangelogRelease): boolean {
  const title = [release.version, release.versionSuffix].filter(Boolean).join(" ");
  return IN_DEVELOPMENT_TITLE_PATTERN.test(title);
}

function isStableRelease(release: ChangelogRelease): boolean {
  const title = [release.version, release.versionSuffix].filter(Boolean).join(" ");
  return STABLE_RELEASE_TITLE_PATTERN.test(title);
}

export const metadata: Metadata = {
  title: "Changelog — Runebot",
  description: "Latest changes, updates, and improvements to Runebot.",
};

export default async function ChangelogPage() {
  const markdown = await readRootMarkdownFile("CHANGELOG.md");
  const releases = parseChangelog(markdown);
  const inDevelopmentReleases = releases.filter(isInDevelopmentRelease);
  const stableReleases = releases.filter(
    (release) => !isInDevelopmentRelease(release) && isStableRelease(release),
  );
  const releaseHistory = releases.filter(
    (release) => !isInDevelopmentRelease(release) && !isStableRelease(release),
  );

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

            {inDevelopmentReleases.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">In Development</h2>
                <p className="mt-2 mb-6 text-sm text-foreground/50">
                  Future releases in active development. These are available in the live version of the bot.
                </p>
                <ChangelogTimeline releases={inDevelopmentReleases} expandBodiesByDefault />
              </div>
            )}

            {stableReleases.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Stable Releases</h2>
                <p className="mt-2 mb-6 text-sm text-foreground/50">
                  Current stable releases available across the Runebot ecosystem.
                </p>
                <ChangelogTimeline releases={stableReleases} />
              </div>
            )}

            {releaseHistory.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Release History</h2>
                <p className="mt-2 mb-6 text-sm text-foreground/50">
                  Official releases to the Runebot ecosystem.
                </p>
                <ChangelogTimeline releases={releaseHistory} />
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
