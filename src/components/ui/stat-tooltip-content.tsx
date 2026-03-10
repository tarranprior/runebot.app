import Image from "next/image";

export interface StatMetadata {
  key: string;
  label: string;
  icon: string;
}

const EMOJI_DESCRIPTION = "This emoji is from the Runebot app";

// Minimal stat metadata
export const STAT_METADATA: Record<string, StatMetadata> = {
  Attack: { key: "Attack", label: ":Attack:", icon: "/images/features/emotes/Attack.png" },
  Strength: { key: "Strength", label: ":Strength:", icon: "/images/features/emotes/Strength.png" },
  Defence: { key: "Defence", label: ":Defence:", icon: "/images/features/emotes/Defence.png" },
  Ranged: { key: "Ranged", label: ":Ranged:", icon: "/images/features/emotes/Ranged.png" },
  Prayer: { key: "Prayer", label: ":Prayer:", icon: "/images/features/emotes/Prayer.png" },
  Magic: { key: "Magic", label: ":Magic:", icon: "/images/features/emotes/Magic.png" },
  Runecraft: { key: "Runecraft", label: ":Runecraft:", icon: "/images/features/emotes/Runecraft.png" },
  Construction: { key: "Construction", label: ":Construction:", icon: "/images/features/emotes/Construction.png" },
  Hitpoints: { key: "Hitpoints", label: ":Hitpoints:", icon: "/images/features/emotes/Hitpoints.png" },
  Agility: { key: "Agility", label: ":Agility:", icon: "/images/features/emotes/Agility.png" },
  Herblore: { key: "Herblore", label: ":Herblore:", icon: "/images/features/emotes/Herblore.png" },
  Thieving: { key: "Thieving", label: ":Thieving:", icon: "/images/features/emotes/Thieving.png" },
  Crafting: { key: "Crafting", label: ":Crafting:", icon: "/images/features/emotes/Crafting.png" },
  Fletching: { key: "Fletching", label: ":Fletching:", icon: "/images/features/emotes/Fletching.png" },
  Slayer: { key: "Slayer", label: ":Slayer:", icon: "/images/features/emotes/Slayer.png" },
  Hunter: { key: "Hunter", label: ":Hunter:", icon: "/images/features/emotes/Hunter.png" },
  Mining: { key: "Mining", label: ":Mining:", icon: "/images/features/emotes/Mining.png" },
  Smithing: { key: "Smithing", label: ":Smithing:", icon: "/images/features/emotes/Smithing.png" },
  Fishing: { key: "Fishing", label: ":Fishing:", icon: "/images/features/emotes/Fishing.png" },
  Cooking: { key: "Cooking", label: ":Cooking:", icon: "/images/features/emotes/Cooking.png" },
  Firemaking: { key: "Firemaking", label: ":Firemaking:", icon: "/images/features/emotes/Firemaking.png" },
  Woodcutting: { key: "Woodcutting", label: ":Woodcutting:", icon: "/images/features/emotes/Woodcutting.png" },
  Farming: { key: "Farming", label: ":Farming:", icon: "/images/features/emotes/Farming.png" },
  Sailing: { key: "Sailing", label: ":Sailing:", icon: "/images/features/emotes/Sailing.png" },
  Overall: { key: "Overall", label: ":Overall:", icon: "/images/features/emotes/Overall.png" },
  Combat: { key: "Combat", label: ":Combat:", icon: "/images/features/emotes/Combat.png" },
};

interface StatTooltipContentProps {
  statName: string;
  value?: string | number;
}

export function StatTooltipContent({ statName }: StatTooltipContentProps) {
  const stat = STAT_METADATA[statName];

  if (!stat) {
    return <span className="text-xs font-semibold">{statName}</span>;
  }

  return (
    <div className="flex items-start gap-2.5 max-w-[220px]">
      <Image
        src={stat.icon}
        alt={stat.label}
        width={18}
        height={18}
        className="h-[18px] w-[18px] flex-shrink-0 object-contain mt-[1px]"
      />

      <div className="flex flex-col gap-1">
        <div className="text-[13px] font-semibold text-[#1a1d21] dark:text-white">
          {stat.label}
        </div>

        <div className="text-[11.5px] text-[#5c6370] dark:text-[#b5bac1]">
          {EMOJI_DESCRIPTION}
        </div>
      </div>
    </div>
  );
}