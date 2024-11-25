import { Progress } from "@/components/ui/progress";

interface QuestionnaireProgressProps {
  progress: number;
}

export const QuestionnaireProgress = ({ progress }: QuestionnaireProgressProps) => {
  return <Progress value={progress} className="mb-6" />;
};