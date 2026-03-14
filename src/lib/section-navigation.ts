export const SECTION_ROUTE_MAP = {
  "/features": "features",
  "/statistics": "statistics",
} as const;

export type SectionRoute = keyof typeof SECTION_ROUTE_MAP;

export function isSectionRoute(href: string): href is SectionRoute {
  return href in SECTION_ROUTE_MAP;
}

function smoothScrollTo(targetY: number, duration = 650) {
  const startY = window.scrollY || document.documentElement.scrollTop || 0;
  const distance = targetY - startY;
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(rawProgress);

    window.scrollTo(0, startY + distance * eased);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export function scrollToSectionById(sectionId: string) {
  if (sectionId === "top") {
    smoothScrollTo(0);
    return;
  }

  const element = document.getElementById(sectionId);
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - 110;
  smoothScrollTo(targetY);
}

export function scrollToSectionByRoute(route: SectionRoute) {
  scrollToSectionById(SECTION_ROUTE_MAP[route]);
}
