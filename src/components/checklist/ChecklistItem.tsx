import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Clock, FileDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import NextStepSuggestion from "./NextStepSuggestion";

interface ChecklistItemProps {
  step: string;
  completed: boolean;
  resourceLink?: string | null;
  estimatedTime?: string | null;
  details?: string | null;
  documentTemplateUrl?: string | null;
  businessType: string;
  industry: string;
  onToggle: (completed: boolean) => void;
  nextStep?: {
    step: string;
    details?: string | null;
  } | null;
}

const ChecklistItem = ({ 
  step, 
  completed, 
  resourceLink, 
  estimatedTime, 
  details,
  documentTemplateUrl,
  businessType,
  industry,
  onToggle,
  nextStep 
}: ChecklistItemProps) => {
  const navigate = useNavigate();

  const handleViewGuide = () => {
    navigate(`/guide?step=${encodeURIComponent(step)}&businessType=${encodeURIComponent(businessType)}&industry=${encodeURIComponent(industry)}`);
  };

  return (
    <div className="space-y-2">
      <div 
        className={`group flex items-start gap-4 p-6 rounded-xl border transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 ${
          completed 
            ? 'bg-accent/50 border-accent shadow-accent/20' 
            : 'bg-white border-swedish-blue/10 hover:border-swedish-blue/30 hover:bg-accent/5'
        }`}
      >
        <Checkbox
          checked={completed}
          onCheckedChange={(checked) => onToggle(checked as boolean)}
          className={`mt-1 transition-transform duration-300 group-hover:scale-110 ${
            completed ? 'border-swedish-blue' : ''
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
            <div className="flex-1 min-w-0">
              <p className={`text-base md:text-lg font-medium break-words transition-all duration-300 ${
                completed ? "text-muted-foreground line-through" : "text-gray-900"
              }`}>
                {step}
              </p>
              {details && (
                <p className={`text-sm md:text-base text-muted-foreground mt-2 break-words transition-all duration-300 ${
                  completed ? "opacity-70" : ""
                }`}>
                  {details}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {estimatedTime && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap bg-accent/50 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:bg-accent">
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-swedish-blue hover:text-swedish-blue/90 hover:bg-accent transition-all duration-300 hover:scale-110"
                      onClick={handleViewGuide}
                    >
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View guide</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {documentTemplateUrl && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-swedish-blue hover:text-swedish-blue/90 hover:bg-accent transition-all duration-300 hover:scale-110"
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
                        className="h-8 w-8 text-swedish-blue hover:text-swedish-blue/90 hover:bg-accent transition-all duration-300 hover:scale-110"
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
      {completed && nextStep && <NextStepSuggestion nextStep={nextStep} />}
    </div>
  );
};

export default ChecklistItem;