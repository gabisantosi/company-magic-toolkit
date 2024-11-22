import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistItemProps {
  step: string;
  completed: boolean;
  onToggle: (completed: boolean) => void;
}

const ChecklistItem = ({ step, completed, onToggle }: ChecklistItemProps) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-card rounded-lg border hover:border-primary transition-colors">
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) => onToggle(checked as boolean)}
        className="mt-1"
      />
      <div className="flex-1">
        <p className={`text-base ${completed ? "line-through text-muted-foreground" : ""}`}>
          {step}
        </p>
      </div>
    </div>
  );
};

export default ChecklistItem;