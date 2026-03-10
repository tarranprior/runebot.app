"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DiscordEmbed as DiscordEmbedType } from "@/types/discord";

interface DiscordEmbedProps {
  embed: DiscordEmbedType;
}

export function DiscordEmbed({ embed }: DiscordEmbedProps) {
  const accentColor = embed.embedColor || embed.color || "#5865F2";
  const inlineFields = (embed.fields || []).filter((field) => field.inline);
  const blockFields = (embed.fields || []).filter((field) => !field.inline);
  const detailFields = blockFields.filter((field) => field.name !== "Select Menu");
  const isPriceEmbed =
    Boolean(embed.image) &&
    inlineFields.some((field) => field.name.toLowerCase() === "buy price");

  const [footerText, setFooterText] = useState(embed.footer?.text || "");

  useEffect(() => {
    const formattedTime = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date());

    if (embed.footer?.text) {
      const updatedText = embed.footer.text.replace(
        /Today at \d{1,2}:\d{2}/,
        `Today at ${formattedTime}`
      );

      setFooterText(updatedText);
    }
  }, [embed.footer?.text]);

  const getInlineFieldValue = (name: string) =>
    inlineFields.find((field) => field.name.toLowerCase() === name.toLowerCase())?.value;

  const topStats = ["Value", "Exchange", "Buy limit"];
  const midStats = ["Buy price", "Sell price", "Margin"];
  const todayStats = ["Today"];
  const rangeStats = ["30 Days", "90 Days", "180 Days"];

  return (
    <div
      className={`overflow-hidden rounded border border-[#d4d7dc] border-l-4 bg-[#f2f3f5] dark:border-[#1f2127] dark:bg-[#2b2d31] ${
        isPriceEmbed ? "w-full max-w-[420px]" : ""
      }`}
      style={{ borderLeftColor: accentColor }}
    >
      <div className={isPriceEmbed ? "p-3.5" : "p-3.5"}>
        {embed.author && (
          <div className="mb-2 flex items-center gap-2">
            {embed.author.iconUrl && (
              <Image
                src={embed.author.iconUrl}
                alt={embed.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span className="text-xs font-medium text-[#2e3338] dark:text-[#ffffffd9]">
              {embed.author.name}
            </span>
          </div>
        )}

        <div className={`flex items-start ${isPriceEmbed ? "w-full gap-1" : "gap-3"}`}>
          <div className="flex-1">
            {embed.title && (
              <h4 className="mb-1 text-[14px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                {embed.title}
              </h4>
            )}

            {embed.description && (
              <p className={`${isPriceEmbed ? "mb-2" : "mb-2.5"} text-[13px] leading-[1.4] text-[#4f5660] dark:text-[#dbdee1]`}>
                {embed.description}
              </p>
            )}

            {isPriceEmbed ? (
              <div className="mb-3 space-y-2.5">
                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                  {topStats.map((name) => {
                    const value = getInlineFieldValue(name);
                    if (!value) return null;

                    return (
                      <div key={name}>
                        <div className="text-[12px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                          {name}
                        </div>
                        <div className="mt-0.5 text-[13px] leading-[1.25] text-[#4f5660] dark:text-[#dbdee1]">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                  {midStats.map((name) => {
                    const value = getInlineFieldValue(name);
                    if (!value) return null;

                    return (
                      <div key={name}>
                        <div className="text-[12px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                          {name}
                        </div>
                        <div className="mt-0.5 text-[13px] leading-[1.25] text-[#4f5660] dark:text-[#dbdee1]">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-1.5">
                  {todayStats.map((name) => {
                    const value = getInlineFieldValue(name);
                    if (!value) return null;

                    return (
                      <div key={name}>
                        <div className="text-[12px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                          {name}
                        </div>
                        <div className="mt-0.5 text-[13px] leading-[1.25] text-[#4f5660] dark:text-[#dbdee1]">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-x-4 gap-y-1.5">
                  {rangeStats.map((name) => {
                    const value = getInlineFieldValue(name);
                    if (!value) return null;

                    return (
                      <div key={name}>
                        <div className="text-[12px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                          {name}
                        </div>
                        <div className="mt-0.5 text-[13px] leading-[1.25] text-[#4f5660] dark:text-[#dbdee1]">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : inlineFields.length > 0 && (
              <div className="mb-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
                {inlineFields.map((field, index) => (
                  <div key={index}>
                    <div className="text-[12px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                      {field.name}
                    </div>
                    <div className="mt-0.5 text-[13px] leading-[1.2] text-[#4f5660] dark:text-[#dbdee1]">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {detailFields.length > 0 && (
              <div className="mb-2.5 space-y-1.5">
                {detailFields.map((field, index) => (
                  <div key={index}>
                    <div className="text-xs font-semibold uppercase tracking-[0.03em] text-[#747f8d] dark:text-[#b5bac1]">
                      {field.name}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">{field.value}</div>
                  </div>
                ))}
              </div>
            )}

            {embed.image && (
              <div
                className={`w-full overflow-hidden rounded ${
                    isPriceEmbed
                        ? "mt-2.5 -mx-1 bg-transparent border-0"
                        : "mt-2 border border-[#d4d7dc] bg-[#eceff1] dark:border-[#202227] dark:bg-[#25272c]"
                    }`}
              >
                {isPriceEmbed ? (
                  <div className="relative w-full aspect-[16/6.4]">
                    <Image
                      src={embed.image}
                      alt="Embed image"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={embed.image}
                    alt="Embed image"
                    width={680}
                    height={260}
                    className="h-auto w-full"
                  />
                )}
              </div>
            )}
          </div>

          {embed.thumbnail && (
            <div className={`flex-shrink-0 ${isPriceEmbed ? "mt-0" : "mt-1"}`}>
              <Image
                src={embed.thumbnail}
                alt="Thumbnail"
                width={isPriceEmbed ? 60 : 76}
                height={isPriceEmbed ? 60 : 76}
                className={isPriceEmbed ? "h-[60px] w-[60px] rounded object-contain" : "h-[76px] w-[76px] rounded object-contain"}
              />
            </div>
          )}
        </div>

        {embed.footer && (
          <div className="mt-2 flex flex-col gap-0 pt-2 dark:border-[#3f4147]">
            {embed.footer.iconUrl && (
              <Image
                src={embed.footer.iconUrl}
                alt="Footer icon"
                width={16}
                height={16}
                className="rounded-full"
              />
            )}
            <div className="space-y-0.5 text-[11px] text-[#747f8d] dark:text-[#b5bac1]">
              {footerText.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
