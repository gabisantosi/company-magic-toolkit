import { loadStripe } from "@stripe/stripe-js";

// This is your publishable key, it's safe to commit this
export const stripePromise = loadStripe("pk_test_your_publishable_key_here");

export const stripeAppearance = {
  theme: 'stripe',
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