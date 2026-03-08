import { DiscordMessage, DiscordStatsMock } from "@/types/discord";

export const wikiLookupMocks: DiscordMessage[] = [
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8F8784",
        title: "3rd age platebody",
        description:
          "The 3rd age platebody is a part of the 3rd age melee set. Requiring level 65 Defence to wear, it has the third highest defence bonuses of all non-degradable melee body slot items, only surpassed by the justiciar chestguard and Torva platebody. The 3rd age platebody is a possible reward from hard, elite and master tier Treasure Trails and cannot be made through the Smithing skill.",
        fields: [
          { name: "Released", value: "5 December 2006", inline: true },
          { name: "Members", value: "Yes", inline: true },
          { name: "Quest item", value: "No", inline: true },
        ],
        thumbnail: "/images/features/3rd-age-platebody.png",
        footer: {
          text: "Runebot v1.0.5",
        },
      },
    ],
    buttons: [{ label: "Visit Page ↗", variant: "secondary" }],
  },
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#46211F",
        title: "Abyssal whip",
        description:
          "The abyssal whip is a one-handed melee weapon which requires an Attack level of 70 to wield. It can be obtained as a drop from abyssal demons or from sacrificing an unsired.",
        fields: [
          { name: "Released", value: "15 February 2005", inline: true },
          { name: "Members", value: "Yes", inline: true },
          { name: "Quest item", value: "No", inline: true },
        ],
        thumbnail: "/images/features/abyssal-whip.png",
        footer: {
          text: "Runebot v1.0.5",
        },
      },
    ],
    buttons: [{ label: "Visit Page ↗", variant: "secondary" }],
  },
];

export const priceLookupMocks: DiscordMessage[] = [
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#8F8784",
        title: "Armadyl godsword (ID: 11802)",
        description: "A beautiful, heavy sword.",
        thumbnail: "/images/features/armadyl-godsword.png",
        fields: [
          { name: "Value", value: "1,250,000 coins", inline: true },
          { name: "Exchange", value: "11,721,498 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "11,852,789 coins", inline: true },
          { name: "Sell price", value: "11,724,374 coins", inline: true },
          { name: "Margin", value: "-128,415", inline: true },
          { name: "Today", value: "-55.4k coins (Negative)", inline: true },
          { name: "30 Days", value: "-11.0%", inline: true },
          { name: "90 Days", value: "+9.0%", inline: true },
          { name: "180 Days", value: "+34.0%", inline: true },
        ],
        image: "/images/features/ags-90d.webp",
        footer: {
          text: "Exchange data from OSRS Exchange. For more analytics, use the buttons below.",
        },
      },
    ],
    buttons: [
      { label: "Real-Time Prices ↗", variant: "secondary" },
      { label: "GE Tracker ↗", variant: "secondary" },
      { label: "OSRS Exchange ↗", variant: "secondary" },
    ],
  },
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#7F1A0C",
        title: "Dragon claws (ID: 13652)",
        description: "A set of fighting claws.",
        thumbnail: "/images/features/dragon-claws.png",
        fields: [
          { name: "Value", value: "205,000 coins", inline: true },
          { name: "Exchange", value: "50,046,610 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "49,313,602 coins", inline: true },
          { name: "Sell price", value: "48,313,405 coins", inline: true },
          { name: "Margin", value: "-1,000,197", inline: true },
          { name: "Today", value: "-420.2k coins (Negative)", inline: true },
          { name: "30 Days", value: "+4.0%", inline: true },
          { name: "90 Days", value: "+1.0%", inline: true },
          { name: "180 Days", value: "-14.0%", inline: true },
        ],
        image: "/images/features/dragon-claws-90d.webp",
        footer: {
          text: "Exchange data from OSRS Exchange. For more analytics, use the buttons below.",
        },
      },
    ],
    buttons: [
      { label: "Real-Time Prices ↗", variant: "secondary" },
      { label: "GE Tracker ↗", variant: "secondary" },
      { label: "OSRS Exchange ↗", variant: "secondary" },
    ],
  },
];

export const utilityMocks: DiscordMessage[] = [
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#6880FF",
        title: "Tool",
        description:
          "Tool may refer to several articles. Use the dropdown below to select an option.",
        fields: [
          {
            name: "Select Menu",
            value: "Select an option.\nAxe\nBucket\nChisel\nHammer\nImcando hammer\nKnife\nFletching knife\nLockpick\nMachete\nJade machete\nOpal machete\nRed topaz machete\nPestle and mortar\nPestle and mortar (The Gauntlet)\nPickaxe\nSaw\nAmy's saw\nCrystal saw\nShears\nTinderbox\nTool space\nTool store\nAmmo mould\nDouble ammo mould\nAmulet mould",
            inline: false,
          },
        ],
      },
    ],
  },
  {
    authorName: "RuneBot",
    authorAvatar: "/images/runebot-ico.png",
    isBot: true,
    timestamp: "Today at 00:00",
    embeds: [
      {
        embedColor: "#6880FF",
        title: "Toy",
        description:
          "Toy may refer to several articles. Use the dropdown below to select an option.",
        fields: [
          {
            name: "Select Menu",
            value: "Select an option.\nBig Cats & WWF\nTiger toy\nLion toy\nSnow leopard toy\nAmur leopard toy\nClockwork\nToy solider",
            inline: false,
          },
        ],
      },
    ],
  },
];

export const statsFeatureMock: DiscordStatsMock = {
  authorName: "RuneBot",
  authorAvatar: "/images/runebot-ico.png",
  isBot: true,
  timestamp: "Yesterday at 23:54",
  title: "Personal Hiscores",
  description: "Personal Hiscores for Firmwares",
  stats: {
    Attack: 74,
    Strength: 80,
    Defence: 1,
    Ranged: 99,
    Prayer: 1,
    Magic: 78,
    Runecraft: 55,
    Construction: 75,
    Hitpoints: 90,
    Agility: 70,
    Herblore: 58,
    Thieving: 72,
    Crafting: 80,
    Fletching: 57,
    Slayer: 70,
    Hunter: 62,
    Mining: 65,
    Smithing: 60,
    Fishing: 70,
    Cooking: 99,
    Firemaking: 80,
    Woodcutting: 1,
    Farming: 53,
    Sailing: 1,
  },
  overall: {
    level: 1602,
    xp: 49519854,
  },
  combat: {
    level: 72,
    xp: 25525083,
  },
  footerText: "Experience data from the official Hiscores API.\nRunebot v1.0.5 • Yesterday at 23:55",
  buttons: ["Boss Kills", "Bounty Hunter", "Clue Scrolls"],
  accentColor: "#5865F2",
};
