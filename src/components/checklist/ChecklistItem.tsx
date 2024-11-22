import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Clock, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ChecklistItemProps {
  step: string;
  completed: boolean;
  resourceLink?: string | null;
  estimatedTime?: string | null;
  details?: string | null;
  documentTemplateUrl?: string | null;
  onToggle: (completed: boolean) => void;
}

const ChecklistItem = ({ 
  step, 
  completed, 
  resourceLink, 
  estimatedTime, 
  details,
  documentTemplateUrl,
  onToggle 
}: ChecklistItemProps) => {
  return (
    <div 
      className={`flex items-start gap-4 p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
        completed 
          ? 'bg-accent border-accent/50' 
          : 'bg-white border-swedish-blue/10 hover:border-swedish-blue/30'
      }`}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) => onToggle(checked as boolean)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <p className={`text-base md:text-lg font-medium break-words ${
              completed ? "text-muted-foreground" : "text-gray-900"
            }`}>
              {step}
            </p>
            {details && (
              <p className="text-sm md:text-base text-muted-foreground mt-2 break-words">
                {details}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {estimatedTime && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap bg-accent/50 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span>{estimatedTime}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated time to complete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {documentTemplateUrl && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-swedish-blue hover:text-swedish-blue/90 hover:bg-accent"
                      onClick={() => window.open(documentTemplateUrl, '_blank')}
                    >
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {resourceLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-swedish-blue hover:text-swedish-blue/90 hover:bg-accent"
                      onClick={() => window.open(resourceLink, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Official resource</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;