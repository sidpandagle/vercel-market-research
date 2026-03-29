export type OrderStatus =
  | 'pending_payment'
  | 'payment_received'
  | 'processing'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface CreateOrderRequest {
  customer_name: string;
  customer_email: string;
  customer_company?: string;
  customer_phone?: string;
  customer_country?: string;
  report_slug: string;
  payment_method?: 'paypal' | 'stripe';
}

export interface CreateOrderResponse {
  order_id: number;
  payment_method: string;
  paypal_order_id?: string;
  stripe_client_secret?: string;
}

export interface CaptureOrderResponse {
  order_id: number;
  status: OrderStatus;
  paypal_capture_id: string;
}

export interface ConfirmStripeOrderResponse {
  order_id: number;
  status: OrderStatus;
  stripe_payment_intent_id: string;
}
