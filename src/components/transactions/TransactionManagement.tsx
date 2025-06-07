
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, RefreshCw, Plus, TrendingUp, AlertTriangle } from 'lucide-react';
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsModal';
import AdvancedFilters from './AdvancedFilters';
import TransactionSettings from './TransactionSettings';
import TransactionPagination from './TransactionPagination';

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

const TransactionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - in real app this would come from API
  const mockTransactions: Transaction[] = [
    {
      id: 'TXN-2024-001',
      amount: 299.99,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'Visa *4242',
      customer: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1-555-0123',
      merchantRef: 'ORDER-123',
      timestamp: '2024-01-15T10:30:00Z',
      fraudScore: 15,
      gateway: 'Stripe',
      country: 'US',
      category: 'E-commerce',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...',
      responseCode: '00'
    },
    {
      id: 'TXN-2024-002',
      amount: 149.50,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'PayPal',
      customer: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+1-555-0124',
      merchantRef: 'ORDER-124',
      timestamp: '2024-01-15T11:15:00Z',
      fraudScore: 45,
      gateway: 'PayPal',
      country: 'CA',
      category: 'Subscription',
      ipAddress: '192.168.1.2',
      userAgent: 'Mozilla/5.0...',
      responseCode: '01'
    },
    {
      id: 'TXN-2024-003',
      amount: 75.00,
      currency: 'USD',
      status: 'failed',
      paymentMethod: 'Mastercard *5555',
      customer: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      customerPhone: '+1-555-0125',
      merchantRef: 'ORDER-125',
      timestamp: '2024-01-15T12:00:00Z',
      fraudScore: 85,
      gateway: 'Square',
      country: 'UK',
      category: 'Services',
      ipAddress: '192.168.1.3',
      userAgent: 'Mozilla/5.0...',
      responseCode: '05'
    }
  ];

  const [columns, setColumns] = useState<Column[]>([
    { key: 'id', label: 'Transaction ID', visible: true, order: 0 },
    { key: 'timestamp', label: 'Date/Time', visible: true, order: 1 },
    { key: 'amount', label: 'Amount', visible: true, order: 2 },
    { key: 'status', label: 'Status', visible: true, order: 3 },
    { key: 'customer', label: 'Customer', visible: true, order: 4 },
    { key: 'paymentMethod', label: 'Payment Method', visible: true, order: 5 },
    { key: 'gateway', label: 'Gateway', visible: true, order: 6 },
    { key: 'country', label: 'Country', visible: false, order: 7 },
    { key: 'fraudScore', label: 'Fraud Score', visible: true, order: 8 },
    { key: 'merchantRef', label: 'Merchant Ref', visible: false, order: 9 },
    { key: 'category', label: 'Category', visible: false, order: 10 }
  ]);

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchantRef.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === activeTab);
    }

    // Apply advanced filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        if (key === 'minAmount') {
          filtered = filtered.filter(t => t.amount >= parseFloat(value));
        } else if (key === 'maxAmount') {
          filtered = filtered.filter(t => t.amount <= parseFloat(value));
        } else if (key === 'fraudScoreMin') {
          filtered = filtered.filter(t => t.fraudScore >= parseFloat(value));
        } else if (key === 'fraudScoreMax') {
          filtered = filtered.filter(t => t.fraudScore <= parseFloat(value));
        } else {
          filtered = filtered.filter(t => 
            t[key as keyof Transaction]?.toString().toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    });

    return filtered;
  }, [mockTransactions, searchTerm, activeTab, activeFilters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting transactions...', filteredTransactions);
    // In real app, this would trigger CSV/Excel export
  };

  const getTabCount = (status: string) => {
    if (status === 'all') return mockTransactions.length;
    return mockTransactions.filter(t => t.status === status).length;
  };

  const getStatusStats = () => {
    const stats = mockTransactions.reduce((acc, transaction) => {
      acc[transaction.status] = (acc[transaction.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: mockTransactions.length,
      completed: stats.completed || 0,
      pending: stats.pending || 0,
      failed: stats.failed || 0,
      successRate: ((stats.completed || 0) / mockTransactions.length * 100).toFixed(1)
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transaction Management</h1>
          <p className="text-muted-foreground">Monitor and manage all payment transactions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-green-50">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stats.successRate}% Success Rate
            </Badge>
            <Badge variant="outline">
              {stats.total} Total Transactions
            </Badge>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">
                  ${mockTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(0)}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <AdvancedFilters
                onFiltersChange={setActiveFilters}
                activeFilters={activeFilters}
              />
              <TransactionSettings
                columns={columns}
                onColumnsChange={setColumns}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">
                All ({getTabCount('all')})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({getTabCount('completed')})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({getTabCount('pending')})
              </TabsTrigger>
              <TabsTrigger value="failed">
                Failed ({getTabCount('failed')})
              </TabsTrigger>
              <TabsTrigger value="refunded">
                Refunded ({getTabCount('refunded')})
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              <TransactionTable
                transactions={paginatedTransactions}
                columns={columns}
                onTransactionClick={handleTransactionClick}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Pagination */}
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredTransactions.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        onGoToPage={setCurrentPage}
      />

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default TransactionManagement;
