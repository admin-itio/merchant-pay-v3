
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Eye } from 'lucide-react';
import TransactionSettings from '@/components/transactions/TransactionSettings';

interface Transfer {
  id: string;
  beneficiaryName: string;
  beneficiaryId: string;
  amount: number;
  currency: string;
  type: 'PAYIN' | 'PAYOUT' | 'Invoice';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'Web' | 'API' | 'Upload';
  fee: number;
  createdAt: string;
}

interface TransferTableProps {
  transfers: Transfer[];
  totalTransfers: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onViewDetails: (transfer: Transfer) => void;
}

const TransferTable = ({
  transfers,
  totalTransfers,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onViewDetails
}: TransferTableProps) => {
  const formatAmount = (amount: number, currency: string) => {
    const cryptoCurrencies = ['USDT', 'BTC', 'ETH', 'USDC', 'BNB', 'ADA', 'DOT', 'MATIC'];
    
    if (cryptoCurrencies.includes(currency.toUpperCase())) {
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch (error) {
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PAYIN': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'PAYOUT': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Invoice': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };
  const [tableColumns, setTableColumns] = useState([
    { key: 'id', label: 'Settlement ID', visible: true, order: 0 },
    { key: 'amount', label: 'Amount', visible: true, order: 1 },
    { key: 'transactions', label: 'Transactions', visible: true, order: 2 },
    { key: 'fees', label: 'Fees', visible: true, order: 3 },
    { key: 'bankAccount', label: 'Bank Account', visible: true, order: 4 },
    { key: 'status', label: 'Status', visible: true, order: 5 },
    { key: 'date', label: 'Date', visible: true, order: 6 },
   
  ]);
 const handleColumnsChange = (columns: typeof tableColumns) => {
    setTableColumns(columns);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Transfer History ({totalTransfers} total, showing {transfers.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(parseInt(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
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
              <TableHead>Transaction ID</TableHead>
              <TableHead>Beneficiary</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell>
                  <Button 
                    variant="link" 
                    className="font-mono p-0 h-auto"
                    onClick={() => onViewDetails(transfer)}
                  >
                    {transfer.id}
                  </Button>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{transfer.beneficiaryName}</div>
                    <div className="text-sm text-gray-500">{transfer.beneficiaryId}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">
                    {formatAmount(transfer.amount, transfer.currency)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(transfer.type)}>
                    {transfer.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{transfer.method}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${transfer.fee}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(transfer.createdAt).toLocaleDateString()}
                    <div className="text-xs text-gray-500">
                      {new Date(transfer.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewDetails(transfer)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) onPageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) onPageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransferTable;
