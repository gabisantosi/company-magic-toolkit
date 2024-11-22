import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [businessType, setBusinessType] = useState("Aktiebolag");
  const [industry, setIndustry] = useState("Technology");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchChecklist();
  }, [session, businessType, industry]);

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-accent to-white py-12">
          <div className="container mx-auto px-4">
            <ChecklistHeader />
            
            {!session && (
              <div className="p-4 bg-accent border border-swedish-blue/20 rounded-lg mb-8 shadow-sm">
                <p className="text-swedish-blue text-sm md:text-base">
                  You are not logged in. Your progress won't be saved.{' '}
                  <button
                    className="text-swedish-blue underline font-semibold hover:text-swedish-blue/80"
                    onClick={() => navigate('/login')}
                  >
                    Login to save your progress
                  </button>
                </p>
              </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8">
              <BusinessTypeSelector
                businessType={businessType}
                industry={industry}
                onBusinessTypeChange={setBusinessType}
                onIndustryChange={setIndustry}
              />

              <ChecklistProgress progress={progress} />

              <ChecklistContainer 
                items={items}
                onToggleItem={toggleItem}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checklist;
