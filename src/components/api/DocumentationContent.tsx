
import React from 'react';

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface DocumentationContentProps {
  requiresAuth: boolean;
  pathParams?: ParamsObject;
  queryParams?: ParamsObject;
  requestBody?: Record<string, any>;
  children?: React.ReactNode;
}

const DocumentationContent: React.FC<DocumentationContentProps> = ({
  requiresAuth,
  pathParams,
  queryParams,
  requestBody,
  children
}) => {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="text-gray-600">
      <p className="mb-3">This endpoint allows you to interact with the API.</p>
      
      {requiresAuth && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Authentication</h4>
          <p>This endpoint requires authentication. Include your bearer token in the request header.</p>
        </div>
      )}
      
      {pathParams && Object.keys(pathParams).length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Path Parameters</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(pathParams).map(([key, param]) => (
                  <tr key={key}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{key}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{param.type}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {queryParams && Object.keys(queryParams).length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Query Parameters</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(queryParams).map(([key, param]) => (
                  <tr key={key}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{key}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{param.type}</td>
                    <td className="px-3 py-2 text-xs text-gray-500">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {requestBody && (
        <div className="mb-3">
          <h4 className="font-semibold mb-1">Request Body</h4>
          <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto">
            {JSON.stringify(requestBody, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-4">
        <h4 className="font-semibold mb-1">Response</h4>
        <div className="flex items-center space-x-2 mb-1">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">200</span>
          <span className="text-xs">An array of asset objects</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentationContent;
