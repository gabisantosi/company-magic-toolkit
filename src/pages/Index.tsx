import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-white to-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"></div>
        
        {/* Main content */}
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative group backdrop-blur-sm bg-white/30 p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,106,167,0.2)] transition-all duration-500 animate-fade-in">
              {/* Decorative gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-swedish-blue/20 via-accent/10 to-swedish-yellow/20 rounded-2xl opacity-0 group-hover:opacity-70 transition-all duration-500 blur-xl"></div>
              
              {/* Content container */}
              <div className="relative space-y-8">
                {/* Heading */}
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)] animate-fade-in">
                    Start Your Swedish Business Journey
                    <Sparkles className="inline-block w-8 h-8 ml-2 text-swedish-yellow animate-pulse" />
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-100">
                    Answer a few questions and get personalized recommendations for your 
                    business structure and SNI codes.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center animate-fade-in delay-200">
                  <Button 
                    onClick={() => navigate("/questionnaire")}
                    size="lg"
                    className="bg-swedish-blue hover:bg-swedish-blue/90 text-white px-8 py-6 text-lg group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-swedish-blue/20 hover:-translate-y-0.5"
                  >
                    Start Questionnaire
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in delay-300">
                  {[
                    {
                      title: "Smart Analysis",
                      description: "Get AI-powered recommendations tailored to your business idea"
                    },
                    {
                      title: "Business Structure",
                      description: "Learn whether AB or Enskild Firma is right for you"
                    },
                    {
                      title: "SNI Codes",
                      description: "Receive suggested SNI codes based on your business type"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="backdrop-blur-sm bg-white/40 p-6 rounded-xl border border-white/20 hover:border-swedish-blue/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <h3 className="text-lg font-semibold text-swedish-blue mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;