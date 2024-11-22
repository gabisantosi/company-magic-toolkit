import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const QuestionnaireButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/questionnaire")}
      className="bg-swedish-blue hover:bg-swedish-blue/90 text-white mx-auto"
    >
      Take the Quiz
    </Button>
  );
};

export default QuestionnaireButton;