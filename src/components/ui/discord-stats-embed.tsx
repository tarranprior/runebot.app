"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DiscordStatsButton, DiscordStatsMock } from "@/types/discord";
import { Tooltip } from "@/components/ui/tooltip";
import { StatTooltipContent } from "@/components/ui/stat-tooltip-content";

interface DiscordStatsEmbedProps {
  data: DiscordStatsMock;
}

const STAT_COLUMNS = [
  [
    "Attack",
    "Strength",
    "Defence",
    "Ranged",
    "Prayer",
    "Magic",
    "Runecraft",
    "Construction",
  ],
  [
    "Hitpoints",
    "Agility",
    "Herblore",
    "Thieving",
    "Crafting",
    "Fletching",
    "Slayer",
    "Hunter",
  ],
  [
    "Mining",
    "Smithing",
    "Fishing",
    "Cooking",
    "Firemaking",
    "Woodcutting",
    "Farming",
    "Sailing",
  ],
] as const;

function formatNumber(value: number | string) {
  if (typeof value === "number") return value.toLocaleString();
  return value;
}

function getStatIconPath(statName: string) {
  return `/images/features/emotes/${statName}.png`;
}

function StatRow({
  statName,
  value,
}: {
  statName: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center gap-[2px]">
      <Tooltip
        content={<StatTooltipContent statName={statName} value={value} />}
        placement="top"
        delay={200}
        asChild
      >
        <span className="inline-flex">
          <Image
            src={getStatIconPath(statName)}
            alt={statName}
            width={16}
            height={16}
            className="h-4 w-4 object-contain"
          />
        </span>
      </Tooltip>

      <span className="w-[26px] text-[12px] leading-[1.25] tabular-nums text-[#2e3338] dark:text-[#f2f3f5]">
        {formatNumber(value)}
      </span>
    </div>
  );
}

