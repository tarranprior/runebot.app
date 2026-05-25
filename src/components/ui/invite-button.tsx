import type React from "react";
import ExternalLinkIcon from "@/components/ui/external-link-icon";
import { DISCORD_INVITE_PATH } from "@/lib/navigation";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: React.ReactNode;
};

export default function InviteButton({ label = "Invite to Discord", className = "", ...props }: Props) {
  const baseClass =
    "inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground transition hover:bg-accent/90";

  return (
    <a
      href={DISCORD_INVITE_PATH}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${className}`}
      {...props}
    >
      {label}
      <ExternalLinkIcon />
    </a>
  );
}
