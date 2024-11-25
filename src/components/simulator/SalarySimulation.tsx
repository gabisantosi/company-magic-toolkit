import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SalarySimulationProps {
  businessTypeId: number | null;
  revenue: number;
  fixedCosts: number;
  employees: number;
}

interface TaxBracket {
  id: number;
  min_amount: number;
  max_amount: number | null;
  tax_rate: number;
}

interface EmployerContribution {
  id: number;
  business_type_id: number;
  contribution_rate: number;
}

export const SalarySimulation = ({
  businessTypeId,
  revenue,
  fixedCosts,
  employees,
}: SalarySimulationProps) => {
  const [monthlySalary, setMonthlySalary] = useState<number>(30000);
  const [additionalBenefits, setAdditionalBenefits] = useState<number>(0);

  // Fetch tax brackets
  const { data: taxBrackets } = useQuery({
    queryKey: ['taxBrackets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('salary_tax_brackets')
        .select('*')
        .order('min_amount');
      if (error) throw error;
      return data as TaxBracket[];
    },
  });

  // Fetch employer contributions
  const { data: employerContributions } = useQuery({
    queryKey: ['employerContributions', businessTypeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_contributions')
        .select('*')
        .eq('business_type_id', businessTypeId);
      if (error) throw error;
      return data as EmployerContribution[];
    },
    enabled: !!businessTypeId,
  });

  const calculatePersonalTax = (annualSalary: number): number => {
    if (!taxBrackets) return 0;
    
    let totalTax = 0;
    let remainingSalary = annualSalary;

    for (const bracket of taxBrackets) {
      const bracketAmount = bracket.max_amount 
        ? Math.min(bracket.max_amount - bracket.min_amount, remainingSalary)
        : remainingSalary;
      
      if (bracketAmount <= 0) break;

      totalTax += (bracketAmount * bracket.tax_rate) / 100;
      remainingSalary -= bracketAmount;
    }

    return totalTax;
  };

  const calculateEmployerContribution = (annualSalary: number): number => {
    if (!employerContributions?.[0]) return 0;
    return (annualSalary * employerContributions[0].contribution_rate) / 100;
  };

  const annualSalary = monthlySalary * 12;
  const annualBenefits = additionalBenefits * 12;
  const personalTax = calculatePersonalTax(annualSalary);
  const employerContribution = calculateEmployerContribution(annualSalary);
  const totalCostToCompany = annualSalary + employerContribution + annualBenefits;
  const netAnnualSalary = annualSalary - personalTax;
  const remainingProfit = revenue - totalCostToCompany - fixedCosts;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Salary Simulation</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="monthly-salary">Monthly Gross Salary (SEK)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your monthly salary before taxes and deductions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="monthly-salary"
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(Number(e.target.value))}
              min={0}
              step={1000}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="benefits">Additional Monthly Benefits (SEK)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Additional benefits like insurance, transportation, etc.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="benefits"
              type="number"
              value={additionalBenefits}
              onChange={(e) => setAdditionalBenefits(Number(e.target.value))}
              min={0}
              step={500}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Monthly Net Salary</Label>
            <p className="text-2xl font-bold">{(netAnnualSalary / 12).toLocaleString()} SEK</p>
            <p className="text-sm text-muted-foreground">After personal income tax</p>
          </div>

          <div>
            <Label>Monthly Cost to Company</Label>
            <p className="text-2xl font-bold">{(totalCostToCompany / 12).toLocaleString()} SEK</p>
            <p className="text-sm text-muted-foreground">Including employer contributions and benefits</p>
          </div>

          <div>
            <Label>Annual Remaining Profit</Label>
            <p className={`text-2xl font-bold ${remainingProfit < 0 ? 'text-destructive' : ''}`}>
              {remainingProfit.toLocaleString()} SEK
            </p>
            <p className="text-sm text-muted-foreground">After all costs and salaries</p>
          </div>

          {remainingProfit < 0 && (
            <p className="text-sm text-destructive">
              Warning: The current salary structure exceeds the company's financial capacity. 
              Consider adjusting the salary or reducing other costs.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};