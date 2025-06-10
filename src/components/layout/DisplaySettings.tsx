
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Globe, Sun, Moon, Monitor, LanguagesIcon } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

const DisplaySettings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [language, setLanguage] = useState(() => 
    localStorage.getItem('userLanguage') || 'en'
  );

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'it', label: 'Italiano', flag: '🇮🇹' },
    { value: 'pt', label: 'Português', flag: '🇵🇹' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('userLanguage', value);
    toast({
      title: "Language Changed",
      description: `Interface language changed to ${languages.find(lang => lang.value === value)?.label}`,
    });
  };

  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <LanguagesIcon className="h-4 w-4" />
          {/* <span className="hidden sm:inline">Display</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Display Settings</p>
        </div>
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Language</span>
          </div>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="h-8">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span>{currentLanguage?.flag}</span>
                  <span className="text-xs">{currentLanguage?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DropdownMenuSeparator />

        {/* <div className="px-2 py-1">
          <p className="text-xs text-gray-500 mb-2">Theme</p>
          <div className="space-y-1">
            <DropdownMenuItem 
              onClick={() => setTheme('light')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Sun className="h-4 w-4" />
              <span className="text-sm">Light</span>
              {theme === 'light' && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Moon className="h-4 w-4" />
              <span className="text-sm">Dark</span>
              {theme === 'dark' && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setTheme('system')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Monitor className="h-4 w-4" />
              <span className="text-sm">System</span>
              {theme === 'system' && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
          </div>
        </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DisplaySettings;
