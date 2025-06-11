
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Eye, 
  MoreHorizontal, 
  Download,
  RefreshCw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TransactionSettings from './TransactionSettings';

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

interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  columns?: { key: string; label: string; visible: boolean; order: number; }[];
}

const TransactionTable = ({ transactions, onViewDetails, onBulkAction, columns }: TransactionTableProps) => {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const defaultColumns = [
    { key: 'id', label: 'Transaction ID', visible: true, order: 0 },
    { key: 'amount', label: 'Amount', visible: true, order: 1 },
    { key: 'customer', label: 'Customer', visible: true, order: 2 },
    { key: 'status', label: 'Status', visible: true, order: 3 },
    { key: 'paymentMethod', label: 'Payment Method', visible: true, order: 4 },
    { key: 'timestamp', label: 'Date & Time', visible: true, order: 5 },
    { key: 'fraudScore', label: 'Fraud Score', visible: true, order: 6 },
    { key: 'gateway', label: 'Gateway', visible: true, order: 7 },
    { key: 'country', label: 'Country', visible: true, order: 8 },
    { key: 'currency', label: 'Currency', visible: false, order: 9 },
    { key: 'merchantRef', label: 'Merchant Ref', visible: false, order: 10 },
    { key: 'customerEmail', label: 'Customer Email', visible: false, order: 11 },
    { key: 'customerPhone', label: 'Customer Phone', visible: false, order: 12 },
    { key: 'ipAddress', label: 'IP Address', visible: false, order: 13 },
    { key: 'userAgent', label: 'User Agent', visible: false, order: 14 },
    { key: 'responseCode', label: 'Response Code', visible: false, order: 15 }
  ];

  const [tableColumns, setTableColumns] = useState(columns || defaultColumns);

  // Update internal state when columns prop changes
  React.useEffect(() => {
    if (columns) {
      setTableColumns(columns);
    }
  }, [columns]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      case 'chargeback': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCellValue = (transaction: Transaction, columnKey: string) => {
    switch (columnKey) {
      case 'id':
        return (
          <div>
            <p className="font-medium text-gray-900">{transaction.id}</p>
            <p className="text-sm text-gray-500">{transaction.merchantRef}</p>
          </div>
        );
      case 'amount':
        return (
          <div>
            <p className="font-medium text-gray-900">
              {transaction.currency} {transaction.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{transaction.paymentMethod}</p>
          </div>
        );
      case 'customer':
        return (
          <div>
            <p className="font-medium text-gray-900">{transaction.customer}</p>
            <p className="text-sm text-gray-500">{transaction.timestamp}</p>
          </div>
        );
      case 'status':
        return (
          <Badge className={getStatusColor(transaction.status)}>
            {transaction.status}
          </Badge>
        );
      case 'fraudScore':
        return (
          <span className={`font-medium ${getFraudScoreColor(transaction.fraudScore)}`}>
            {transaction.fraudScore}
          </span>
        );
      case 'timestamp':
        return (
          <div>
            <p className="text-sm text-gray-900">{new Date(transaction.timestamp).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500">{new Date(transaction.timestamp).toLocaleTimeString()}</p>
          </div>
        );
      default:
        return <span className="text-gray-900">{transaction[columnKey as keyof Transaction]}</span>;
    }
  };

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

  const handleColumnsChange = (columns: any[]) => {
    setTableColumns(columns);
  };

  const visibleColumns = tableColumns
    .filter(col => col.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Transaction Records</CardTitle>
          <div className="flex gap-2">
            {selectedTransactions.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportSelected}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Selected ({selectedTransactions.length})
              </Button>
            )}
             
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <TransactionSettings 
              columns={tableColumns}
              onColumnsChange={handleColumnsChange}
            />
          </div>
        </div>
      </CardHeader>
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
                    {formatCellValue(transaction, column.key)}
                  </TableCell>
                ))}
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewDetails(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Request Refund</DropdownMenuItem>
                        <DropdownMenuItem>Resend Webhook</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
