import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface GuideHeaderProps {
  businessType: string;
  industry: string;
  onBack: () => void;
}

const GuideHeader = ({ businessType, industry, onBack }: GuideHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-accent"
        onClick={onBack}
      >
        Back to Checklist
      </Button>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5 text-swedish-blue" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">About This Guide</h4>
            <p className="text-sm text-muted-foreground">
              This comprehensive guide provides step-by-step instructions, official resources, 
              and practical tips for establishing and running a {businessType} in the {industry} sector in Sweden.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default GuideHeader;