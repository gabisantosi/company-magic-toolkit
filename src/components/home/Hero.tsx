import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div 
      className="relative bg-gradient-to-b from-accent to-white py-20 min-h-[600px] flex items-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your Swedish Business Journey
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            We guide you through every step of setting up your company in Sweden,
            from registration to launch.
          </p>
          <div className="space-x-4">
            <Button 
              asChild 
              className="bg-swedish-blue hover:bg-swedish-blue/90 text-white px-8 py-6 h-auto text-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link to="/checklist">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 h-auto text-lg shadow-lg transition-all duration-300 hover:scale-105"
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