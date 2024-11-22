import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChecklistItem from "./ChecklistItem";

interface ChecklistContainerProps {
  items: Array<{
    id: number;
    step: string;
    completed: boolean;
    resource_link?: string | null;
    estimated_time?: string | null;
    details?: string | null;
    document_template_url?: string | null;
  }>;
  onToggleItem: (step: string, completed: boolean) => void;
}

const ChecklistContainer = ({ items, onToggleItem }: ChecklistContainerProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollHeight, clientHeight } = scrollAreaRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
      <ScrollArea 
        ref={scrollAreaRef}
        className="h-[calc(100vh-32rem)] px-1 relative"
      >
        <div className="space-y-4 pb-8">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              step={item.step}
              completed={item.completed}
              resourceLink={item.resource_link}
              estimatedTime={item.estimated_time}
              details={item.details}
              documentTemplateUrl={item.document_template_url}
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
      
      {showScrollIndicator && (
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pointer-events-none">
          <div className="w-full h-12 bg-gradient-to-t from-white to-transparent" />
          <div className="flex items-center gap-2 text-sm text-swedish-blue animate-bounce">
            <span>Scroll for more</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistContainer;