'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui';

// Initialise Stripe outside the component to avoid recreating on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface BillingDetails {
  name: string;
  email: string;
  countryCode: string;
  line1: string;
}

interface StripePaymentFormProps {
  clientSecret: string;
  billingDetails: BillingDetails;
  onSuccess: () => Promise<void>;
  onError: (message: string) => void;
}

// Inner form rendered inside the Stripe <Elements> provider.
function StripeInnerForm({
  billingDetails,
  onSuccess,
  onError,
}: {
  billingDetails: BillingDetails;
  onSuccess: () => Promise<void>;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      // Do not redirect — we handle success in JS.
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: billingDetails.name,
            email: billingDetails.email,
            address: {
              line1: billingDetails.line1,
              country: billingDetails.countryCode,
            },
          },
        },
      },
    });

    if (error) {
      onError(error.message ?? 'Payment failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      await onSuccess();
    } else {
      onError('Payment was not completed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: 'tabs',
          fields: {
            billingDetails: {
              name: 'never',
              email: 'never',
            },
          },
        }}
      />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}

export function StripePaymentForm({ clientSecret, billingDetails, onSuccess, onError }: StripePaymentFormProps) {
  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            borderRadius: '6px',
            fontSizeBase: '14px',
          },
        },
      }}
    >
      <StripeInnerForm billingDetails={billingDetails} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
