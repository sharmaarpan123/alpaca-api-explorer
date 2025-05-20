import ApiEndpoint from "@/components/api/ApiEndpoint";
import EndpointNotFound from "@/components/api/EndpointNotFound";
import { API_ENDPOINTS, getResponseExamples } from "@/data/apiEndpoints";
import React from "react";
import { useParams } from "react-router-dom";

const ApiEndpointPage: React.FC = () => {
  const { category, endpoint } = useParams<{
    category: string;
    endpoint: string;
  }>();
  const endpointKey = category && endpoint ? `${category}/${endpoint}` : "";
  const apiData = API_ENDPOINTS[endpointKey as keyof typeof API_ENDPOINTS];

  if (!apiData) {
    return (
      <div className="container mx-auto py-1">
        <EndpointNotFound />
      </div>
    );
  }

  const responseExamples = getResponseExamples(endpointKey);

  return (
    <div className="container mx-auto py-1 px-4">
      <ApiEndpoint
        key={endpointKey}
        title={apiData.title}
        method={apiData.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH"}
        endpoint={apiData.path}
        description={apiData.description}
        requiresAuth={apiData.requiresAuth}
        requestBody={apiData.requestBody}
        responseExamples={responseExamples}
      />
    </div>
  );
};

export default ApiEndpointPage;
