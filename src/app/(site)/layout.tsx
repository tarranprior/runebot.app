import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteNotice } from "@/components/ui/site-notice";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
    </>
  );
}
