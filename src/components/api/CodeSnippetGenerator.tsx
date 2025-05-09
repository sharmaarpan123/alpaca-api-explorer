
import React from 'react';
import CodeSnippet, { ProgrammingLanguage } from './CodeSnippet';

interface CodeSnippetGeneratorProps {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
}

const CodeSnippetGenerator: React.FC<CodeSnippetGeneratorProps> = ({
  method,
  url,
  headers,
  body,
  selectedLanguage
}) => {
  const generateCodeSnippet = (language: ProgrammingLanguage): string => {
    switch (language) {
      case 'shell':
        let curl = `curl --request ${method} \\\n`;
        curl += `  --url '${url}' \\\n`;
        
        Object.entries(headers).forEach(([key, value]) => {
          curl += `  --header '${key}: ${value}' \\\n`;
        });
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
          curl += `  --data '${body}'`;
        }
        
        return curl;
        
      case 'node':
        let nodeCode = "const axios = require('axios');\n\n";
        nodeCode += "const options = {\n";
        nodeCode += `  method: '${method}',\n`;
        nodeCode += `  url: '${url}',\n`;
        nodeCode += "  headers: {\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          nodeCode += `    '${key}': '${value}'${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        nodeCode += "  }";
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
          nodeCode += ",\n  data: " + body;
        }
        
        nodeCode += "\n};\n\n";
        nodeCode += "axios.request(options).then(function (response) {\n";
        nodeCode += "  console.log(response.data);\n";
        nodeCode += "}).catch(function (error) {\n";
        nodeCode += "  console.error(error);\n";
        nodeCode += "});";
        
        return nodeCode;
        
      case 'python':
        let pythonCode = "import requests\n\n";
        pythonCode += `url = "${url}"\n\n`;
        pythonCode += "headers = {\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          pythonCode += `    "${key}": "${value}"${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        pythonCode += "}\n\n";
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
          pythonCode += `payload = ${body}\n\n`;
          pythonCode += `response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)\n`;
        } else {
          pythonCode += `response = requests.${method.toLowerCase()}(url, headers=headers)\n`;
        }
        
        pythonCode += "\nprint(response.text)";
        
        return pythonCode;
        
      case 'ruby':
        let rubyCode = "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\n";
        rubyCode += `url = URI("${url}")\n\n`;
        rubyCode += "http = Net::HTTP.new(url.host, url.port)\n";
        rubyCode += "http.use_ssl = true\n\n";
        rubyCode += `request = Net::HTTP::${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}.new(url)\n`;
        
        Object.entries(headers).forEach(([key, value]) => {
          rubyCode += `request["${key}"] = "${value}"\n`;
        });
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
          rubyCode += `request.body = ${body}\n`;
        }
        
        rubyCode += "\nresponse = http.request(request)\n";
        rubyCode += "puts response.read_body";
        
        return rubyCode;
        
      case 'php':
        let phpCode = "<?php\n\n";
        phpCode += "$curl = curl_init();\n\n";
        phpCode += "curl_setopt_array($curl, [\n";
        phpCode += `  CURLOPT_URL => "${url}",\n`;
        phpCode += "  CURLOPT_RETURNTRANSFER => true,\n";
        phpCode += "  CURLOPT_ENCODING => \"\",\n";
        phpCode += "  CURLOPT_MAXREDIRS => 10,\n";
        phpCode += "  CURLOPT_TIMEOUT => 30,\n";
        phpCode += "  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n";
        phpCode += `  CURLOPT_CUSTOMREQUEST => "${method}",\n`;
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
          phpCode += `  CURLOPT_POSTFIELDS => ${body},\n`;
        }
        
        phpCode += "  CURLOPT_HTTPHEADER => [\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          phpCode += `    "${key}: ${value}"${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        phpCode += "  ],\n";
        phpCode += "]);\n\n";
        phpCode += "$response = curl_exec($curl);\n";
        phpCode += "$err = curl_error($curl);\n\n";
        phpCode += "curl_close($curl);\n\n";
        phpCode += "if ($err) {\n";
        phpCode += "  echo \"cURL Error #:\" . $err;\n";
        phpCode += "} else {\n";
        phpCode += "  echo $response;\n";
        phpCode += "}\n";
        
        return phpCode;
        
      default:
        return `// Code snippet for ${language} not implemented yet`;
    }
  };

  return (
    <div className="p-2">
      <div className="mb-2">
        <h4 className="font-semibold text-gray-700 text-sm">REQUEST EXAMPLE</h4>
      </div>
      <CodeSnippet 
        language={selectedLanguage}
        code={generateCodeSnippet(selectedLanguage)}
      />
    </div>
  );
};

export default CodeSnippetGenerator;
