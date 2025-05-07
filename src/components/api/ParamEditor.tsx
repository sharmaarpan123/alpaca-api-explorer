
import React from 'react';
import { Input } from '@/components/ui/input';

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface ParamEditorProps {
  title: string;
  params: ParamsObject;
  paramValues: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
}

const ParamEditor: React.FC<ParamEditorProps> = ({
  title,
  params,
  paramValues,
  onParamChange
}) => {
  if (!params || Object.keys(params).length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(params).map(([key, param]) => (
          <div key={key} className="space-y-1">
            <label className="text-xs font-medium">{key} <span className="text-xs text-gray-500">({param.type})</span></label>
            <Input 
              placeholder={param.description} 
              value={paramValues[key] || ''}
              onChange={(e) => onParamChange(key, e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParamEditor;
