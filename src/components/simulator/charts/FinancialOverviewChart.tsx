import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { financialOverviewConfig } from "./ChartConfig";

interface FinancialOverviewChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const FinancialOverviewChart = ({ data }: FinancialOverviewChartProps) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
      <ChartContainer className="h-[400px]" config={financialOverviewConfig}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4F46E5" name="Amount (SEK)" />
        </BarChart>
      </ChartContainer>
    </>
  );
};