export function DiscordStatsEmbed({ data }: DiscordStatsEmbedProps) {
  const accentColor = data.accentColor || "#5865F2";
  const [localTimestamp, setLocalTimestamp] = useState("Today at --:--");

  const buttons = useMemo<DiscordStatsButton[]>(
    () =>
      data.buttons.map((button) =>
        typeof button === "string"
          ? { label: button, kind: "view", row: 1 }
          : {
              kind: button.kind || "action",
              row: button.row || 1,
              ...button,
            }
      ),
    [data.buttons]
  );

  const buttonRows = useMemo(() => {
    const rows = new Map<number, DiscordStatsButton[]>();

    buttons.forEach((button) => {
      const row = button.row || 1;
      const existing = rows.get(row);

      if (existing) {
        existing.push(button);
        return;
      }

      rows.set(row, [button]);
    });

    return Array.from(rows.entries())
      .sort(([left], [right]) => left - right)
      .map(([, rowButtons]) => rowButtons.filter((button) => button.label !== "Skills"));
  }, [buttons]);

  const [activeView, setActiveView] = useState("Skills");

  const footerLines = useMemo(() => {
    const processed = data.footerText.replace(
      /Today at \d{1,2}:\d{2}/,
      localTimestamp
    );
    return processed.split("\n");
  }, [data.footerText, localTimestamp]);

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
      className="text-[#2e3338] dark:text-[#dbdee1]"
      style={{
        fontFamily:
          'Inter, "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <div className="flex items-start gap-3">
        <Image
          src={data.authorAvatar || "/images/runebot-ico.png"}
          alt={data.authorName}
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 rounded-full object-cover"
        />

        <div className="min-w-0 max-w-[380px]">
          {/* Header */}
          <div className="mb-1 flex items-center gap-1.5">
            <span className="text-[13px] font-semibold leading-none text-[#6cb6ff]">
              {data.authorName}
            </span>

            {data.isBot && (
              <span className="rounded bg-[#5865f2] px-1.5 py-[2px] text-[10px] font-bold text-white">
                ✓ APP
              </span>
            )}

            <span className="text-[11px] text-[#747f8d] dark:text-[#949ba4]">
              {localTimestamp}
            </span>
          </div>

          {/* Embed */}
          <div
            className="overflow-hidden rounded border border-[#d4d7dc] border-l-4 bg-[#f2f3f5] shadow-sm dark:border-[#2b2d31] dark:bg-[#2b2d31]"
            style={{ borderLeftColor: accentColor }}
          >
            <div className="px-3 py-2.5">
              {/* Title */}
              <h4 className="mb-1 text-[14px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                {data.title}
              </h4>

              {/* Description */}
              <p className="mb-3 text-[13px] leading-[1.4] text-[#4f5660] dark:text-[#dbdee1]">
                {data.description}
              </p>

              {/* Stats */}
              <div className="mb-3 inline-flex items-start gap-[26px]">
                {STAT_COLUMNS.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-[2px]">
                    {column.map((statName) => (
                      <StatRow
                        key={statName}
                        statName={statName}
                        value={data.stats[statName] ?? 1}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="mb-3 grid grid-cols-2 gap-x-2 pt-2">
                <div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold">
                    <Tooltip
                      content={
                        <StatTooltipContent
                          statName="Overall"
                          value={data.overall.level}
                        />
                      }
                      placement="top"
                      delay={200}
                      asChild
                    >
                      <span className="inline-flex">
                        <Image
                          src="/images/features/emotes/Overall.png"
                          alt="Overall"
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </span>
                    </Tooltip>
                    <span>Overall</span>
                  </div>

                  <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold">Level:</span>{" "}
                    {formatNumber(data.overall.level)}
                  </div>

                  <div className="text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold">XP:</span>{" "}
                    {formatNumber(data.overall.xp)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold">
                    <Tooltip
                      content={
                        <StatTooltipContent
                          statName="Combat"
                          value={data.combat.level}
                        />
                      }
                      placement="top"
                      delay={200}
                      asChild
                    >
                      <span className="inline-flex">
                        <Image
                          src="/images/features/emotes/Combat.png"
                          alt="Combat"
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </span>
                    </Tooltip>
                    <span>Combat</span>
                  </div>

                  <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold">Level:</span>{" "}
                    {formatNumber(data.combat.level)}
                  </div>

                  <div className="text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold">XP:</span>{" "}
                    {formatNumber(data.combat.xp)}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-0.5 text-[11px] text-[#747f8d] dark:text-[#b5bac1]">
                {footerLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-2 space-y-1.5">
            {buttonRows.map((rowButtons, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap gap-1.5">
                {rowButtons.map((button) => {
                  const isViewButton = button.kind === "view";
                  const isActive = isViewButton && activeView === button.label;

                  return (
                    <button
                      key={`${button.row || 1}-${button.label}`}
                      type="button"
                      onClick={isViewButton ? () => setActiveView(button.label) : undefined}
                      className={`inline-flex h-8 items-center justify-center rounded-[8px] border text-[12px] font-medium transition-colors ${
                        button.iconOnly ? "w-[60px] px-0" : "px-2.5"
                      } ${
                        isActive
                          ? "border-[#4b4f56] bg-[#3f4349] text-[#f2f3f5]"
                          : "border-[#d6d9df] bg-[#eef0f2] hover:bg-[#e2e5e9] dark:border-[#2f3338] dark:bg-[#252429] dark:text-[#e6e9ed] dark:hover:bg-[#42464b]"
                      }`}
                      aria-label={button.label}
                    >
                      {button.iconOnly ? (
                        <span className="text-[16px] leading-none" aria-hidden="true">⟳</span>
                      ) : (
                        <>
                          {button.icon && (
                            <Image
                              src={button.icon}
                              alt=""
                              width={16}
                              height={16}
                              className="mr-1.5 h-4 w-4 object-contain"
                              aria-hidden="true"
                            />
                          )}
                          <span>{button.label}</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
