
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FieldInputProps {
  name: string;
  type: string;
  description?: string;
  value: any;
  onChange: (name: string, value: any) => void;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const FieldInput: React.FC<FieldInputProps> = ({
  name,
  type,
  description,
  value,
  onChange,
  options,
  placeholder,
  required = false
}) => {
  // Function to render different input types based on field type
  const renderInput = () => {
    if (options && options.length > 0) {
      return (
        <Select 
          value={value !== undefined ? String(value) : ''} 
          onValueChange={(newVal) => onChange(name, newVal)}
        >
          <SelectTrigger className="h-9 text-xs bg-white">
            <SelectValue placeholder={placeholder || `Select ${name}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option} className="text-xs">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    switch (type.toLowerCase()) {
      case 'string':
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder || ''}
            className="h-9 text-xs bg-white"
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder || ''}
            className="h-9 text-xs bg-white"
          />
        );
      case 'boolean':
        return (
          <Select 
            value={value !== undefined ? String(value) : ''} 
            onValueChange={(newVal) => onChange(name, newVal === 'true')}
          >
            <SelectTrigger className="h-9 text-xs bg-white">
              <SelectValue placeholder={placeholder || "Select true/false"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true" className="text-xs">true</SelectItem>
              <SelectItem value="false" className="text-xs">false</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'array':
      case 'object':
        return (
          <Textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(name, parsed);
              } catch (error) {
                onChange(name, e.target.value);
              }
            }}
            placeholder={placeholder || ''}
            className="text-xs h-20 bg-white"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder || ''}
            className="h-9 text-xs bg-white"
          />
        );
    }
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-medium text-gray-700 flex items-center">
          {name}
          {required && <span className="text-red-500 ml-1">*</span>}
          <span className="ml-2 text-xs text-gray-500 font-normal">({type})</span>
        </label>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mb-1">{description}</p>
      )}
      {renderInput()}
    </div>
  );
};

export default FieldInput;
