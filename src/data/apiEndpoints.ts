// Define the structure for path and query parameter fields
interface ParamField {
  type: string;
  description: string;
}

// Define the structure for parameters objects
export interface ParamsObject {
  [key: string]: ParamField;
}

// Define the structure for response examples
interface ResponseExample {
  status: string;
  description: string;
  example: any;
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
  responseExamples?: ResponseExample[];
}

// API endpoints data based on the Postman collection
export const API_ENDPOINTS: Record<string, ApiEndpointData> = {
  // User endpoints
  'users/clock': {
    title: 'Clock',
    method: 'POST',
    path: 'api/v1/user/clock',
    description: 'Get server time information',
    requiresAuth: true,
    responseExamples: [
      {
        status: '200',
        description: 'Successful operation',
        example: {
          data: {
            afterHours: false,
            currencies: {
              crypto: "open",
              fx: "open"
            },
            earlyHours: false,
            exchanges: {
              nasdaq: "closed",
              nyse: "closed",
              otc: "closed"
            },
            indicesGroups: {
              s_and_p: "closed",
              societe_generale: "closed",
              msci: "closed",
              ftse_russell: "closed",
              mstar: "open",
              mstarc: "open",
              cccy: "open",
              cgi: "closed",
              nasdaq: "closed",
              dow_jones: "closed"
            },
            market: "closed",
            serverTime: "2025-05-13T02:00:44-04:00"
          }
        }
      }
    ]
  },
 
  'users/get-account-number': {
    title: 'Get Account Number',
    method: 'POST',
    path: '/api/v1/user/get-account-number',
    description: 'Get user account number',
    requiresAuth: true,
    requestBody: {}
  },

  'users/get-accounts': {
    title: 'Get Accounts',
    method: 'POST',
    path: '/api/v1/user/account',
    description: 'Get user account details',
    requiresAuth: true,
    requestBody: {}
  },

  // Stocks endpoints
  'stocks/assets': {
    title: 'Assets',
    method: 'POST',
    path: '/api/v1/stock/assets',
    description: 'Get list of available assets',
    requiresAuth: true,
    requestBody: {
      limit: 10,
      order: -1,
      orderBy: 'exchange',
      page: 1
    },
    responseExamples: [
      {
        status: '200',
        description: 'An array of asset objects',
        example: [
          {
            id: "string",
            class: "us_equity",
            cusip: "037833100",
            exchange: "NASDAQ",
            name: "Apple Inc.",
            symbol: "AAPL",
            status: "active"
          }
        ]
      }
    ]
  },

  'stocks/assets-details': {
    title: 'Assets Details',
    method: 'POST',
    path: '/api/v1/stock/assetsDetails',
    description: 'Get detailed information about a specific asset',
    requiresAuth: true,
    requestBody: {
      value: 'AAPL'
    }
  },

  'stocks/quotes-latest': {
    title: 'Quotes Latest',
    method: 'POST',
    path: '/api/v1/stock/quotes/latest',
    description: 'Get latest quotes for assets',
    requiresAuth: true,
    requestBody: {}
  },
  'stocks/quotes-history': {
    title: 'Quotes History',
    method: 'POST',
    path: '/api/v1/stock/quotes',
    description: 'Get historical quotes for an asset',
    requiresAuth: true,
    requestBody: {
      symbol: 'AAPL',
      startTime: '2025-04-22T09:00:00Z',
      endTime: '2025-04-22T21:00:00Z'
    }
  },
  'stocks/bars-info': {
    title: 'Bars Info',
    method: 'POST',
    path: '/api/v1/stock/bars',
    description: 'Get bar data for an asset',
    requiresAuth: true,
    requestBody: {
      symbol: 'AAPL',
      multiplier: 15,
      timespan: 'minute',
      from: '2024-04-22',
      to: '2024-04-22'
    }
  },
  'stocks/bars-latest': {
    title: 'Bars Latest',
    method: 'POST',
    path: '/api/v1/stock/bars/latest',
    description: 'Get latest bar data for an asset',
    requiresAuth: true,
    requestBody: {
      symbol: 'AAPL',
      date: '2025-04-22'
    }
  },

  // Orders endpoints
  'orders/order-buy': {
    title: 'Order Buy',
    method: 'POST',
    path: '/api/v1/order/orders',
    description: 'Place a buy order',
    requiresAuth: true,
    requestBody: {
      timezone: 'Asia/kolkata',
      purchaseType: 'Money',
      purchaseValue: 15,
      side: 'buy',
      symbol: 'PARA',
      type: 'market'
    }
  },
  'orders/pending-order-list': {
    title: 'Pending Order List',
    method: 'POST',
    path: '/api/v1/order/lists',
    description: 'Get list of pending orders',
    requiresAuth: true,
    requestBody: {
      type: 'pending'
    }
  },
  'orders/delete-all-pending-orders': {
    title: 'Delete All Pending Orders',
    method: 'POST',
    path: '/api/v1/order/deleteAllOrders',
    description: 'Delete all pending orders',
    requiresAuth: true,
    requestBody: {
      type: 'pending'
    }
  },
  'orders/order-details': {
    title: 'Order Details',
    method: 'POST',
    path: '/api/v1/order/orderDetails',
    description: 'Get details of a specific order',
    requiresAuth: true,
    requestBody: {
      orderId: '2ec3842a-c7b0-4e9a-92d1-68244767e0b6'
    }
  },
  'orders/delete-pending-order': {
    title: 'Delete Pending Order',
    method: 'POST',
    path: '/api/v1/order/deleteOrder',
    description: 'Delete a specific pending order',
    requiresAuth: true,
    requestBody: {
      orderId: '39ec4f80-1ec7-40e7-bb69-2c64e3eba7ab',
      type: 'pending'
    }
  },
  'orders/replace-orders': {
    title: 'Replace Orders',
    method: 'POST',
    path: '/api/v1/order/replaceOrder',
    description: 'Replace an existing order',
    requiresAuth: true,
    requestBody: {
      orderId: '67fe586068917dc0ed5ca052'
    }
  },
  'orders/open-position': {
    title: 'Open Position',
    method: 'POST',
    path: '/api/v1/order/positions',
    description: 'Get list of open positions',
    requiresAuth: true,
    requestBody: {}
  },
  'orders/open-position-symbol': {
    title: 'Open Position by Symbol',
    method: 'POST',
    path: '/api/v1/order/positionsSymbolOrAsset',
    description: 'Get open position for a specific symbol',
    requiresAuth: true,
    requestBody: {
      value: 'AAPL'
    }
  },
  'orders/close-all-position': {
    title: 'Close All Position',
    method: 'POST',
    path: '/api/v1/order/closeAllPosition',
    description: 'Close all open positions',
    requiresAuth: true,
    requestBody: {}
  },
  'orders/close-position-symbol': {
    title: 'Close Position by Symbol',
    method: 'POST',
    path: '/api/v1/order/closePositionSymbolOrAssets',
    description: 'Close position for a specific symbol',
    requiresAuth: true,
    requestBody: {
      value: 'AAPL',
      type: 'PARTIAL_CLOSURE',
      closeBy: 'SHARE',
      closeValue: 5
    }
  },
  'orders/order-history': {
    title: 'Order History',
    method: 'POST',
    path: '/api/v1/order/portfolio/history',
    description: 'Get order history',
    requiresAuth: true,
    requestBody: {
      limit: 20,
      page: 1,
      type: 'ORDER'
    }
  },
  'orders/account-activities': {
    title: 'Account Activities',
    method: 'POST',
    path: '/api/v1/order/account/activities',
    description: 'Get account activities',
    requiresAuth: true,
    requestBody: {
      limit: 20,
      page: 1
    }
  },
  'orders/account-activities-type': {
    title: 'Account Activities Type',
    method: 'POST',
    path: '/api/v1/order/account/activitiesType',
    description: 'Get account activities by type',
    requiresAuth: true,
    requestBody: {
      type: 'FEE'
    }
  }
};

// Helper function to get response examples for an endpoint
export const getResponseExamples = (endpointKey: string): ResponseExample[] => {
  const endpoint = API_ENDPOINTS[endpointKey as keyof typeof API_ENDPOINTS];
  
  if (!endpoint || !endpoint.responseExamples) {
    // Default response example if none provided
    return [
      {
        status: '200',
        description: 'Successful operation',
        example: { message: 'Operation completed successfully' }
      }
    ];
  }
  
  return endpoint.responseExamples;
};
