// Define the structure for path and query parameter fields
interface ParamField {
  type: string | string[];
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
  requiredCondition? :  {
    otherKey :string ,
    otherKeyValue : any[]
  }
}

export interface ApiEndpointData {
  title: string;
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  requestBody?: Record<string, RequestBodyField>;
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

export const payloadTypes: Readonly<Record<PayloadType, PayloadType>> = {
  number: "number",
  string: "string",
  checkbox: "checkbox",
  select: "select",
  object: "object",
  array: "array",
  date: "date",
  time: "time",
  datetimeLocal: "datetimeLocal",
};

export const responseExampleTypes: {
  object: "object";
  arrayOfObject: "Array of object";
} = {
  object: "object",
  arrayOfObject: "Array of object",
}; 