import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteNotice } from "@/components/ui/site-notice";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CustomCursorProvider } from "@/components/providers/custom-cursor-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata = {
  title: "The modern RuneScape companion for your Discord server — Runebot",
  description: "Runebot is the modern RuneScape companion for your Discord server.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        <ThemeProvider>
          <CustomCursorProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SiteNotice
              noticeId="privacy-policy-2026-05-17"
              title="🔔 Changes to Privacy Policy"
              message="We've recently updated Runebot's Privacy Policy. You can review the changes [here](/privacy)."
              actionLabel="Read Privacy Policy"
              actionUrl="/privacy"
              dismissLabel="OK"
            />
          </CustomCursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
