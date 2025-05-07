
import React from 'react';

interface RequestBodyEditorProps {
  requestPayload: string;
  setRequestPayload: (value: string) => void;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  requestPayload,
  setRequestPayload
}) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Request Body</h4>
      <textarea
        className="w-full h-32 font-mono text-xs p-2 border rounded-md bg-gray-50"
        value={requestPayload}
        onChange={(e) => setRequestPayload(e.target.value)}
      />
    </div>
  );
};

export default RequestBodyEditor;
