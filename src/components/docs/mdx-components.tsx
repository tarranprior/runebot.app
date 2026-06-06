import * as React from "react";

import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordions, Accordion } from "fumadocs-ui/components/accordion";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Files, Folder, File } from "fumadocs-ui/components/files";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Card as DefaultCard } from "fumadocs-ui/components/card";
import ExternalLinkIcon from "@/components/ui/external-link-icon";

import { DocsEmbedPreview } from "@/components/docs/docs-embed-preview";
import DocsInviteButton from "@/components/docs/docs-invite-button";
import { DocsStatsPreview } from "@/components/docs/docs-stats-preview";
import { DocsPricePreview } from "@/components/docs/docs-price-preview";
import { DocsWikiPreview } from "@/components/docs/docs-wiki-preview";
import { DocsErrorPreview } from "@/components/docs/docs-error-preview";
import { DocsAccountManagerPreview } from "@/components/docs/docs-account-manager-preview";

const preventKbdWrap = (children: React.ReactNode): React.ReactNode => {
  if (typeof children === "string") {
    return children.replace(/ /g, "\u00A0");
  }

  if (Array.isArray(children)) {
    return children.map(preventKbdWrap);
  }

  return children;
};

type KbdProps = React.ComponentPropsWithoutRef<"kbd">;
type EmoteKbdProps = React.ComponentPropsWithoutRef<"kbd"> & {
  emote: string;
};
type DefaultCardProps = React.ComponentProps<typeof DefaultCard>;
type CardPropsWithTarget = DefaultCardProps & { target?: string };

function CardWrapper(props: CardPropsWithTarget) {
  const { href, target } = props;
  const isExternal =
    target === "_blank" ||
    (typeof href === "string" && (href.startsWith("http") || href.startsWith("https") || href === "/invite"));

  return (
    <div className="relative">
      <DefaultCard {...props} />
      {isExternal ? (
        <span className="absolute right-4 top-4 text-foreground/60">
          <ExternalLinkIcon className="h-4 w-4 text-foreground/60" />
        </span>
      ) : null}
    </div>
  );
}

function EmoteKbd({
  emote,
  children,
  className,
  style,
  ...props
}: EmoteKbdProps) {
  void className;
  void style;

  return (
    <kbd
      {...props}
      data-emote={emote}
      style={
        {
          "--runebot-emote-url": `url(/images/features/emotes/${emote}.png)`,
        } as React.CSSProperties
      }
    >
      {preventKbdWrap(children)}
    </kbd>
  );
}

export const docsMdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  kbd: ({ children, ...props }: KbdProps) => (
    <kbd {...props}>{preventKbdWrap(children)}</kbd>
  ),

  EmoteKbd,
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
  DocsStatsPreview,
  DocsPricePreview,
  DocsWikiPreview,
  DocsErrorPreview,
  DocsAccountManagerPreview,
  Card: CardWrapper,
  DocsInviteButton,
};
