import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex items-center bg-gradient-to-b from-accent/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-accent rounded-full text-swedish-blue font-medium text-sm mb-4">
            Start your business in Sweden with confidence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-swedish-blue leading-tight">
            Your Swedish Business Journey{" "}
            <span className="text-swedish-yellow">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We guide you through every step of setting up your company in Sweden,
            making the process simple and straightforward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-swedish-blue hover:bg-swedish-blue/90 text-white px-8 h-12 text-base"
            >
              <Link to="/checklist">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="border-2 border-swedish-blue text-swedish-blue hover:bg-swedish-blue/10 px-8 h-12 text-base"
            >
              <Link to="/simulator">Calculate Costs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;