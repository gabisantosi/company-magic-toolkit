import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuestionnaireState } from "@/hooks/useQuestionnaireState";
import { useQuestionnaireApi } from "@/hooks/useQuestionnaireApi";

const STORAGE_KEY = "questionnaire_answers";

export const useQuestionnaire = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const { submitQuestionnaire } = useQuestionnaireApi();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  const {
    currentQuestion,
    setCurrentQuestion,
    answers,
    setAnswers,
    showPayment,
    setShowPayment,
    showRecommendations,
    setShowRecommendations,
    aiRecommendations,
    setAiRecommendations,
    progress,
    handleAnswer,
    currentQuestionData,
    isLastQuestion,
  } = useQuestionnaireState();

  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const handleNext = async () => {
    if (isLastQuestion) {
      if (!session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        toast({
          title: "Please log in",
          description: "You need to be logged in to submit your responses. Your answers will be saved.",
        });
        navigate("/login");
        return;
      }
      setShowPayment(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleAnalysis = async () => {
    if (!paymentCompleted) {
      toast({
        title: "Payment Required",
        description: "Please complete the payment to receive your analysis.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const recommendations = await submitQuestionnaire(answers, session!.user.id);
      setAiRecommendations(recommendations);
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
      setShowPayment(false);
    }
  };

  const handleCloseRecommendations = () => {
    setShowRecommendations(false);
    navigate("/checklist", {
      state: { businessType: answers.preferred_structure || "Aktiebolag" },
    });
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    handleAnalysis();
  };

  return {
    currentQuestion: currentQuestionData,
    progress,
    answers,
    isSubmitting,
    showPayment,
    showRecommendations,
    aiRecommendations,
    handleAnswer,
    handleNext,
    handlePrevious: () => setCurrentQuestion((prev) => prev - 1),
    handleAnalysis: handlePaymentSuccess,
    handleCloseRecommendations,
    setShowPayment,
    isLastQuestion,
  };
};