import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuideHeader from "@/components/guide/GuideHeader";
import GuideContent from "@/components/guide/GuideContent";

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
  const industry = searchParams.get("industry") || "General";

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
      setGuideContent(data || []);
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
          <GuideHeader 
            businessType={businessType}
            industry={industry}
            onBack={handleBack}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swedish-blue mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading guide content...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-white rounded-xl p-6 border border-swedish-blue/10 mb-8">
                <h1 className="text-2xl font-semibold text-swedish-blue mb-4">
                  Guide for {businessType}
                </h1>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This comprehensive guide will walk you through all the necessary steps to establish and run your {businessType} in Sweden. Each step includes detailed instructions, official resources, and practical tips to ensure a smooth process.
                  </p>
                  <div className="bg-accent/30 p-4 rounded-lg">
                    <h2 className="font-semibold text-swedish-blue mb-2">Important Notes:</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Complete each step in order for the best results</li>
                      <li>Save your progress by marking steps as complete</li>
                      <li>Access official resources through the provided links</li>
                      <li>Contact relevant authorities if you need additional guidance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <GuideContent 
                content={guideContent}
                onMarkComplete={markAsComplete}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guide;