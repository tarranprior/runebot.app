import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordions, Accordion } from "fumadocs-ui/components/accordion";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Files, Folder, File } from "fumadocs-ui/components/files";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";

export const docsMdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  Accordions,
  Accordion,
  Tabs,
  Tab,
  Steps,
  Step,
  Files,
  Folder,
  File,
  InlineTOC,
  TypeTable,
  DocsEmbedPreview,
};
