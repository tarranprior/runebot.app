import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";

export const docsMdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  DocsEmbedPreview,
};
