
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  GripVertical, 
  Eye, 
  EyeOff,
  RotateCcw,
  Save
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface TransactionSettingsProps {
  columns: Array<{
    key: string;
    label: string;
    visible: boolean;
    order: number;
  }>;
  onColumnsChange: (columns: any[]) => void;
}

const TransactionSettings = ({ columns, onColumnsChange }: TransactionSettingsProps) => {
  const [localColumns, setLocalColumns] = useState(columns);

  const toggleColumnVisibility = (key: string) => {
    setLocalColumns(prev => 
      prev.map(col => 
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newColumns = [...localColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    
    const reorderedColumns = newColumns.map((col, index) => ({
      ...col,
      order: index
    }));
    
    setLocalColumns(reorderedColumns);
  };

  const resetToDefault = () => {
    const defaultColumns = [
      { key: 'id', label: 'Transaction ID', visible: true, order: 0 },
      { key: 'amount', label: 'Amount', visible: true, order: 1 },
      { key: 'customer', label: 'Customer', visible: true, order: 2 },
      { key: 'status', label: 'Status', visible: true, order: 3 },
      { key: 'paymentMethod', label: 'Payment Method', visible: true, order: 4 },
      { key: 'timestamp', label: 'Date & Time', visible: true, order: 5 },
      { key: 'fraudScore', label: 'Fraud Score', visible: false, order: 6 },
      { key: 'gateway', label: 'Gateway', visible: false, order: 7 },
      { key: 'country', label: 'Country', visible: false, order: 8 },
      { key: 'currency', label: 'Currency', visible: false, order: 9 },
      { key: 'merchantRef', label: 'Merchant Ref', visible: false, order: 10 },
      { key: 'customerEmail', label: 'Customer Email', visible: false, order: 11 },
      { key: 'customerPhone', label: 'Customer Phone', visible: false, order: 12 },
      { key: 'ipAddress', label: 'IP Address', visible: false, order: 13 },
      { key: 'userAgent', label: 'User Agent', visible: false, order: 14 },
      { key: 'responseCode', label: 'Response Code', visible: false, order: 15 }
    ];
    setLocalColumns(defaultColumns);
  };

  const saveSettings = () => {
    onColumnsChange(localColumns);
    // In a real app, this would save to localStorage or backend
    localStorage.setItem('transactionTableSettings', JSON.stringify(localColumns));
  };

  const visibleCount = localColumns.filter(col => col.visible).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Table Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Customize Transaction Table</DialogTitle>
          <DialogDescription>
            Choose which columns to display and arrange their order
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Visible Columns: {visibleCount}/{localColumns.length}
            </span>
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {localColumns
              .sort((a, b) => a.order - b.order)
              .map((column, index) => (
                <Card key={column.key} className="border">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{column.label}</h4>
                          <p className="text-xs text-gray-500">Order: {column.order + 1}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={column.visible}
                          onCheckedChange={() => toggleColumnVisibility(column.key)}
                        />
                        {column.visible ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => index > 0 && moveColumn(index, index - 1)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => index < localColumns.length - 1 && moveColumn(index, index + 1)}
                        disabled={index === localColumns.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={saveSettings} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSettings;
