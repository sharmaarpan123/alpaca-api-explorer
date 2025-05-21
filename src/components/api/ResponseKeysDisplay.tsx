import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponseExample, responseExampleTypes } from "@/data/dataTypes";
import React, { useState } from "react";

const getStatusColor = (status: string) => {
  if (status.startsWith("2"))
    return "bg-green-50 text-green-700 border-green-200";
  if (status.startsWith("4")) return "bg-red-50 text-red-700 border-red-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

const renderFields = ({
  obj,
  parentKey = "",
  isMain = false,
}: {
  obj: any;
  parentKey: string;
  isMain?: boolean;
}) => {
  if (
    [responseExampleTypes.object, responseExampleTypes.arrayOfObject].includes(
      obj.type
    ) &&
    typeof obj.values === "object"
  )
    return (
      <>
        {" "}
        <div className="  border">
          <div
            className={`flex items-center   border bg-gray-200  ${
              isMain ? "pl-4" : ""
            }`}
          >
            <span
              className={` font-mono  font-semibold  ${
                isMain ? " " : "text-xs"
              } mr-2 `}
            >
              {parentKey}
            </span>
            <span className="text-xs text-red-500 mr-2">
              {Array.isArray(obj.type)? obj.type?.map((type: any) => type).join(" , ") :   (obj as any).type}
            </span>
          </div>
          <div className="pl-4 ">
            {renderFields({ obj: obj?.values, parentKey })}
          </div>
        </div>
      </>
    );

  return (
    <>
      {Object.entries(obj)?.map(([key, value] : any) => {
        if (
          [
            responseExampleTypes.object,
            responseExampleTypes.arrayOfObject,
          ].includes((value as any).type) &&
          (value as any).values
        )
          return (
            <div className=" border rounded mt-1">
              {renderFields({ obj: value, parentKey: key })}
            </div>
          );

         

        return (
          <div className="flex items-center my-2">
            <span className="font-mono text-xs font-semibold mr-2 mt-1 text-white">
              {key}
            </span>
            <span className="text-xs text-red-500 mr-2">
              {Array.isArray(value.type )? value?.type?.map((type: any) => type).join(" , ") :   (value as any).type}
            </span>
            <span className="text-xs text-green-700">
              {(value as any).description}
            </span>
          </div>
        );
      })}
    </>
  );
};

const ResponseKeysDisplay: React.FC<{
  responseExamples?: ResponseExample[];
}> = ({ responseExamples }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">Response Format</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {responseExamples.map((key, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <button
                className={`w-full flex justify-between items-center px-3 py-2 border-b focus:outline-none ${getStatusColor(
                  key.status
                )}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-xs font-medium">
                  {key.status} - {key.description}
                </span>
                <span className="ml-2">{openIndex === index ? "▲" : "▼"}</span>
              </button>
              {openIndex === index && (
                <div className="mt-1 bg-gray-900 ">
                  {renderFields({
                    obj: key.example,
                    parentKey: key.dataKey,
                    isMain: true,
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default ResponseKeysDisplay;
