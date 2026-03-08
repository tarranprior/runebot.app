"use client";

import { useState, useEffect } from "react";
import { DiscordMessage } from "@/components/ui/discord-message";
import { DiscordMessage as DiscordMessageType } from "@/types/discord";
import { getRandomItem } from "@/lib/random";

interface RandomizedDiscordMessageProps {
  mockDataset: DiscordMessageType[];
}

export function RandomizedDiscordMessage({ mockDataset }: RandomizedDiscordMessageProps) {
  const [message, setMessage] = useState<DiscordMessageType>(mockDataset[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setMessage(getRandomItem(mockDataset));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mockDataset]);

  if (!mounted) {
    return <DiscordMessage message={mockDataset[0]} />;
  }

  return <DiscordMessage message={message} />;
}
