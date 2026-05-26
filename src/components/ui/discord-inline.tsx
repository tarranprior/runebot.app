import type React from "react";

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className={
        "inline-block rounded-[3px] bg-[#e3e5e8] px-[0.18rem] py-0 align-baseline text-[0.875em] font-semibold leading-[1.125rem] text-[#2e3338] my-[-0.125rem] dark:bg-[#2f3136] dark:text-[#dbdee1] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]"
      }
    >
      {children}
    </code>
  );
}

export function SlashMention({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={
        "inline-block rounded-[3px] bg-[#e7e9ff] px-[4px] py-[1px] align-baseline text-[0.875em] font-medium leading-[1.125rem] text-[#5865f2] dark:bg-[#34375c] dark:text-[#c9cdfb]"
      }
      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system' }}
    >
      {children}
    </span>
  );
}

export default InlineCode;
