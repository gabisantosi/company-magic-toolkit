import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuestionnaireState } from "@/hooks/useQuestionnaireState";

const STORAGE_KEY = "questionnaire_answers";

export const useQuestionnaire = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
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

  const ensureUserProfile = async (userId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return;

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userData.user.email,
          full_name: userData.user.user_metadata?.full_name || null
        });
    }
  };

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
      await ensureUserProfile(session!.user.id);

      const { error: responseError } = await supabase
        .from("questionnaire_responses")
        .insert({
          user_id: session!.user.id,
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
          userId: session!.user.id
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