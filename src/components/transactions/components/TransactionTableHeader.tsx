
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import TransactionSettings from '../TransactionSettings';
import { TableColumn } from '../types';

interface TransactionTableHeaderProps {
  selectedCount: number;
  onExportSelected: () => void;
  columns: TableColumn[];
  onColumnsChange: (columns: TableColumn[]) => void;
}

const TransactionTableHeader = ({ 
  selectedCount, 
  onExportSelected, 
  columns, 
  onColumnsChange 
}: TransactionTableHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>Transaction Records</CardTitle>
        <div className="flex gap-2">
          {selectedCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onExportSelected}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Selected ({selectedCount})
            </Button>
          )}
           
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <TransactionSettings 
            columns={columns}
            onColumnsChange={onColumnsChange}
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default TransactionTableHeader;
