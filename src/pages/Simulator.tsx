import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Simulator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-swedish-blue mb-8">Cost Simulator</h1>
        <p className="text-gray-600 mb-8">
          Coming soon: Calculate the costs of starting your business in Sweden
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Simulator;