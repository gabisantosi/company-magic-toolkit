import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold text-swedish-blue sm:text-5xl">
              Find Your Perfect Business Structure in Sweden
            </h1>
            <p className="text-xl text-muted-foreground">
              Answer a few questions about your business idea and get personalized recommendations 
              for your business structure (Aktiebolag, Enskild Firma) and relevant SNI codes.
            </p>
            <Button 
              onClick={() => navigate("/questionnaire")}
              size="lg"
              className="bg-swedish-blue hover:bg-swedish-blue/90 text-white"
            >
              Start Questionnaire
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;