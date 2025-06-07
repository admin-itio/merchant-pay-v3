
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  XCircle,
  MoreHorizontal
} from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  selectedIds: string[];
  onBulkAction: (action: string, ids: string[]) => void;
  onClearSelection: () => void;
}

const BulkActions = ({ selectedCount, selectedIds, onBulkAction, onClearSelection }: BulkActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (selectedCount === 0) return null;

  const handleAction = (action: string) => {
    onBulkAction(action, selectedIds);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        {selectedCount} selected
      </Badge>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleAction('export')}
        >
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleAction('retry')}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Retry
        </Button>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="start">
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleAction('approve')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleAction('cancel')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Transactions
              </Button>
              <Separator className="my-1" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleAction('delete')}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Records
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        variant="ghost" 
        size="sm"
        onClick={onClearSelection}
        className="ml-auto"
      >
        Clear Selection
      </Button>
    </div>
  );
};

export default BulkActions;
