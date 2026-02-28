'use client';

import { useEffect, useRef, useState } from 'react';

interface PayPalButtonProps {
  paypalOrderId: string;
  onApprove: (paypalOrderId: string) => void;
  onError: (err: unknown) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paypal?: any;
  }
}

export function PayPalButton({ paypalOrderId, onApprove, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [rendered, setRendered] = useState(false);

  // Load the PayPal JS SDK script once
  useEffect(() => {
    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      console.error('NEXT_PUBLIC_PAYPAL_CLIENT_ID is not set');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => onError(new Error('Failed to load PayPal SDK'));
    document.body.appendChild(script);

    return () => {
      // Clean up script tag on unmount (best-effort)
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render the PayPal button once the SDK is ready and container is mounted
  useEffect(() => {
    if (!sdkReady || !containerRef.current || rendered) return;

    setRendered(true);

    window.paypal
      .Buttons({
        createOrder: () => Promise.resolve(paypalOrderId),
        onApprove: (data: { orderID: string }) => {
          onApprove(data.orderID);
        },
        onError: (err: unknown) => {
          onError(err);
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
        },
      })
      .render(containerRef.current);
  }, [sdkReady, paypalOrderId, onApprove, onError, rendered]);

  if (!sdkReady) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin h-6 w-6 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
        <span className="ml-2 text-sm text-[var(--muted-foreground)]">Loading payment options...</span>
      </div>
    );
  }

  return <div ref={containerRef} id="paypal-button-container" className="w-full" />;
}
