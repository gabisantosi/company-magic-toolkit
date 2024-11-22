import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress = ({ progress }: ChecklistProgressProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-swedish-blue/10 animate-fade-in hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent">
          Overall Progress
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Completion</span>
            <span className="text-sm font-medium text-swedish-blue">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default ChecklistProgress;