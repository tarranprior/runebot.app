import type React from "react";
import { ArrowUpRight } from "lucide-react";

type Props = React.ComponentProps<typeof ArrowUpRight> & { className?: string };

export default function ExternalLinkIcon({ className = "h-4 w-4 shrink-0", ...props }: Props) {
  return <ArrowUpRight className={className} aria-hidden="true" {...props} />;
}
