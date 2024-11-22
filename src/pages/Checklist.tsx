import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import BusinessDetailsForm from "@/components/business/BusinessDetailsForm";
import ChecklistProgress from "@/components/checklist/ChecklistProgress";
import BusinessTypeSelector from "@/components/checklist/BusinessTypeSelector";
import ChecklistContainer from "@/components/checklist/ChecklistContainer";

interface ChecklistItem {
  id: number;
  step: string;
  completed: boolean;
  business_type: string;
  resource_link?: string | null;
  estimated_time?: string | null;
  details?: string | null;
}

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

  const handleBusinessDetailsSubmitted = (newBusinessType: string, newIndustry: string) => {
    setBusinessType(newBusinessType);
    setIndustry(newIndustry);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Start a Business in Sweden
            </h1>
            <p className="text-muted-foreground">
              Follow this checklist to set up your business correctly.
            </p>
          </div>

          {!session && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm md:text-base">
                You are not logged in. Your progress won't be saved.{' '}
                <button
                  className="text-yellow-800 underline font-semibold"
                  onClick={() => navigate('/login')}
                >
                  Login to save your progress
                </button>
              </p>
            </div>
          )}

          <BusinessDetailsForm
            onDetailsSubmitted={handleBusinessDetailsSubmitted}
            currentBusinessType={businessType}
            currentIndustry={industry}
          />

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
      </main>
    </div>
  );
};

export default Checklist;