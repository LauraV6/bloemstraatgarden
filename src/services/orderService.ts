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
  async mockSubmitOrder(cartItems: CartItem[], customerInfo?: any): Promise<OrderResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderId = `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const customerName = customerInfo?.name || 'Onbekend';
    const customerEmail = customerInfo?.email || '';
    
    console.log('Mock order received:', {
      orderId,
      customer: { name: customerName, email: customerEmail },
      items: cartItems,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
    
    return {
      success: true,
      orderId,
      message: `Beste ${customerName}, uw bestelling ${orderId} is ontvangen! We sturen een bevestiging naar ${customerEmail}.`,
      timestamp: new Date().toISOString(),
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }
}

export const orderService = new OrderService();