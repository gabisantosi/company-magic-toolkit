import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChecklistProgress from "@/components/checklist/ChecklistProgress";
import BusinessTypeSelector from "@/components/checklist/BusinessTypeSelector";
import ChecklistContainer from "@/components/checklist/ChecklistContainer";
import ChecklistHeader from "@/components/checklist/ChecklistHeader";
import { ChecklistItem } from "@/types/checklist";

const Checklist = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [businessType, setBusinessType] = useState(searchParams.get("businessType") || "Aktiebolag");
  const [industry, setIndustry] = useState(searchParams.get("industry") || "Technology");
  const [progress, setProgress] = useState(0);
  const activeStep = searchParams.get("step");

  useEffect(() => {
    fetchChecklist();
  }, [session, businessType, industry]);

  useEffect(() => {
    if (activeStep) {
      const element = document.getElementById(`step-${activeStep}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeStep, items]);

  const fetchChecklist = async () => {
    const { data: templateData, error: templateError } = await supabase
      .from('checklist_templates')
      .select('*')
      .eq('business_type', businessType)
      .eq('industry', industry)
      .order('order_number', { ascending: true });

    if (templateError) {
      toast({
        title: "Error",
        description: "Failed to fetch checklist templates",
        variant: "destructive",
      });
      return;
    }

    if (session) {
      const { data: progressData, error: progressError } = await supabase
        .from('checklist')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('business_type', businessType);

      if (progressError) {
        toast({
          title: "Error",
          description: "Failed to fetch user progress",
          variant: "destructive",
        });
        return;
      }

      const completedItems = new Set(
        progressData?.map(item => item.step)
      );

      const itemsWithProgress = templateData?.map(item => ({
        ...item,
        completed: completedItems.has(item.step)
      })) || [];

      setItems(itemsWithProgress);
      updateProgress(itemsWithProgress);
    } else {
      const baseItems = templateData?.map(item => ({
        ...item,
        completed: false
      })) || [];
      
      setItems(baseItems);
      setProgress(0);
    }
  };

  const updateProgress = (currentItems: ChecklistItem[]) => {
    const completed = currentItems.filter(item => item.completed).length;
    const total = currentItems.length;
    setProgress(total > 0 ? (completed / total) * 100 : 0);
  };

  const toggleItem = async (step: string, completed: boolean) => {
    if (!session) {
      const updatedItems = items.map(item =>
        item.step === step ? { ...item, completed } : item
      );
      setItems(updatedItems);
      updateProgress(updatedItems);
      
      toast({
        title: "Not Logged In",
        description: "Your progress won't be saved. Login to save your progress.",
      });
      return;
    }

    if (completed) {
      const { error } = await supabase
        .from('checklist')
        .insert({
          step,
          completed: true,
          user_id: session.user.id,
          business_type: businessType
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update checklist item",
          variant: "destructive",
        });
        return;
      }
    } else {
      const { error } = await supabase
        .from('checklist')
        .delete()
        .eq('user_id', session.user.id)
        .eq('step', step)
        .eq('business_type', businessType);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update checklist item",
          variant: "destructive",
        });
        return;
      }
    }

    const updatedItems = items.map(item =>
      item.step === step ? { ...item, completed } : item
    );
    setItems(updatedItems);
    updateProgress(updatedItems);

    toast({
      title: completed ? "Step completed!" : "Step unchecked",
      description: completed ? "Keep up the good work!" : "You can always complete this step later",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
        <div className="container mx-auto px-4 py-12 space-y-8 relative">
          <ChecklistHeader />
          
          {!session && (
            <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm border border-swedish-blue/20 rounded-xl shadow-lg mb-8 animate-fade-in">
              <p className="text-swedish-blue text-center">
                You are not logged in. Your progress won't be saved.{' '}
                <button
                  className="text-swedish-blue underline font-semibold hover:text-swedish-blue/80 transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Login to save your progress
                </button>
              </p>
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <BusinessTypeSelector
                businessType={businessType}
                industry={industry}
                onBusinessTypeChange={setBusinessType}
                onIndustryChange={setIndustry}
              />
              <ChecklistProgress progress={progress} />
            </div>

            <ChecklistContainer 
              items={items}
              businessType={businessType}
              industry={industry}
              onToggleItem={toggleItem}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checklist;