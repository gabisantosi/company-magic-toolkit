import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionnaireButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/questionnaire")}
      className="bg-swedish-blue hover:bg-swedish-blue/90 text-white flex items-center gap-2 mx-auto"
    >
      <Flag className="h-4 w-4" />
      Take the Quiz
    </Button>
  );
};

export default QuestionnaireButton;