import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface RecommendationsDialogProps {
  open: boolean;
  onClose: () => void;
  recommendations: string;
}

export const RecommendationsDialog = ({
  open,
  onClose,
  recommendations,
}: RecommendationsDialogProps) => {
  const { toast } = useToast();

  const handleSaveAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Your Business Recommendations", 20, 20);
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(recommendations, 170);
    doc.text(splitText, 20, 40);
    doc.save("business-recommendations.pdf");
    
    toast({
      title: "PDF Downloaded",
      description: "Your recommendations have been saved as a PDF file.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Your Personalized Business Recommendations</DialogTitle>
          <DialogDescription>
            Based on your responses, here are our recommendations:
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4 whitespace-pre-wrap">
          {recommendations}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleSaveAsPDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
          <Button onClick={onClose}>
            Continue to Checklist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};