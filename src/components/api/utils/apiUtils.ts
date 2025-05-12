
import axios from 'axios';
import api from '@/lib/api';
import { toast } from 'sonner';
import { ParamsObject } from '@/data/apiEndpoints';

// Convert requestBody to requestFields format
export const generateRequestFields = (requestBody?: Record<string, any>) => {
  if (!requestBody) return [];
  
  return Object.entries(requestBody).map(([key, value]) => {
    let type = typeof value;
    // Fix the type for arrays
    if (Array.isArray(value)) type = "object";
    
    // Handle special fields with known options
    const specialFields: Record<string, { type: string, options?: string[] }> = {
      'type': { 
        type: 'string', 
        options: ['market', 'limit'] 
      },
      'side': { 
        type: 'string', 
        options: ['buy', 'sell'] 
      },
      'purchaseType': { 
        type: 'string', 
        options: ['Money', 'Share'] 
      },
      'timeInForce': { 
        type: 'string', 
        options: ['day', 'gtc'] 
      },
      'scheduledType': { 
        type: 'string', 
        options: ['everyweek', 'everyday', 'everymonth'] 
      },
      'timeType': { 
        type: 'string', 
        options: ['First', 'Last'] 
      },
      'day': { 
        type: 'string', 
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] 
      },
      'time': {
        type: 'string',
        options: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
      }
    };
    
    const fieldInfo = specialFields[key] || { type };
    
    return {
      name: key,
      type: fieldInfo.type,
      options: fieldInfo.options,
      required: ['symbol', 'purchaseType', 'purchaseValue', 'side', 'type'].includes(key),
      description: getFieldDescription(key)
    };
  });
};

// Get field descriptions based on field name
export const getFieldDescription = (fieldName: string): string => {
  const descriptions: Record<string, string> = {
    'symbol': 'Asset symbol (e.g., AAPL for Apple)',
    'side': 'Order side (buy or sell)',
    'type': 'Order type (market or limit)',
    'purchaseType': 'Type of purchase (Money or Share)',
    'purchaseValue': 'Value for the purchase',
    'timezone': 'Timezone for the order (e.g., UTC)',
    'limitOrderPrice': 'Price for limit orders',
    'timeInForce': 'Time in force for limit orders (day or gtc)',
    'scheduled': 'Set to "scheduled" for scheduled orders',
    'scheduledType': 'Type of schedule (everyweek, everyday, everymonth)',
    'time': 'Time for scheduled orders',
    'timeType': 'First or Last occurrence for monthly scheduling',
    'day': 'Day of the week for scheduling',
    'value': 'Symbol or asset ID identifier',
    'limit': 'Number of results to return',
    'page': 'Page number for pagination',
    'order': 'Sort order (1 for ascending, -1 for descending)',
    'orderBy': 'Field to sort by',
    'from': 'Start date in YYYY-MM-DD format',
    'to': 'End date in YYYY-MM-DD format',
    'startTime': 'Start time in ISO format',
    'endTime': 'End time in ISO format',
    'date': 'Specific date in YYYY-MM-DD format',
    'multiplier': 'Timeframe multiplier',
    'timespan': 'Timeframe unit (minute, hour, day, etc.)'
  };
  
  return descriptions[fieldName] || '';
};

// Make the API call based on method and parameters
export const makeApiCall = async (
  method: string,
  endpoint: string,
  parsedPayload: Record<string, any>,
  queryParamsObj: Record<string, string>,
  apiEndpoint: string,
  token?: string,
  apiKeyId?: string,
  apiSecretKey?: string
) => {
  try {
    const apiUrl = import.meta.env.VITE_BASE_URL || 'https://api.deviden.com';
    const headers = {
      'Content-Type': 'application/json',
      ...(token || apiKeyId ? {'Authorization': `Bearer ${token || apiKeyId}`} : {}),
      ...(apiSecretKey ? {'X-API-Key': apiSecretKey} : {})
    };

    // Create a custom instance for this specific call to avoid interceptors
    const apiInstance = axios.create({
      baseURL: apiUrl,
      headers
    });
    
    let apiResponse;
    
    // Make the API call based on the method
    switch (method) {
      case 'GET':
        apiResponse = await apiInstance.get(apiEndpoint, { params: queryParamsObj });
        break;
      case 'POST':
        apiResponse = await apiInstance.post(apiEndpoint, parsedPayload, { params: queryParamsObj });
        break;
      case 'PUT':
        apiResponse = await apiInstance.put(apiEndpoint, parsedPayload, { params: queryParamsObj });
        break;
      case 'PATCH':
        apiResponse = await apiInstance.patch(apiEndpoint, parsedPayload, { params: queryParamsObj });
        break;
      case 'DELETE':
        apiResponse = await apiInstance.delete(apiEndpoint, { 
          data: Object.keys(parsedPayload).length > 0 ? parsedPayload : undefined,
          params: queryParamsObj 
        });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    return { data: apiResponse.data, error: null };
  } catch (err: any) {
    console.error('API call error:', err);
    if (axios.isAxiosError(err)) {
      return { 
        data: err.response?.data || null, 
        error: err.response?.data?.message || err.message || 'An error occurred while making the API request'
      };
    } else {
      return { 
        data: null, 
        error: 'An error occurred while making the API request'
      };
    }
  }
};

// Prepare query parameters from values
export const prepareQueryParams = (
  queryParams?: ParamsObject,
  paramValues: Record<string, string> = {}
): Record<string, string> => {
  const queryParamsObj: Record<string, string> = {};
  if (queryParams) {
    Object.keys(queryParams).forEach(key => {
      if (paramValues[key]) {
        queryParamsObj[key] = paramValues[key];
      }
    });
  }
  return queryParamsObj;
};

// Replace path parameters in endpoint
export const replacePahParams = (
  endpoint: string,
  pathParams?: ParamsObject,
  paramValues: Record<string, string> = {}
): string => {
  let apiEndpoint = endpoint;
  if (pathParams) {
    Object.keys(pathParams).forEach(param => {
      if (paramValues[param]) {
        apiEndpoint = apiEndpoint.replace(`{${param}}`, paramValues[param]);
      }
    });
  }
  return apiEndpoint;
};

// Get response keys based on endpoint
export const getResponseKeys = (endpoint: string) => {
  if (endpoint.includes('assets')) {
    return [
      { status: '200', description: 'An Asset object', example: { id: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ' } },
      { status: '404', description: 'Not Found', example: null }
    ];
  } else if (endpoint.includes('orders')) {
    return [
      { status: '200', description: 'Order details', example: { id: 'ord_123', symbol: 'AAPL', side: 'buy' } },
      { status: '404', description: 'Not Found', example: null }
    ];
  }
  return [
    { status: '200', description: 'Success', example: { success: true } },
    { status: '404', description: 'Not Found', example: null }
  ];
};
