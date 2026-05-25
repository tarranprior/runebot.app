"use client";

import { motion } from "framer-motion";
import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";
import { discordFontJakarta } from "@/lib/fonts";

type DocsErrorPreviewProps = {
  id: string;
  className?: string;
  ephemeral?: boolean;
};

export function DocsErrorPreview({
  id,
  className = "",
  ephemeral = false,
}: DocsErrorPreviewProps) {
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
        <DocsEmbedPreview id={id} ephemeral={ephemeral} />
      </motion.div>
    </div>
  );
}

export default DocsErrorPreview;
