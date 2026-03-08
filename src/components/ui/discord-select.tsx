"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DiscordSelectProps {
  placeholder: string;
  options: string[];
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

export function DiscordSelect({ placeholder, options }: DiscordSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholder);
  const hasAutoOpened = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAutoOpened.current) return;

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
  }, []);

  return (
    <div ref={containerRef} className="mt-2 w-full max-w-[440px]">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full rounded-md border border-[#cfd3da] bg-[#ebedef] dark:border-[#3f4147] dark:bg-[#2f3136]"
      >
        <div className="flex h-9 items-center justify-between px-3 text-[12px] text-[#4f5660] dark:text-[#c5c9ce]">
          <span>{selected}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="text-[#747f8d] dark:text-[#b5bac1]"
            >
            <ChevronDown className="h-5 w-5 stroke-[2.25]" />
            </motion.div>
        </div>
      </button>

      <div className="relative mt-1.5 h-[164px]">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden rounded-md border border-[#cfd3da] bg-[#ebedef] shadow-lg [will-change:transform,opacity] dark:border-[#3f4147] dark:bg-[#2f3136] dark:shadow-black/30"
            >
              <motion.div
                variants={optionListVariants}
                initial="hidden"
                animate="show"
                className="scrollbar-discord max-h-[156px] space-y-0.5 overflow-y-auto p-1"
              >
                {options.map((item) => (
                  <motion.button
                    key={item}
                    type="button"
                    variants={optionItemVariants}
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                    className="w-full cursor-pointer rounded-sm px-3 py-2 text-left text-[12px] text-[#2e3338] hover:bg-[rgba(255,255,255,0.06)] dark:text-[#f2f3f5] dark:hover:bg-[rgba(255,255,255,0.06)]"
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
