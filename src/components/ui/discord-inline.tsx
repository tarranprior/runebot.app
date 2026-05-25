import type React from "react";

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="
        mx-[1px]
        inline-flex
        items-center
        rounded-[4px]
        border
        border-black/10
        bg-[#f2f3f5]
        px-[4px]
        py-[1px]
        align-baseline
        font-mono
        text-[0.875em]
        font-medium
        leading-[1.25]
        text-[#2e3338]
        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]
        dark:border-white/[0.06]
        dark:bg-[#1e1f22]
        dark:text-[#dbdee1]
        dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]
      "
    >
      {children}
    </code>
  );
}

export function SlashMention({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        mx-[1px]
        inline-flex
        items-center
        rounded-[3px]
        bg-[#e7e9ff]
        px-[4px]
        py-[1px]
        align-baseline
        font-medium
        leading-[1.25]
        text-[#4752c4]
        hover:bg-[#dfe2ff]
        dark:bg-[#34375c]
        dark:text-[#c9cdfb]
        dark:hover:bg-[#3f4270]
      "
    >
      {children}
    </span>
  );
}

export default InlineCode;
