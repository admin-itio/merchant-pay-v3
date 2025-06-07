
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Shield } from 'lucide-react';

interface Rule {
  id: number;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
  description: string;
}

interface RuleCardProps {
  rule: Rule;
  onToggle: (id: number) => void;
  onEdit: (rule: Rule) => void;
  onDelete: (id: number) => void;
}

const RuleCard = ({ rule, onToggle, onEdit, onDelete }: RuleCardProps) => {
  return (
    <Card className={`border-l-4 ${rule.enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
              <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Priority {rule.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Condition</p>
                <p className="text-gray-900">{rule.condition}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Action</p>
                <p className="text-gray-900">{rule.action}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">{rule.description}</p>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => onToggle(rule.id)}
              />
              <span className="text-sm text-gray-600">
                {rule.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEdit(rule)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDelete(rule.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleCard;
