import { ScrollArea } from "@/components/ui/scroll-area";
import ChecklistItem from "./ChecklistItem";

interface ChecklistContainerProps {
  items: Array<{
    id: number;
    step: string;
    completed: boolean;
    resource_link?: string | null;
    estimated_time?: string | null;
    details?: string | null;
  }>;
  onToggleItem: (step: string, completed: boolean) => void;
}

const ChecklistContainer = ({ items, onToggleItem }: ChecklistContainerProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <ScrollArea className="h-[calc(100vh-32rem)] px-1">
        <div className="space-y-4">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              step={item.step}
              completed={item.completed}
              resourceLink={item.resource_link}
              estimatedTime={item.estimated_time}
              details={item.details}
              onToggle={(completed) => onToggleItem(item.step, completed)}
            />
          ))}
          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No checklist items found for this business type and industry.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChecklistContainer;