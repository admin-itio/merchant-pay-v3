
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Upload, 
  Download, 
  Filter,
  Calendar,
  DollarSign,
  AlertCircle,
  Search,
  Settings,
  Eye,
  RefreshCw
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import TransferTransactionModal from './TransferTransactionModal';

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
  completedAt?: string;
  description?: string;
  reference?: string;
  processingTime?: string;
  accountDetails?: {
    accountNumber: string;
    bankName?: string;
    country: string;
  };
}

const TransferManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Generate 50 dummy transfers for pagination
  const generateTransfers = (): Transfer[] => {
    const beneficiaries = [
      { name: 'ABC Corp Ltd', id: 'BEN001' },
      { name: 'Crypto Payments', id: 'BEN002' },
      { name: 'Supplier XYZ', id: 'BEN003' },
      { name: 'Tech Solutions Inc', id: 'BEN004' },
      { name: 'Global Trading Co', id: 'BEN005' }
    ];
    
    const currencies = ['USD', 'EUR', 'GBP', 'USDT', 'BTC'];
    const statuses: Array<'pending' | 'processing' | 'completed' | 'failed'> = ['pending', 'processing', 'completed', 'failed'];
    const types: Array<'PAYIN' | 'PAYOUT' | 'Invoice'> = ['PAYIN', 'PAYOUT', 'Invoice'];
    const methods: Array<'Web' | 'API' | 'Upload'> = ['Web', 'API', 'Upload'];

    const transfers: Transfer[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const beneficiary = beneficiaries[Math.floor(Math.random() * beneficiaries.length)];
      const currency = currencies[Math.floor(Math.random() * currencies.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      
      transfers.push({
        id: `TXN${String(i).padStart(3, '0')}`,
        beneficiaryName: beneficiary.name,
        beneficiaryId: beneficiary.id,
        amount: Math.floor(Math.random() * 50000) + 1000,
        currency,
        type,
        status,
        method,
        fee: Math.floor(Math.random() * 100) + 5,
        createdAt: randomDate.toISOString(),
        completedAt: status === 'completed' ? new Date(randomDate.getTime() + 3600000).toISOString() : undefined,
        description: `${type} payment to ${beneficiary.name}`,
        reference: `REF-${i}-${Date.now()}`,
        processingTime: status === 'completed' ? '1 hour' : undefined,
        accountDetails: {
          accountNumber: `****${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
          bankName: currency === 'USD' ? 'Chase Bank' : currency === 'EUR' ? 'Deutsche Bank' : undefined,
          country: currency === 'USD' ? 'United States' : currency === 'EUR' ? 'Germany' : 'Singapore'
        }
      });
    }
    
    return transfers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const allTransfers = generateTransfers();

  // Filter transfers
  const filteredTransfers = allTransfers.filter(transfer => {
    const matchesSearch = transfer.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.beneficiaryId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalTransfers = filteredTransfers.length;
  const totalPages = Math.ceil(totalTransfers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransfers = filteredTransfers.slice(startIndex, endIndex);

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsDetailsModalOpen(true);
  };

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

  const downloadSampleFile = () => {
    const csvContent = `Beneficiary Name,Amount,Currency,Type,Reference
ABC Corp Ltd,15000,USD,PAYOUT,Payment for services
Crypto Payments,5000,USDT,PAYOUT,Crypto transfer
Supplier XYZ,8500,EUR,Invoice,Invoice payment`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transfer_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = paginatedTransfers.reduce((sum, transfer) => sum + transfer.amount, 0);
  const totalFees = paginatedTransfers.reduce((sum, transfer) => sum + transfer.fee, 0);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Transfer Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage payout transfers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadSampleFile}>
            <Download className="h-4 w-4 mr-2" />
            Sample File
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Excel
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Quick Transfer
          </Button>
        </div>
      </div>

      {/* Fee Notice */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                Transfer Fee Structure
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Company Bank Accounts:</strong> No fees applied<br />
                <strong>External Beneficiaries:</strong> 2.5% + $5 fixed transaction fee
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalTransfers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {filteredTransfers.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${totalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Page Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              ${totalFees.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Page Fees</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by transaction ID, beneficiary name, or Ben ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PAYOUT">Payout</SelectItem>
                  <SelectItem value="PAYIN">Payin</SelectItem>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Transfer History ({filteredTransfers.length} total, showing {paginatedTransfers.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <Select value={pageSize.toString()} onValueChange={(value) => {
                setPageSize(parseInt(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
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
              {paginatedTransfers.map((transfer) => (
                <TableRow key={transfer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell>
                    <Button 
                      variant="link" 
                      className="font-mono p-0 h-auto"
                      onClick={() => handleViewDetails(transfer)}
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
                      onClick={() => handleViewDetails(transfer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
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
                            setCurrentPage(page);
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
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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

      {/* Transfer Details Modal */}
      <TransferTransactionModal 
        transfer={selectedTransfer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default TransferManagement;
