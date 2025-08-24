import { Handler, HandlerEvent } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

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

  // Handle GET requests - retrieve orders from Netlify Blobs
  if (event.httpMethod === 'GET') {
    try {
      const ordersStore = getStore('orders');
      const ordersList = await ordersStore.list();
      const orders = [];
      
      // Fetch each order
      for (const key of ordersList.keys) {
        const orderData = await ordersStore.get(key, { type: 'json' });
        if (orderData) {
          orders.push(orderData);
        }
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orders: orders.sort((a: any, b: any) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ),
          totalOrders: orders.length,
        }),
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          orders: [],
          totalOrders: 0,
        }),
      };
    }
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
      
      // Calculate totals
      const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);
      const orderDate = new Date().toISOString();

      // Create order object
      const order = {
        orderId,
        items: orderData.items,
        customer: orderData.customer || {},
        timestamp: orderDate,
        totalItems,
        status: 'received'
      };

      // SAVE TO NETLIFY BLOBS (permanent storage!)
      const ordersStore = getStore('orders');
      await ordersStore.setJSON(orderId, order);
      
      console.log('✅ Order saved to Netlify Blobs:', orderId);
      console.log('📦 Order details:', {
        orderId,
        totalItems,
        items: orderData.items.map((item: any) => ({
          name: item.title,
          quantity: item.quantity
        }))
      });
      
      // Return success response
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          orderId,
          message: `Bestelling ${orderId} is succesvol ontvangen! We nemen binnen 24 uur contact met je op.`,
          timestamp: orderDate,
          totalItems,
          estimatedDelivery: '2-3 werkdagen',
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