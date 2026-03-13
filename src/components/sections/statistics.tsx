"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import {
  runebotCommunityStats,
  runebotCommunityStatsGeneratedAt,
} from "@/data/community-stats";

function formatGeneratedAtRelative(isoDate: string, nowMs: number) {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return "recently";
  }

  const diffMs = nowMs - timestamp;

  if (diffMs < 60_000) {
    return "just now";
  }

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  if (diffMs < 3_600_000) {
    return rtf.format(-Math.floor(diffMs / 60_000), "minute");
  }

  if (diffMs < 86_400_000) {
    return rtf.format(-Math.floor(diffMs / 3_600_000), "hour");
  }

  return rtf.format(-Math.floor(diffMs / 86_400_000), "day");
}

function formatGeneratedAtLocalAbsolute(isoDate: string) {
  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) {
    return "Unknown local time";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function Statistics() {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const relativeUpdatedAt = useMemo(
    () => formatGeneratedAtRelative(runebotCommunityStatsGeneratedAt, nowMs),
    [nowMs],
  );

  const localUpdatedAt = useMemo(
    () => formatGeneratedAtLocalAbsolute(runebotCommunityStatsGeneratedAt),
    [],
  );

  return (
    <>
      <section
        id="statistics"
        className="relative overflow-hidden m-[-1px] bg-surface py-24 text-foreground dark:bg-surface sm:py-28"
      >
        <Container>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground/60 dark:text-foreground/50">
              Trusted by thousands
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Built for Discord communities.
            </h2>

            <p className="mt-6 text-base leading-8 text-foreground/65 sm:text-lg">
              Don’t just take our word for it, Runebot is already active with thousands of users across hundreds of servers.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {runebotCommunityStats.map((stat) => (
              <motion.div
                key={stat.key}
                className="rounded-[28px] border border-surface-border bg-card px-8 py-7 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-surface-border dark:bg-card dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="font-mono text-[2rem] font-semibold tracking-[-0.03em] tabular-nums text-foreground sm:text-[2.35rem]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>

                <p className="mt-2.5 text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/45">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-8 text-center sm:mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span
              title={localUpdatedAt}
              className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-card/60 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/45 dark:border-surface-border dark:bg-card/70"
            >
              <span className="text-foreground/35">Last updated</span>
              <span aria-hidden="true" className="text-foreground/20">
                •
              </span>
              <span className="tabular-nums text-foreground/60">
                {relativeUpdatedAt}
              </span>
            </span>
          </motion.p>
        </Container>
      </section>

      <div className="block overflow-hidden leading-none bg-surface dark:bg-surface">
        <svg
          className="block h-20 w-full sm:h-24 lg:h-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="fill-background dark:fill-background"
            d="M0,32L40,69.3C80,107,160,181,240,181.3C320,181,400,107,480,90.7C560,75,640,117,720,149.3C800,181,880,203,960,192C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
        </div>
    </>
  );
}