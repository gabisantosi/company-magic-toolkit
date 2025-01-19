import { loadStripe, Appearance } from "@stripe/stripe-js";

export const stripePromise = loadStripe("pk_test_51QeIX52LXOKOXavoC0jOAiuAtduL6P2rUo3Deqr9LBbOHzE1h5EE6pjlp4vdoRMrHRtbeGTxNgNDreGzOB37eCjh00uOInHcd8");

export const stripeAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0F172A',
  },
  rules: {
    '.Input': {
      borderColor: '#E2E8F0',
    },
  },
};

export const getPaymentIntent = async () => {
  try {
    console.log('Fetching payment intent...');
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
    console.log('Payment intent created successfully');
    return data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};