import { ChartConfig } from "@/components/ui/chart";

export const costDistributionConfig: ChartConfig = {
  registration: {
    label: "Registration",
    color: "#0088FE",
  },
  taxes: {
    label: "Taxes",
    color: "#00C49F",
  },
  fixedCosts: {
    label: "Fixed Costs",
    color: "#FFBB28",
  },
};

export const financialOverviewConfig: ChartConfig = {
  amount: {
    label: "Amount (SEK)",
    color: "#4F46E5",
  },
};