"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ScrollText,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  description?: string;
  icon: React.ElementType;
};

type AdminPrimarySidebarProps = {
  forceCollapsed?: boolean;
};

const STORAGE_KEY = "runebot:adminPrimaryCollapsed";

const SIDEBAR_W_COLLAPSED = 76;
const SIDEBAR_W_EXPANDED = 248;

const ROW_H = "h-11";
const ICON_BOX = "h-11 w-11";
const ICON_ROUND = "rounded-lg";
const ICON_SZ = "h-5 w-5";

const GUTTER_X = 8;
const ICON_BOX_PX = 44;
const LABEL_PL = GUTTER_X + ICON_BOX_PX + 8;

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin" || pathname === "/admin/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function detectIsMac(): boolean {
  const anyNav = navigator as unknown as {
    userAgentData?: { platform?: string };
    platform?: string;
    userAgent?: string;
  };
  try {
    const p = anyNav?.userAgentData?.platform;
    if (p) return /mac/i.test(p);
  } catch { /* ignore */ }
  try {
    if (typeof anyNav.platform === "string") return /mac/i.test(anyNav.platform);
  } catch { /* ignore */ }
  try {
    if (typeof anyNav.userAgent === "string") return /mac os/i.test(anyNav.userAgent);
  } catch { /* ignore */ }
  return false;
}

