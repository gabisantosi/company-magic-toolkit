import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, businessType } = location.state || {};

  if (!recommendations) {
    navigate("/questionnaire");
    return null;
  }

  const handleDownloadPDF = () => {
    const content = document.getElementById("recommendations-content");
    if (content) {
      const opt = {
        margin: 1,
        filename: "business-recommendations.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(content).save();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-accent via-white to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-swedish-blue">
                Your Business Recommendations
              </h1>
              <Button onClick={handleDownloadPDF} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>

            <Card id="recommendations-content" className="animate-fade-in">
              <CardHeader>
                <CardTitle>Personalized Analysis</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="whitespace-pre-wrap">{recommendations}</div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() =>
                  navigate("/checklist", {
                    state: { businessType: businessType || "Aktiebolag" },
                  })
                }
              >
                Continue to Checklist
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;