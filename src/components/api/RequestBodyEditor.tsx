import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { payloadTypes } from "@/data/apiEndpoints";

interface RequestField {
  type: string;
  description?: string;
  required?: boolean;
  options?: string[];
  default?: any;
}

interface RequestBodyEditorProps {
  requestPayload: string;
  setRequestPayload: (value: string) => void;
  method: string;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestPayload,
  setRequestPayload,
  method,
}) => {

  console.log(requestPayload , "requestPayload")
  const requestBody: Record<string, RequestField> = {
   
    limit: {
      type: payloadTypes.number,
      description: "Limit the number of assets to return",
      required: true,
      default: 10,
    },
    order: {
      type: payloadTypes.number,
      description: "Order the assets by a specific field",
      required: true,
      default: -1,
    },
    orderBy: {
      type: payloadTypes.select,
      description: "Field to order the assets by",
      required: true,
      default: "exchange",
      options: ["exchange", "name", "shortName", "symbol", "type"],
    },
    page: {
      type: payloadTypes.number,
      description: "Page number to return",
      required: true,
      default: 1,
    },
  };

  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const obj = {};

    Object.keys(requestBody).forEach((key) => {
      obj[key] = requestBody[key].default;
    });

    console.log(obj, "obj");

   
    setFormValues((p) => obj);
  }, []);

  const handleFieldChange = (name: string, value: any) => {
    const updated = { ...formValues, [name]: value };
    setFormValues(updated);
    setRequestPayload(JSON.stringify(updated, null, 2));
  };

  if (!["POST", "PUT", "PATCH"].includes(method)) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">Request Body</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {Object.entries(requestBody).map(([key, config]) => {
          const value = formValues[key];

          return (
            <FieldInput
              key={key}
              name={key}
              label={key}
              value={value}
              type={config.type}
              required={config.required}
              description={config.description}
              options={config.options}
              onChange={(val) => handleFieldChange(key, val)}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RequestBodyEditor;

interface FieldInputProps {
  name: string;
  label: string;
  value: any;
  type: string;
  required?: boolean;
  description?: string;
  options?: string[];
  onChange: (val: any) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  type,
  required,
  description,
  options,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let val: any = e.target.value;

    if (type === "number") {
      val = parseFloat(val);
    }

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    }

    if (type === "object" || type === "array") {
      try {
        val = JSON.parse(val);
      } catch (err) {
        // optional: handle error or ignore
      }
    }

    onChange(val);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mb-1">{description}</p>
      )}

      {type === "select" && options ? (
        <select
          className="border rounded p-2 text-sm"
          value={value}
          onChange={handleChange}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" || type === "array" ? (
        <textarea
          className="border rounded p-2 text-sm"
          value={
            typeof value === "string" ? value : JSON.stringify(value, null, 2)
          }
          onChange={handleChange}
          rows={4}
        />
      ) : type === "checkbox" ? (
        <input type="checkbox" checked={!!value} onChange={handleChange} />
      ) : (
        <input
          type={type}
          className="border rounded p-2 text-sm"
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
