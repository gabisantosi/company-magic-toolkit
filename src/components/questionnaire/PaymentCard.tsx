import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentElement } from "@/components/payment/PaymentElement";
import { useToast } from "@/hooks/use-toast";

interface PaymentCardProps {
  onBack: () => void;
  onAnalysis: () => void;
}

export const PaymentCard = ({ onBack, onAnalysis }: PaymentCardProps) => {
  const { toast } = useToast();

  const handlePaymentSuccess = () => {
    console.log("Payment success callback triggered");
    onAnalysis();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>Pay 100kr to receive your personalized business analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentElement onPaymentSuccess={handlePaymentSuccess} />
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="mr-2"
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};