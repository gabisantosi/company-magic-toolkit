import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BusinessDetailsFormProps {
  onDetailsSubmitted: (businessType: string, industry: string) => void;
  currentBusinessType: string;
  currentIndustry: string;
}

const BusinessDetailsForm = ({ 
  onDetailsSubmitted, 
  currentBusinessType, 
  currentIndustry 
}: BusinessDetailsFormProps) => {
  const [businessType, setBusinessType] = useState(currentBusinessType);
  const [industry, setIndustry] = useState(currentIndustry);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('business_details')
        .insert([{ business_type: businessType, industry }]);

      if (error) throw error;

      onDetailsSubmitted(businessType, industry);
      toast({
        title: "Success",
        description: "Business details updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update business details",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div>
        <label className="block text-sm font-medium mb-2">
          Business Type
        </label>
        <Select
          value={businessType}
          onValueChange={setBusinessType}
        >
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aktiebolag">Limited Company (AB)</SelectItem>
            <SelectItem value="Enskild Firma">Sole Proprietorship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Industry
        </label>
        <Select
          value={industry}
          onValueChange={setIndustry}
        >
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Services">Services</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit}>
        Update Business Details
      </Button>
    </div>
  );
};

export default BusinessDetailsForm;