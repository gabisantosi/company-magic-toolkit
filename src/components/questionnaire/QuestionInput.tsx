import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Question {
  id: string;
  type: "text" | "select";
  options?: { value: string; label: string; }[];
}

interface QuestionInputProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const QuestionInput = ({ question, value, onChange }: QuestionInputProps) => {
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