import { Clock } from "lucide-react";

interface ChecklistAnalyticsProps {
  completedCount: number;
  totalCount: number;
  items: Array<{
    estimated_time?: string | null;
    completed: boolean;
  }>;
}

const ChecklistAnalytics = ({ completedCount, totalCount, items }: ChecklistAnalyticsProps) => {
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
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-swedish-blue/10 space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent">
        Completion Summary
      </h2>
      <div className="space-y-2">
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
  );
};

export default ChecklistAnalytics;