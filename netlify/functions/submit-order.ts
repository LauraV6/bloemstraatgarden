import { Handler, HandlerEvent } from '@netlify/functions';

interface CartItem {
  sys: { id: string };
  title: string;
  amount: string;
  quantity: number;
  postImage?: { url: string };
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

const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Handle GET requests - simple status check
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order endpoint is working. Orders are logged in Netlify Function logs.',
      }),
    };
  }

  // Handle POST requests - submit new order
  if (event.httpMethod === 'POST') {
    try {
      if (!event.body) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Geen ordergegevens ontvangen',
          }),
        };
      }

      const orderData: OrderRequest = JSON.parse(event.body);

      // Validate order data
      if (!orderData.items || orderData.items.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Winkelwagen is leeg',
          }),
        };
      }

      // Generate order ID
      const orderId = `NL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Extract customer info
      const customerName = orderData.customer?.name || 'Klant';
      const customerEmail = orderData.customer?.email || '';
      
      // Calculate totals
      const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);
      const orderDate = new Date().toISOString();

      // Log the order
      console.log('📦 NEW ORDER RECEIVED:', {
        orderId,
        customer: {
          name: customerName,
          email: customerEmail || 'Not provided'
        },
        totalItems,
        items: orderData.items.map((item) => ({
          name: item.title,
          quantity: item.quantity
        })),
        timestamp: orderDate,
      });
      
      // Return success response
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          orderId,
          message: `Beste ${customerName}, uw bestelling ${orderId} is succesvol ontvangen! We nemen binnen 24 uur contact met je op.`,
          timestamp: orderDate,
          totalItems,
        }),
      };
    } catch (error) {
      console.error('Order processing error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Er ging iets mis bij het verwerken van je bestelling. Probeer het later opnieuw.',
        }),
      };
    }
  }

  // Method not allowed
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      success: false,
      message: 'Method not allowed',
    }),
  };
};

export { handler };