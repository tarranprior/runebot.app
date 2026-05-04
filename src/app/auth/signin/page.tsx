import { Container } from "@/components/ui/container";
import { signIn } from "@/lib/auth/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Runebot",
  description: "Sign in with Discord to access the Runebot admin area.",
};

type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** Human-readable messages for Auth.js error codes on the sign-in page. */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "Your Discord account does not have admin access to this panel. Contact the server owner to be added to the allowlist.",
  OAuthCallback:
    "Something went wrong during Discord sign-in. Please try again.",
  OAuthSignin: "Failed to start Discord sign-in. Please try again.",
  Configuration:
    "Auth is not configured correctly. Check AUTH_DISCORD_ID and AUTH_DISCORD_SECRET.",
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolved = (await searchParams) ?? {};

  const callbackUrl =
    typeof resolved.callbackUrl === "string"
      ? resolved.callbackUrl
      : "/admin/logs";

  const errorCode =
    typeof resolved.error === "string" ? resolved.error : undefined;

  const errorMessage = errorCode
    ? (AUTH_ERROR_MESSAGES[errorCode] ??
      "An unexpected error occurred. Please try again.")
    : undefined;

  return (
    <div className="flex min-h-full flex-col">
      <section className="flex flex-1 items-center justify-center pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
        <Container>
          <div className="mx-auto max-w-sm">
            <div className="rounded-[28px] border border-surface-border bg-card/85 px-8 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-surface-border dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blurple/80">
                Internal Access
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                Admin sign-in
              </h1>
              <p className="mt-3 text-sm leading-6 text-foreground/55">
                This area is restricted to authorised admin accounts. Sign in
                with Discord to continue.
              </p>

              {errorMessage && (
                <div className="mt-5 rounded-xl border border-rose-500/15 bg-rose-500/5 px-4 py-3 text-sm leading-6 text-foreground/70 dark:border-rose-500/20">
                  {errorMessage}
                </div>
              )}

              <form
                className="mt-6"
                action={async () => {
                  "use server";
                  await signIn("discord", { redirectTo: callbackUrl });
                }}
              >
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blurple px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
                >
                  <DiscordIcon />
                  Sign in with Discord
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function DiscordIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942.0209-.0407.0012-.0889-.0407-.1060-.6517-.2472-1.2712-.5495-1.8701-.8965a.077.077 0 01-.0076-.1277c.1258-.0943.2516-.1923.3707-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1192.099.2450.1981.3708.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8965.0766.0766 0 00-.0407.1061c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}
