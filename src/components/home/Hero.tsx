import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-accent to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-swedish-blue mb-6">
            Start Your Swedish Business Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We guide you through every step of setting up your company in Sweden,
            from registration to launch.
          </p>
          <div className="space-x-4">
            <Button asChild className="bg-swedish-blue hover:bg-swedish-blue/90">
              <Link to="/checklist">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-swedish-blue text-swedish-blue hover:bg-swedish-blue/10"
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