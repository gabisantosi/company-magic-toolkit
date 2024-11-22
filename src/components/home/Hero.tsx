import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-accent to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
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
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742"
              alt="Modern Swedish building representing business opportunities"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;