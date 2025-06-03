// Import types from dataTypes
import {
  ApiEndpoint,
  ApiEndpointData,
  ApiGroup,
  ResponseExample,
  payloadTypes,
  responseExampleTypes,
} from "./dataTypes";

// Import response examples and request body examples
import { responseExamples } from "./responseExamples";
import { requestBodyExamples } from "./requestBodyExamples";

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

export type PayloadType =
  | "number"
  | "string"
  | "checkbox"
  | "select"
  | "object"
  | "array"
  | "date"
  | "time"
  | "datetimeLocal";

// Define the structure of an API endpoint
export interface RequestBodyField {
  type: PayloadType;
  required?: boolean;
  description: string;
  default?: unknown;
  dateFormat?: string;
  options?: string[];
  format?: string;
  hidden?: boolean;
}

// API endpoints data based on the Postman collection
export const API_ENDPOINTS: Record<string, ApiEndpointData> = {
  // User endpoints

  "users/login": {
    title: "Login",
    method: "POST",
    path: "/api/v1/user/login",
    description: "Login To access the API's",
    requiresAuth: true,
    requestBody: requestBodyExamples["user/login"],
    responseExamples: responseExamples["users/login"],
  },

  "users/get-access-token": {
    title: "Refresh Token",
    method: "POST",
    path: "/api/v1/user/get-access-token",
    description: "To get the refreshed token",
    requiresAuth: true,
    responseExamples: responseExamples["users/get-access-token"],
  },

  "users/ping": {
    title: "Clock",
    method: "GET",
    path: "/api/v1/user/ping",
    description: "Get server time information",
    requiresAuth: true,
    responseExamples: responseExamples["users/ping"],
  },
  "users/clock": {
    title: "Clock",
    method: "POST",
    path: "api/v1/user/clock",
    description: "Get server time information",
    requiresAuth: true,
    responseExamples: responseExamples["users/clock"],
  },

  "users/get-account-number": {
    title: "Get Account Number",
    method: "POST",
    path: "/api/v1/user/get-account-number",
    description: "Get user account number",
    requiresAuth: true,
    requestBody: {},
    responseExamples: responseExamples["users/get-account-number"],
  },

  "users/get-accounts": {
    title: "Get Accounts",
    method: "POST",
    path: "/api/v1/user/account",
    description: "Get user account details",
    requiresAuth: true,
    requestBody: {},
    responseExamples: responseExamples["users/get-accounts"],
  },

  // Stocks endpoints
  "stocks/assets": {
    title: "Assets",
    method: "POST",
    path: "/api/v1/stock/assets",
    description: "Get list of available assets",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/assets"],
    responseExamples: responseExamples["stocks/assets"],
  },

  "stocks/assets-details": {
    title: "Assets Details",
    method: "POST",
    path: "/api/v1/stock/assetsDetails",
    description: "Get detailed information about a specific asset",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/assets-details"],
    responseExamples: responseExamples["stocks/assets-details"],
  },

  "stocks/quotes-latest": {
    title: "Quotes Latest",
    method: "POST",
    path: "/api/v1/stock/quotes/latest",
    description: "Get latest quotes for assets",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/quotes-latest"],
    responseExamples: responseExamples["stocks/quotes-latest"],
  },

  "stocks/quotes-history": {
    title: "Quotes History",
    method: "POST",
    path: "/api/v1/stock/quotes",
    description: "Get historical quotes for an asset",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/quotes-history"],
    responseExamples: responseExamples["stocks/quotes-history"],
  },

  "stocks/bars-info": {
    title: "Bars Info",
    method: "POST",
    path: "/api/v1/stock/bars",
    description: "Get bar data for an asset",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/bars-info"],
    responseExamples: responseExamples["stocks/bars-info"],
  },

  "stocks/bars-latest": {
    title: "Bars Latest",
    method: "POST",
    path: "/api/v1/stock/bars/latest",
    description: "Get latest bar data for an asset",
    requiresAuth: true,
    requestBody: requestBodyExamples["stocks/bars-latest"],
    responseExamples: responseExamples["stocks/bars-latest"],
  },

  // Orders endpoints
  "orders/order-buy": {
    title: "Order Buy",
    method: "POST",
    path: "/api/v1/order/orders",
    description: "Place a buy order",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/order-buy"],
    responseExamples: responseExamples["orders/order-buy"],
  },

  "orders/pending-order-list": {
    title: "Pending Order List",
    method: "POST",
    path: "/api/v1/order/lists",
    description: "Get list of pending orders",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/pending-order-list"],
    responseExamples: responseExamples["orders/pending-order-list"],
  },

  "orders/delete-all-pending-orders": {
    title: "Delete All Pending Orders",
    method: "POST",
    path: "/api/v1/order/deleteAllOrders",
    description: "Delete all pending orders",
    requiresAuth: true,
    responseExamples: responseExamples["orders/delete-all-pending-orders"],
  },

  "orders/order-details": {
    title: "Order Details",
    method: "POST",
    path: "/api/v1/order/orderDetails",
    description: "Get details of a specific order",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/order-details"],
    responseExamples: responseExamples["orders/order-details"],
  },

  "orders/delete-pending-order": {
    title: "Delete Pending Order",
    method: "POST",
    path: "/api/v1/order/deleteOrder",
    description: "Delete a specific pending order",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/delete-pending-order"],
    responseExamples: responseExamples["orders/delete-pending-order"],
  },

  "orders/open-position": {
    title: "Open Position",
    method: "POST",
    path: "/api/v1/order/positions",
    description: "Get list of open positions",
    requiresAuth: true,
    requestBody: {},
    responseExamples: responseExamples["orders/open-position"],
  },

  "orders/open-position-symbol": {
    title: "Open Position by Symbol",
    method: "POST",
    path: "/api/v1/order/positionsSymbolOrAsset",
    description: "Get open position for a specific symbol",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/open-position-symbol"],
    responseExamples: responseExamples["orders/open-position-symbol"],
  },

  "orders/close-all-position": {
    title: "Close All Position",
    method: "POST",
    path: "/api/v1/order/closeAllPosition",
    description: "Close all open positions",
    requiresAuth: true,
    responseExamples: responseExamples["orders/close-all-position"],
  },

  "orders/close-position-symbol": {
    title: "Close Position by Symbol",
    method: "POST",
    path: "/api/v1/order/closePositionSymbolOrAssets",
    description: "Close position for a specific symbol",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/close-position-symbol"],
    responseExamples: responseExamples["orders/close-position-symbol"],
  },

  "orders/order-history": {
    title: "Order History",
    method: "POST",
    path: "/api/v1/order/portfolio/history",
    description: "Get order history",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/order-history"],
    responseExamples: responseExamples["orders/order-history"],
  },

  "orders/account-activities": {
    title: "Account Activities",
    method: "POST",
    path: "/api/v1/order/account/activities",
    description: "Get account activities",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/account-activities"],
    responseExamples: responseExamples["orders/account-activities"],
  },

  "orders/account-activities-type": {
    title: "Account Activities Type",
    method: "POST",
    path: "/api/v1/order/account/activitiesType",
    description: "Get account activities by type",
    requiresAuth: true,
    requestBody: requestBodyExamples["orders/account-activities-type"],
    responseExamples: responseExamples["orders/account-activities-type"],
  },
};

// API structure for the sidebar navigation
export const API_STRUCTURE: ApiGroup[] = [
  {
    id: "users",
    name: "Users",
    endpoints: [
      {
        id: "login",
        name: "Login",
        path: "/api/v1/user/login",
        method: "POST",
        description: "Login To access the API's",
      },
      {
        id: "get-access-token",
        name: "Refresh Token",
        path: "/api/v1/user/get-access-token",
        method: "POST",
        description: "Get the refreshed access token",
      },
      {
        id: "ping",
        name: "Ping",
        path: "/api/v1/user/ping",
        method: "GET",
        description: "Get server time information",
      },

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
