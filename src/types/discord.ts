export interface DiscordButton {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "link";
}

export interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface DiscordEmbed {
  color?: string;
  embedColor?: string;
  author?: {
    name: string;
    iconUrl?: string;
    url?: string;
  };
  title?: string;
  url?: string;
  description?: string;
  fields?: DiscordField[];
  thumbnail?: string;
  image?: string;
  footer?: {
    text: string;
    iconUrl?: string;
  };
}

export interface DiscordMessage {
  authorName: string;
  authorAvatar?: string;
  isBot?: boolean;
  timestamp: string;
  content?: string;
  embeds?: DiscordEmbed[];
  buttons?: DiscordButton[];
}

export interface DiscordStatsSummary {
  level: number | string;
  xp: number | string;
}

export interface DiscordStatsMock {
  authorName: string;
  authorAvatar?: string;
  isBot?: boolean;
  timestamp: string;
  title: string;
  description: string;
  stats: Record<string, number | string>;
  overall: DiscordStatsSummary;
  combat: DiscordStatsSummary;
  footerText: string;
  buttons: string[];
  accentColor?: string;
}
