import { useEffect } from "react";
import { useStripe, useElements, PaymentElement as StripePaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { LoadingState } from "./LoadingState";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";

interface PaymentElementProps {
  onPaymentSuccess?: () => void;
}

export const PaymentElement = ({ onPaymentSuccess }: PaymentElementProps) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const {
    isLoading,
    clientSecret,
    initializePayment,
    handlePaymentConfirmation,
  } = usePaymentFlow(onPaymentSuccess || (() => {}));

  useEffect(() => {
    initializePayment();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handlePaymentConfirmation(stripe, elements);
  };

  if (isLoading || !clientSecret) {
    return <LoadingState />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <StripePaymentElement />
      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};