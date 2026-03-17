"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X, BookOpen, Github, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CursorToggle } from "@/components/ui/cursor-toggle";
import {
  isSectionRoute,
  scrollToSectionById,
  scrollToSectionByRoute,
  SECTION_ROUTE_MAP,
} from "@/lib/section-navigation";

// Localized permissive typing for motion intrinsic components used below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as unknown as typeof motion & { div: any; nav: any };

type NavItem = {
  label: string;
  href: string;
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Features", href: "/features" },
      { label: "Stats", href: "/statistics" },
      { label: "Changelog", href: "/changelog" },
    ],
    []
  );

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (isHomePage && isSectionRoute(href)) {
      e.preventDefault();
      setOpen(false);
      scrollToSectionByRoute(href);
      return;
    }

    if (!isHomePage && isSectionRoute(href)) {
      e.preventDefault();
      setOpen(false);
      sessionStorage.setItem("scrollTarget", SECTION_ROUTE_MAP[href]);
      router.push("/");
      return;
    }

    setOpen(false);
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToSectionById("top");
    }
    // Otherwise let Link navigate normally
  };

  // Handle scroll-to-section when landing on homepage from another page
  useEffect(() => {
    if (!isHomePage) return;

    const stored = sessionStorage.getItem("scrollTarget");
    if (stored) {
      sessionStorage.removeItem("scrollTarget");
      const timeout = setTimeout(() => scrollToSectionById(stored), 100);
      return () => clearTimeout(timeout);
    }

    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const timeout = setTimeout(() => scrollToSectionById(hash), 100);
      return () => clearTimeout(timeout);
    }
  }, [isHomePage]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const { scrollY } = useScroll();
  const rawT = useTransform(scrollY, [0, 120], [0, 1]);
  const t = useSpring(
    rawT,
    reduceMotion ? { stiffness: 1, damping: 1 } : { stiffness: 260, damping: 30 }
  );

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      if (v <= 1) t.set(0);
    });

    return () => unsub();
  }, [scrollY, t]);

  const y = useTransform(t, [0, 1], [0, 16]);
  const maxWidth = useTransform(t, [0, 1], isDark ? [1440, 1180] : [1408, 1180]);
  const paddingX = useTransform(t, [0, 1], isDark ? [0, 16] : [8, 16]);
  const borderRadius = useTransform(
    t,
    [0, 0.35, 1],
    isDark ? [28, 28, 28] : [18, 24, 28]
  );

  const bg = useTransform(t, (v) => {
    if (v < 0.12) {
      // At top: fully transparent in both modes for hero integration
      return "rgba(0,0,0,0)";
    }
    // Scrolled: light mode uses light surface, dark mode uses dark surface
    return isDark ? "rgba(17,17,19,0.82)" : "rgba(243,243,246,0.86)";
  });

  const borderColor = useTransform(t, (v) => {
    if (v < 0.12) {
      // At top: fully transparent in both modes
      return "rgba(0,0,0,0)";
    }
    // Scrolled: light mode uses dark border, dark mode uses white border
    return isDark ? "rgba(255,255,255,0.10)" : "rgba(29,30,40,0.12)";
  });

  const shadow = useTransform(t, (v) => {
    if (v < 0.12) {
      // At top: no shadow in both modes
      return "0 0 0 rgba(0,0,0,0)";
    }
    // Scrolled: stronger shadows
    return isDark ? "0 10px 30px rgba(0,0,0,0.30)" : "0 10px 30px rgba(29,30,40,0.15)";
  });

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 overflow-x-clip">
        <M.div className="flex justify-center">
          <M.div
            className="w-full"
            style={{
              maxWidth: mounted ? maxWidth : 1408,
              paddingLeft: mounted ? paddingX : 8,
              paddingRight: mounted ? paddingX : 8,
              y: mounted ? y : 0,
              willChange: "transform, max-width, padding",
            }}
          >
            <M.div
              className="mx-auto border backdrop-blur-xl"
              style={{
                backgroundColor: mounted ? bg : "rgba(0,0,0,0)",
                borderColor: mounted ? borderColor : "rgba(0,0,0,0)",
                boxShadow: mounted ? shadow : "0 0 0 rgba(0,0,0,0)",
                borderRadius: mounted ? borderRadius : 18,
                overflow: "hidden",
                willChange: "background-color, border-color, box-shadow, border-radius",
              }}
            >
              <Container className="flex h-[76px] items-center">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={open ? "Close menu" : "Open menu"}
                      onClick={() => setOpen((prev) => !prev)}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
                        isDark
                          ? "border-surface-border bg-surface/70 text-foreground hover:bg-surface"
                          : "border-surface-border bg-surface/70 text-foreground hover:bg-surface"
                      }`}
                    >
                      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>

                    <Link
                      href="/"
                      onClick={handleBrandClick}
                      className="flex flex-col leading-none text-left"
                    >
                      <span
                        className={`text-[22px] font-semibold tracking-tight ${
                          isDark ? "text-foreground" : "text-foreground"
                        }`}
                      >
                        Runebot
                      </span>
                    </Link>
                  </div>

                  <nav className="hidden items-center gap-1.5 md:flex">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`cursor-pointer rounded-full px-4 py-2 text-[15px] font-medium transition ${
                          isDark
                            ? "text-foreground/70 hover:bg-foreground/8 hover:text-foreground"
                            : "text-foreground/70 hover:bg-foreground/8 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="ml-auto hidden items-center gap-2 md:flex">
                    <CursorToggle />
                    <ThemeToggle />

                    <Link
                      href="#docs"
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                        isDark
                          ? "border-surface-border bg-surface/70 text-foreground/80 hover:bg-surface hover:text-foreground"
                          : "border-surface-border bg-surface/70 text-foreground/80 hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <BookOpen className="h-4 w-4" />
                      Docs
                    </Link>

                    <Link
                      href="https://github.com/tarranprior/runebot"
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                        isDark
                          ? "border-surface-border bg-surface/70 text-foreground/80 hover:bg-surface hover:text-foreground"
                          : "border-surface-border bg-surface/70 text-foreground/80 hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>

                    <a
                      href="/invite"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                    >
                      Add to Discord
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 md:hidden">
                    <CursorToggle />
                    <ThemeToggle />

                    <Link
                      href="#invite"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                    >
                      Invite
                    </Link>
                  </div>
                </div>
              </Container>
            </M.div>
          </M.div>
        </M.div>
      </div>

      <AnimatePresence>
        {open && (
          <M.div
            className="fixed inset-0 z-[60] bg-background/95 px-6 pt-24 text-foreground md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <M.nav
              className="mx-auto flex max-w-2xl flex-col gap-5"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-left text-3xl font-semibold tracking-tight text-foreground transition hover:text-foreground/75"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/changelog"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface/70 px-6 py-3 text-base font-semibold text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Changelog
                </Link>

                <Link
                  href="#docs"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface/70 px-6 py-3 text-base font-semibold text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <BookOpen className="h-5 w-5" />
                  Documentation
                </Link>

                <Link
                  href="https://github.com/tarranprior/runebot"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface/70 px-6 py-3 text-base font-semibold text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>

                <a
                  href="/invite"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  Add to Discord
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </M.nav>
          </M.div>
        )}
      </AnimatePresence>
    </>
  );
}