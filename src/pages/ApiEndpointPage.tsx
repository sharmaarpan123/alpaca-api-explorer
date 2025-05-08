
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ApiEndpoint from '@/components/api/ApiEndpoint';
import EndpointNotFound from '@/components/api/EndpointNotFound';
import { API_ENDPOINTS, ApiEndpointData } from '@/data/apiEndpoints';

const ApiEndpointPage: React.FC = () => {
  const { category, endpoint } = useParams<{ category: string; endpoint: string }>();
  const endpointKey = category && endpoint ? `${category}/${endpoint}` : '';
  const apiData = API_ENDPOINTS[endpointKey as keyof typeof API_ENDPOINTS];
  
  if (!apiData) {
    return (
      <Layout>
        <div className="container mx-auto py-2">
          <EndpointNotFound />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-2">
        <ApiEndpoint
          title={apiData.title}
          method={apiData.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}
          endpoint={apiData.path}
          description={apiData.description}
          requiresAuth={apiData.requiresAuth}
          requestBody={apiData.requestBody}
          queryParams={apiData.queryParams}
          pathParams={apiData.pathParams}
        />
      </div>
    </Layout>
  );
};

export default ApiEndpointPage;
