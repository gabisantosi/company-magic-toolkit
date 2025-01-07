import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import type { Appearance } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QeIX52LXOKOXavoC0jOAiuAtduL6P2rUo3Deqr9LBbOHzE1h5EE6pjlp4vdoRMrHRtbeGTxNgNDreGzOB37eCjh00uOInHcd8');

export const PaymentElement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    const initializePayment = async () => {
      try {
        // Fetch the client secret from your Supabase Edge Function
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);

        if (!clientSecret) return;

        const stripe = await stripePromise;
        if (!stripe) throw new Error('Failed to load Stripe');

        const appearance: Appearance = {
          theme: 'stripe',
          variables: {
            colorPrimary: '#006AA7',
          },
        };

        const elements = stripe.elements({ 
          clientSecret,
          appearance,
        });

        const paymentElement = elements.create('payment', {
          layout: { type: 'accordion' }
        });
        
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
  }, [toast, clientSecret]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe || !clientSecret) {
        throw new Error('Stripe not initialized');
      }

      const { error } = await stripe.confirmPayment({
        elements: stripe.elements({ clientSecret }),
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        throw error;
      }

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
          disabled={loading || !clientSecret}
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