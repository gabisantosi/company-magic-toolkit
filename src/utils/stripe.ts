import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('pk_test_51QeIX52LXOKOXavoC0jOAiuAtduL6P2rUo3Deqr9LBbOHzE1h5EE6pjlp4vdoRMrHRtbeGTxNgNDreGzOB37eCjh00uOInHcd8');

export const getPaymentIntent = async () => {
  const { data, error } = await supabase.functions.invoke('create-payment-intent');
  if (error) throw error;
  return data.clientSecret;
};

export const stripeAppearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0369a1',
  },
};