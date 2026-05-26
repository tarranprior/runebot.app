"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DiscordEmbed as DiscordEmbedType } from "@/types/discord";
import { InlineCode, SlashMention } from "@/components/ui/discord-inline";

interface DiscordEmbedProps {
  embed: DiscordEmbedType;
}

export function DiscordEmbed({ embed }: DiscordEmbedProps) {
  const accentColor = embed.embedColor || embed.color || "#5865F2";
  const inlineFields = (embed.fields || []).filter((field) => field.inline);
  const blockFields = (embed.fields || []).filter((field) => !field.inline);
  const detailFields = blockFields.filter((field) => field.name !== "Select Menu");

  const isPriceEmbed =
    embed.variant === "price" ||
    (Boolean(embed.image) &&
      inlineFields.some((field) => field.name.toLowerCase() === "buy price"));

  const isAccountManagerEmbed =
    embed.variant === "account-manager" || embed.title === "Account Manager (Beta)";

  const [footerText, setFooterText] = useState(embed.footer?.text || "");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
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
    });

    return () => window.cancelAnimationFrame(frame);
  }, [embed.footer?.text]);

  const getInlineFieldValue = (name: string) =>
    inlineFields.find((field) => field.name.toLowerCase() === name.toLowerCase())?.value;

  const topStats = ["Value", "Exchange", "Buy limit"];
  const midStats = ["Buy price", "Sell price", "Margin"];
  const todayStats = ["Today"];
  const rangeStats = ["30 Days", "90 Days", "180 Days"];

  const renderInline = (
    text: string,
    context?: string,
    isTip: boolean = false,
    isUsage: boolean = false
  ) => {
    const nodes: Array<React.ReactNode> = [];
    const re = /`([^`]+)`|\*\*([^*]+)\*\*|:([A-Za-z0-9_+-]+):|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(\/[^\s`*]+)/g;
    let lastIndex = 0;
    let keyIdx = 0;
    let m: RegExpExecArray | null;

    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIndex) {
        nodes.push(text.slice(lastIndex, m.index));
      }

      const contextStripped = (context || "").replace(/\*/g, "");
      const isUsageLocal = isUsage || /\bUsage\b\s*:/i.test(contextStripped);

      if (m[1]) {
        const content = m[1];
        const isSlash = content.trim().startsWith("/");

        nodes.push(
          isSlash && !isUsageLocal && !isTip ? (
            <SlashMention key={`slash-${keyIdx++}`}>{content}</SlashMention>
          ) : (
            <InlineCode key={`code-${keyIdx++}`}>{content}</InlineCode>
          )
        );
      } else if (m[2]) {
        nodes.push(
          <strong
            key={`bold-${keyIdx++}`}
            className="font-semibold text-[#2e3338] dark:text-[#f2f3f5]"
          >
            {m[2]}
          </strong>
        );
      } else if (m[3]) {
        // Emote token, e.g. :account:
        const emote = m[3];

        nodes.push(
          <Image
            key={`emote-${keyIdx++}`}
            src={`/images/features/emotes/${emote}.png`}
            alt={emote}
            width={16}
            height={16}
            className="inline-block align-text-bottom mr-1"
          />
        );
      } else if (m[4] && m[5]) {
        const label = m[4];
        const url = m[5];

        nodes.push(
          <a
            key={`link-${keyIdx++}`}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-[#1e90ff] underline"
          >
            {label}
          </a>
        );
      } else if (m[6]) {
        const content = m[6];

        nodes.push(
          isUsageLocal || isTip ? (
            <InlineCode key={`code-${keyIdx++}`}>{content}</InlineCode>
          ) : (
            <SlashMention key={`slash-${keyIdx++}`}>{content}</SlashMention>
          )
        );
      }

      lastIndex = re.lastIndex;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  };

  const renderDescription = () => {
    if (!embed.description) return null;

    const description = embed.description.replace(/\n/g, "\n");

    const isTipSingle = description.trim().startsWith("-#");
    const blocks = description.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

    if (!description.includes("\n")) {
      return (
        <p
          className={`${
            isPriceEmbed ? "mb-2" : "mb-2.5"
          } text-[13px] leading-[1.4] text-[#4f5660] dark:text-[#dbdee1]`}
        >
          {renderInline(description, description, isTipSingle, isTipSingle || /\bUsage:\b/i.test(description))}
        </p>
      );
    }
    return (
      <div className="mb-2.5 space-y-3 text-[13px] leading-[1.4] text-[#4f5660] dark:text-[#dbdee1]">
        {blocks.map((block, blockIdx) => {
          const isTipBlock = block.startsWith("-#");

          const lines = block
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

          return (
            <div
              key={blockIdx}
              className={isAccountManagerEmbed ? "space-y-0" : "space-y-0.5"}
            >
              {isTipBlock ? (
                <div className="text-sm text-[#6b6e73] dark:text-[#b5bac1]">
                          {lines.map((line, lineIdx) => {
                            const displayLine = line.replace(/^-#\s*/, "");
                            return (
                              <div key={lineIdx} className="leading-[17px]">
                                {renderInline(displayLine, block, true, /\bUsage:\b/i.test(block))}
                              </div>
                            );
                          })}
                </div>
              ) : (
                lines.map((line, lineIdx) => (
                  <div key={lineIdx} className="leading-[17px]">
                    {renderInline(line, block, false, /\bUsage:\b/i.test(block))}
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    );
  };

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
            {embed.title &&
              (embed.titleIconUrl ? (
                isAccountManagerEmbed ? (
                  <div className="mb-2 flex h-4 items-center gap-1.5 leading-none">
                    <span
                      aria-hidden="true"
                      className="block h-4 w-4 shrink-0 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url("${embed.titleIconUrl}")` }}
                    />

                    <h4 className="m-0 text-[14px] font-semibold leading-4 text-[#2e3338] dark:text-[#f2f3f5]">
                      {embed.title}
                    </h4>
                  </div>
                ) : (
                  <div className="mb-1 flex items-center gap-1.5">
                    <Image
                      src={embed.titleIconUrl}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                    <h4 className="m-0 text-[14px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                      {embed.title}
                    </h4>
                  </div>
                )
              ) : (
                <h4 className="mb-1 text-[14px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                  {embed.title}
                </h4>
              ))}

            {renderDescription()}

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
                      {renderInline(field.value)}
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
                    <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                      {renderInline(field.value)}
                    </div>
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
                width={isPriceEmbed ? 60 : 64}
                height={isPriceEmbed ? 60 : 64}
                className={
                  isPriceEmbed
                    ? "h-[60px] w-[60px] rounded object-contain"
                    : "h-[64px] w-[64px] rounded object-contain"
                }
              />
            </div>
          )}
        </div>

        {embed.footer && (
          <div
            className={
              isAccountManagerEmbed
                ? "mt-3 flex flex-col gap-0 p-0 dark:border-[#3f4147]"
                : "mt-2 flex flex-col gap-0 pt-2 dark:border-[#3f4147]"
            }
          >
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
                isAccountManagerEmbed ? (
                  <p key={line} className="m-0 leading-[14px]">
                    {line}
                  </p>
                ) : (
                  <p key={line}>{line}</p>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
