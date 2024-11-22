import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import QuestionnaireButton from "@/components/questionnaire/QuestionnaireButton";
import { Flag, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <div className="py-16 bg-gradient-to-br from-accent via-white to-accent/30 rounded-3xl my-12 relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,106,167,0.05)_1px,transparent_1px),linear-gradient(rgba(0,106,167,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
            <div className="relative text-center space-y-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-swedish-blue/5 blur-2xl rounded-full animate-pulse"></div>
                <Flag className="w-16 h-16 text-swedish-blue mx-auto animate-wave relative" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)]">
                  Not Sure Where to Begin?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Take our quick quiz to get personalized guidance on starting your business in Sweden.
                  We'll help you navigate through the process step by step.
                </p>
              </div>
              <div className="mt-8 transform hover:scale-[1.02] transition-transform duration-300">
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