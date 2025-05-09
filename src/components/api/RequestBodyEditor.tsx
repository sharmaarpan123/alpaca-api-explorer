
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FieldInput from './FieldInput';
import { Button } from '@/components/ui/button';

interface RequestField {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  options?: string[];
}

interface RequestBodyEditorProps {
  requestPayload: string;
  setRequestPayload: (value: string) => void;
  requestFields?: RequestField[];
  method: string;
  onTryItClick?: () => void;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestPayload,
  setRequestPayload,
  requestFields = [],
  method,
  onTryItClick
}) => {
  const [activeTab, setActiveTab] = useState<string>("form");
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  
  // Parse initial JSON payload into form values
  useEffect(() => {
    try {
      const parsedPayload = JSON.parse(requestPayload);
      setFormValues(parsedPayload);
    } catch (error) {
      // If payload is not valid JSON, just continue with empty form values
      console.log("Could not parse request payload as JSON");
    }
  }, [requestPayload]);

  // Handle form field changes
  const handleFieldChange = (name: string, value: any) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    
    // Update the raw JSON as well
    setRequestPayload(JSON.stringify(updatedValues, null, 2));
  };

  // Handle raw JSON changes
  const handleRawJsonChange = (json: string) => {
    setRequestPayload(json);
    try {
      const parsedJson = JSON.parse(json);
      setFormValues(parsedJson);
    } catch (error) {
      // If JSON is invalid, don't update form values
    }
  };

  // Don't render the editor for methods that don't have a body
  if (!['POST', 'PUT', 'PATCH'].includes(method)) {
    return null;
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">Request Body</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-3 h-8">
            <TabsTrigger value="form" className="text-xs h-7">Form</TabsTrigger>
            <TabsTrigger value="raw" className="text-xs h-7">Raw</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-2">
            {requestFields && requestFields.length > 0 ? (
              <div className="space-y-2">
                {requestFields.map((field) => (
                  <FieldInput
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    description={field.description}
                    value={formValues[field.name]}
                    onChange={handleFieldChange}
                    options={field.options}
                    required={field.required}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No form fields available for this endpoint.</p>
                <p className="text-gray-500 text-xs mt-1">You can still edit the raw JSON.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="raw">
            <Textarea
              className="w-full h-48 font-mono text-xs p-3 border rounded-md bg-white"
              value={requestPayload}
              onChange={(e) => handleRawJsonChange(e.target.value)}
              placeholder="{}"
            />
          </TabsContent>
        </Tabs>
        
        {onTryItClick && (
          <Button 
            className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700" 
            type="button"
            onClick={onTryItClick}
          >
            Try It!
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestBodyEditor;
