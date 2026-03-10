import { Container } from "@/components/ui/container";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { readRootMarkdownFile } from "@/lib/markdown-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Runebot",
  description: "Privacy Policy for the Runebot application.",
};

export default async function PrivacyPage() {
  const content = await readRootMarkdownFile("PRIVACY.md");

  return (
    <div className="flex min-h-full flex-col">
      <section className="flex-1 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
            </h1>

            <article>
              <MarkdownRenderer content={content} />
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}
