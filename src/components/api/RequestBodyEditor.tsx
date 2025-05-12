
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestPayload,
  setRequestPayload,
  requestFields = [],
  method,
}) => {
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
        <div className="space-y-2">
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
            </div>
          )}
        </div>
        
       
      </CardContent>
    </Card>
  );
};

export default RequestBodyEditor;
