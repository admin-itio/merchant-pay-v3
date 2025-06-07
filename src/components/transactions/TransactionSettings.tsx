
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Settings } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

interface TransactionSettingsProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
}

const TransactionSettings = ({ columns, onColumnsChange }: TransactionSettingsProps) => {
  const [localColumns, setLocalColumns] = useState(columns);

  const handleColumnToggle = (columnKey: string, visible: boolean) => {
    const updatedColumns = localColumns.map(col =>
      col.key === columnKey ? { ...col, visible } : col
    );
    setLocalColumns(updatedColumns);
    onColumnsChange(updatedColumns);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Table Columns</h4>
          <div className="space-y-3">
            {localColumns.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={column.visible}
                  onCheckedChange={(checked) => 
                    handleColumnToggle(column.key, checked as boolean)
                  }
                />
                <Label
                  htmlFor={column.key}
                  className="text-sm font-normal cursor-pointer"
                >
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TransactionSettings;