function getInitialCollapsedPreference() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Fixed-position pill tooltip shown in collapsed mode only. */
function FixedTooltip({
  show,
  anchorRect,
  label,
  hint,
}: {
  show: boolean;
  anchorRect: DOMRect | null;
  label: string;
  hint?: string | null;
}) {
  if (!show || !anchorRect) return null;
  const top = anchorRect.top + anchorRect.height / 2;
  const left = anchorRect.right + 12;
  return (
    <div
      className="pointer-events-none fixed z-[9999] ml-1 -translate-y-1/2"
      style={{ top, left }}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5",
          "text-xs font-semibold text-white/90",
          "bg-[#23232a] ring-1 ring-white/10",
          "shadow-lg shadow-black/20 backdrop-blur",
        )}
      >
        <span>{label}</span>
        {hint ? (
          <span className="text-[10px] font-semibold text-white/45">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

export function AdminPrimarySidebar({ forceCollapsed }: AdminPrimarySidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = useMemo(
    () => [
      { href: "/admin/logs", label: "Logs", description: "Runebot Logs (Beta)", icon: ScrollText },
    ],
    [],
  );

  const [preferredCollapsed, setPreferredCollapsed] = useState(getInitialCollapsedPreference);
  const [collapsed, setCollapsed] = useState(getInitialCollapsedPreference);
  const [manualOverrideInForcedMode, setManualOverrideInForcedMode] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const [tooltipLabel, setTooltipLabel] = useState<string | null>(null);
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const [tooltipHint, setTooltipHint] = useState<string | null>(null);
  const shortcutHint = isMac ? "⌘B" : "Ctrl+B";

  const clearTooltip = () => {
    setTooltipLabel(null);
    setTooltipRect(null);
    setTooltipHint(null);
  };

  const persistPreference = (next: boolean) => {
    setPreferredCollapsed(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch { /* ignore */ }
  };

  const userToggle = () => {
    setCollapsed((v) => {
      const next = !v;
      if (forceCollapsed) {
        setManualOverrideInForcedMode(true);
      } else {
        persistPreference(next);
      }
      return next;
    });
  };

  useEffect(() => {
    setIsMac(detectIsMac());
  }, []);

  useEffect(() => {
    if (forceCollapsed) {
      if (!manualOverrideInForcedMode) setCollapsed(true);
      return;
    }
    setManualOverrideInForcedMode(false);
    setCollapsed(preferredCollapsed);
  }, [forceCollapsed, manualOverrideInForcedMode, preferredCollapsed]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        userToggle();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMac, forceCollapsed, preferredCollapsed, manualOverrideInForcedMode]);

  useEffect(() => {
    if (!collapsed) {
      clearTooltip();
      return;
    }
    window.addEventListener("scroll", clearTooltip, true);
    window.addEventListener("resize", clearTooltip);
    return () => {
      window.removeEventListener("scroll", clearTooltip, true);
      window.removeEventListener("resize", clearTooltip);
    };
  }, [collapsed]);

  const activeHref = useMemo(() => {
    let active: string | null = null;
    for (const item of navItems) {
      if (isActivePath(pathname, item.href)) {
        if (!active || item.href.length > active.length) active = item.href;
      }
    }
    return active;
  }, [pathname, navItems]);

  const labelWrapClass = cn(
    "transition-[opacity,transform] duration-200 ease-out",
    collapsed
      ? "pointer-events-none w-0 overflow-hidden opacity-0 -translate-x-1"
      : "opacity-100 translate-x-0",
  );

  const rowBase = collapsed
    ? "text-foreground/60 hover:text-foreground/90"
    : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground/90";

  const activeRow = cn(
    collapsed
      ? "text-blurple"
      : "bg-blurple/[0.07] text-blurple dark:bg-blurple/[0.12] dark:text-blurple",
  );

  const rowClass = (isActive: boolean) => (isActive ? activeRow : rowBase);

  const iconBase = cn(
    "absolute left-2 top-1/2 -translate-y-1/2",
    "grid place-items-center transition-colors",
    ICON_BOX,
    ICON_ROUND,
  );

  const iconClass = (isActive: boolean) =>
    cn(
      iconBase,
      isActive
        ? cn(
            "text-blurple",
            collapsed && "bg-blurple/[0.07] dark:bg-blurple/[0.12]",
          )
        : "text-foreground/45 group-hover/link:text-foreground/75",
    );

  return (
    <aside
      className={cn(
        "relative flex h-full min-h-0 flex-col overflow-hidden",
        "border-r border-surface-border bg-background",
        "transition-[width] duration-200 ease-out shrink-0",
      )}
      style={{ width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED }}
    >
      {/* Nav items */}
      <nav
        className={cn(
          "flex-1 min-h-0 overflow-y-auto overscroll-contain overflow-x-hidden",
          "px-2 py-3",
          "[scrollbar-gutter:stable]",
          "scrollbar-discord",
        )}
      >
        {/* Runebot context row */}
        <div className="mb-2">
          <div
            className={cn("relative flex w-full items-center", ROW_H, "px-2")}
            style={{ paddingLeft: collapsed ? undefined : LABEL_PL }}
            aria-label={collapsed ? "Runebot Admin" : undefined}
            onMouseEnter={(e) => {
              if (!collapsed) return;
              setTooltipLabel("Runebot Admin");
              setTooltipRect(e.currentTarget.getBoundingClientRect());
            }}
            onMouseLeave={() => { if (!collapsed) return; clearTooltip(); }}
          >
            <span
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2",
                "grid place-items-center",
                ICON_BOX,
                "rounded-xl",
                "bg-blurple/10 text-blurple",
                "ring-1 ring-inset ring-blurple/20",
              )}
            >
              <span className="text-xs font-bold">RB</span>
            </span>
            <span className={cn(labelWrapClass, "min-w-0")}>
              <span className="block truncate whitespace-nowrap text-sm font-semibold leading-4 text-foreground/90">
                Runebot
              </span>
              <span className="block truncate whitespace-nowrap text-xs leading-4 text-foreground/44">
                /admin
              </span>
            </span>
          </div>
          <div className={cn("mt-2", collapsed ? "mx-3" : "mx-2")}>
            <div className="h-px w-full bg-surface-border" />
          </div>
        </div>

        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeHref === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group/link relative flex w-full items-center rounded-xl transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blurple/40",
                    ROW_H,
                    "justify-start px-2",
                    rowClass(isActive),
                  )}
                  style={{ paddingLeft: collapsed ? undefined : LABEL_PL }}
                  aria-label={collapsed ? item.label : undefined}
                  onMouseEnter={(e) => {
                    if (!collapsed) return;
                    setTooltipLabel(item.label);
                    setTooltipHint(item.description ?? null);
                    setTooltipRect(e.currentTarget.getBoundingClientRect());
                  }}
                  onMouseLeave={() => { if (!collapsed) return; clearTooltip(); }}
                >
                  <span className={iconClass(isActive)}>
                    <Icon className={ICON_SZ} />
                  </span>
                  <span className={cn(labelWrapClass, "min-w-0")}>
                    <span className="block whitespace-nowrap text-sm font-semibold leading-4">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span
                        className={cn(
                          "block whitespace-nowrap text-xs leading-4",
                          isActive ? "text-blurple/70" : "text-foreground/40",
                        )}
                      >
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-3">
        <button
          type="button"
          onClick={userToggle}
          className={cn(
            "group/link relative flex w-full cursor-pointer items-center rounded-xl transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blurple/40",
            ROW_H,
            "justify-start px-2",
            rowBase,
          )}
          style={{ paddingLeft: collapsed ? undefined : LABEL_PL }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onMouseEnter={(e) => {
            if (!collapsed) return;
            setTooltipLabel("Expand");
            setTooltipHint(shortcutHint);
            setTooltipRect(e.currentTarget.getBoundingClientRect());
          }}
          onMouseLeave={() => { if (!collapsed) return; clearTooltip(); }}
        >
          <span
            className={cn(
              iconBase,
              "text-foreground/45",
              "group-hover/link:text-foreground/75",
            )}
          >
            {collapsed ? (
              <PanelLeftOpen className={ICON_SZ} />
            ) : (
              <PanelLeftClose className={ICON_SZ} />
            )}
          </span>
          <span className={labelWrapClass}>
            <span className="block whitespace-nowrap text-sm font-semibold leading-5">
              Collapse
            </span>
          </span>
        </button>
      </div>

      <FixedTooltip
        show={collapsed && !!tooltipLabel}
        anchorRect={tooltipRect}
        label={tooltipLabel ?? ""}
        hint={tooltipHint}
      />
    </aside>
  );
}
