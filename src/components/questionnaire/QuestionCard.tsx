import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { QuestionInput } from "./QuestionInput";
import { QuestionnaireProgress } from "./QuestionnaireProgress";
import { Question } from "./questions";

interface QuestionCardProps {
  currentQuestion: Question;
  progress: number;
  answer: string;
  onAnswer: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  isLastQuestion: boolean;
}

export const QuestionCard = ({
  currentQuestion,
  progress,
  answer,
  onAnswer,
  onPrevious,
  onNext,
  isSubmitting,
  isLastQuestion,
}: QuestionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentQuestion.title}</CardTitle>
        <CardDescription>{currentQuestion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <QuestionnaireProgress progress={progress} />
        
        <QuestionInput
          question={currentQuestion}
          value={answer}
          onChange={onAnswer}
        />

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={progress <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!answer || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              isLastQuestion ? "Finish" : "Next"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};