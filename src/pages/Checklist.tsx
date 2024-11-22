import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Checklist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-swedish-blue mb-8">Business Setup Checklist</h1>
        <p className="text-gray-600 mb-8">
          Coming soon: Interactive checklist to track your business setup progress
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Checklist;