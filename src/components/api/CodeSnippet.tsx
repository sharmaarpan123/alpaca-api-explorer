
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export type ProgrammingLanguage = 
  | 'shell' | 'node' | 'ruby' | 'php' | 'r' 
  | 'python' | 'java' | 'javascript' | 'c' | 'csharp' | 'cpp' 
  | 'go' | 'clojure' | 'http' | 'kotlin' | 'swift' | 'powershell' | 'objectivec' | 'ocaml';

interface CodeSnippetProps {
  language: ProgrammingLanguage;
  code: string;
  showLineNumbers?: boolean;
  className?: string;
}

// Language display names for UI
const languageDisplayNames: Record<ProgrammingLanguage, string> = {
  shell: 'Shell',
  node: 'Node',
  ruby: 'Ruby',
  php: 'PHP',
  r: 'R',
  python: 'Python',
  java: 'Java',
  javascript: 'JavaScript',
  c: 'C',
  csharp: 'C#',
  cpp: 'C++',
  go: 'Go',
  clojure: 'Clojure',
  http: 'HTTP',
  kotlin: 'Kotlin',
  swift: 'Swift',
  powershell: 'PowerShell',
  objectivec: 'Objective-C',
  ocaml: 'OCaml'
};

// Language syntax highlighting classes
const languageClasses: Record<ProgrammingLanguage, string> = {
  shell: 'text-amber-400',
  node: 'text-green-400',
  ruby: 'text-red-500',
  php: 'text-indigo-400',
  r: 'text-blue-400',
  python: 'text-yellow-300',
  java: 'text-orange-400',
  javascript: 'text-yellow-300',
  c: 'text-blue-300',
  csharp: 'text-green-300',
  cpp: 'text-blue-300',
  go: 'text-blue-400',
  clojure: 'text-green-300',
  http: 'text-purple-400',
  kotlin: 'text-purple-300',
  swift: 'text-orange-500',
  powershell: 'text-blue-300',
  objectivec: 'text-blue-300',
  ocaml: 'text-orange-300'
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  language, 
  code, 
  showLineNumbers = true, 
  className 
}) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: `${languageDisplayNames[language]} code snippet has been copied`,
    });
  };

  // Split code by lines for line numbering
  const codeLines = code.split('\n');

  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      <div className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto">
        <pre className={`font-mono ${languageClasses[language]}`}>
          {showLineNumbers ? (
            <code className="flex">
              <div className="select-none text-gray-500 mr-4 text-right">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1">
                {codeLines.map((line, i) => (
                  <div key={i}>{line || ' '}</div>
                ))}
              </div>
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-700"
        onClick={copyToClipboard}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CodeSnippet;
