
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
  onLanguageChange,
}) => {
  // Define language options with their display names and icons
  const languages: LanguageOption[] = [
    { id: 'shell', name: 'Shell' },
    { id: 'node', name: 'Node' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'php', name: 'PHP' },
    { id: 'python', name: 'Python' },
  ];
  
  // Get currently selected language
  const selectedLangOption = languages.find(lang => lang.id === selectedLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 w-24 justify-between bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700">
          {selectedLangOption?.name || 'Shell'}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto bg-gray-800 text-gray-200 border-gray-700">
        {languages.map(lang => (
          <DropdownMenuItem 
            key={lang.id}
            onClick={() => onLanguageChange(lang.id)}
            className={`cursor-pointer hover:bg-gray-700 py-1 ${selectedLanguage === lang.id ? 'bg-gray-700' : ''}`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
