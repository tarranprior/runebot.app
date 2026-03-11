import generatedStackOverview from "@/data/generated/stack-overview.json";
import { toStackOverviewCards } from "@/lib/stack/normalize";
import type {
  GeneratedStackOverviewPayload,
  StackOverviewCard,
} from "@/lib/stack/types";

const payload = generatedStackOverview as GeneratedStackOverviewPayload;

export const runebotStackOverview: StackOverviewCard[] = toStackOverviewCards(payload);
