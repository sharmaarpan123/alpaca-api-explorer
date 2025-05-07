
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ProgrammingLanguage } from './CodeSnippet';

interface LanguageSelectorProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
}

interface LanguageOption {
  id: ProgrammingLanguage;
  name: string;
  icon?: React.ReactNode;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  // Define language options with their display names and icons
  const languages: LanguageOption[] = [
    { id: 'shell', name: 'Shell' },
    { id: 'node', name: 'Node' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'php', name: 'PHP' },
    { id: 'r', name: 'R' },
    { id: 'c', name: 'C' },
    { id: 'csharp', name: 'C#' },
    { id: 'cpp', name: 'C++' },
    { id: 'clojure', name: 'Clojure' },
    { id: 'go', name: 'Go' },
    { id: 'http', name: 'HTTP' },
    { id: 'java', name: 'Java' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'kotlin', name: 'Kotlin' },
    { id: 'objectivec', name: 'Objective-C' },
    { id: 'ocaml', name: 'OCaml' },
    { id: 'powershell', name: 'PowerShell' },
    { id: 'python', name: 'Python' },
    { id: 'swift', name: 'Swift' },
  ];
  
  // Get currently selected language
  const selectedLangOption = languages.find(lang => lang.id === selectedLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-28 justify-between bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">
          {selectedLangOption?.name || 'Shell'}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto bg-gray-800 text-gray-200 border-gray-700">
        {languages.map(lang => (
          <DropdownMenuItem 
            key={lang.id}
            onClick={() => onLanguageChange(lang.id)}
            className={`cursor-pointer hover:bg-gray-700 ${selectedLanguage === lang.id ? 'bg-gray-700' : ''}`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
