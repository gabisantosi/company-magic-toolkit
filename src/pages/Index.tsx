import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import QuestionnaireButton from "@/components/questionnaire/QuestionnaireButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center mb-12">
            <QuestionnaireButton />
          </div>
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;