export const questions = [
  {
    id: "business_idea",
    title: "What's your business idea?",
    description: "Briefly describe your business concept",
    type: "text" as const,
  },
  {
    id: "target_market",
    title: "Who is your target market?",
    description: "Describe your ideal customers",
    type: "text" as const,
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
  },
  {
    id: "preferred_structure",
    title: "Do you have a preferred business structure?",
    description: "Select your preference",
    type: "select" as const,
    options: [
      { value: "unsure", label: "Not sure yet" },
      { value: "Enskild Firma", label: "Enskild Firma" },
      { value: "Aktiebolag", label: "Aktiebolag (AB)" },
      { value: "Handelsbolag", label: "Handelsbolag" },
    ],
  },
];