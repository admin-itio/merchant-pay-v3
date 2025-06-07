
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Download, RefreshCw, Check, Ban, Trash } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  selectedIds: string[];
  onBulkAction: (action: string, selectedIds: string[]) => void;
  onClearSelection: () => void;
}

const BulkActions = ({ selectedCount, selectedIds, onBulkAction, onClearSelection }: BulkActionsProps) => {
  const [selectedAction, setSelectedAction] = React.useState<string>('');

  const handleActionSubmit = () => {
    if (selectedAction && selectedIds.length > 0) {
      onBulkAction(selectedAction, selectedIds);
      setSelectedAction('');
    }
  };

  const bulkActions = [
    { value: 'export', label: 'Export Selected', icon: Download },
    { value: 'retry', label: 'Retry Failed', icon: RefreshCw },
    { value: 'approve', label: 'Approve Pending', icon: Check },
    { value: 'cancel', label: 'Cancel Transactions', icon: Ban },
    { value: 'delete', label: 'Delete Records', icon: Trash }
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {selectedCount} selected
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose action..." />
            </SelectTrigger>
            <SelectContent>
              {bulkActions.map((action) => {
                const Icon = action.icon;
                return (
                  <SelectItem key={action.value} value={action.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {action.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleActionSubmit} 
            disabled={!selectedAction}
            size="sm"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
