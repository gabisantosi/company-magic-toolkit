import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-accent via-white to-transparent py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="relative group backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,106,167,0.25)] transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-swedish-blue/10 before:to-swedish-yellow/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
            <div className="absolute inset-[-2px] bg-gradient-to-r from-swedish-blue/20 to-swedish-yellow/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent mb-6 [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)] transform transition-transform duration-300 group-hover:scale-[1.02]">
                Start Your Swedish Business Journey
              </h1>
              <p className="text-xl text-gray-600 mb-8 [text-shadow:_0_1px_2px_rgb(0_0_0_/_5%)] transform transition-all duration-300 group-hover:translate-y-[-2px]">
                We guide you through every step of setting up your company in Sweden,
                from registration to launch.
              </p>
              <div className="space-x-4 relative z-10">
                <Button 
                  asChild 
                  className="bg-swedish-blue hover:bg-swedish-blue/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:ring-2 hover:ring-swedish-blue/20 hover:ring-offset-2 hover:ring-offset-transparent"
                >
                  <Link to="/checklist">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-swedish-blue text-swedish-blue hover:bg-swedish-blue/10 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:ring-2 hover:ring-swedish-blue/20 hover:ring-offset-2 hover:ring-offset-transparent backdrop-blur-sm"
                >
                  <Link to="/simulator">Calculate Costs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;