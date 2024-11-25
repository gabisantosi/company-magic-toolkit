import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { costDistributionConfig } from "./ChartConfig";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface CostDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const CostDistributionChart = ({ data }: CostDistributionChartProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-4">Cost Distribution</h4>
      <ChartContainer className="h-[300px]" config={costDistributionConfig}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  );
};