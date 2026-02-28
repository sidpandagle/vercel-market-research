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
}

export interface CreateOrderResponse {
  order_id: number;
  paypal_order_id: string;
}

export interface CaptureOrderResponse {
  order_id: number;
  status: OrderStatus;
  paypal_capture_id: string;
}
