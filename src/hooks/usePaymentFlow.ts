import { useState, useCallback } from "react";
import { useToast } from "./use-toast";
import { getPaymentIntent } from "@/utils/stripe";

export const usePaymentFlow = (onPaymentSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  const initializePayment = useCallback(async () => {
    try {
      console.log("Getting payment intent...");
      const secret = await getPaymentIntent();
      console.log("Payment intent received:", secret ? "Success" : "Failed");
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
  }, [toast]);

  const handlePaymentConfirmation = async (stripe: any, elements: any) => {
    if (!stripe || !elements) {
      console.error("Stripe not initialized or elements missing");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Confirming payment...");
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
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
        onPaymentSuccess();
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

  return {
    isLoading,
    clientSecret,
    initializePayment,
    handlePaymentConfirmation,
  };
};