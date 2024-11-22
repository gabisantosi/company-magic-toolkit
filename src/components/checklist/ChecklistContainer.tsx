import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollAreaRef.current;
        const isScrollable = scrollHeight > clientHeight;
        const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        const isAtTop = scrollTop === 0;

        // Show scroll down button if not at bottom and content is scrollable
        setShowScrollDown(isScrollable && !isAtBottom);
        
        // Show scroll up button if not at top (regardless of bottom position)
        setShowScrollUp(scrollTop > 0);
      }
    };

    const scrollElement = scrollAreaRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
    }

    window.addEventListener('resize', checkScroll);
    
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [items]);

  const scrollToPosition = (direction: 'up' | 'down') => {
    if (scrollAreaRef.current) {
      const scrollAmount = direction === 'down' ? 300 : -300;
      scrollAreaRef.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
      
      {showScrollUp && (
        <button
          onClick={() => scrollToPosition('up')}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-swedish-blue bg-white px-4 py-2 rounded-b-lg shadow-md border border-t-0 hover:bg-accent transition-colors"
        >
          <ChevronUp className="h-4 w-4" />
          <span>Scroll up</span>
        </button>
      )}

      {showScrollDown && (
        <button
          onClick={() => scrollToPosition('down')}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-swedish-blue bg-white px-4 py-2 rounded-t-lg shadow-md border border-b-0 hover:bg-accent transition-colors"
        >
          <span>Scroll down</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ChecklistContainer;