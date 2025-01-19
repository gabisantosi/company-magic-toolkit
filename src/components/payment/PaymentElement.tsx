import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement as StripePaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getPaymentIntent } from "@/utils/stripe";
import { LoadingState } from "./LoadingState";

interface PaymentElementProps {
  onPaymentSuccess?: () => void;
}

export const PaymentElement = ({ onPaymentSuccess }: PaymentElementProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const initializePayment = async () => {
      try {
        console.log("Initializing payment...");
        const secret = await getPaymentIntent();
        console.log("Payment intent created successfully");
        if (!secret) {
          throw new Error("Failed to get client secret");
        }
        setClientSecret(secret);
      } catch (error: any) {
        console.error("Payment initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.error("Stripe not initialized or client secret missing");
      return;
    }

    setIsLoading(true);

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        toast({
          title: "Payment Failed",
          description: confirmError.message || "An error occurred during payment.",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log("Payment successful!", paymentIntent);
        toast({
          title: "Success",
          description: "Payment processed successfully!",
        });
        onPaymentSuccess?.();
      } else {
        console.log("Payment status:", paymentIntent?.status);
        toast({
          title: "Payment Status",
          description: "Please check your payment status and try again if needed.",
        });
      }
    } catch (error: any) {
      console.error("Unexpected payment error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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