import { useEffect, useState } from "react";
import { Elements } from "@stripe/stripe-js";
import { PaymentElement as StripePaymentElement } from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import { stripePromise, getPaymentIntent, stripeAppearance } from "@/utils/stripe";
import { LoadingState } from "./LoadingState";
import { PaymentForm } from "./PaymentForm";

export const PaymentElement = () => {
  const [clientSecret, setClientSecret] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const secret = await getPaymentIntent();
        setClientSecret(secret);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    initializePayment();
  }, [toast]);

  if (!clientSecret) {
    return <LoadingState />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: stripeAppearance }}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentElement;