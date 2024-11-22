import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress = ({ progress }: ChecklistProgressProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm md:text-base font-medium text-swedish-blue">Overall Progress</span>
        <span className="text-sm md:text-base font-medium text-swedish-blue">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2 md:h-3" />
    </div>
  );
};

export default ChecklistProgress;