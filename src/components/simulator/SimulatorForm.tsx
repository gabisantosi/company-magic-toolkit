import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface SimulationResults {
  registrationCost: number;
  annualTaxes: number;
  netIncome: number;
}

const calculateResults = (
  revenue: number,
  businessType: string,
  fixedCosts: number
): SimulationResults => {
  const results: SimulationResults = {
    registrationCost: 0,
    annualTaxes: 0,
    netIncome: 0,
  };

  if (businessType === "Aktiebolag") {
    results.registrationCost = 25000; // Registration cost for AB
    results.annualTaxes = revenue * 0.20; // 20% corporate tax
    results.netIncome = revenue - results.annualTaxes - fixedCosts;
  } else if (businessType === "Enskild Firma") {
    results.registrationCost = 1200; // Registration cost for EF
    results.annualTaxes = revenue * 0.30; // 30% income tax
    results.netIncome = revenue - results.annualTaxes - fixedCosts;
  }

  return results;
};

export const SimulatorForm = () => {
  const [revenue, setRevenue] = useState<number>(300000);
  const [businessType, setBusinessType] = useState<string>("Aktiebolag");
  const [fixedCosts, setFixedCosts] = useState<number>(50000);

  const results = calculateResults(revenue, businessType, fixedCosts);

  const chartData = [
    {
      name: "Registration Cost",
      value: results.registrationCost,
    },
    {
      name: "Annual Taxes",
      value: results.annualTaxes,
    },
    {
      name: "Net Income",
      value: results.netIncome,
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="revenue">Estimated Annual Revenue (SEK)</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              min={0}
              step={10000}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-type">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="business-type">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktiebolag">Limited Company (AB)</SelectItem>
                <SelectItem value="Enskild Firma">Sole Proprietorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fixed-costs">Fixed Costs (SEK/year)</Label>
            <Input
              id="fixed-costs"
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              min={0}
              step={5000}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Simulation Results</h3>
        <div className="space-y-4">
          <div>
            <Label>Registration Cost</Label>
            <p className="text-2xl font-bold">{results.registrationCost.toLocaleString()} SEK</p>
          </div>
          <div>
            <Label>Annual Taxes</Label>
            <p className="text-2xl font-bold">{results.annualTaxes.toLocaleString()} SEK</p>
          </div>
          <div>
            <Label>Net Income</Label>
            <p className="text-2xl font-bold">{results.netIncome.toLocaleString()} SEK</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
        <ChartContainer className="h-[400px]" config={{}}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4F46E5" name="Amount (SEK)" />
          </BarChart>
        </ChartContainer>
      </Card>
    </div>
  );
};