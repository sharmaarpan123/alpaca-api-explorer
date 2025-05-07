
// Define the structure for path and query parameter fields
interface ParamField {
  type: string;
  description: string;
}

// Define the structure for parameters objects
export interface ParamsObject {
  [key: string]: ParamField;
}

// Define the structure of an API endpoint
export interface ApiEndpointData {
  title: string;
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  requestBody?: Record<string, any>;
  queryParams?: ParamsObject;
  pathParams?: ParamsObject;
}

// Mock API data - in a real app, this would come from your API documentation
export const API_ENDPOINTS: Record<string, ApiEndpointData> = {
  // Auth endpoints
  'auth/login': {
    title: 'Login',
    method: 'POST',
    path: '/auth/login',
    description: 'Authenticate and get access token',
    requiresAuth: false,
    requestBody: {
      email: 'user@example.com',
      password: 'yourpassword'
    }
  },
  'auth/refresh': {
    title: 'Refresh Token',
    method: 'POST',
    path: '/auth/refresh',
    description: 'Refresh access token',
    requiresAuth: false,
    requestBody: {
      refreshToken: 'your-refresh-token'
    }
  },
  'auth/logout': {
    title: 'Logout',
    method: 'POST',
    path: '/auth/logout',
    description: 'Invalidate tokens',
    requiresAuth: true,
    requestBody: {}
  },
  
  // Assets endpoints
  'assets/list-assets': {
    title: 'List Assets',
    method: 'GET',
    path: '/v2/assets',
    description: 'Get a list of all assets',
    requiresAuth: true,
    queryParams: {
      status: {
        type: 'string',
        description: 'e.g. "active". By default, all statuses are included.'
      },
      asset_class: {
        type: 'string',
        description: 'Defaults to us_equity.'
      },
      exchange: {
        type: 'string',
        description: 'Optional AMEX, ARCA, BATS, NYSE, NASDAQ, NYSEARCA or OTC'
      },
      attributes: {
        type: 'array of strings',
        description: 'Comma separated values to query for more than one attribute.'
      }
    }
  },
  'assets/get-asset': {
    title: 'Get Asset',
    method: 'GET',
    path: '/v2/assets/{symbol}',
    description: 'Get an asset by symbol',
    requiresAuth: true,
    pathParams: {
      symbol: {
        type: 'string',
        description: 'Asset symbol, e.g., AAPL'
      }
    }
  },
  
  // Orders endpoints
  'orders/create-order': {
    title: 'Create Order',
    method: 'POST',
    path: '/v2/orders',
    description: 'Submit a new order',
    requiresAuth: true,
    requestBody: {
      symbol: 'AAPL',
      qty: 10,
      side: 'buy',
      type: 'market',
      time_in_force: 'day'
    }
  },
  'orders/get-orders': {
    title: 'List Orders',
    method: 'GET',
    path: '/v2/orders',
    description: 'Get a list of orders',
    requiresAuth: true,
    queryParams: {
      status: {
        type: 'string',
        description: 'open, closed, or all. Default is open.'
      },
      limit: {
        type: 'integer',
        description: 'Number of orders to return. Default is 50, max is 500.'
      }
    }
  },
  'orders/get-order': {
    title: 'Get Order',
    method: 'GET',
    path: '/v2/orders/{order_id}',
    description: 'Get an order by ID',
    requiresAuth: true,
    pathParams: {
      order_id: {
        type: 'string',
        description: 'Order ID'
      }
    }
  },
  'orders/delete-order': {
    title: 'Cancel Order',
    method: 'DELETE',
    path: '/v2/orders/{order_id}',
    description: 'Cancel an open order',
    requiresAuth: true,
    pathParams: {
      order_id: {
        type: 'string',
        description: 'Order ID'
      }
    }
  }
};
