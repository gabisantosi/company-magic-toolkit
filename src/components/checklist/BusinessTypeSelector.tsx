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
    <div className="relative group backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-swedish-blue/10 space-y-4 animate-fade-in hover:shadow-[0_20px_40px_rgb(0,106,167,0.2)] transition-all duration-500">
      <div className="absolute inset-[-2px] bg-gradient-to-r from-swedish-blue/10 via-accent/5 to-swedish-yellow/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
      <div className="relative">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent">
          Business Details
        </h2>
        <div className="grid gap-6 mt-4">
          <div className="space-y-2">
            <label htmlFor="business-type" className="text-sm font-medium text-gray-700">
              Business Type
            </label>
            <Select value={businessType} onValueChange={onBusinessTypeChange}>
              <SelectTrigger id="business-type" className="w-full bg-white">
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
              <SelectTrigger id="industry" className="w-full bg-white">
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
    </div>
  );
};

export default BusinessTypeSelector;