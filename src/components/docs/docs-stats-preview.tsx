"use client";

import { motion } from "framer-motion";
import { DiscordStatsEmbed } from "@/components/ui/discord-stats-embed";
import { statsFeatureMock } from "@/data/feature-mocks";
import { discordFontJakarta } from "@/lib/fonts";

type DocsStatsPreviewProps = {
  className?: string;
};

export function DocsStatsPreview({ className = "" }: DocsStatsPreviewProps) {
  return (
    <div
      className={`not-prose w-full max-w-[560px] ${discordFontJakarta.className} leading-[1.25] ${className}`}
    >
      <motion.div
        className="[will-change:transform,opacity]"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <DiscordStatsEmbed data={statsFeatureMock} />
      </motion.div>
    </div>
  );
}

export default DocsStatsPreview;
