import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe('pk_test_51QeIX52LXOKOXavoC0jOAiuAtduL6P2rUo3Deqr9LBbOHzE1h5EE6pjlp4vdoRMrHRtbeGTxNgNDreGzOB37eCjh00uOInHcd8');

export const PaymentElement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Failed to load Stripe');

        const appearance = {
          theme: 'stripe',
          variables: {
            colorPrimary: '#006AA7',
          },
        };

        const options = {
          layout: 'accordion',
          amount: 5000, // 50kr in öre
          currency: 'sek',
        };

        const elements = stripe.elements({ appearance });
        const paymentElement = elements.create('payment', options);
        paymentElement.mount('#payment-element');

      } catch (error) {
        console.error('Payment initialization error:', error);
        toast({
          title: "Error",
          description: "Failed to initialize payment form. Please try again.",
          variant: "destructive",
        });
      }
    };

    initializePayment();
  }, [toast]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Implement payment submission logic here
      toast({
        title: "Processing payment",
        description: "Please wait while we process your payment...",
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Business Analysis Payment</CardTitle>
        <CardDescription>Pay 50kr for your business analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div id="payment-element" className="mb-6"></div>
        <Button 
          onClick={handlePayment} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay 50kr'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};