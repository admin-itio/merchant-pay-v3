
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction, TransactionTableProps, TableColumn } from './types';
import { getDefaultColumns } from './utils/transactionUtils';
import TransactionTableHeader from './components/TransactionTableHeader';
import TransactionTableCell from './components/TransactionTableCell';
import TransactionTableActions from './components/TransactionTableActions';

const TransactionTable = ({ transactions, onViewDetails, onBulkAction, columns }: TransactionTableProps) => {
  console.log('TransactionTable rendering with props:', { transactionsCount: transactions?.length, columnsCount: columns?.length });
  
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>(columns || getDefaultColumns());

  // Update internal state when columns prop changes
  useEffect(() => {
    console.log('Columns prop changed:', columns);
    if (columns) {
      setTableColumns(columns);
    }
  }, [columns]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedTransactions(transactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (transactionId: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions(prev => [...prev, transactionId]);
    } else {
      setSelectedTransactions(prev => prev.filter(id => id !== transactionId));
      setSelectAll(false);
    }
  };

  const handleRowClick = (transaction: Transaction, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('input, button, [role="checkbox"]')) {
      return;
    }
    onViewDetails(transaction);
  };

  const handleExportSelected = () => {
    onBulkAction('export', selectedTransactions);
  };

  const handleColumnsChange = (columns: TableColumn[]) => {
    setTableColumns(columns);
  };

  const visibleColumns = tableColumns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <Card>
      <TransactionTableHeader
        selectedCount={selectedTransactions.length}
        onExportSelected={handleExportSelected}
        columns={tableColumns}
        onColumnsChange={handleColumnsChange}
      />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {visibleColumns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={(e) => handleRowClick(transaction, e)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={(checked) => handleSelectTransaction(transaction.id, checked as boolean)}
                  />
                </TableCell>
                {visibleColumns.map((column) => (
                  <TableCell key={column.key}>
                    <TransactionTableCell transaction={transaction} columnKey={column.key} />
                  </TableCell>
                ))}
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <TransactionTableActions 
                    transaction={transaction}
                    onViewDetails={onViewDetails}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
