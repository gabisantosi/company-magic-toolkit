import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import QuestionnaireButton from "@/components/questionnaire/QuestionnaireButton";
import { HelpCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <div className="py-16 bg-gradient-to-r from-accent/30 via-white to-accent/30 rounded-3xl my-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,106,167,0.05)_1px,transparent_1px),linear-gradient(rgba(0,106,167,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative text-center space-y-6">
              <HelpCircle className="w-16 h-16 text-swedish-blue mx-auto animate-bounce" />
              <h2 className="text-3xl font-bold text-swedish-blue">Not Sure Where to Begin?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take our quick quiz to get personalized guidance on starting your business in Sweden.
                We'll help you navigate through the process step by step.
              </p>
              <div className="mt-8 flex justify-center">
                <QuestionnaireButton />
              </div>
            </div>
          </div>
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;