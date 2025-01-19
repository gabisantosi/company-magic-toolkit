import { useState } from "react";
import { questions } from "@/components/questionnaire/questions";

export const useQuestionnaireState = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string>("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  return {
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
    currentQuestionData: questions[currentQuestion],
    isLastQuestion: currentQuestion === questions.length - 1,
  };
};