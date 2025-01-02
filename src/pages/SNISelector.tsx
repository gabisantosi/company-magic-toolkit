import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SNISelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: sniCodes, isLoading } = useQuery({
    queryKey: ["sniCodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sni_codes")
        .select("*")
        .order("code");
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch SNI codes",
          variant: "destructive",
        });
        throw error;
      }
      
      return data;
    },
  });

  const filteredCodes = sniCodes?.filter(
    (code) =>
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-swedish-blue mb-2">
              SNI Code Selection
            </h1>
            <p className="text-gray-600 mb-6">
              Choose the SNI code that best matches your business activity. The five-digit code indicates what type of business you operate.
            </p>
          </div>

          <Input
            type="search"
            placeholder="Search by code, name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-6"
          />

          {isLoading ? (
            <div className="text-center py-8">Loading SNI codes...</div>
          ) : (
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-4">
                {filteredCodes?.map((code) => (
                  <Card key={code.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-lg font-semibold text-swedish-blue">
                        {code.code}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{code.name}</h3>
                        {code.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {code.description}
                          </p>
                        )}
                        {(code.category || code.subcategory) && (
                          <div className="flex gap-2 mt-2">
                            {code.category && (
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {code.category}
                              </span>
                            )}
                            {code.subcategory && (
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                                {code.subcategory}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SNISelector;