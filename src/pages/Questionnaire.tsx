import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Progress } from "@/components/ui/progress";
import { QuestionnaireForm } from "@/components/questionnaire/QuestionnaireForm";

const Questionnaire = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-swedish-blue">
                Where Do I Start?
              </h1>
              <p className="text-muted-foreground">
                Let's find the best way to start your business in Sweden
              </p>
            </div>

            <Progress value={0} className="h-2" />

            <QuestionnaireForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questionnaire;