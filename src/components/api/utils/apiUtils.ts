import axios from "axios";
import api from "@/lib/api";
import { toast } from "sonner";
import { ParamsObject, getResponseExamples } from "@/data/apiEndpoints";

// Convert requestBody to requestFields format
export const generateRequestFields = (requestBody?: Record<string, any>) => {
  if (!requestBody) return [];

  return Object.entries(requestBody).map(([key, value]) => {
    let type = typeof value;
    // Fix the type for arrays
    if (Array.isArray(value)) type = "object";

    // Handle special fields with known options
    const specialFields: Record<string, { type: string; options?: string[] }> =
      {
        type: {
          type: "string",
          options: ["market", "limit"],
        },
        side: {
          type: "string",
          options: ["buy", "sell"],
        },
        purchaseType: {
          type: "string",
          options: ["Money", "Share"],
        },
        timeInForce: {
          type: "string",
          options: ["day", "gtc"],
        },
        scheduledType: {
          type: "string",
          options: ["everyweek", "everyday", "everymonth"],
        },
        timeType: {
          type: "string",
          options: ["First", "Last"],
        },
        day: {
          type: "string",
          options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
        time: {
          type: "string",
          options: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
        },
      };

    const fieldInfo = specialFields[key] || { type };

    return {
      name: key,
      type: fieldInfo.type,
      options: fieldInfo.options,
      required: [
        "symbol",
        "purchaseType",
        "purchaseValue",
        "side",
        "type",
      ].includes(key),
      description: getFieldDescription(key),
    };
  });
};

// Get field descriptions based on field name
export const getFieldDescription = (fieldName: string): string => {
  const descriptions: Record<string, string> = {
    symbol: "Asset symbol (e.g., AAPL for Apple)",
    side: "Order side (buy or sell)",
    type: "Order type (market or limit)",
    purchaseType: "Type of purchase (Money or Share)",
    purchaseValue: "Value for the purchase",
    timezone: "Timezone for the order (e.g., UTC)",
    limitOrderPrice: "Price for limit orders",
    timeInForce: "Time in force for limit orders (day or gtc)",
    scheduled: 'Set to "scheduled" for scheduled orders',
    scheduledType: "Type of schedule (everyweek, everyday, everymonth)",
    time: "Time for scheduled orders",
    timeType: "First or Last occurrence for monthly scheduling",
    day: "Day of the week for scheduling",
    value: "Symbol or asset ID identifier",
    limit: "Number of results to return",
    page: "Page number for pagination",
    order: "Sort order (1 for ascending, -1 for descending)",
    orderBy: "Field to sort by",
    from: "Start date in YYYY-MM-DD format",
    to: "End date in YYYY-MM-DD format",
    startTime: "Start time in ISO format",
    endTime: "End time in ISO format",
    date: "Specific date in YYYY-MM-DD format",
    multiplier: "Timeframe multiplier",
    timespan: "Timeframe unit (minute, hour, day, etc.)",
  };

  return descriptions[fieldName] || "";
};

const logOutAndRedirect = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accountId");
  localStorage.removeItem("privateKey");
  window.location.href = "/login";
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
    const apiUrl = import.meta.env.VITE_BASE_URL || "https://api.deviden.com";

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(token ? { accesstoken: `${token}` } : {}),
      ...(apiKeyId ? { privateApiKey: `${apiKeyId}` } : {}),
      ...(apiSecretKey ? { accountNumber: apiSecretKey } : {}),
    };

    // Create a custom instance for this specific call to avoid interceptors
    const apiInstance = axios.create({
      baseURL: apiUrl,
      headers,
    });

    // Response interceptor
    apiInstance.interceptors.response.use(
      async (response) => {
        console.log(response, "response11111");
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        console.log(error.response.data, "Data1212");
        if (
          (error.response?.status === 401 ||
            ["Token has been expired", "Not Authorized!"]?.includes(
              error?.response?.data?.data
            )) &&
          !originalRequest._retry
        ) {
          const confirm = window.confirm("Action required: Refresh your token to continue using the web.");
          if (!confirm) {
            logOutAndRedirect();
            return;
          }
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");

            // Call refresh token endpoint

            const response = await apiInstance.post(
              "/api/v1/user/get-access-token",
              {},
              {
                headers: {
                  refreshToken,
                },
              }
            );

            if (response?.data?.status_code === 200) {
              const { accessToken } = response?.data?.data;

              // Update token in localStorage
              localStorage.setItem("token", accessToken);

              // Update Authorization header
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              originalRequest.headers.accesstoken = `${accessToken}`;

              // Retry the original request
              return apiInstance(originalRequest);
            } else {
              alert("refresh token failed");
              logOutAndRedirect();
            }
          } catch (refreshError) {
            // If refresh token fails, clear auth data and redirect to login
            logOutAndRedirect();

            return Promise.reject(refreshError);
          }
        }

        // For other errors, return the error response for handling in components
        return Promise.resolve(error.response);
      }
    );

    let apiResponse;


   

    // Make the API call based on the method
    switch (method) {
      case "GET":
        apiResponse = await apiInstance.get(apiEndpoint, {
          params: queryParamsObj,
        });
        break;
      case "POST":
        apiResponse = await apiInstance.post(apiEndpoint, parsedPayload, {
          params: queryParamsObj,
        });
        break;
      case "PUT":
        apiResponse = await apiInstance.put(apiEndpoint, parsedPayload, {
          params: queryParamsObj,
        });
        break;
      case "PATCH":
        apiResponse = await apiInstance.patch(apiEndpoint, parsedPayload, {
          params: queryParamsObj,
        });
        break;
      case "DELETE":
        apiResponse = await apiInstance.delete(apiEndpoint, {
          data:
            Object.keys(parsedPayload).length > 0 ? parsedPayload : undefined,
          params: queryParamsObj,
        });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return { data: apiResponse.data, error: null };
  } catch (err: any) {
    console.error("API call error:", err);
    if (axios.isAxiosError(err)) {
      return {
        data: err.response?.data || null,
        error:
          err.response?.data?.message ||
          err.message ||
          "An error occurred while making the API request",
      };
    } else {
      return {
        data: null,
        error: "An error occurred while making the API request",
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
    Object.keys(queryParams).forEach((key) => {
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
    Object.keys(pathParams).forEach((param) => {
      if (paramValues[param]) {
        apiEndpoint = apiEndpoint.replace(`{${param}}`, paramValues[param]);
      }
    });
  }
  return apiEndpoint;
};

// Get response keys based on endpoint
export const getResponseKeys = (endpoint: string) => {
  const endpointKey = getEndpointKey(endpoint);
  return getResponseExamples(endpointKey);
};

// Helper to extract endpoint key from full path
export const getEndpointKey = (endpoint: string): string => {
  const parts = endpoint.split("/");
  const category = parts[3] || ""; // e.g., 'user', 'stock'
  const action = parts[4] || ""; // e.g., 'clock', 'assets'

  if (category === "user") {
    return `users/${action}`;
  } else if (category === "stock") {
    return `stocks/${action}`;
  } else if (category === "order") {
    return `orders/${action}`;
  }

  return "";
};
