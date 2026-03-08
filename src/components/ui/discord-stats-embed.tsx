"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DiscordStatsMock } from "@/types/discord";

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
  if (typeof value === "number") {
    return value.toLocaleString();
  }

  return value;
}

function getStatIconPath(statName: string) {
  return `/images/features/emotes/${statName}.png`;
}

export function DiscordStatsEmbed({ data }: DiscordStatsEmbedProps) {
  const accentColor = data.accentColor || "#5865F2";
  const [localTimestamp, setLocalTimestamp] = useState("Today at --:--");
  const buttonViews = useMemo(
    () => data.buttons.filter((viewName) => viewName !== "Skills"),
    [data.buttons]
  );
  const [activeView, setActiveView] = useState("Skills");

  const footerLines = useMemo(() => data.footerText.split("\n"), [data.footerText]);

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
      style={{ fontFamily: 'Inter, "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="flex items-start gap-3">
        <Image
          src={data.authorAvatar || "/images/runebot-ico.png"}
          alt={data.authorName}
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 rounded-full object-cover"
        />

        <div className="min-w-0 w-full max-w-[420px]">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className="text-[13px] font-semibold leading-none text-[#6cb6ff]">
              {data.authorName}
            </span>
            {data.isBot && (
              <span className="rounded bg-[#5865f2] px-1.5 py-[2px] text-[10px] font-bold text-white">
                ✓ APP
              </span>
            )}
            <span className="text-[11px] text-[#747f8d] dark:text-[#949ba4]">{localTimestamp}</span>
          </div>

          <div
            className="overflow-hidden rounded border border-[#d4d7dc] border-l-4 bg-[#f2f3f5] dark:border-[#1f2127] dark:bg-[#2b2d31]"
            style={{ borderLeftColor: accentColor }}
          >
            <div className="p-3">
              <h4 className="mb-1 text-[14px] font-semibold leading-tight text-[#2e3338] dark:text-[#f2f3f5]">
                {data.title}
              </h4>

              <p className="mb-3 text-[13px] leading-[1.4] text-[#4f5660] dark:text-[#dbdee1]">
                {data.description}
              </p>

              <div className="mb-3 grid grid-cols-3 gap-x-3 gap-y-1">
                {STAT_COLUMNS.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-0.5">
                    {column.map((statName) => (
                      <div key={statName} className="flex items-center gap-1">
                        <Image
                          src={getStatIconPath(statName)}
                          alt={statName}
                          width={16}
                          height={16}
                          className="h-4 w-4 object-contain"
                        />
                        <span className="text-[12px] leading-[1.25] text-[#2e3338] dark:text-[#f2f3f5]">
                          {formatNumber(data.stats[statName] ?? 1)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#2e3338] dark:text-[#f2f3f5]">
                    <Image
                      src="/images/features/emotes/Overall.png"
                      alt="Overall"
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                    <span>Overall</span>
                  </div>
                  <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold text-[#2e3338] dark:text-[#f2f3f5]">Level:</span>{" "}
                    {formatNumber(data.overall.level)}
                  </div>
                  <div className="text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold text-[#2e3338] dark:text-[#f2f3f5]">XP:</span>{" "}
                    {formatNumber(data.overall.xp)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-[#2e3338] dark:text-[#f2f3f5]">
                    <Image
                      src="/images/features/emotes/Combat.png"
                      alt="Combat"
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                    <span>Combat</span>
                  </div>
                  <div className="mt-0.5 text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold text-[#2e3338] dark:text-[#f2f3f5]">Level:</span>{" "}
                    {formatNumber(data.combat.level)}
                  </div>
                  <div className="text-[12px] text-[#4f5660] dark:text-[#dbdee1]">
                    <span className="font-semibold text-[#2e3338] dark:text-[#f2f3f5]">XP:</span>{" "}
                    {formatNumber(data.combat.xp)}
                  </div>
                </div>
              </div>

              <div className="space-y-0.5 text-[11px] text-[#747f8d] dark:text-[#b5bac1]">
                {footerLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {buttonViews.map((viewName) => {
              const isActive = activeView === viewName;

              return (
                <button
                  key={viewName}
                  type="button"
                  onClick={() => setActiveView(viewName)}
                  className={`inline-flex h-8 min-h-8 items-center justify-center rounded-[8px] border px-2.5 text-[12px] font-medium leading-4 transition-colors duration-150 select-none ${
                    isActive
                      ? "border-[#4b4f56] bg-[#3f4349] text-[#f2f3f5] dark:border-[#4b4f56] dark:bg-[#3f4349] dark:text-[#f2f3f5]"
                      : "border-[#d6d9df] bg-[#eef0f2] text-[#111827] hover:bg-[#e2e5e9] dark:border-[#2f3338] dark:bg-[#252429] dark:text-[#e6e9ed] dark:hover:bg-[#42464b]"
                  }`}
                >
                  {viewName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
