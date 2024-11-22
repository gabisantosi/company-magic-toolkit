import { CheckCircle, Calculator, FileText } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-12 h-12 text-swedish-blue" />,
    title: "Interactive Checklist",
    description: "Track your progress with our dynamic checklist tailored to your business type.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    icon: <Calculator className="w-12 h-12 text-swedish-blue" />,
    title: "Cost Simulator",
    description: "Calculate the costs of starting your business with our easy-to-use simulator.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    icon: <FileText className="w-12 h-12 text-swedish-blue" />,
    title: "Form Automation",
    description: "Automatically generate and fill necessary forms for your business registration.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-swedish-blue mb-4">
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
              className="group p-6 rounded-lg border border-gray-200 hover:border-swedish-blue transition-all duration-300"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-swedish-blue mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;