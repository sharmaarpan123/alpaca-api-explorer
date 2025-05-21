import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { payloadTypes, RequestBodyField } from "@/data/dataTypes";
import moment from "moment";
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
  requestBody: Record<string, RequestBodyField>;
  formValues: Record<string, any>;
  setFormValues: (values: Record<string, any>) => void;
  formErrors: Record<string, string>;
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  setRequestPayload,
  method,
  requestBody,
  formValues,
  setFormValues,
  formErrors,
  setFormErrors,
}) => {
  const handleFieldChange = (name: string, value: any) => {
    const updated = { ...formValues, [name]: value };

    if (
      [payloadTypes.date, payloadTypes.datetimeLocal]?.includes(
        requestBody[name].type
      ) && // if date comes
      requestBody[name].format
    ) {
      if (value) {
        updated[name] = moment(value).format(requestBody[name].format);
      } else {
        updated[name] = "";
      }
    }

    const toBeDeletedKey = Object.keys(requestBody)?.filter((key) => {
      if (
        requestBody[key]?.requiredCondition?.otherKey &&
        !requestBody[key]?.requiredCondition?.otherKeyValue?.includes(
          updated[requestBody[key]?.requiredCondition?.otherKey]
        )
      ) {
        return true;
      }
    });
    
    toBeDeletedKey?.forEach((item) => {
      delete updated[item];
    });

    if (!requestBody[name].required && !value && value != "0") {
      delete updated[name]; // delete the values which are not required and not filled by the user
    }

    setFormValues(updated);
    setRequestPayload(JSON.stringify(updated, null, 2));

    setFormErrors((p) => ({
      ...p,
      [name]:
        !value && value != "0" && requestBody[name].required
          ? "This field is required"
          : "",
    }));
  };

  if (!["POST", "PUT", "PATCH"].includes(method)) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
      <CardHeader className="py-1 px-1 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">Request Body</CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-1">
        {Object.entries(requestBody)
          .filter(([key, config]) => !config.hidden)
          .filter(([key, config]) => {
            if (!config.requiredCondition) {
              return true;
            }
            if (
              config?.requiredCondition?.otherKeyValue?.includes(
                formValues[config?.requiredCondition?.otherKey as any]
              )
            ) {
              return true;
            }
          })
          .map(([key, config]) => {
            const value = formValues[key];

            return (
              <FieldInput
                key={key}
                name={key}
                label={key}
                value={value}
                dateFormat={config.dateFormat}
                type={config.type}
                required={config.required}
                description={config.description}
                options={config.options}
                onChange={(val) => handleFieldChange(key, val)}
                errors={formErrors[key]}
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
  errors: string;
  dateFormat?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  type,
  required,
  description,
  options,
  onChange,
  dateFormat,
  errors,
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
          className="border rounded p-1 text-sm"
          value={value}
          onChange={handleChange}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "" ? "none" : opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" || type === "array" ? (
        <textarea
          className="border rounded p-1 text-sm"
          value={
            typeof value === "string" ? value : JSON.stringify(value, null, 2)
          }
          required={required}
          onChange={handleChange}
          rows={4}
        />
      ) : type === "checkbox" ? (
        <input type="checkbox" checked={!!value} onChange={handleChange} />
      ) : type === payloadTypes.date ? (
        <input
          type={type}
          className="border rounded p-1 text-sm"
          value={
            value
              ? `${
                  dateFormat
                    ? moment.parseZone(value).format("YYYY-MM-DDTHH:mm")
                    : value
                }`
              : ""
          }
          required={required}
          onChange={handleChange}
        />
      ) : type === payloadTypes.datetimeLocal ? (
        <input
          type={"datetime-local"}
          className="border rounded p-1 text-sm"
          value={
            value
              ? `${
                  dateFormat
                    ? moment.parseZone(value).format("YYYY-MM-DDTHH:mm")
                    : value
                }`
              : ""
          }
          required={required}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          className="border rounded p-1 text-sm"
          value={value}
          required={required}
          onChange={handleChange}
        />
      )}
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};
