import { ChangelogTimeline } from "@/components/ui/changelog-timeline";
import { readRootMarkdownFileWithMetadata } from "@/lib/markdown-content";
import { parseChangelog, type ChangelogRelease } from "@/lib/changelog-parser";
import type { TOCItemType } from "fumadocs-core/toc";
import { Heading } from "fumadocs-ui/components/heading";
import {
  DocsBody,
  DocsPage,
  DocsTitle,
  PageLastUpdate,
} from "fumadocs-ui/layouts/docs/page";
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
  const { content, lastModified } = await readRootMarkdownFileWithMetadata("CHANGELOG.md");
  const releases = parseChangelog(content);
  const inDevelopmentReleases = releases.filter(isInDevelopmentRelease);
  const stableReleases = releases.filter(
    (release) => !isInDevelopmentRelease(release) && isStableRelease(release),
  );
  const releaseHistory = releases.filter(
    (release) => !isInDevelopmentRelease(release) && !isStableRelease(release),
  );
  const toc: TOCItemType[] = [];

  if (inDevelopmentReleases.length > 0) {
    toc.push({
      title: "In Development",
      url: "#in-development",
      depth: 2,
    });
  }

  if (stableReleases.length > 0) {
    toc.push({
      title: "Stable Releases",
      url: "#stable-releases",
      depth: 2,
    });
  }

  if (releaseHistory.length > 0) {
    toc.push({
      title: "Release History",
      url: "#release-history",
      depth: 2,
    });
  }

  return (
    <DocsPage toc={toc} full={false}>
      <DocsTitle>Changelog</DocsTitle>
      <p className="prose mb-4">
        Updates, fixes, and improvements to the Runebot stack.
      </p>
      <div>
        {inDevelopmentReleases.length > 0 && (
          <section className="mb-12">
            <DocsBody>
              <Heading as="h2" id="in-development" className="mt-4 mb-2">
                In Development
              </Heading>
              <p className="mb-4">
                Future releases in active development. These are available in the live version of the bot.
              </p>
            </DocsBody>
            <div className="not-prose">
              <ChangelogTimeline releases={inDevelopmentReleases} expandBodiesByDefault />
            </div>
          </section>
        )}

        {stableReleases.length > 0 && (
          <section className="mb-12">
            <DocsBody>
              <Heading as="h2" id="stable-releases" className="mb-2">
                Stable Releases
              </Heading>
              <p className="mb-4">
                Current stable releases available across the Runebot ecosystem.
              </p>
            </DocsBody>
            <div className="not-prose">
              <ChangelogTimeline
                releases={stableReleases}
                defaultExpandedReleaseId={stableReleases[0]?.id}
              />
            </div>
          </section>
        )}

        {releaseHistory.length > 0 && (
          <section>
            <DocsBody>
              <Heading as="h2" id="release-history" className="mb-2">
                Release History
              </Heading>
              <p className="mb-4">
                Official release history of the Runebot ecosystem.
              </p>
            </DocsBody>
            <div className="not-prose">
              <ChangelogTimeline releases={releaseHistory} />
            </div>
          </section>
        )}
      </div>
      <PageLastUpdate date={lastModified} />
    </DocsPage>
  );
}
