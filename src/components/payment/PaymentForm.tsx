import { useState } from "react";
import { useStripe, useElements, PaymentElement as StripePaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment form submitted");

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Starting payment confirmation...");
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
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StripePaymentElement />
      <Button 
        type="submit" 
        disabled={isProcessing || !stripe || !elements}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Pay Now'
        )}
      </Button>
    </form>
  );
};