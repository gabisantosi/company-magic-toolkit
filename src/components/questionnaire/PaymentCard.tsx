import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentElement } from "@/components/payment/PaymentElement";

interface PaymentCardProps {
  onBack: () => void;
  onAnalysis: () => void;
}

export const PaymentCard = ({ onBack, onAnalysis }: PaymentCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>Pay 100kr to receive your personalized business analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <PaymentElement />
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="mr-2"
          >
            Back
          </Button>
          <Button onClick={onAnalysis}>
            Continue to Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};