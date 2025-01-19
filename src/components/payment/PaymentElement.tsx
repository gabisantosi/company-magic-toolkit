import { useEffect } from "react";
import { useStripe, useElements, PaymentElement as StripePaymentElement, Elements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { LoadingState } from "./LoadingState";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import { stripePromise, stripeAppearance } from "@/utils/stripe";

interface PaymentElementProps {
  onPaymentSuccess?: () => void;
}

const PaymentElementContent = ({ onPaymentSuccess }: PaymentElementProps) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const {
    isLoading,
    handlePaymentConfirmation,
  } = usePaymentFlow(onPaymentSuccess || (() => {}));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Handling payment submission...");
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized");
      return;
    }
    await handlePaymentConfirmation(stripe, elements);
  };

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

export const PaymentElement = (props: PaymentElementProps) => {
  const {
    clientSecret,
    isLoading,
    initializePayment,
  } = usePaymentFlow(props.onPaymentSuccess || (() => {}));

  useEffect(() => {
    console.log("Initializing payment in PaymentElement...");
    initializePayment();
  }, [initializePayment]);

  if (isLoading || !clientSecret) {
    return <LoadingState />;
  }

  console.log("Rendering Elements with client secret:", clientSecret ? "Present" : "Missing");
  
  return (
    <Elements stripe={stripePromise} options={{ 
      appearance: stripeAppearance,
      clientSecret
    }}>
      <PaymentElementContent {...props} />
    </Elements>
  );
};