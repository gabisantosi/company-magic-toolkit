import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChecklistItemProps {
  step: string;
  completed: boolean;
  resourceLink?: string | null;
  estimatedTime?: string | null;
  onToggle: (completed: boolean) => void;
}

const ChecklistItem = ({ step, completed, resourceLink, estimatedTime, onToggle }: ChecklistItemProps) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-card rounded-lg border hover:border-primary transition-colors">
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) => onToggle(checked as boolean)}
        className="mt-1"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <p className={`text-base ${completed ? "line-through text-muted-foreground" : ""}`}>
            {step}
          </p>
          <div className="flex items-center gap-2">
            {estimatedTime && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
            {resourceLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
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