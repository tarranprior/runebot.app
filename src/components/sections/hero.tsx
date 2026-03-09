"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-background pt-32 sm:pt-36 lg:pt-40"
      >

        <Container className="relative z-10">
          <motion.div
            className="mx-auto flex max-w-4xl flex-col items-start py-16 sm:py-20 lg:py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/50 dark:text-white/45">
                <div className="inline-flex items-center gap-2 rounded-full border border-blurple/25 bg-surface/88 px-3 py-1.5 text-sm font-medium text-foreground/75 shadow-[0_8px_24px_rgba(88,101,242,0.08)] dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:shadow-none">
                  <Check className="h-4 w-4 text-blurple" />
                  Verified App
                </div>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-7xl lg:leading-[1.05] dark:text-white">
              The modern RuneScape companion for your Discord server.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/70 sm:text-lg dark:text-white/70">
              Runebot is the original app used by thousands of players, and brings Old School RuneScape utilities, metrics, and all-new AI features to Discord.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="/invite"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 sm:text-base"
              >
                Invite to Discord
              </a>

              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/92 px-6 py-3 text-sm font-semibold text-foreground shadow-[0_8px_24px_rgba(43,44,59,0.08)] transition hover:bg-surface dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10 sm:text-base"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </motion.div>
        </Container>
      </section>

      <div className="-mt-px block overflow-hidden leading-none bg-background dark:bg-background">
        <svg
          className="block h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="fill-section-alt dark:fill-section-alt"
            d="M0,32L40,69.3C80,107,160,181,240,181.3C320,181,400,107,480,90.7C560,75,640,117,720,149.3C800,181,880,203,960,192C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>
    </>
  );
}