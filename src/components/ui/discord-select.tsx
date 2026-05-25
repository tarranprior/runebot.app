"use client";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type DiscordSelectOption =
  | string
  | {
      label: string;
      iconSrc?: string;
    };

interface DiscordSelectProps {
  placeholder: string;
  options: DiscordSelectOption[];
  compactMenu?: boolean;
  defaultOpen?: boolean;
  disableAutoOpen?: boolean;
}

const optionListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const optionItemVariants = {
  hidden: { opacity: 0, y: -2 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: "easeOut" as const },
  },
};

export function DiscordSelect({
  placeholder,
  options,
  compactMenu = false,
  defaultOpen = false,
  disableAutoOpen = false,
}: DiscordSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [selected, setSelected] = useState<string>(placeholder);
  const hasAutoOpened = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Normalize incoming options to a consistent object shape and ensure the selected
  // option is rendered first. This preserves behavior while keeping the JSX cleaner.
  const normalizedOptions: { label: string; iconSrc?: string }[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt } : opt
  );

  const selectedFirstOptions = [
    ...normalizedOptions.filter((o) => o.label === selected),
    ...normalizedOptions.filter((o) => o.label !== selected),
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAutoOpened.current || disableAutoOpen || defaultOpen) return;

    let timer: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasAutoOpened.current) return;

        timer = window.setTimeout(() => {
          setIsOpen(true);
          hasAutoOpened.current = true;
          observer.disconnect();
        }, 500);
      },
      { threshold: 0.35 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [defaultOpen, disableAutoOpen]);

  return (
    <div ref={containerRef} className="mt-2 w-full max-w-[440px]">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full rounded-md border border-[#cfd3da] bg-[#ebedef] dark:border-[#3f4147] dark:bg-[#2f3136]"
      >
        <div className="flex h-9 items-center justify-between px-3 text-[12px] text-[#4f5660] dark:text-[#c5c9ce]">
          <span className="truncate">{selected}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-[#747f8d] dark:text-[#b5bac1]"
          >
            <ChevronDown className="h-5 w-5 stroke-[2.25]" />
          </motion.div>
        </div>
      </button>

      <div className={compactMenu ? "relative mt-1.5" : "relative mt-1.5 h-[164px]"}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`${compactMenu ? "relative" : "absolute inset-0"} overflow-hidden rounded-md border border-[#cfd3da] bg-[#ebedef] shadow-lg [will-change:transform,opacity] dark:border-[#3f4147] dark:bg-[#2f3136] dark:shadow-black/30`}
            >
              <motion.div
                variants={optionListVariants}
                initial="hidden"
                animate="show"
                className={`scrollbar-discord ${compactMenu ? "max-h-none" : "max-h-[156px]"} space-y-0.5 overflow-y-auto p-1`}
              >
                {selectedFirstOptions.map((opt) => {
                  const isSelected = opt.label === selected;

                  return (
                    <motion.button
                      key={opt.label}
                      type="button"
                      variants={optionItemVariants}
                      onClick={() => {
                        setSelected(opt.label);
                        setIsOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-sm px-3 text-[12px] text-[#2e3338] dark:text-[#f2f3f5] h-9 ${
                        isSelected
                          ? "bg-[rgba(59,130,246,0.06)] dark:bg-[rgba(59,130,246,0.08)]"
                          : "hover:bg-[rgba(255,255,255,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {opt.iconSrc && (
                          <Image
                            src={opt.iconSrc}
                            alt=""
                            className="h-4 w-4 shrink-0 object-contain"
                            width={16}
                            height={16}
                          />
                        )}
                        <span className="truncate text-left">{opt.label}</span>
                      </span>
                      {isSelected ? (
                        <span className="ml-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#3b82f6] text-white">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="ml-3 w-5" />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
