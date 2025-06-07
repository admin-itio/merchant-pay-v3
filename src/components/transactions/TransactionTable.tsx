
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  merchantRef: string;
  timestamp: string;
  fraudScore: number;
  gateway: string;
  country: string;
  category: string;
  ipAddress: string;
  userAgent: string;
  responseCode: string;
}

interface Column {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
  columns: Column[];
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionTable = ({ transactions, columns, onTransactionClick }: TransactionTableProps) => {
  const visibleColumns = columns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'refunded': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'chargeback': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCellValue = (transaction: Transaction, columnKey: string) => {
    switch (columnKey) {
      case 'amount':
        return `${transaction.currency} ${transaction.amount.toFixed(2)}`;
      case 'timestamp':
        return new Date(transaction.timestamp).toLocaleString();
      case 'status':
        return (
          <Badge className={getStatusColor(transaction.status)}>
            {transaction.status.toUpperCase()}
          </Badge>
        );
      case 'fraudScore':
        return (
          <div className="flex items-center gap-1">
            <span className={getFraudScoreColor(transaction.fraudScore)}>
              {transaction.fraudScore}
            </span>
            {transaction.fraudScore > 70 && (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
        );
      default:
        return transaction[columnKey as keyof Transaction]?.toString() || '-';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No transactions found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow 
              key={transaction.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onTransactionClick(transaction)}
            >
              {visibleColumns.map((column) => (
                <TableCell key={column.key}>
                  {formatCellValue(transaction, column.key)}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTransactionClick(transaction);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
