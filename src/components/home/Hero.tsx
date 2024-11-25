import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Changed from ArrowLeft to ArrowRight for better UX

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Start Your Business in</span>
                <span className="block text-swedish-blue">Sweden</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
                Get personalized guidance on starting and running your business in Sweden. Take our quick questionnaire to begin your entrepreneurial journey.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <Button
                  className="bg-swedish-blue hover:bg-swedish-blue/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:ring-2 hover:ring-swedish-blue/20 hover:ring-offset-2 hover:ring-offset-transparent group"
                >
                  <Link to="/questionnaire">
                    Start Now
                    <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;