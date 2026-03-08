"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "600+", label: "Servers" },
  { value: "15,000+", label: "Channels" },
  { value: "50,000+", label: "Users" },
  { value: "99.98%", label: "Uptime" },
];

export function Statistics() {
  return (
    <>
      <section
        id="statistics"
        className="relative overflow-hidden m-[-1px] bg-surface py-24 text-foreground dark:bg-surface sm:py-28"
      >
        <Container>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground/60 dark:text-foreground/50">
              Trusted by thousands
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Built for Discord communities.
            </h2>

            <p className="mt-6 text-base leading-8 text-foreground/65 sm:text-lg">
              Don't just take our word for it, Runebot is already active with thousands of users across hundreds of servers.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-[28px] border border-surface-border bg-card p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-surface-border dark:bg-card dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </div>

                <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/45">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <div className="block overflow-hidden leading-none bg-surface dark:bg-surface">
        <svg
          className="block h-20 w-full sm:h-24 lg:h-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="fill-background dark:fill-background"
            d="M0,32L40,69.3C80,107,160,181,240,181.3C320,181,400,107,480,90.7C560,75,640,117,720,149.3C800,181,880,203,960,192C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
        </div>
    </>
  );
}