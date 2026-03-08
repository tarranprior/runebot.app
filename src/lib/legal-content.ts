import { readFile } from "fs/promises";
import path from "path";

export async function readRootMarkdownFile(fileName: "TERMS.md" | "PRIVACY.md") {
  const filePath = path.join(process.cwd(), fileName);
  return readFile(filePath, "utf-8");
}
