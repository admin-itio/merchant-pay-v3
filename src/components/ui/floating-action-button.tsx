
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X, FileText, Shield, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

interface FloatingActionButtonProps {
  onNavigate: (tab: string) => void;
}

const FloatingActionButton = ({ onNavigate }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: 'add-terno',
      label: 'Add TerNo',
      icon: Plus,
      onClick: () => {
        onNavigate('terno');
        setIsOpen(false);
      },
    },
    {
      id: 'add-orchestration',
      label: 'Add Orchestration Rule',
      icon: Shield,
      onClick: () => {
        onNavigate('orchestration');
        setIsOpen(false);
      },
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: BarChart3,
      onClick: () => {
        onNavigate('analytics');
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="mb-4 space-y-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.id}
                className={cn(
                  "transform transition-all duration-200 ease-out shadow-lg hover:shadow-xl",
                  "animate-fade-in",
                  `animation-delay-${index * 100}`
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 p-4 h-auto text-left"
                    onClick={action.onClick}
                  >
                    <Icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{action.label}</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200",
          "bg-blue-600 hover:bg-blue-700 text-white",
          isOpen && "rotate-45"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingActionButton;
