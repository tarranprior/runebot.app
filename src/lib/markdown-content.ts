import { readFile } from "fs/promises";
import path from "path";

type MarkdownFile = "TERMS.md" | "PRIVACY.md" | "CHANGELOG.md";

export async function readRootMarkdownFile(fileName: MarkdownFile) {
  const filePath = path.join(process.cwd(), fileName);
  return readFile(filePath, "utf-8");
}

// Legacy export for backwards compatibility
export { readRootMarkdownFile as readRootMarkdownFile };
