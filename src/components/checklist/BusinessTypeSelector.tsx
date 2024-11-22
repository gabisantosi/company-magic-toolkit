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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-swedish-blue mb-4">Business Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="business-type" className="text-sm font-medium text-gray-700">
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
          <label htmlFor="industry" className="text-sm font-medium text-gray-700">
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