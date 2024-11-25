import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CostDistributionChart } from "./charts/CostDistributionChart";
import { FinancialOverviewChart } from "./charts/FinancialOverviewChart";
import { SalarySimulation } from "./SalarySimulation";

interface BusinessType {
  id: number;
  name: string;
  description: string;
  registration_cost: number;
  default_fixed_cost: number;
  tax_rate: number;
}

interface Sector {
  id: number;
  name: string;
  description: string;
  average_revenue: number;
  average_fixed_cost: number;
}

interface PredefinedScenario {
  id: number;
  name: string;
  description: string;
  revenue: number;
  employees: number;
  fixed_costs: number;
  business_type_id: number;
  sector_id: number;
}

export const SimulatorForm = () => {
  const { toast } = useToast();
  const [revenue, setRevenue] = useState<number>(300000);
  const [businessTypeId, setBusinessTypeId] = useState<number | null>(null);
  const [sectorId, setSectorId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<number>(0);
  const [fixedCosts, setFixedCosts] = useState<number>(50000);

  // Fetch business types
  const { data: businessTypes } = useQuery({
    queryKey: ['businessTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_types')
        .select('*');
      if (error) throw error;
      return data as BusinessType[];
    },
  });

  // Fetch sectors
  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sectors')
        .select('*');
      if (error) throw error;
      return data as Sector[];
    },
  });

  // Fetch predefined scenarios
  const { data: scenarios } = useQuery({
    queryKey: ['scenarios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('predefined_scenarios')
        .select('*');
      if (error) throw error;
      return data as PredefinedScenario[];
    },
  });

  const selectedBusinessType = businessTypes?.find(bt => bt.id === businessTypeId);
  const selectedSector = sectors?.find(s => s.id === sectorId);

  // Auto-populate values when business type or sector changes
  useEffect(() => {
    if (selectedBusinessType) {
      setFixedCosts(selectedBusinessType.default_fixed_cost);
    }
  }, [businessTypeId, selectedBusinessType]);

  useEffect(() => {
    if (selectedSector) {
      setRevenue(selectedSector.average_revenue);
      setFixedCosts(prev => prev + selectedSector.average_fixed_cost);
    }
  }, [sectorId, selectedSector]);

  const loadScenario = (scenario: PredefinedScenario) => {
    setRevenue(scenario.revenue);
    setBusinessTypeId(scenario.business_type_id);
    setSectorId(scenario.sector_id);
    setEmployees(scenario.employees);
    setFixedCosts(scenario.fixed_costs);
  };

  const calculateResults = () => {
    if (!selectedBusinessType) return null;

    const registrationCost = selectedBusinessType.registration_cost;
    const annualTaxes = (revenue * selectedBusinessType.tax_rate) / 100;
    const employeeCosts = employees * 400000; // Rough estimate of 400,000 SEK per employee
    const totalFixedCosts = fixedCosts + employeeCosts;
    const netIncome = revenue - annualTaxes - totalFixedCosts;

    return {
      registrationCost,
      annualTaxes,
      employeeCosts,
      fixedCosts: totalFixedCosts,
      netIncome,
    };
  };

  const results = calculateResults();

  const barChartData = results ? [
    { name: "Registration Cost", value: results.registrationCost },
    { name: "Annual Taxes", value: results.annualTaxes },
    { name: "Fixed Costs", value: results.fixedCosts },
    { name: "Net Income", value: results.netIncome },
  ] : [];

  const pieChartData = results ? [
    { name: "Registration", value: results.registrationCost },
    { name: "Taxes", value: results.annualTaxes },
    { name: "Fixed Costs", value: results.fixedCosts },
  ] : [];

  const handleExport = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "Export Feature",
      description: "PDF export functionality will be implemented in the next release.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="business-type">Business Type</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose your preferred business structure. Each type has different registration costs and tax implications.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={businessTypeId?.toString()} onValueChange={(value) => setBusinessTypeId(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedBusinessType && (
                <p className="text-sm text-muted-foreground">{selectedBusinessType.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="sector">Business Sector</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your business sector helps us provide more accurate cost estimates.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={sectorId?.toString()} onValueChange={(value) => setSectorId(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors?.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id.toString()}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="revenue">Estimated Annual Revenue (SEK)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your expected yearly income before taxes and expenses.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
              <div className="flex items-center gap-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Each employee adds approximately 400,000 SEK to your annual costs.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="employees"
                type="number"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                min={0}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="fixed-costs">Additional Fixed Costs (SEK/year)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Include rent, utilities, insurance, and other regular expenses.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Predefined Scenarios</h3>
            <div className="space-y-2">
              {scenarios?.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => loadScenario(scenario)}
                >
                  <div className="text-left">
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-sm text-muted-foreground">{scenario.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {results && (
        <>
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold">Simulation Results</h3>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label>Registration Cost</Label>
                  <p className="text-2xl font-bold">{results.registrationCost.toLocaleString()} SEK</p>
                  <p className="text-sm text-muted-foreground">One-time cost</p>
                </div>
                <div>
                  <Label>Annual Taxes</Label>
                  <p className="text-2xl font-bold">{results.annualTaxes.toLocaleString()} SEK</p>
                  <p className="text-sm text-muted-foreground">Based on revenue and business type</p>
                </div>
                <div>
                  <Label>Total Fixed Costs</Label>
                  <p className="text-2xl font-bold">{results.fixedCosts.toLocaleString()} SEK</p>
                  <p className="text-sm text-muted-foreground">Including employee costs</p>
                </div>
                <div>
                  <Label>Net Income</Label>
                  <p className="text-2xl font-bold">{results.netIncome.toLocaleString()} SEK</p>
                  <p className="text-sm text-muted-foreground">After taxes and expenses</p>
                </div>
              </div>

              <div>
                <CostDistributionChart data={pieChartData} />
              </div>
            </div>
          </Card>

          <SalarySimulation
            businessTypeId={businessTypeId}
            revenue={revenue}
            fixedCosts={fixedCosts}
            employees={employees}
          />

          <Card className="p-6">
            <FinancialOverviewChart data={barChartData} />
          </Card>
        </>
      )}
    </div>
  );
};
