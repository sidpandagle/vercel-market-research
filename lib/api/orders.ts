import type { CreateOrderRequest, CreateOrderResponse, CaptureOrderResponse } from './orders.types';

/**
 * Stub — order processing requires a backend server.
 * This static site does not support live checkout.
 */
export async function createOrder(_req: CreateOrderRequest): Promise<CreateOrderResponse> {
  throw new Error('Order processing is not available on this static site. Please contact us to purchase a report.');
}

export async function captureOrder(_orderId: number): Promise<CaptureOrderResponse> {
  throw new Error('Order processing is not available on this static site.');
}
