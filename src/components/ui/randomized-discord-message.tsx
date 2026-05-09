"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { DiscordMessage } from "@/components/ui/discord-message";
import { DiscordMessage as DiscordMessageType } from "@/types/discord";
import { getRandomItem } from "@/lib/random";

interface RandomizedDiscordMessageProps {
  mockDataset: DiscordMessageType[];
}

export function RandomizedDiscordMessage({ mockDataset }: RandomizedDiscordMessageProps) {
  const fallbackMessage = mockDataset[0];
  const [message, setMessage] = useState<DiscordMessageType | null>(null);
  const [isReady, setIsReady] = useState(false);

  const imageSources = useMemo(() => {
    if (!message?.embeds?.length) {
      return [];
    }

    return message.embeds.flatMap((embed) => [embed.thumbnail, embed.image].filter(Boolean) as string[]);
  }, [message]);

  useLayoutEffect(() => {
    let cancelled = false;

    if (mockDataset.length === 0) {
      queueMicrotask(() => {
        if (cancelled) {
          return;
        }

        setMessage(null);
        setIsReady(true);
      });

      return () => {
        cancelled = true;
      };
    }

    const selected = getRandomItem(mockDataset);

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setMessage(selected);
      setIsReady(false);
    });

    return () => {
      cancelled = true;
    };
  }, [mockDataset]);

  useLayoutEffect(() => {
    if (!message) {
      return;
    }

    let active = true;

    if (imageSources.length === 0) {
      queueMicrotask(() => {
        if (active) {
          setIsReady(true);
        }
      });

      return () => {
        active = false;
      };
    }

    let loadedCount = 0;

    const revealWhenReady = () => {
      loadedCount += 1;

      if (active && loadedCount >= imageSources.length) {
        setIsReady(true);
      }
    };

    const preloaded = imageSources.map((src) => {
      const image = new window.Image();
      image.onload = revealWhenReady;
      image.onerror = revealWhenReady;
      image.src = src;
      return image;
    });

    const safetyTimer = window.setTimeout(() => {
      if (active) {
        setIsReady(true);
      }
    }, 220);

    return () => {
      active = false;
      window.clearTimeout(safetyTimer);

      preloaded.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [message, imageSources]);

  if (!message && fallbackMessage) {
    return <DiscordMessage message={fallbackMessage} />;
  }

  if (!message) {
    return null;
  }

  return (
    <div className={`transition-opacity duration-200 ease-out ${isReady ? "opacity-100" : "opacity-0"}`}>
      <DiscordMessage message={message} />
    </div>
  );
}
