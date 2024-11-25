import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuestionInput } from "./QuestionInput";
import { questions } from "./questions";
import { Loader2 } from "lucide-react";

export const QuestionnaireForm = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      try {
        setIsSubmitting(true);

        if (!session) {
          toast({
            title: "Not logged in",
            description: "Your responses won't be saved. Please log in first.",
          });
          navigate("/login");
          return;
        }

        // Save responses to Supabase
        const { error: responseError } = await supabase
          .from("questionnaire_responses")
          .insert({
            user_id: session.user.id,
            business_idea: answers.business_idea,
            target_market: answers.target_market,
            initial_investment: answers.initial_investment,
            experience_level: answers.experience_level,
            preferred_structure: answers.preferred_structure,
          });

        if (responseError) throw responseError;

        // Get AI analysis
        const aiResponse = await supabase.functions.invoke('analyze-questionnaire', {
          body: { 
            responses: answers,
            userId: session.user.id
          }
        });

        if (aiResponse.error) throw aiResponse.error;

        toast({
          title: "Analysis Complete!",
          description: "Your responses have been analyzed. Redirecting to recommendations...",
        });

        navigate("/checklist", {
          state: { businessType: answers.preferred_structure || "Aktiebolag" },
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to save your responses. Please try again.",
          variant: "destructive",
        });
        console.error('Questionnaire submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentQ.title}</CardTitle>
        <CardDescription>{currentQ.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-6" />
        
        <QuestionInput
          question={currentQ}
          value={answers[currentQ.id] || ""}
          onChange={handleAnswer}
        />

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQ.id] || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              currentQuestion === questions.length - 1 ? "Finish" : "Next"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};