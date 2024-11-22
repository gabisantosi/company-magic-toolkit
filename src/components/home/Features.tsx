import { CheckCircle, Calculator, FileText } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-12 h-12 text-swedish-blue" />,
    title: "Interactive Checklist",
    description: "Track your progress with our dynamic checklist tailored to your business type.",
  },
  {
    icon: <Calculator className="w-12 h-12 text-swedish-blue" />,
    title: "Cost Simulator",
    description: "Calculate the costs of starting your business with our easy-to-use simulator.",
  },
  {
    icon: <FileText className="w-12 h-12 text-swedish-blue" />,
    title: "Form Automation",
    description: "Automatically generate and fill necessary forms for your business registration.",
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-swedish-blue mb-4 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)]">
            Everything You Need to Start Your Business
          </h2>
          <p className="text-xl text-gray-600">
            Simple tools to guide you through the company registration process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-gray-200/50 hover:border-swedish-blue transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-white to-accent p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-swedish-blue mb-3 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)]">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;