import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
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

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
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

  // Initialize Netlify Blobs store
  let ordersStore: any = null;
  let blobsAvailable = false;
  
  try {
    // Check if we're in Netlify environment
    const isNetlifyEnv = process.env.NETLIFY === 'true' || process.env.NETLIFY_LOCAL === 'true';
    
    if (isNetlifyEnv && typeof getStore === 'function') {
      ordersStore = getStore('orders');
      blobsAvailable = true;
      console.log('✅ Netlify Blobs initialized successfully');
    } else {
      console.log('📝 Running without Blobs - orders will be logged only');
    }
  } catch (error: any) {
    console.log('📝 Netlify Blobs not configured:', error.message || 'Using function logs for order storage');
  }

  // Handle GET requests
  if (event.httpMethod === 'GET') {
    if (blobsAvailable && ordersStore) {
      try {
        const ordersList = await ordersStore.list();
        const orders = [];
        
        for (const key of ordersList.blobs) {
          const orderData = await ordersStore.get(key.key, { type: 'json' });
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
            storage: 'Netlify Blobs',
          }),
        };
      } catch (error) {
        console.error('Error fetching from Blobs:', error);
      }
    }
    
    // Fallback response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orders: [],
        totalOrders: 0,
        storage: 'temporary',
        message: 'Check Netlify Function logs for orders',
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

      // Create order object
      const order = {
        orderId,
        items: orderData.items,
        customer: orderData.customer || {},
        timestamp: orderDate,
        totalItems,
        status: 'received'
      };

      // Try to save to Netlify Blobs
      if (blobsAvailable && ordersStore) {
        try {
          await ordersStore.setJSON(orderId, order);
          console.log('✅ Order saved to Netlify Blobs:', orderId);
        } catch (error) {
          console.error('Could not save to Blobs:', error);
          // Continue anyway - order is still logged
        }
      }
      
      // Always log the order
      console.log('📦 NEW ORDER RECEIVED:', {
        orderId,
        customer: {
          name: customerName,
          email: customerEmail || 'Not provided'
        },
        totalItems,
        items: orderData.items.map((item: any) => ({
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