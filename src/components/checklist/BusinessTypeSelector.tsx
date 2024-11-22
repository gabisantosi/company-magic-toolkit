import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessTypeSelectorProps {
  businessType: string;
  industry: string;
  onBusinessTypeChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
}

const BusinessTypeSelector = ({
  businessType,
  industry,
  onBusinessTypeChange,
  onIndustryChange,
}: BusinessTypeSelectorProps) => {
  return (
    <div className="space-y-4 mb-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="business-type" className="text-sm font-medium">
            Business Type
          </label>
          <Select value={businessType} onValueChange={onBusinessTypeChange}>
            <SelectTrigger id="business-type" className="w-full">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aktiebolag">Aktiebolag (AB)</SelectItem>
              <SelectItem value="Enskild Firma">Enskild Firma</SelectItem>
              <SelectItem value="Handelsbolag">Handelsbolag</SelectItem>
              <SelectItem value="Kommanditbolag">Kommanditbolag</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="industry" className="text-sm font-medium">
            Industry
          </label>
          <Select value={industry} onValueChange={onIndustryChange}>
            <SelectTrigger id="industry" className="w-full">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Services">Services</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BusinessTypeSelector;