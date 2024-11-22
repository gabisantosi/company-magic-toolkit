import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/integrations/supabase/client";

interface ChecklistItem {
  id: number;
  step: string;
  completed: boolean;
}

const Checklist = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newStep, setNewStep] = useState("");

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }
    fetchChecklist();
  }, [session, navigate]);

  const fetchChecklist = async () => {
    const { data, error } = await supabase
      .from('checklist')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch checklist items",
        variant: "destructive",
      });
      return;
    }

    setItems(data || []);
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStep.trim()) return;

    const { error } = await supabase
      .from('checklist')
      .insert([
        {
          step: newStep,
          user_id: session?.user.id,
          completed: false,
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add checklist item",
        variant: "destructive",
      });
      return;
    }

    setNewStep("");
    fetchChecklist();
    toast({
      title: "Success",
      description: "Checklist item added",
    });
  };

  const toggleItem = async (id: number, completed: boolean) => {
    const { error } = await supabase
      .from('checklist')
      .update({ completed })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update checklist item",
        variant: "destructive",
      });
      return;
    }

    fetchChecklist();
  };

  const deleteItem = async (id: number) => {
    const { error } = await supabase
      .from('checklist')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete checklist item",
        variant: "destructive",
      });
      return;
    }

    fetchChecklist();
    toast({
      title: "Success",
      description: "Checklist item deleted",
    });
  };

  if (!session) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Checklist</h1>
        
        <form onSubmit={addItem} className="flex gap-4 mb-8">
          <Input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Add a new item..."
            className="flex-1"
          />
          <Button type="submit">Add Item</Button>
        </form>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) => toggleItem(item.id, checked as boolean)}
                />
                <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                  {item.step}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checklist;