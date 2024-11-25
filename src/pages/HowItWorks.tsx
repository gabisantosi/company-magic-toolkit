import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Lightbulb, Calculator } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 hover:bg-accent"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-swedish-blue">How It Works</h1>
              <p className="text-xl text-gray-600">
                Your comprehensive guide to starting a business in Sweden, made simple and efficient.
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-swedish-blue/10 hover:border-swedish-blue/20 transition-all duration-300 space-y-4">
                <div className="flex items-center gap-4">
                  <Lightbulb className="w-8 h-8 text-swedish-blue" />
                  <h2 className="text-2xl font-semibold text-swedish-blue">1. Take the Questionnaire</h2>
                </div>
                <p className="text-gray-600 pl-12">
                  Start by answering a few questions about your business idea. Our smart system will analyze your responses
                  and provide personalized recommendations for the best business structure and approach for your specific situation.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-swedish-blue/10 hover:border-swedish-blue/20 transition-all duration-300 space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-swedish-blue" />
                  <h2 className="text-2xl font-semibold text-swedish-blue">2. Follow Your Personalized Checklist</h2>
                </div>
                <p className="text-gray-600 pl-12">
                  Based on your questionnaire results, we'll generate a customized checklist of steps needed to establish your
                  business. Track your progress, access relevant resources, and ensure you don't miss any crucial steps in
                  the process.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-swedish-blue/10 hover:border-swedish-blue/20 transition-all duration-300 space-y-4">
                <div className="flex items-center gap-4">
                  <Calculator className="w-8 h-8 text-swedish-blue" />
                  <h2 className="text-2xl font-semibold text-swedish-blue">3. Calculate Costs</h2>
                </div>
                <p className="text-gray-600 pl-12">
                  Use our Cost Calculator to estimate the initial investment and ongoing costs for your business. Get a clear
                  picture of expenses like registration fees, taxes, and employee costs to help you plan your budget effectively.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-swedish-blue">Ready to Begin?</h3>
              <div className="flex justify-center gap-4">
                <Button asChild className="bg-swedish-blue hover:bg-swedish-blue/90">
                  <Link to="/questionnaire">Start Now</Link>
                </Button>
                <Button variant="outline" asChild className="border-swedish-blue text-swedish-blue hover:bg-swedish-blue/10">
                  <Link to="/guide">View Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;