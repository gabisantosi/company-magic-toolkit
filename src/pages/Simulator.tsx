import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SimulatorForm } from "@/components/simulator/SimulatorForm";

const Simulator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-swedish-blue">
                Business Cost Simulator
              </h1>
              <p className="text-muted-foreground">
                Explore the financial implications of different business types in Sweden. 
                Get detailed cost breakdowns, tax calculations, and recommendations based on your specific situation.
              </p>
            </div>

            <SimulatorForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Simulator;