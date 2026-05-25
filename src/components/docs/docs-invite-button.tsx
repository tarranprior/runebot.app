import type React from "react";
import InviteButton from "@/components/ui/invite-button";

export default function DocsInviteButton({ className = "", ...rest }: React.ComponentProps<typeof InviteButton>) {
  return (
    <InviteButton
      label="Add to Discord"
      className={`px-4 py-2.5 text-sm font-semibold ${className}`.trim()}
      {...rest}
    />
  );
}


