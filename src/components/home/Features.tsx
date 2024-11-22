import { CheckCircle, Calculator, FileText } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Interactive Checklist",
    description: "Track your progress with our dynamic checklist tailored to your business type.",
  },
  {
    icon: <Calculator className="w-8 h-8" />,
    title: "Cost Simulator",
    description: "Calculate the costs of starting your business with our easy-to-use simulator.",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Form Automation",
    description: "Automatically generate and fill necessary forms for your business registration.",
  },
];

const Features = () => {
  return (
    <div className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-swedish-blue mb-6">
            Everything You Need to Start Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple tools to guide you through the company registration process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-swedish-blue transition-all duration-300 bg-white"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-swedish-blue">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-swedish-blue mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;