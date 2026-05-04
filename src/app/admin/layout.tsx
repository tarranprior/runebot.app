import Link from "next/link";
import { BookOpen, Github } from "lucide-react";
import { redirect } from "next/navigation";
import { CursorToggle } from "@/components/ui/cursor-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Container } from "@/components/ui/container";
import { signOut } from "@/lib/auth/config";
import { getAdminSession } from "@/lib/auth/session";
import { PRIMARY_NAV_ITEMS } from "@/lib/navigation";

type AdminLayoutProps = {
  children: React.ReactNode;
};

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/auth/signin" });
}

/**
 * Admin segment layout — wraps all /admin/* pages.
 *
 * Replaces the public site chrome (navbar/footer already suppressed) with a
 * minimal internal tool header. The outer shell takes the full viewport since
 * the public navbar returns null on /admin routes.
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAdminSession();

  if (!session?.isAdmin) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="shrink-0 border-b border-surface-border/70 bg-background/85 backdrop-blur-xl">
        <Container fullWidth className="flex h-[76px] items-center">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex flex-col leading-none text-left">
                <span className="text-[22px] font-semibold tracking-tight text-foreground">Runebot Logs</span>
              </Link>

              <nav className="hidden items-center gap-1.5 md:flex">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="cursor-pointer rounded-full px-4 py-2 text-[15px] font-medium text-foreground/70 transition hover:bg-foreground/8 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="ml-auto hidden items-center gap-2 md:flex">
              <CursorToggle />
              <ThemeToggle />

              <Link
                href="/#docs"
                className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Docs
              </Link>

              <Link
                href="https://github.com/tarranprior/runebot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </Container>
      </header>

      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
