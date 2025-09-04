export interface Customer {
  name?: string;
  email?: string;
  phone?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
  totalItems?: number;
}