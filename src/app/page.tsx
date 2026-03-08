import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Statistics } from "@/components/sections/statistics";
import { Invite } from "@/components/sections/invite";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Statistics />
      <Invite />
    </>
  );
}
