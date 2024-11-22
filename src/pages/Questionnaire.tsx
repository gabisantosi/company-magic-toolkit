import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const questions = [
  {
    id: "business_idea",
    title: "What's your business idea?",
    description: "Briefly describe your business concept",
    type: "text",
  },
  {
    id: "target_market",
    title: "Who is your target market?",
    description: "Describe your ideal customers",
    type: "text",
  },
  {
    id: "initial_investment",
    title: "What's your initial investment capacity?",
    description: "Choose your investment range",
    type: "select",
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
    type: "select",
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
    type: "select",
    options: [
      { value: "unsure", label: "Not sure yet" },
      { value: "Enskild Firma", label: "Enskild Firma" },
      { value: "Aktiebolag", label: "Aktiebolag (AB)" },
      { value: "Handelsbolag", label: "Handelsbolag" },
    ],
  },
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleNext = async () => {
    if (currentQuestion === questions.length - 1) {
      try {
        if (!session) {
          toast({
            title: "Not logged in",
            description: "Your responses won't be saved. Please log in first.",
          });
          navigate("/login");
          return;
        }

        await supabase.from("questionnaire_responses").upsert({
          user_id: session.user.id,
          ...answers,
        });

        toast({
          title: "Responses saved!",
          description: "Redirecting to your personalized recommendations...",
        });

        navigate("/checklist", {
          state: { businessType: answers.preferred_structure || "Aktiebolag" },
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save your responses. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-swedish-blue">
                Where Do I Start?
              </h1>
              <p className="text-muted-foreground">
                Let's find the best way to start your business in Sweden
              </p>
            </div>

            <Progress value={progress} className="h-2" />

            <Card>
              <CardHeader>
                <CardTitle>{currentQ.title}</CardTitle>
                <CardDescription>{currentQ.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {currentQ.type === "text" ? (
                  <Textarea
                    value={answers[currentQ.id] || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <Select
                    value={answers[currentQ.id] || ""}
                    onValueChange={handleAnswer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentQ.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQ.id]}
                  >
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questionnaire;