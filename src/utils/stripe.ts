import { loadStripe, Appearance } from "@stripe/stripe-js";

// This is your publishable key, it's safe to commit this
export const stripePromise = loadStripe("pk_test_51QeIX52LXOKOXavoC0jOAiuAtduL6P2rUo3Deqr9LBbOHzE1h5EE6pjlp4vdoRMrHRtbeGTxNgNDreGzOB37eCjh00uOInHcd8");

export const stripeAppearance: Appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#0F172A',
  },
};

export const getPaymentIntent = async () => {
  const response = await fetch('https://dqebigulyemxctgrpftf.supabase.co/functions/v1/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }

  const data = await response.json();
  return data.clientSecret;
};