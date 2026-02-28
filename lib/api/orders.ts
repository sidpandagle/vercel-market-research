import { API_BASE_URL } from './config';
import type { CreateOrderRequest, CreateOrderResponse, CaptureOrderResponse } from './orders.types';

/**
 * Creates an order on the backend and returns a PayPal order ID.
 * Price is always determined server-side — never passed from the browser.
 */
export async function createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || 'Failed to create order');
  }

  return data as CreateOrderResponse;
}

/**
 * Captures the PayPal payment for a given order ID.
 */
export async function captureOrder(orderId: number): Promise<CaptureOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/orders/${orderId}/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || 'Failed to capture payment');
  }

  // Backend wraps success responses in { success: true, data: ... }
  if (data.success && data.data) {
    return data.data as CaptureOrderResponse;
  }

  return data as CaptureOrderResponse;
}
