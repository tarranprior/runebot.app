"use client";

import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";

const DISCORD_SUPPORT_INVITE_URL = "https://discord.com/invite/FWjNkNuTzv";

const footerGroups = [
  {
    title: "Runebot",
    links: [
      { label: "About", href: "/" },
      { label: "Features", href: "#features" },
      { label: "Documentation", href: "#docs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Community", href: DISCORD_SUPPORT_INVITE_URL, external: true },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "DMCA", href: "https://dmca.com/site-report/runebot.app", external: true },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <>
      <div className="block m-[-1px] overflow-hidden leading-none bg-background dark:bg-background">
        <svg
          className="block h-auto w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="fill-surface dark:fill-surface"
            d="M0,0L34.3,37.3C68.6,75,137,149,206,154.7C274.3,160,343,96,411,101.3C480,107,549,181,617,192C685.7,203,754,149,823,117.3C891.4,85,960,75,1029,85.3C1097.1,96,1166,128,1234,128C1302.9,128,1371,96,1406,80L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          />
        </svg>
      </div>

      <footer className="bg-surface text-foreground dark:bg-surface dark:text-foreground">
        <Container className="relative py-16 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
            <div className="max-w-xl">
              <Link href="/" className="inline-flex items-center">
                <span className="text-2xl font-semibold tracking-tight text-foreground dark:text-foreground">
                  Runebot
                </span>
              </Link>

              <p className="mt-4 max-w-md text-sm leading-7 text-foreground/70 dark:text-foreground/70 sm:text-[15px]">
                The modern RuneScape companion for your Discord server.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="https://github.com/tarranprior/runebot"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Runebot GitHub repository"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-background text-foreground/60 transition hover:text-accent dark:border-surface-border dark:bg-surface dark:text-foreground/60 dark:hover:text-accent"
                >
                  <Github className="h-5 w-5" />
                </Link>

                <a
                  href={DISCORD_SUPPORT_INVITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Runebot Discord community"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-background text-foreground/60 transition hover:text-accent dark:border-surface-border dark:bg-surface dark:text-foreground/60 dark:hover:text-accent"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>

              <p className="mt-8 text-sm text-foreground/60 dark:text-foreground/60">
                © {currentYear} Runebot. Built for Discord communities. An independent project by <a href="https://tarranprior.com/" target="_blank" rel="noreferrer" className="underline hover:text-accent">Tarran Prior</a>.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70 dark:text-foreground/70">
                    {group.title}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-foreground/60 transition hover:text-accent dark:text-foreground/60 dark:hover:text-accent"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-foreground/60 transition hover:text-accent dark:text-foreground/60 dark:hover:text-accent"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}