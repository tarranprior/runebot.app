import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Github } from "lucide-react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Container } from "@/components/ui/container";
import { CursorToggle } from "@/components/ui/cursor-toggle";
import { SiteNotice } from "@/components/ui/site-notice";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { docsSource } from "@/lib/docs-source";
import { withDevTree } from "@/lib/docs-dev-tree";
import { PRIMARY_NAV_ITEMS, PROJECT_GITHUB_URL, DISCORD_INVITE_URL } from "@/lib/navigation";
import styles from "./docs-shell.module.css";

export default function DocsRouteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.docsShell} runebot-docs-shell`}>
      <header className={`shrink-0 border-b border-surface-border/70 bg-background/85 backdrop-blur-xl ${styles.docsAppHeader}`}>
        <Container fullWidth className="flex h-[76px] items-center">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex flex-col leading-none text-left">
                <span className="text-[22px] font-semibold tracking-tight text-foreground">Runebot</span>
              </Link>

              <nav className="hidden items-center gap-1.5 md:flex">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="cursor-pointer rounded-full px-4 py-2 text-[15px] font-medium text-foreground/70 transition hover:bg-foreground/8 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <CursorToggle />
              <ThemeToggle />

              <Link
                href="/docs"
                className="hidden items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground md:inline-flex"
                aria-current="page"
              >
                <BookOpen className="h-4 w-4" />
                Docs
              </Link>

              <Link
                href={PROJECT_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground md:inline-flex"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>

              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
              >
                Add to Discord
              </a>
            </div>
          </div>
        </Container>
      </header>

      <div className={styles.docsViewport}>
        <RootProvider>
          <DocsLayout
            tree={withDevTree(docsSource.getPageTree())}
            githubUrl={PROJECT_GITHUB_URL}
            nav={{
              title: "Runebot Docs",
            }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </div>

      <SiteNotice
        noticeId="privacy-policy-2026-05-17"
        title="🔔 Changes to Privacy Policy"
        message="We've recently updated Runebot's Privacy Policy. You can review the changes [here](/privacy)."
        actionLabel="Read Privacy Policy"
        actionUrl="/privacy"
        dismissLabel="OK"
      />
    </div>
  );
}
