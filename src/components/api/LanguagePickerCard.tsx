
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgrammingLanguage } from './CodeSnippet';

interface LanguagePickerCardProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageSelect: (language: ProgrammingLanguage) => void;
}

const LanguagePickerCard: React.FC<LanguagePickerCardProps> = ({
  selectedLanguage,
  onLanguageSelect
}) => {
  const languages: { id: ProgrammingLanguage, label: string }[] = [
    { id: "shell", label: "Shell" },
    { id: "node", label: "Node" },
    { id: "ruby", label: "Ruby" },
    { id: "php", label: "PHP" },
    { id: "python", label: "Python" }
  ];

  return (
    <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm mb-4">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-gray-200 text-base">Language</CardTitle>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="grid grid-cols-5 gap-1">
          {languages.map(lang => (
            <Button 
              key={lang.id}
              variant={selectedLanguage === lang.id ? "default" : "outline"}
              size="sm" 
              className={`justify-center h-7 text-xs ${selectedLanguage !== lang.id ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
              onClick={() => onLanguageSelect(lang.id)}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguagePickerCard;
