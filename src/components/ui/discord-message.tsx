"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DiscordMessage as DiscordMessageType } from "@/types/discord";
import { DiscordEmbed } from "./discord-embed";
import { DiscordSelect } from "./discord-select";

interface DiscordMessageProps {
  message: DiscordMessageType;
}

export function DiscordMessage({ message }: DiscordMessageProps) {
  const avatarSrc = message.authorAvatar || "/images/runebot-ico.png";
  const [localTimestamp, setLocalTimestamp] = useState("Today at --:--");
  const isPriceMessage = (message.embeds || []).some(
    (embed) =>
      Boolean(embed.image) &&
      (embed.fields || []).some((field) => field.name.toLowerCase() === "buy price")
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date());

      setLocalTimestamp(`Today at ${formattedTime}`);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`text-[#2e3338] dark:text-[#dbdee1] ${
        isPriceMessage ? "w-full max-w-none" : ""
      }`}
      style={{ fontFamily: 'Inter, "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="flex items-start gap-3">
        <Image
          src={avatarSrc}
          alt={message.authorName}
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] font-semibold leading-none text-[#6cb6ff]">
              {message.authorName}
            </span>
            {message.isBot && (
              <span className="rounded bg-[#5865f2] px-1.5 py-[2px] text-[10px] font-bold text-white">
                ✓ APP
              </span>
            )}
            <span className="text-[11px] text-[#747f8d] dark:text-[#949ba4]">{localTimestamp}</span>
          </div>

          {message.content && (
            <p className="mb-1.5 text-[12.5px] leading-[1.35] text-[#2e3338] dark:text-[#dbdee1]">{message.content}</p>
          )}

          {message.embeds && message.embeds.length > 0 && (
            <div className={`space-y-2 ${isPriceMessage ? "w-full max-w-none" : "w-full"}`}>
              {message.embeds.map((embed, index) => {
                const selectField = (embed.fields || []).find(
                  (field) => !field.inline && field.name === "Select Menu"
                );
                const selectOptions = selectField ? selectField.value.split("\n") : [];
                const selectPlaceholder = selectOptions[0] || "Select an option.";
                const selectItems = selectOptions.slice(1);

                return (
                  <div key={index}>
                    <DiscordEmbed embed={embed} />

                    {selectField && (
                      <DiscordSelect placeholder={selectPlaceholder} options={selectItems} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

            {(message.buttons && message.buttons.length > 0) || isPriceMessage ? (
              <div className={isPriceMessage ? "mt-2.5 space-y-1.5" : "mt-2 space-y-1.5"}>
                {message.buttons && message.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {message.buttons.map((button, index) => {
                      const base = "inline-flex items-center justify-center h-8 min-h-8 min-w-[60px] rounded-[8px] text-sm font-medium leading-4 px-2.5 transition-colors duration-150 select-none";

                      const variantClass =
                        button.variant === "primary"
                          ? `${base} bg-[#5865f2] text-white text-[12px] border border-transparent hover:bg-[#4e5ad6] dark:bg-[#5865f2] dark:hover:bg-[#4e5ad6]`
                          : button.variant === "link"
                          ? `${base} bg-transparent text-[#00a8fc] text-[12px] hover:underline dark:text-[#00aff4]`
                          : `${base} bg-[#eef0f2] text-[#111827] text-[12px] border border-[#d6d9df] hover:bg-[#e2e5e9] dark:bg-[#252429] dark:text-[#e6e9ed] dark:border-[#2f3338] dark:hover:bg-[#42464b]`;

                      return (
                        <button key={index} className={variantClass}>
                          {button.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {isPriceMessage && (
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      className="inline-flex items-center justify-center h-8 min-h-8 w-[60px] rounded-[8px] text-[16px] font-medium leading-none transition-colors duration-150 select-none bg-[#eef0f2] text-[#111827] border border-[#d6d9df] hover:bg-[#e2e5e9] dark:bg-[#252429] dark:text-[#e6e9ed] dark:border-[#2f3338] dark:hover:bg-[#42464b]"
                      aria-label="Refresh"
                    >
                      ⟳
                    </button>
                  </div>
                )}
              </div>
            ) : null}
        </div>
      </div>
    </div>
  );
}
