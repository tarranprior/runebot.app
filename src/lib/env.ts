import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1).optional(),
    AUTH_DISCORD_ID: z.string().min(1).optional(),
    AUTH_DISCORD_SECRET: z.string().min(1).optional(),
    AUTH_URL: z.url().optional(),
    RUNEBOT_LOGS_API_URL: z.url(),
    RUNEBOT_LOGS_SESSIONS_API_URL: z.url().optional(),
    RUNEBOT_LOGS_API_TOKEN: z.string().min(1),
    ADMIN_DISCORD_IDS: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    RUNEBOT_LOGS_API_URL: process.env.RUNEBOT_LOGS_API_URL,
    RUNEBOT_LOGS_SESSIONS_API_URL: process.env.RUNEBOT_LOGS_SESSIONS_API_URL,
    RUNEBOT_LOGS_API_TOKEN: process.env.RUNEBOT_LOGS_API_TOKEN,
    ADMIN_DISCORD_IDS: process.env.ADMIN_DISCORD_IDS,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
