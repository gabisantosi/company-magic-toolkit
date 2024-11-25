import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GuideContentProps {
  content: Array<{
    id: number;
    title: string;
    content: string;
    step: string;
    action_url?: string | null;
    action_label?: string | null;
  }>;
  onMarkComplete: (step: string) => void;
}

const GuideContent = ({ content, onMarkComplete }: GuideContentProps) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-12 bg-accent/50 rounded-lg">
        <p className="text-muted-foreground">
          No guide content available for this business type and industry.
        </p>
      </div>
    );
  }

  // Sort content by step number
  const sortedContent = [...content].sort((a, b) => 
    parseInt(a.step) - parseInt(b.step)
  );

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {sortedContent.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.step}
          className="bg-white rounded-xl border border-swedish-blue/10 px-6 transition-all duration-300 hover:border-swedish-blue/20 hover:shadow-lg"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-start gap-4 w-full">
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-swedish-blue">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Step {item.step}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-6">
            <div className="prose prose-blue max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: item.content }}
                className="text-gray-700 leading-relaxed [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mt-4 [&>p]:mb-4"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {item.action_url && item.action_label && (
                <Button
                  onClick={() => window.open(item.action_url!, '_blank')}
                  className="flex items-center gap-2 bg-swedish-blue hover:bg-swedish-blue/90 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  {item.action_label}
                </Button>
              )}
              <Button
                onClick={() => onMarkComplete(item.step)}
                variant="outline"
                className="flex items-center gap-2 border-swedish-blue/20 hover:bg-accent transition-all duration-300"
              >
                <CheckCircle className="h-4 w-4" />
                Mark as Complete
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default GuideContent;