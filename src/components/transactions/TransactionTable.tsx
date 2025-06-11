
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Transaction, TransactionTableProps } from './types';
import { getDefaultColumns } from './utils/transactionUtils';
import TransactionTableCell from './components/TransactionTableCell';
import TransactionTableActions from './components/TransactionTableActions';
import TransactionTableHeader from './components/TransactionTableHeader';

console.log('TransactionTable component loading...');

const TransactionTable = ({ 
  transactions, 
  onViewDetails, 
  onBulkAction,
  columns: propColumns 
}: TransactionTableProps) => {
  console.log('TransactionTable rendering with transactions:', transactions?.length);
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [columns, setColumns] = useState(propColumns || getDefaultColumns());

  const visibleColumns = useMemo(() => {
    return columns
      .filter(col => col.visible)
      .sort((a, b) => a.order - b.order);
  }, [columns]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(transactions.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleExportSelected = () => {
    console.log('Exporting selected transactions:', selectedIds);
    // Export logic would go here
  };

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <TransactionTableHeader 
          selectedCount={selectedIds.length}
          onExportSelected={handleExportSelected}
          columns={columns}
          onColumnsChange={setColumns}
        />
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <TransactionTableHeader 
        selectedCount={selectedIds.length}
        onExportSelected={handleExportSelected}
        columns={columns}
        onColumnsChange={setColumns}
      />
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === transactions.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(transaction.id)}
                      onCheckedChange={(checked) => 
                        handleSelectRow(transaction.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key}>
                      <TransactionTableCell 
                        transaction={transaction} 
                        columnKey={column.key} 
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <TransactionTableActions 
                      transaction={transaction}
                      onViewDetails={onViewDetails}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
