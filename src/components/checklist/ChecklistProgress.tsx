import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress = ({ progress }: ChecklistProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Overall Progress</span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ChecklistProgress;