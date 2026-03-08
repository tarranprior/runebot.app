"use client";

import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function Invite() {
  return (
    <section
      id="invite"
      className="relative overflow-hidden bg-background py-24 text-foreground dark:bg-background sm:py-28"
    >
      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="overflow-hidden rounded-[36px] border border-surface-border bg-card shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-surface-border dark:bg-card dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
            <div className="border-b border-surface-border px-6 py-10 sm:px-10 sm:py-12 lg:px-12 dark:border-surface-border">
              <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background px-3 py-1.5 text-sm font-medium text-foreground/75 dark:border-surface-border dark:bg-surface dark:text-foreground/70">
                <Sparkles className="h-4 w-4 text-blurple" />
                Ready to bring RuneBot into your server?
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Invite Runebot and start building a better Discord experience.
              </h2>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="https://runebot.app/invite"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 sm:text-base"
                >
                  Invite to Discord
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="https://runebot.app/support"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-background/80 dark:border-surface-border dark:bg-surface dark:hover:bg-surface/80 sm:text-base"
                >
                  Join support server
                </Link>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:px-10 sm:py-8 lg:grid-cols-2 lg:px-12">
              <div className="rounded-[28px] border border-surface-border bg-background p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] dark:border-surface-border dark:bg-surface dark:shadow-[0_4px_20px_rgba(0,0,0,0.16)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-background text-foreground/80">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  Still have questions?
                </h3>

                <p className="mt-3 text-sm leading-7 text-foreground/60 sm:text-base">
                  Join the support community and ask about setup, new features, commands,
                  or anything else you'd like support with.
                </p>

                <div className="mt-6">
                  <Link
                    href="https://runebot.app/support"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
                  >
                    Visit the support server
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-surface-border bg-background p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] dark:border-surface-border dark:bg-surface dark:shadow-[0_4px_20px_rgba(0,0,0,0.16)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-background text-foreground/80">
                  <Github className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  Want to support the project?
                </h3>

                <p className="mt-3 text-sm leading-7 text-foreground/60 sm:text-base">
                  The best way to support us is by using Runebot in your server, sharing it with others, and dropping a star on our Github repo!
                </p>

                <div className="mt-6">
                  <Link
                    href="https://github.com/tarranprior/runebot"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
                  >
                    Star the GitHub repository
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}