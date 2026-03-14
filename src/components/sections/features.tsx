"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { RandomizedDiscordMessage } from "@/components/ui/randomized-discord-message";
import { DiscordStatsEmbed } from "@/components/ui/discord-stats-embed";
import { discordFontJakarta, discordFontDM } from "@/lib/fonts";
import { wikiLookupMocks, priceLookupMocks, utilityMocks, statsFeatureMock } from "@/data/feature-mocks";
import { DiscordMessage as DiscordMessageType, DiscordStatsMock } from "@/types/discord";

const features: Array<{
  title: string;
  description: string;
  visualType: "message" | "stats";
  mockDataset?: DiscordMessageType[];
  statsMock?: DiscordStatsMock;
  isPrice?: boolean;
  reverse: boolean;
}> = [
  {
    title: "Track player progression and personal stats at a glance.",
    description:
      "Runebot makes it easy to search player hiscores, progression, and long-term account stats directly inside Discord. From quick stat checks to richer progression views, the bot keeps useful account data accessible and easy to understand.",
    visualType: "stats",
    statsMock: statsFeatureMock,
    reverse: true,
  },
  {
    title: "Search for anything in RuneScape, directly from Discord.",
    description:
      "Using the official Old School RuneScape Wiki, Runebot helps your community access one of the largest and most up-to-date sources of game information without leaving Discord. From item lookups to boss prep and account progress, it keeps useful knowledge close at hand.",
    visualType: "message",
    mockDataset: wikiLookupMocks,
    reverse: false,
  },
  {
    title: "Track prices, margins, and game economy trends with built-in analytics.",
    description:
      "Runebot connects with the Old School Grand Exchange to surface pricing data, trends, and item movement in a way that feels quick and usable. Whether your users are flipping, planning upgrades, or just watching the market, the bot makes economy data easier to explore.",
    visualType: "message",
    mockDataset: priceLookupMocks,
    isPrice: true,
    reverse: true,
  },
  {
    title: "Built around modern Discord UX.",
    description:
      "Runebot embraces Discord’s current platform features, including slash commands, interactive components, and smoother flows that feel native to how communities use Discord today. That means less friction, better discoverability, and a more polished experience overall.",
    visualType: "message",
    mockDataset: utilityMocks,
    reverse: false,
  },
];

export function Features() {
  const EMBED_FONT = "jakarta"; // "jakarta" or "dm"

  const embedFontClass =
    EMBED_FONT === "jakarta" ? discordFontJakarta.className : discordFontDM.className;

  const revealViewport = { once: true, margin: "-80px" };

  return (
    <>
      <section
        id="features"
        className="relative bg-section-alt py-24 text-foreground dark:bg-section-alt sm:py-28"
      >
        <Container>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={revealViewport}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blurple/80">
              Features
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Powerful by default, built for servers.
            </h2>

            <p className="mt-6 text-base leading-8 text-foreground/65 sm:text-lg">
              Here are just some of the best features Runebot offers right out the box...
            </p>
          </motion.div>

          <div className="mt-16 space-y-8 sm:mt-20 sm:space-y-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`mx-auto grid w-full max-w-[1140px] items-center gap-8 overflow-hidden sm:px-8 sm:py-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 lg:px-10 lg:py-8 ${
                  feature.reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  className={`w-full ${feature.reverse ? "lg:justify-self-start" : "lg:justify-self-end"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={revealViewport}
                >
                  <div className={`w-full ${feature.isPrice ? "max-w-[590px]" : "max-w-[560px]"}`}>
                    {feature.visualType === "stats" && feature.statsMock ? (
                      <motion.div
                        className={`${embedFontClass} [will-change:transform,opacity]`}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={revealViewport}
                      >
                        <DiscordStatsEmbed data={feature.statsMock} />
                      </motion.div>
                    ) : (
                      <motion.div
                        className={`${embedFontClass} [will-change:transform,opacity]`}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        viewport={revealViewport}
                      >
                        <RandomizedDiscordMessage mockDataset={feature.mockDataset || []} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className={`w-full ${feature.reverse ? "lg:justify-self-end" : "lg:justify-self-start"}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  viewport={revealViewport}
                >
                  <div className="w-full max-w-[500px]">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {feature.title}
                    </h3>

                    <p className="mt-5 text-base leading-8 text-foreground/65 sm:text-[17px]">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            className="mx-auto mt-20 max-w-2xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={revealViewport}
          >
            <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
              But wait, there's more!
            </p>

            <div className="mt-8">
              <Link
                href="#docs"
                className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-white dark:text-[#1d1e28] dark:hover:bg-white/90 sm:text-base"
              >
                <BookOpen className="h-4 w-4" />
                Explore the Docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <div className="-mt-px block overflow-hidden leading-none bg-section-alt dark:bg-section-alt">
          <svg
            className="block h-auto w-full scale-y-[-1]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
          <path
            className="fill-surface dark:fill-surface"
            d="M0,192L34.3,192C68.6,192,137,192,206,176C274.3,160,343,128,411,128C480,128,549,160,617,186.7C685.7,213,754,235,823,213.3C891.4,192,960,128,1029,122.7C1097.1,117,1166,171,1234,192C1302.9,213,1371,203,1406,197.3L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          />
        </svg>
      </div>
    </>
  );
}