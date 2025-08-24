import { Verkrijgbaar } from '@/lib/contentful/api';

interface CartItem extends Verkrijgbaar {
  quantity: number;
}

interface OrderRequest {
  items: CartItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  timestamp?: string;
  totalItems?: number;
}

class OrderService {
  private baseUrl: string;

  constructor() {
    // In production, Netlify Functions are available at /.netlify/functions/
    // In development, you might need to proxy or use Netlify Dev
    this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/functions`
      : '/.netlify/functions';
  }

  async submitOrder(cartItems: CartItem[], customerInfo?: any): Promise<OrderResponse> {
    try {
      const orderData: OrderRequest = {
        items: cartItems.map(item => ({
          sys: item.sys,
          title: item.title,
          amount: item.amount,
          quantity: item.quantity,
          postImage: item.postImage,
          date: item.date,
        })),
        customer: customerInfo,
      };

      const response = await fetch(`${this.baseUrl}/submit-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order submission failed');
      }

      return data;
    } catch (error) {
      console.error('Order submission error:', error);
      
      // Return error response
      return {
        success: false,
        message: error instanceof Error 
          ? error.message 
          : 'Er ging iets mis. Probeer het later opnieuw.',
      };
    }
  }


  // Mock function for testing without Netlify
  async mockSubmitOrder(cartItems: CartItem[]): Promise<OrderResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/failure for testing
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
      const orderId = `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      return {
        success: true,
        orderId,
        message: `Test bestelling ${orderId} ontvangen!`,
        timestamp: new Date().toISOString(),
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    } else {
      return {
        success: false,
        message: 'Test fout: Probeer het opnieuw',
      };
    }
  }
}

export const orderService = new OrderService();