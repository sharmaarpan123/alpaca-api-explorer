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
export interface ResponseExample {
  status: string;
  description: string;
  example: any;
  dataKey: string;
}

// Define the structure of an API endpoint
export interface ApiEndpointData {
  title: string;
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  requestBody?: Record<string, any>;
  responseExamples?: ResponseExample[];
}

// Define the structure for API groups and endpoints in the sidebar
export interface ApiEndpoint {
  id: string;
  name: string;
  path: string;
  method: string;
  description: string;
}

export interface ApiGroup {
  id: string;
  name: string;
  endpoints: ApiEndpoint[];
}

export const payloadTypes: {
  number: "number";
  string: "string";
  checkbox: "checkbox";
  select: "select";
  object: "object";
  array: "array";
  date: "date";
  time: "time";
} = {
  number: "number",
  string: "string",
  checkbox: "checkbox",
  select: "select",
  object: "object",
  array: "array",
  date: "date",
  time: "time",
};

export const responseExampleTypes: {
  object: "object";
  arrayOfObject: "Array of object";
} = {
  object: "object",
  arrayOfObject: "Array of object",
};

// API endpoints data based on the Postman collection
export const API_ENDPOINTS: Record<string, ApiEndpointData> = {
  // User endpoints
  "users/clock": {
    title: "Clock",
    method: "POST",
    path: "api/v1/user/clock",
    description: "Get server time information",
    requiresAuth: true,
    responseExamples: [
      {
        status: "200",
        description: "Successful operation",
        dataKey: "data",
        example: {
          type: responseExampleTypes.object,
          values: {
            afterHours: {
              type: "boolean",
              description: "After hours market status",
            },
            currencies: {
              type: "object",
              values: {
                crypto: { type: "string", description: "Crypto market status" },
                fx: { type: "string", description: "Forex market status" },
              },
            },
            earlyHours: {
              type: "boolean",
              description: "Early hours market status",
            },
            exchanges: {
              type: "object",
              values: {
                nasdaq: {
                  type: "string",
                  description: "NASDAQ exchange status",
                },
                nyse: { type: "string", description: "NYSE exchange status" },
                otc: { type: "string", description: "OTC exchange status" },
              },
            },
            indicesGroups: {
              type: "object",
              values: {
                s_and_p: { type: "string", description: "S&P market status" },
                societe_generale: {
                  type: "string",
                  description: "Societe Generale market status",
                },
                msci: {
                  type: "string",
                  description: "MSCI market status",
                },
                ftse_russell: {
                  type: "string",
                  description: "FTSE Russell market status",
                },
                mstar: { type: "string", description: "MSTAR market status" },
                mstarc: { type: "string", description: "MSTARC market status" },
                cccy: { type: "string", description: "CCCY market status" },
                cgi: { type: "string", description: "CGI market status" },
                nasdaq: {
                  type: "string",
                  description: "NASDAQ index group status",
                },
                dow_jones: {
                  type: "string",
                  description: "Dow Jones market status",
                },
              },
            },
            market: { type: "string", description: "Market status" },
            serverTime: { type: "string", description: "Server time" },
          },
        },
      },
    ],
  },

  "users/get-account-number": {
    title: "Get Account Number",
    method: "POST",
    path: "/api/v1/user/get-account-number",
    description: "Get user account number",
    requiresAuth: true,
    requestBody: {},
    responseExamples: [
      {
        status: "200",
        description: "Successful operation",
        dataKey: "data",
        example: {
          type: "object",
          values: {
            accountNumber: {
              type: "string",
              description: "User's account number",
            },
            accountId: {
              type: "string",
              description: "Unique identifier for the user's account",
            },
          },
        },
      },
    ],
  },

  "users/get-accounts": {
    title: "Get Accounts",
    method: "POST",
    path: "/api/v1/user/account",
    description: "Get user account details",
    requiresAuth: true,
    requestBody: {},
    responseExamples: [
      {
        status: "200",
        description: "Successful operation",
        dataKey: "data",
        example: {
          type: "object",
          values: {
            email: { type: "string", description: "User's email address" },
            accountId: {
              type: "string",
              description: "Unique account identifier",
            },
            first_name: { type: "string", description: "User's first name" },
            last_name: { type: "string", description: "User's last name" },
            mobileNumber: {
              type: "string",
              description: "User's mobile number",
            },
            profileImage: {
              type: "string",
              description: "URL to the user's profile image",
            },
            status: { type: "string", description: "Account approval status" },
            walletCredit: {
              type: "number",
              description: "Credit amount in the wallet",
            },
            buyingPower: {
              type: "number",
              description: "Amount available to buy stocks",
            },
            equity: { type: "number", description: "Total equity value" },
            isAlpacaApproved: {
              type: "boolean",
              description: "Alpaca account approval status",
            },
            openPlValue: {
              type: "number",
              description: "Open profit/loss value",
            },
            affiliatedRequest: {
              type: ["string", "null"],
              description: "Affiliation request status (nullable)",
            },
            cash_withdrawable: {
              type: "number",
              description: "Amount that can be withdrawn",
            },
            openPositionValue: {
              type: "number",
              description: "Value of open stock positions",
            },
            portfolioValue: {
              type: "number",
              description: "Total portfolio value",
            },
            totalValue: {
              type: "number",
              description: "Total value of positions",
            },
            equityPc: {
              type: "number",
              description: "Equity percentage change",
            },
            totalValuePc: {
              type: "number",
              description: "Total value percentage change",
            },
            openPositionValuePc: {
              type: "number",
              description: "Open position value percentage change",
            },
            exchangeRate: {
              type: "number",
              description: "Exchange rate applied to calculations",
            },
          },
        },
      },
    ],
  },

  // Stocks endpoints
  "stocks/assets": {
    title: "Assets",
    method: "POST",
    path: "/api/v1/stock/assets",
    description: "Get list of available assets",
    requiresAuth: true,
    requestBody: {
      limit: {
        type: payloadTypes.number,
        description: "Limit the number of assets to return",
        required: true,
        default: 10,
      },
      order: {
        type: payloadTypes.number,
        description: "Order the assets by a specific field",
        // required: true,
        default: -1,
      },
      orderBy: {
        type: payloadTypes.select,
        description: "Field to order the assets by",
        required: true,
        default: "exchange",
        options: ["exchange", "name", "shortName", "symbol", "type"],
      },
      page: {
        type: payloadTypes.number,
        description: "Page number to return",
        required: true,
        default: 1,
      },
    },
    responseExamples: [
      {
        status: "200",
        description: "Successful operation",
        dataKey: "Data",
        example: {
          type: responseExampleTypes.object,
          values: {
            data: {
              type: responseExampleTypes.arrayOfObject,
              values: {
                _id: { type: "string", description: "Unique stock ID" },
                shortName: {
                  type: "string",
                  description: "Short name of the company",
                },
                name: {
                  type: "string",
                  description: "Full company name",
                },
                ISIN: {
                  type: "string",
                  description: "International Securities Identification Number",
                },
                type: { type: "string", description: "Security type" },
                exchange: {
                  type: "string",
                  description: "Stock exchange",
                },
                symbol: {
                  type: "string",
                  description: "Stock ticker symbol",
                },
                industryAbrev: {
                  type: "string",
                  description: "Industry abbreviation",
                },
                change: {
                  type: "number",
                  description: "Price change amount",
                },
                changePercentage: {
                  type: "number",
                  description: "Percentage change in price",
                },
                price: {
                  type: "number",
                  description: "Current stock price",
                },
                MarketCapitalization: {
                  type: "number",
                  description: "Market capitalization in USD",
                },
                fractionable: {
                  type: "boolean",
                  description:
                    "Indicates if the stock supports fractional shares",
                },
              },
            },
            totalcount: {
              type: "number",
              description: "Total number of stock items available",
            },
            totalPages: {
              type: "number",
              description: "Total number of pages available for the data",
            },
          },
        },
      },
    ],
  },

  "stocks/assets-details": {
    title: "Assets Details",
    method: "POST",
    path: "/api/v1/stock/assetsDetails",
    description: "Get detailed information about a specific asset",
    requiresAuth: true,
    responseExamples: [
      {
        status: "200",
        description: "Successful operation",
        dataKey: "Data",
        example: {
          type: "object",
          values: {
            MarketCapitalization: {
              type: "number",
              description: "Total market value of the company",
            },
            createdAt: {
              type: "string",
              description: "Creation timestamp (ISO 8601 format)",
            },
            updatedAt: {
              type: "string",
              description: "Last update timestamp (ISO 8601 format)",
            },
            _id: {
              type: "string",
              description: "Unique identifier of the entry",
            },
            ISIN: {
              type: "string",
              description: "International Securities Identification Number",
            },
            type: { type: "string", description: "Type of equity or asset" },
            exchange: {
              type: "string",
              description: "Exchange where the stock is listed",
            },
            symbol: {
              type: "string",
              description: "Ticker symbol of the stock",
            },
            name: { type: "string", description: "Full name of the company" },
            status: {
              type: "string",
              description: "Listing status (e.g. active/inactive)",
            },
            shortName: {
              type: "string",
              description: "Short name or alias for the company",
            },
            industryAbrev: {
              type: "string",
              description: "Abbreviated industry name",
            },
            industryDescription: {
              type: "string",
              description: "Detailed industry description",
            },
            description: {
              type: "string",
              description: "Full business description",
            },
            imgUrl: {
              type: "string",
              description: "URL to the company logo/image",
            },
            imgUrlDark: {
              type: "string",
              description: "URL to the dark version of the image",
            },
            change: { type: "number", description: "Price change value" },
            changePercentage: {
              type: "number",
              description: "Percentage change in price",
            },
            price: { type: "number", description: "Current stock price" },
            shortable: {
              type: "string",
              description: "Shortable status (empty string means unknown)",
            },
            easy_to_borrow: {
              type: "string",
              description: "Easy to borrow status (empty string means unknown)",
            },
            attributes__: {
              type: "string",
              description: "Miscellaneous attributes (if any)",
            },
            maintenance_margin_requirement: {
              type: "string",
              description: "Maintenance margin requirement (if available)",
            },
            fractionable: {
              type: "boolean",
              description: "Indicates whether the stock is fractionable",
            },
          },
        },
      },
    ],
    requestBody: {
      value: {
        type: payloadTypes.string,
        description: "The asset to get details for",
        required: true,
        default: "",
      },
    },
  },

  "stocks/quotes-latest": {
    title: "Quotes Latest",
    method: "POST",
    path: "/api/v1/stock/quotes/latest",
    description: "Get latest quotes for assets",
    requiresAuth: true,
    requestBody: {
      symbol: {
        type: payloadTypes.string,
        description: "The symbol to get data for",
        default: "",
      },
    },
  },
  "stocks/quotes-history": {
    title: "Quotes History",
    method: "POST",
    path: "/api/v1/stock/quotes",
    description: "Get historical quotes for an asset",
    requiresAuth: true,
    requestBody: {
      symbol: "AAPL",
      startTime: "2025-04-22T09:00:00Z",
      endTime: "2025-04-22T21:00:00Z",
    },
  },
  "stocks/bars-info": {
    title: "Bars Info",
    method: "POST",
    path: "/api/v1/stock/bars",
    description: "Get bar data for an asset",
    requiresAuth: true,
    requestBody: {
      symbol: "AAPL",
      multiplier: 15,
      timespan: "minute",
      from: "2024-04-22",
      to: "2024-04-22",
    },
  },
  "stocks/bars-latest": {
    title: "Bars Latest",
    method: "POST",
    path: "/api/v1/stock/bars/latest",
    description: "Get latest bar data for an asset",
    requiresAuth: true,
    requestBody: {
      symbol: "AAPL",
      date: "2025-04-22",
    },
  },

  // Orders endpoints
  "orders/order-buy": {
    title: "Order Buy",
    method: "POST",
    path: "/api/v1/order/orders",
    description: "Place a buy order",
    requiresAuth: true,
    requestBody: {
      timezone: "Asia/kolkata",
      purchaseType: "Money",
      purchaseValue: 15,
      side: "buy",
      symbol: "PARA",
      type: "market",
    },
  },
  "orders/pending-order-list": {
    title: "Pending Order List",
    method: "POST",
    path: "/api/v1/order/lists",
    description: "Get list of pending orders",
    requiresAuth: true,
    requestBody: {
      type: "pending",
    },
  },
  "orders/delete-all-pending-orders": {
    title: "Delete All Pending Orders",
    method: "POST",
    path: "/api/v1/order/deleteAllOrders",
    description: "Delete all pending orders",
    requiresAuth: true,
    requestBody: {
      type: "pending",
    },
  },
  "orders/order-details": {
    title: "Order Details",
    method: "POST",
    path: "/api/v1/order/orderDetails",
    description: "Get details of a specific order",
    requiresAuth: true,
    requestBody: {
      orderId: "2ec3842a-c7b0-4e9a-92d1-68244767e0b6",
    },
  },
  "orders/delete-pending-order": {
    title: "Delete Pending Order",
    method: "POST",
    path: "/api/v1/order/deleteOrder",
    description: "Delete a specific pending order",
    requiresAuth: true,
    requestBody: {
      orderId: "39ec4f80-1ec7-40e7-bb69-2c64e3eba7ab",
      type: "pending",
    },
  },
  "orders/replace-orders": {
    title: "Replace Orders",
    method: "POST",
    path: "/api/v1/order/replaceOrder",
    description: "Replace an existing order",
    requiresAuth: true,
    requestBody: {
      orderId: "67fe586068917dc0ed5ca052",
    },
  },
  "orders/open-position": {
    title: "Open Position",
    method: "POST",
    path: "/api/v1/order/positions",
    description: "Get list of open positions",
    requiresAuth: true,
    requestBody: {},
  },
  "orders/open-position-symbol": {
    title: "Open Position by Symbol",
    method: "POST",
    path: "/api/v1/order/positionsSymbolOrAsset",
    description: "Get open position for a specific symbol",
    requiresAuth: true,
    requestBody: {
      value: "AAPL",
    },
  },
  "orders/close-all-position": {
    title: "Close All Position",
    method: "POST",
    path: "/api/v1/order/closeAllPosition",
    description: "Close all open positions",
    requiresAuth: true,
    requestBody: {},
  },
  "orders/close-position-symbol": {
    title: "Close Position by Symbol",
    method: "POST",
    path: "/api/v1/order/closePositionSymbolOrAssets",
    description: "Close position for a specific symbol",
    requiresAuth: true,
    requestBody: {
      value: "AAPL",
      type: "PARTIAL_CLOSURE",
      closeBy: "SHARE",
      closeValue: 5,
    },
  },
  "orders/order-history": {
    title: "Order History",
    method: "POST",
    path: "/api/v1/order/portfolio/history",
    description: "Get order history",
    requiresAuth: true,
    requestBody: {
      limit: 20,
      page: 1,
      type: "ORDER",
    },
  },
  "orders/account-activities": {
    title: "Account Activities",
    method: "POST",
    path: "/api/v1/order/account/activities",
    description: "Get account activities",
    requiresAuth: true,
    requestBody: {
      limit: 20,
      page: 1,
    },
  },
  "orders/account-activities-type": {
    title: "Account Activities Type",
    method: "POST",
    path: "/api/v1/order/account/activitiesType",
    description: "Get account activities by type",
    requiresAuth: true,
    requestBody: {
      type: "FEE",
    },
  },
};

