import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface ChecklistItem {
  id: number;
  step: string;
  completed: boolean;
  business_type: string;
}

const Checklist = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [businessType, setBusinessType] = useState("Aktiebolag");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchChecklist();
  }, [session, businessType]);

  const fetchChecklist = async () => {
    const { data, error } = await supabase
      .from('checklist')
      .select('*')
      .eq('business_type', businessType)
      .order('id', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch checklist items",
        variant: "destructive",
      });
      return;
    }

    if (session) {
      // If user is logged in, fetch their progress
      const userProgress = await supabase
        .from('checklist')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('business_type', businessType);

      const completedItems = new Set(
        userProgress.data?.map(item => item.step)
      );

      const itemsWithProgress = data?.map(item => ({
        ...item,
        completed: completedItems.has(item.step)
      })) || [];

      setItems(itemsWithProgress);
      updateProgress(itemsWithProgress);
    } else {
      // If user is not logged in, show uncompleted checklist
      const baseItems = data?.map(item => ({
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
      // For non-logged in users, only update the UI state
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

    // For logged-in users, update the database
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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Start a Business in Sweden</h1>
          
          {!session && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                You are not logged in. Your progress won't be saved.{' '}
                <Button
                  variant="link"
                  className="text-yellow-800 underline p-0 h-auto font-semibold"
                  onClick={() => navigate('/login')}
                >
                  Login to save your progress
                </Button>
              </p>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Business Type
            </label>
            <Select
              value={businessType}
              onValueChange={setBusinessType}
            >
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktiebolag">Aktiebolag (AB)</SelectItem>
                <SelectItem value="Enskild Firma">Enskild Firma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 bg-card rounded-lg border hover:border-primary transition-colors"
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) => toggleItem(item.step, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className={`text-base ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                    {item.step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No checklist items found for this business type.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checklist;