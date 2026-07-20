import { readFile, stat } from "fs/promises";
import path from "path";

type MarkdownFile = "TERMS.md" | "PRIVACY.md" | "CHANGELOG.md";

export async function readRootMarkdownFile(fileName: MarkdownFile) {
  const filePath = path.join(process.cwd(), fileName);
  return readFile(filePath, "utf-8");
}

export async function readRootMarkdownFileWithMetadata(fileName: MarkdownFile) {
  const filePath = path.join(process.cwd(), fileName);
  const [content, fileStats] = await Promise.all([
    readFile(filePath, "utf-8"),
    stat(filePath),
  ]);

  return {
    content,
    lastModified: fileStats.mtime,
  };
}
