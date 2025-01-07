import { useQuestionnaire } from "./useQuestionnaire";
import { QuestionCard } from "./QuestionCard";
import { PaymentCard } from "./PaymentCard";
import { RecommendationsDialog } from "./RecommendationsDialog";

export const QuestionnaireForm = () => {
  const {
    currentQuestion,
    progress,
    answers,
    isSubmitting,
    showPayment,
    showRecommendations,
    aiRecommendations,
    handleAnswer,
    handleNext,
    handlePrevious,
    handleAnalysis,
    handleCloseRecommendations,
    setShowPayment,
    isLastQuestion,
  } = useQuestionnaire();

  if (showPayment) {
    return (
      <PaymentCard
        onBack={() => setShowPayment(false)}
        onAnalysis={handleAnalysis}
      />
    );
  }

  return (
    <>
      <QuestionCard
        currentQuestion={currentQuestion}
        progress={progress}
        answer={answers[currentQuestion.id] || ""}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isSubmitting={isSubmitting}
        isLastQuestion={isLastQuestion}
      />

      <RecommendationsDialog
        open={showRecommendations}
        onClose={handleCloseRecommendations}
        recommendations={aiRecommendations}
      />
    </>
  );
};

export default QuestionnaireForm;