// API structure for the sidebar navigation
export const API_STRUCTURE: ApiGroup[] = [
  {
    id: "users",
    name: "Users",
    endpoints: [
      {
        id: "clock",
        name: "Clock",
        path: "/api/v1/user/clock",
        method: "POST",
        description: "Get server time information",
      },
      {
        id: "get-account-number",
        name: "Get Account Number",
        path: "/api/v1/user/get-account-number",
        method: "POST",
        description: "Get user account number",
      },
      {
        id: "get-accounts",
        name: "Get Accounts",
        path: "/api/v1/user/account",
        method: "POST",
        description: "Get user account details",
      },
    ],
  },
  {
    id: "stocks",
    name: "Stocks",
    endpoints: [
      {
        id: "assets",
        name: "Assets",
        path: "/api/v1/stock/assets",
        method: "POST",
        description: "Get list of available assets",
      },
      {
        id: "assets-details",
        name: "Assets Details",
        path: "/api/v1/stock/assetsDetails",
        method: "POST",
        description: "Get detailed information about a specific asset",
      },
      {
        id: "quotes-latest",
        name: "Quotes Latest",
        path: "/api/v1/stock/quotes/latest",
        method: "POST",
        description: "Get latest quotes for assets",
      },
      {
        id: "quotes-history",
        name: "Quotes History",
        path: "/api/v1/stock/quotes",
        method: "POST",
        description: "Get historical quotes for an asset",
      },
      {
        id: "bars-info",
        name: "Bars Info",
        path: "/api/v1/stock/bars",
        method: "POST",
        description: "Get bar data for an asset",
      },
      {
        id: "bars-latest",
        name: "Bars Latest",
        path: "/api/v1/stock/bars/latest",
        method: "POST",
        description: "Get latest bar data for an asset",
      },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    endpoints: [
      {
        id: "order-buy",
        name: "Order Buy",
        path: "/api/v1/order/orders",
        method: "POST",
        description: "Place a buy order",
      },
      {
        id: "pending-order-list",
        name: "Pending Order List",
        path: "/api/v1/order/lists",
        method: "POST",
        description: "Get list of pending orders",
      },
      {
        id: "delete-all-pending-orders",
        name: "Delete All Pending Orders",
        path: "/api/v1/order/deleteAllOrders",
        method: "POST",
        description: "Delete all pending orders",
      },
      {
        id: "order-details",
        name: "Order Details",
        path: "/api/v1/order/orderDetails",
        method: "POST",
        description: "Get details of a specific order",
      },
      {
        id: "delete-pending-order",
        name: "Delete Pending Order",
        path: "/api/v1/order/deleteOrder",
        method: "POST",
        description: "Delete a specific pending order",
      },
      {
        id: "replace-orders",
        name: "Replace Orders",
        path: "/api/v1/order/replaceOrder",
        method: "POST",
        description: "Replace an existing order",
      },
      {
        id: "open-position",
        name: "Open Position",
        path: "/api/v1/order/positions",
        method: "POST",
        description: "Get list of open positions",
      },
      {
        id: "open-position-symbol",
        name: "Open Position by Symbol",
        path: "/api/v1/order/positionsSymbolOrAsset",
        method: "POST",
        description: "Get open position for a specific symbol",
      },
      {
        id: "close-all-position",
        name: "Close All Position",
        path: "/api/v1/order/closeAllPosition",
        method: "POST",
        description: "Close all open positions",
      },
      {
        id: "close-position-symbol",
        name: "Close Position by Symbol",
        path: "/api/v1/order/closePositionSymbolOrAssets",
        method: "POST",
        description: "Close position for a specific symbol",
      },
      {
        id: "order-history",
        name: "Order History",
        path: "/api/v1/order/portfolio/history",
        method: "POST",
        description: "Get order history",
      },
      {
        id: "account-activities",
        name: "Account Activities",
        path: "/api/v1/order/account/activities",
        method: "POST",
        description: "Get account activities",
      },
      {
        id: "account-activities-type",
        name: "Account Activities Type",
        path: "/api/v1/order/account/activitiesType",
        method: "POST",
        description: "Get account activities by type",
      },
    ],
  },
];

// Helper function to get response examples for an endpoint
export const getResponseExamples = (endpointKey: string): ResponseExample[] => {
  const endpoint = API_ENDPOINTS[endpointKey as keyof typeof API_ENDPOINTS];
  return endpoint?.responseExamples || [];
};
