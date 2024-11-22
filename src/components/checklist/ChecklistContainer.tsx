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
  businessType: string;
  industry: string;
  onToggleItem: (step: string, completed: boolean) => void;
}

const ChecklistContainer = ({ 
  items, 
  businessType,
  industry,
  onToggleItem 
}: ChecklistContainerProps) => {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollAreaRef.current;
        const isScrollable = scrollHeight > clientHeight;
        const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        setShowScrollDown(isScrollable && !isAtBottom);
        setShowScrollUp(scrollTop > 0);
      }
    };

    const scrollElement = scrollAreaRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      checkScroll();
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

  const getNextStep = (currentIndex: number) => {
    const nextItem = items[currentIndex + 1];
    return nextItem ? {
      step: nextItem.step,
      details: nextItem.details
    } : null;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-swedish-blue/10 relative min-h-[80vh] animate-fade-in hover:shadow-xl transition-all duration-500">
      {items.length > 0 && (
        <div className="mb-8 flex items-center justify-between animate-[fade-in_0.5s_ease-out_0.3s]">
          <div className="text-sm font-medium text-gray-600">
            Total steps: {items.length}
          </div>
          <div className="text-sm font-medium text-gray-600">
            Completed: {items.filter(item => item.completed).length} / {items.length}
          </div>
        </div>
      )}
      <ScrollArea 
        ref={scrollAreaRef}
        className="h-[calc(100vh-20rem)] px-4 relative"
      >
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={item.id}
              id={`step-${item.step}`}
              className="relative flex items-start gap-4 transition-all duration-500 hover:translate-x-1"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fade-in 0.5s ease-out forwards',
                opacity: 0
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-swedish-blue to-swedish-blue/80 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-[360deg]">
                <span className="text-sm font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <div className="flex-grow">
                <ChecklistItem
                  step={item.step}
                  completed={item.completed}
                  resourceLink={item.resource_link}
                  estimatedTime={item.estimated_time}
                  details={item.details}
                  documentTemplateUrl={item.document_template_url}
                  businessType={businessType}
                  industry={industry}
                  onToggle={(completed) => onToggleItem(item.step, completed)}
                  nextStep={item.completed ? getNextStep(index) : null}
                />
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16 text-muted-foreground bg-accent/50 rounded-lg animate-fade-in">
              No checklist items found for this business type and industry.
            </div>
          )}
        </div>
      </ScrollArea>
      
      {showScrollUp && (
        <button
          onClick={() => scrollToPosition('up')}
          className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-swedish-blue bg-white px-6 py-2.5 rounded-full shadow-lg border border-swedish-blue/10 hover:bg-accent transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
          <ChevronUp className="h-4 w-4" />
          <span>Scroll up</span>
        </button>
      )}

      {showScrollDown && (
        <button
          onClick={() => scrollToPosition('down')}
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-swedish-blue bg-white px-6 py-2.5 rounded-full shadow-lg border border-swedish-blue/10 hover:bg-accent transition-all duration-300 hover:translate-y-1 animate-fade-in"
        >
          <span>Scroll down</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ChecklistContainer;