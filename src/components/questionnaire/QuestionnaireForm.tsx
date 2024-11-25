import { useState, useEffect } from "react";
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
import { Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "questionnaire_answers";

export const QuestionnaireForm = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string>("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleSaveAsPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Your Business Recommendations", 20, 20);
    
    // Add content
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(aiRecommendations, 170);
    doc.text(splitText, 20, 40);
    
    // Save the PDF
    doc.save("business-recommendations.pdf");
    
    toast({
      title: "PDF Downloaded",
      description: "Your recommendations have been saved as a PDF file.",
    });
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      if (!session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        toast({
          title: "Please log in",
          description: "You need to be logged in to submit your responses. Your answers will be saved.",
        });
        navigate("/login");
        return;
      }

      try {
        setIsSubmitting(true);

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

        const aiResponse = await supabase.functions.invoke('analyze-questionnaire', {
          body: { 
            responses: answers,
            userId: session.user.id
          }
        });

        if (aiResponse.error) throw aiResponse.error;

        setAiRecommendations(aiResponse.data.recommendations);
        setShowRecommendations(true);
        
        localStorage.removeItem(STORAGE_KEY);
        
        toast({
          title: "Analysis Complete!",
          description: "Review your personalized recommendations.",
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

  const handleCloseRecommendations = () => {
    setShowRecommendations(false);
    navigate("/checklist", {
      state: { businessType: answers.preferred_structure || "Aktiebolag" },
    });
  };

  const currentQ = questions[currentQuestion];

  return (
    <>
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

      <Dialog open={showRecommendations} onOpenChange={handleCloseRecommendations}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Personalized Business Recommendations</DialogTitle>
            <DialogDescription>
              Based on your responses, here are our recommendations:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4 whitespace-pre-wrap">
            {aiRecommendations}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleSaveAsPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Save as PDF
            </Button>
            <Button onClick={handleCloseRecommendations}>
              Continue to Checklist
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};