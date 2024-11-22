import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface ChecklistProgressProps {
  progress: number;
  completedCount: number;
  totalCount: number;
  items: Array<{
    estimated_time?: string | null;
    completed: boolean;
  }>;
}

const ChecklistProgress = ({ progress, completedCount, totalCount, items }: ChecklistProgressProps) => {
  const calculateRemainingTime = () => {
    const remainingItems = items.filter(item => !item.completed);
    let totalDays = 0;

    remainingItems.forEach(item => {
      if (item.estimated_time) {
        const timeString = item.estimated_time.toLowerCase();
        if (timeString.includes('day')) {
          const days = parseInt(timeString);
          if (!isNaN(days)) {
            totalDays += days;
          }
        } else if (timeString.includes('week')) {
          const weeks = parseInt(timeString);
          if (!isNaN(weeks)) {
            totalDays += weeks * 7;
          }
        }
      }
    });

    if (totalDays === 0) return null;
    return totalDays === 1 ? '1 day' : `${totalDays} days`;
  };

  const remainingTime = calculateRemainingTime();

  return (
    <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl shadow-lg border border-swedish-blue/10 animate-fade-in">
      <div className="relative space-y-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent animate-fade-in">
          Progress Overview
        </h2>
        <div className="space-y-4 animate-fade-in delay-100">
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
          
          <div className="space-y-2 pt-2 border-t border-swedish-blue/10">
            <p className="text-gray-700">
              You've completed {completedCount} of {totalCount} steps
            </p>
            {remainingTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Estimated time to finish: {remainingTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistProgress;