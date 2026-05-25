"use client";

import { motion } from "framer-motion";
import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";
import { discordFontJakarta } from "@/lib/fonts";

type DocsAccountManagerPreviewProps = {
  className?: string;
  ephemeral?: boolean;
};

export function DocsAccountManagerPreview({
  className = "",
  ephemeral = true,
}: DocsAccountManagerPreviewProps) {
  const containerClass = ephemeral
    ? `not-prose mx-auto w-full max-w-[1140px] ${discordFontJakarta.className} leading-[1.25] ${className}`
    : `not-prose w-full max-w-[560px] ${discordFontJakarta.className} leading-[1.25] ${className}`;

  return (
    <div className={containerClass}>
      <motion.div
        className="[will-change:transform,opacity]"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <DocsEmbedPreview id="account-manager" ephemeral={ephemeral} />
      </motion.div>
    </div>
  );
}

export default DocsAccountManagerPreview;
