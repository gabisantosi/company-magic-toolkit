import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Question {
  id: string;
  type: "text" | "select" | "sni_select";
  options?: { value: string; label: string; }[];
}

interface QuestionInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const QuestionInput = ({ question, value, onChange }: QuestionInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sniCodes, isLoading } = useQuery({
    queryKey: ["sniCodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sni_codes")
        .select("*")
        .order("code");
      
      if (error) throw error;
      return data;
    },
    enabled: question.type === "sni_select",
  });

  const filteredCodes = sniCodes?.filter(
    (code) =>
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (question.type === "text") {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[100px]"
      />
    );
  }

  if (question.type === "sni_select") {
    return (
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search by code, name, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-4">Loading SNI codes...</div>
            ) : (
              filteredCodes?.map((code) => (
                <div
                  key={code.code}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    value === code.code
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onChange(code.code)}
                >
                  <div className="font-mono font-semibold">{code.code}</div>
                  <div className="font-medium">{code.name}</div>
                  {code.description && (
                    <div className="text-sm opacity-80 mt-1">
                      {code.description}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {question.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};