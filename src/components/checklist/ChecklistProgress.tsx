import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress = ({ progress }: ChecklistProgressProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm md:text-base font-medium">Overall Progress</span>
        <span className="text-sm md:text-base font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2 md:h-3" />
    </div>
  );
};

export default ChecklistProgress;