import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";

interface GuideContent {
  id: number;
  title: string;
  content: string;
  step: string;
  business_type: string;
  industry: string;
  action_url?: string | null;
  action_label?: string | null;
}

const Guide = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [guideContent, setGuideContent] = useState<GuideContent[]>([]);
  const [loading, setLoading] = useState(true);

  const step = searchParams.get("step");
  const businessType = searchParams.get("businessType") || "Aktiebolag";
  const industry = searchParams.get("industry") || "Technology";

  useEffect(() => {
    fetchGuideContent();
  }, [step, businessType, industry]);

  const fetchGuideContent = async () => {
    try {
      const { data, error } = await supabase
        .from("guide_content")
        .select("*")
        .eq("business_type", businessType)
        .eq("industry", industry)
        .order("order_number");

      if (error) throw error;
      setGuideContent(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load guide content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    const stepParam = encodeURIComponent(step || "");
    const businessTypeParam = encodeURIComponent(businessType);
    const industryParam = encodeURIComponent(industry);
    navigate(`/checklist?step=${stepParam}&businessType=${businessTypeParam}&industry=${industryParam}`);
  };

  const markAsComplete = async (step: string) => {
    if (!session) {
      toast({
        title: "Not logged in",
        description: "Please log in to save your progress",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("checklist")
        .upsert({
          user_id: session.user.id,
          step: step,
          completed: true,
          business_type: businessType,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Step marked as complete",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 hover:bg-accent"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checklist
          </Button>

          {loading ? (
            <div className="text-center py-12">Loading guide content...</div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              <Accordion type="single" collapsible className="space-y-4">
                {guideContent.map((content) => (
                  <AccordionItem
                    key={content.id}
                    value={content.step}
                    className="bg-white/80 backdrop-blur-sm rounded-xl border border-swedish-blue/10 px-6"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-semibold text-swedish-blue">
                            {content.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-6">
                      <div className="prose prose-blue max-w-none">
                        <div
                          dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        {content.action_url && content.action_label && (
                          <Button
                            onClick={() => window.open(content.action_url!, '_blank')}
                            className="flex items-center gap-2 bg-swedish-blue hover:bg-swedish-blue/90"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {content.action_label}
                          </Button>
                        )}
                        <Button
                          onClick={() => markAsComplete(content.step)}
                          variant="outline"
                          className="flex items-center gap-2 border-swedish-blue/20 hover:bg-accent"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark as Complete
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guide;