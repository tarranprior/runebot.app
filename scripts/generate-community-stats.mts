import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { normalizeCommunityStatsPayload } from "../src/lib/community-stats/normalize.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "src", "data", "generated", "community-stats.json");

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function main() {
  const apiUrl = getRequiredEnv("COMMUNITY_STATS_API_URL");
  const token = getRequiredEnv("COMMUNITY_STATS_API_TOKEN");

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "runebot-community-stats-generator",
    },
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error(`Community stats API request failed with status ${response.status}.`);
    console.error(responseBody);
    throw new Error(`Unable to fetch community stats from ${apiUrl}`);
  }

  let rawPayload: unknown;

  try {
    rawPayload = await response.json();
  } catch (error) {
    throw new Error(
      `Community stats API returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const payload = normalizeCommunityStatsPayload(rawPayload);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Generated community stats: ${path.relative(projectRoot, outputPath)}`);
}

main().catch((error) => {
  console.error("Failed to generate community stats.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
