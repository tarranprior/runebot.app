import type { StackConfigEntry } from "@/lib/stack/types";

export const RUNEBOT_STACK_OWNER = "tarranprior";

export const runebotStackConfig: StackConfigEntry[] = [
  {
    key: "runebot",
    label: "./runebot",
    repo: "runebot",
    owner: RUNEBOT_STACK_OWNER,
    status: "live",
    kind: "bot",
  },
  {
    key: "runebot-app",
    label: "./runebot.app",
    repo: "runebot.app",
    owner: RUNEBOT_STACK_OWNER,
    status: "live",
    kind: "website",
  },
  {
    key: "runebot-org",
    label: "./runebot.org",
    repo: "runebot.org",
    owner: RUNEBOT_STACK_OWNER,
    status: "archived",
    kind: "website",
  },
];
