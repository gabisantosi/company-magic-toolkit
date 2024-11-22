import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight } from "lucide-react";

interface NextStepSuggestionProps {
  nextStep: {
    step: string;
    details?: string | null;
  } | null;
}

const NextStepSuggestion = ({ nextStep }: NextStepSuggestionProps) => {
  if (!nextStep) return null;

  return (
    <Alert className="mt-4 bg-accent/50 border-swedish-blue/20 animate-fade-in">
      <AlertDescription className="flex items-center gap-2 text-swedish-blue">
        <ArrowRight className="h-4 w-4" />
        <span>
          Next recommended step: <span className="font-medium">{nextStep.step}</span>
          {nextStep.details && (
            <span className="block text-sm text-muted-foreground mt-1">
              {nextStep.details}
            </span>
          )}
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default NextStepSuggestion;