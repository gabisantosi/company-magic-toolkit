import { ArrowRight, Calculator, CheckCircle, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <ArrowRight className="w-12 h-12 text-swedish-blue" />,
    title: "Get Started",
    description: "Begin your journey to start your business in Sweden with our step-by-step guidance.",
    link: "/questionnaire"
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-swedish-blue" />,
    title: "Interactive Checklist",
    description: "Track your progress with our dynamic checklist tailored to your business type.",
    link: "/checklist"
  },
  {
    icon: <Calculator className="w-12 h-12 text-swedish-blue" />,
    title: "Cost Calculator",
    description: "Calculate the costs of starting your business with our easy-to-use calculator.",
    link: "/simulator"
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-accent/30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,106,167,0.05)_1px,transparent_1px),linear-gradient(rgba(0,106,167,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000,transparent)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-swedish-blue to-swedish-blue/80 bg-clip-text text-transparent mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_5%)]">
              Everything You Need to Start Your Business
              <Sparkles className="inline-block w-6 h-6 ml-2 text-swedish-yellow animate-pulse" />
            </h2>
            <div className="h-1 w-1/3 mx-auto bg-gradient-to-r from-swedish-blue/50 to-swedish-yellow/50 rounded-full transform transition-all duration-300 hover:scale-x-110"></div>
          </div>
          <p className="text-xl text-gray-600 mt-4">
            Simple tools to guide you through the company registration process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              to={feature.link}
              key={index}
              className="group bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-gray-200/50 hover:border-swedish-blue/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,106,167,0.12)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-swedish-blue/5 to-swedish-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="mb-6 flex justify-center relative">
                <div className="bg-gradient-to-br from-white to-accent p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-3">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-swedish-blue mb-3 relative z-10 group-hover:translate-y-[-2px] transition-transform duration-300 flex items-center justify-center">
                {feature.title}
                <ChevronRight className="w-5 h-5 ml-1 opacity-0 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-1" />
              </h3>
              <p className="text-gray-600 relative z-10 transform transition-all duration-300 group-hover:translate-y-[-1px]">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-swedish-blue/0 via-swedish-blue/30 to-swedish-blue/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;