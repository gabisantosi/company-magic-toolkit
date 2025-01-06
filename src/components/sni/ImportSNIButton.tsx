import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ImportSNIButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('import-sni-codes');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: data.message,
      });
    } catch (error) {
      console.error('Error importing SNI codes:', error);
      toast({
        title: "Error",
        description: "Failed to import SNI codes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleImport} 
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      Import SNI Codes
    </Button>
  );
};

export default ImportSNIButton;