export type NavItem = {
  label: string;
  href: string;
};

export const PROJECT_GITHUB_URL = "https://github.com/tarranprior/runebot";

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Stats", href: "/statistics" },
  { label: "Changelog", href: "/changelog" },
];

// Final Discord OAuth URL used for Add to Discord (external navigation)
export const DISCORD_INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=978953033989914654&permissions=2147764224&scope=bot%20applications.commands";
