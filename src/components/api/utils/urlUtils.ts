
interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

export const constructEndpointUrl = (
  endpoint: string,
  pathParams?: ParamsObject,
  queryParams?: ParamsObject,
  paramValues: Record<string, string> = {}
): string => {
  let url = `https://paper-api.alpaca.markets${endpoint}`;
  
  // Replace path parameters
  if (pathParams) {
    Object.keys(pathParams).forEach(param => {
      const value = paramValues[param] || `{${param}}`;
      url = url.replace(`{${param}}`, value);
    });
  }
  
  // Add query parameters
  if (queryParams && Object.keys(paramValues).length > 0) {
    const queryString = Object.keys(queryParams)
      .filter(key => paramValues[key])
      .map(key => `${key}=${encodeURIComponent(paramValues[key])}`)
      .join('&');
    
    if (queryString) {
      url = `${url}?${queryString}`;
    }
  }
  
  return url;
};
