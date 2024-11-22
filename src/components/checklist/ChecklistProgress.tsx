import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  progress: number;
}

const ChecklistProgress = ({ progress }: ChecklistProgressProps) => {
  return (
    <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-swedish-blue/10 animate-fade-in">
      <div className="relative space-y-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent animate-fade-in">
          Overall Progress
        </h2>
        <div className="space-y-2 animate-fade-in delay-100">
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