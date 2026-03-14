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
          { name: "Exchange", value: "8,601,077 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "8,775,917 coins", inline: true },
          { name: "Sell price", value: "8,532,526 coins", inline: true },
          { name: "Margin", value: "-243,391 (-1,947,128)", inline: true },
          { name: "Today", value: "-102.1k coins (Negative)", inline: true },
          { name: "30 Days", value: "-2.0%", inline: true },
          { name: "90 Days", value: "-5.0%", inline: true },
          { name: "180 Days", value: "-6.0%", inline: true },
        ],
        image: "/images/features/ags-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
          { name: "Exchange", value: "47,157,709 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "48,099,999 coins", inline: true },
          { name: "Sell price", value: "47,278,517 coins", inline: true },
          { name: "Margin", value: "-821,482 (-6,571,856)", inline: true },
          { name: "Today", value: "+857.4k coins (Positive)", inline: true },
          { name: "30 Days", value: "+0.0%", inline: true },
          { name: "90 Days", value: "-5.0%", inline: true },
          { name: "180 Days", value: "-15.0%", inline: true },
        ],
        image: "/images/features/dragon-claws-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#D4A017",
        title: "Tumeken's shadow (ID: 27277)",
        description: "An ancient staff created using a higher power.",
        thumbnail: "/images/features/tumekens-shadow.png",
        fields: [
          { name: "Value", value: "7,000,000 coins", inline: true },
          { name: "Exchange", value: "892,869,262 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "891,729,999 coins", inline: true },
          { name: "Sell price", value: "884,277,040 coins", inline: true },
          { name: "Margin", value: "-7,452,959 (-59,623,672)", inline: true },
          { name: "Today", value: "+814.2k coins (Positive)", inline: true },
          { name: "30 Days", value: "-2.0%", inline: true },
          { name: "90 Days", value: "+2.0%", inline: true },
          { name: "180 Days", value: "+0.0%", inline: true },
        ],
        image: "/images/features/tumekens-shadow-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.6-dev.1 • Today at 00:00",
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
        embedColor: "#7C8F2A",
        title: "Twisted bow (ID: 20997)",
        description:
          "A mystical bow carved from the twisted remains of the Great Olm.",
        thumbnail: "/images/features/twisted-bow.png",
        fields: [
          { name: "Value", value: "4,000,000 coins", inline: true },
          { name: "Exchange", value: "1,625,027,250 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "1,623,449,049 coins", inline: true },
          { name: "Sell price", value: "1,615,000,000 coins", inline: true },
          { name: "Margin", value: "-8,449,049 (-67,592,392)", inline: true },
          { name: "Today", value: "-12.7m coins (Negative)", inline: true },
          { name: "30 Days", value: "+2.0%", inline: true },
          { name: "90 Days", value: "+12.0%", inline: true },
          { name: "180 Days", value: "+2.0%", inline: true },
        ],
        image: "/images/features/twisted-bow-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.6-dev.1 • Today at 00:00",
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
        embedColor: "#6E625D",
        title: "Scythe of vitur (ID: 22486)",
        description: "A powerful scythe. It is currently uncharged.",
        thumbnail: "/images/features/scythe-of-vitur.png",
        fields: [
          { name: "Value", value: "4,000,000 coins", inline: true },
          { name: "Exchange", value: "1,594,831,879 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "1,599,450,000 coins", inline: true },
          { name: "Sell price", value: "1,591,433,416 coins", inline: true },
          { name: "Margin", value: "-8,016,584 (-64,132,672)", inline: true },
          { name: "Today", value: "-3.2m coins (Negative)", inline: true },
          { name: "30 Days", value: "+3.0%", inline: true },
          { name: "90 Days", value: "+13.0%", inline: true },
          { name: "180 Days", value: "+0.0%", inline: true },
        ],
        image: "/images/features/scythe-of-vitur-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#6C6A73",
        title: "Zaryte crossbow (ID: 26374)",
        description: "A weapon born out of conflict.",
        thumbnail: "/images/features/zaryte-crossbow.png",
        fields: [
          { name: "Value", value: "990,000 coins", inline: true },
          { name: "Exchange", value: "384,683,112 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "389,935,000 coins", inline: true },
          { name: "Sell price", value: "386,000,000 coins", inline: true },
          { name: "Margin", value: "-3,935,000 (-31,480,000)", inline: true },
          { name: "Today", value: "-685.3k coins (Negative)", inline: true },
          { name: "30 Days", value: "+1.0%", inline: true },
          { name: "90 Days", value: "+21.0%", inline: true },
          { name: "180 Days", value: "+5.0%", inline: true },
        ],
        image: "/images/features/zaryte-crossbow-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#4F9FB0",
        title: "Elysian spirit shield (ID: 12817)",
        description:
          "An ethereal shield with an elysian sigil attached to it.",
        thumbnail: "/images/features/elysian-spirit-shield.png",
        fields: [
          { name: "Value", value: "2,000,000 coins", inline: true },
          { name: "Exchange", value: "548,808,611 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "545,000,000 coins", inline: true },
          { name: "Sell price", value: "542,751,000 coins", inline: true },
          { name: "Margin", value: "-2,249,000 (-17,992,000)", inline: true },
          { name: "Today", value: "+2.3m coins (Positive)", inline: true },
          { name: "30 Days", value: "+1.0%", inline: true },
          { name: "90 Days", value: "+8.0%", inline: true },
          { name: "180 Days", value: "-9.0%", inline: true },
        ],
        image: "/images/features/elysian-spirit-shield-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#8B7D6B",
        title: "Osmumten's fang (ID: 26219)",
        description: "A deadly sword created long ago.",
        thumbnail: "/images/features/osmumtens-fang.png",
        fields: [
          { name: "Value", value: "1,000,000 coins", inline: true },
          { name: "Exchange", value: "22,824,954 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "22,824,954 coins", inline: true },
          { name: "Sell price", value: "22,454,642 coins", inline: true },
          { name: "Margin", value: "-370,312 (-2,962,496)", inline: true },
          { name: "Today", value: "+168.7k coins (Positive)", inline: true },
          { name: "30 Days", value: "-1.0%", inline: true },
          { name: "90 Days", value: "+6.0%", inline: true },
          { name: "180 Days", value: "+6.0%", inline: true },
        ],
        image: "/images/features/osmumtens-fang-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#7FAE2E",
        title: "Old school bond (ID: 13190)",
        description: "This bond can be redeemed for membership.",
        thumbnail: "/images/features/old-school-bond.png",
        fields: [
          { name: "Value", value: "2,000,000 coins", inline: true },
          { name: "Exchange", value: "14,108,181 coins", inline: true },
          { name: "Buy limit", value: "100", inline: true },
          { name: "Buy price", value: "14,000,000 coins", inline: true },
          { name: "Sell price", value: "13,500,000 coins", inline: true },
          { name: "Margin", value: "-500,000 (-50,000,000)", inline: true },
          { name: "Today", value: "-268.9k coins (Negative)", inline: true },
          { name: "30 Days", value: "-1.0%", inline: true },
          { name: "90 Days", value: "-2.0%", inline: true },
          { name: "180 Days", value: "-3.0%", inline: true },
        ],
        image: "/images/features/old-school-bond-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
        embedColor: "#6F7078",
        title: "Ghrazi rapier (ID: 22324)",
        description: "A razor sharp rapier, smeared with vampyric blood.",
        thumbnail: "/images/features/ghrazi-rapier.png",
        fields: [
          { name: "Value", value: "5,000,000 coins", inline: true },
          { name: "Exchange", value: "28,348,896 coins", inline: true },
          { name: "Buy limit", value: "8", inline: true },
          { name: "Buy price", value: "28,000,000 coins", inline: true },
          { name: "Sell price", value: "28,000,000 coins", inline: true },
          { name: "Margin", value: "+0 (+0)", inline: true },
          { name: "Today", value: "-390.7k coins (Negative)", inline: true },
          { name: "30 Days", value: "-11.0%", inline: true },
          { name: "90 Days", value: "-18.0%", inline: true },
          { name: "180 Days", value: "-16.0%", inline: true },
        ],
        image: "/images/features/ghrazi-rapier-180d.webp",
        footer: {
          text: "Exchange data from the official Grand Exchange API\nRunebot v1.0.5 • Today at 00:00",
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
  timestamp: "Today at 00:00",
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
  footerText: "Experience data from the official Hiscores API\nRunebot v1.0.5 • Today at 00:00",
  buttons: ["Boss Kills", "Bounty Hunter", "Clue Scrolls"],
  accentColor: "#5865F2",
};
