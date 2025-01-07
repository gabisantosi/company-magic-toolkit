export interface Question {
  id: string;
  title: string;
  description: string;
  type: "text" | "select";
  options?: { value: string; label: string; }[];
  aiPrompt: string;
}

export const questions: Question[] = [
  {
    id: "business_idea",
    title: "What's your business idea?",
    description: "Briefly describe your business concept",
    type: "text" as const,
    aiPrompt: "Based on the business idea: {value}, analyze the market potential and suggest key considerations for success in Sweden. Also, suggest relevant SNI codes that would be appropriate for this type of business.",
  },
  {
    id: "target_market",
    title: "Who is your target market?",
    description: "Describe your ideal customers",
    type: "text" as const,
    aiPrompt: "For the target market: {value}, evaluate the market size in Sweden and suggest effective marketing strategies.",
  },
  {
    id: "initial_investment",
    title: "What's your initial investment capacity?",
    description: "Choose your investment range",
    type: "select" as const,
    options: [
      { value: "low", label: "Less than 50,000 SEK" },
      { value: "medium", label: "50,000 - 200,000 SEK" },
      { value: "high", label: "More than 200,000 SEK" },
    ],
    aiPrompt: "With an investment capacity of {value}, recommend suitable business structures and initial resource allocation.",
  },
  {
    id: "experience_level",
    title: "What's your business experience level?",
    description: "Select your experience",
    type: "select" as const,
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Some Experience" },
      { value: "advanced", label: "Experienced" },
    ],
    aiPrompt: "For someone with {value} business experience, suggest key areas to focus on and potential challenges to prepare for.",
  },
];