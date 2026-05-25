"use client";

import { motion } from "framer-motion";
import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";
import { discordFontJakarta } from "@/lib/fonts";

type DocsPricePreviewProps = {
  className?: string;
};

export function DocsPricePreview({ className = "" }: DocsPricePreviewProps) {
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
        <DocsEmbedPreview id="price-old-school-bond" />
      </motion.div>
    </div>
  );
}

export default DocsPricePreview;
