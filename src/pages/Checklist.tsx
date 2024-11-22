import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import BusinessDetailsForm from "@/components/business/BusinessDetailsForm";
import ChecklistItem from "@/components/checklist/ChecklistItem";
import ChecklistProgress from "@/components/checklist/ChecklistProgress";

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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Start a Business in Sweden</h1>
          
          {!session && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
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

          <ChecklistProgress progress={progress} />

          <div className="space-y-4">
            {items.map((item) => (
              <ChecklistItem
                key={item.id}
                step={item.step}
                completed={item.completed}
                resourceLink={item.resource_link}
                estimatedTime={item.estimated_time}
                details={item.details}
                onToggle={(completed) => toggleItem(item.step, completed)}
              />
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No checklist items found for this business type and industry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checklist;