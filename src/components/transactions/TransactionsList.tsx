
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  MoreHorizontal,
  Eye,
  RotateCcw,
  AlertTriangle,
  FileText,
  Calendar,
  CreditCard,
  Globe,
  Shield,
  Settings
} from 'lucide-react';
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsModal';
import AdvancedFilters from './AdvancedFilters';
import TransactionSettings from './TransactionSettings';

const TransactionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [tableColumns, setTableColumns] = useState([
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
  ]);

  // Enhanced mock transaction data with more fields
  const transactions = [
    {
      id: 'TXN001',
      amount: 1250.00,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'Visa ****1234',
      customer: 'John Doe',
      customerEmail: 'john.doe@email.com',
      customerPhone: '+1-555-0123',
      merchantRef: 'ORD-2024-001',
      timestamp: '2024-01-15 14:30:25',
      fraudScore: 15,
      gateway: 'Stripe',
      country: 'United States',
      category: 'E-commerce',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      responseCode: '00'
    },
    {
      id: 'TXN002',
      amount: 89.99,
      currency: 'EUR',
      status: 'refunded',
      paymentMethod: 'PayPal',
      customer: 'Mary Smith',
      customerEmail: 'mary.smith@email.com',
      customerPhone: '+49-123-456789',
      merchantRef: 'ORD-2024-002',
      timestamp: '2024-01-15 13:15:10',
      fraudScore: 8,
      gateway: 'PayPal',
      country: 'Germany',
      category: 'Digital',
      ipAddress: '193.168.2.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      responseCode: '00'
    },
    {
      id: 'TXN003',
      amount: 2100.00,
      currency: 'USD',
      status: 'chargeback',
      paymentMethod: 'Mastercard ****5678',
      customer: 'Suspicious User',
      customerEmail: 'suspicious@email.com',
      customerPhone: '+1-000-000000',
      merchantRef: 'ORD-2024-003',
      timestamp: '2024-01-15 12:45:33',
      fraudScore: 85,
      gateway: 'Stripe',
      country: 'Unknown',
      category: 'High-value',
      ipAddress: '10.0.0.1',
      userAgent: 'Unknown',
      responseCode: '05'
    }
  ];

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    console.log(`Bulk action: ${action} on transactions:`, selectedIds);
    // Implementation for bulk actions
  };

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleColumnsChange = (columns: any[]) => {
    setTableColumns(columns);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Monitor, analyze, and manage all your transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                <p className="text-2xl font-bold text-gray-900">$45,231</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+12.5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+2.1% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chargebacks</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-1">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Fraud Score</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">-5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by transaction ID, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <AdvancedFilters 
                onFiltersChange={handleFiltersChange}
                activeFilters={activeFilters}
              />
              <TransactionSettings 
                columns={tableColumns}
                onColumnsChange={handleColumnsChange}
              />
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Transaction Table */}
      <TransactionTable 
        transactions={transactions}
        onViewDetails={handleViewDetails}
        onBulkAction={handleBulkAction}
        columns={tableColumns}
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

export default TransactionsList;
