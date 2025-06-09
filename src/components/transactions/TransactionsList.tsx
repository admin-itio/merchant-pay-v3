import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
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
  Settings,
  Timeline,
  Upload
} from 'lucide-react';
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsModal';
import AdvancedFilters from './AdvancedFilters';
import TransactionSettings from './TransactionSettings';
import TransactionPagination from './TransactionPagination';
import ExportModal from '@/components/common/ExportModal';
import DateRangeFilter from '@/components/common/DateRangeFilter';
import SavedFilters from '@/components/common/SavedFilters';
import BulkTransactionOperations from './BulkTransactionOperations';
import TransactionTimeline from './TransactionTimeline';
import SmartTransactionSearch from './SmartTransactionSearch';

const TransactionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<string[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showDateRangeFilter, setShowDateRangeFilter] = useState(false);
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

  // Generate 100 dummy transactions
  const generateDummyTransactions = () => {
    const statuses = ['completed', 'pending', 'failed', 'refunded', 'chargeback'];
    const paymentMethods = ['Visa ****1234', 'Mastercard ****5678', 'PayPal', 'Apple Pay', 'Google Pay'];
    const gateways = ['Stripe', 'PayPal', 'Square', 'Adyen', 'Authorize.Net'];
    const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia', 'Japan', 'Singapore'];
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD'];
    const customerNames = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emma Wilson', 'David Brown', 'Lisa Miller', 'Chris Taylor', 'Anna Garcia'];
    
    const transactions = [];
    
    for (let i = 1; i <= 100; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      randomDate.setHours(Math.floor(Math.random() * 24));
      randomDate.setMinutes(Math.floor(Math.random() * 60));
      
      transactions.push({
        id: `TXN${String(i).padStart(3, '0')}`,
        amount: parseFloat((Math.random() * 5000 + 10).toFixed(2)),
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        customer: customerNames[Math.floor(Math.random() * customerNames.length)],
        customerEmail: `customer${i}@email.com`,
        customerPhone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        merchantRef: `ORD-2024-${String(i).padStart(3, '0')}`,
        timestamp: randomDate.toISOString().slice(0, 19).replace('T', ' '),
        fraudScore: Math.floor(Math.random() * 100),
        gateway: gateways[Math.floor(Math.random() * gateways.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        category: 'E-commerce',
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        responseCode: Math.random() > 0.1 ? '00' : '05'
      });
    }
    
    return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const allTransactions = generateDummyTransactions();

  // Pagination calculations
  const totalTransactions = allTransactions.length;
  const totalPages = Math.ceil(totalTransactions / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const transactions = allTransactions.slice(startIndex, endIndex);

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleViewTimeline = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTimelineModal(true);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    console.log(`Bulk action ${action} on transactions:`, selectedIds);
    setSelectedTransactionIds(selectedIds);
  };

  const handleSmartSearch = (query: string, filters: any[]) => {
    console.log('Smart search:', { query, filters });
    // Implementation for smart search
  };

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleColumnsChange = (columns: any[]) => {
    setTableColumns(columns);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleGoToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = (config: { from: Date; to: Date; format: string }) => {
    console.log('Exporting transactions:', config);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Transaction export complete');
        resolve(true);
      }, 2000);
    });
  };

  const handleDateRangeExport = (config: { from: Date; to: Date; format: string }) => {
    setDateRange({ from: config.from, to: config.to });
    console.log('Date range filter applied:', config);
    setShowDateRangeFilter(false);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Date range export complete');
        resolve(true);
      }, 1000);
    });
  };

  const transactionExportFormats = [
    { value: 'csv', label: 'CSV Spreadsheet' },
    { value: 'excel', label: 'Excel Workbook' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-sm lg:text-base text-gray-600">Monitor, analyze, and manage all your transactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTimelineModal(true)}
          >
            <Timeline className="h-4 w-4 mr-2" />
            Timeline View
          </Button>
          <ExportModal
            title="Export Transaction Data"
            description="Export your transaction data with custom date ranges and formats for analysis or reporting."
            triggerText="Export"
            exportFormats={transactionExportFormats}
            onExport={handleExport}
          />
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Total Volume</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">$245,231</p>
              </div>
              <CreditCard className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+12.5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+2.1% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Chargebacks</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">8</p>
              </div>
              <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-1">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Avg. Fraud Score</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">23</p>
              </div>
              <Globe className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">-5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Search */}
      <SmartTransactionSearch 
        onSearch={handleSmartSearch}
        placeholder="Search transactions with smart filters..."
      />

      {/* Saved Filters */}
      <SavedFilters 
        currentFilters={activeFilters}
        onFilterApply={setActiveFilters}
      />

      {/* Bulk Operations */}
      <BulkTransactionOperations 
        selectedTransactions={selectedTransactionIds}
        onBulkAction={handleBulkAction}
      />

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 lg:p-6">
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDateRangeFilter(!showDateRangeFilter)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
          
          {/* Date Range Filter */}
          {showDateRangeFilter && (
            <div className="mt-4">
              <DateRangeFilter
                onExport={handleDateRangeExport}
                exportFormats={transactionExportFormats}
                defaultFormat="csv"
                showTimeSelection={true}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Transaction Table */}
      <div className="space-y-0">
        <TransactionTable 
          transactions={transactions}
          onViewDetails={handleViewDetails}
          onBulkAction={handleBulkAction}
          columns={tableColumns}
        />
        
        {/* Pagination */}
        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalTransactions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onGoToPage={handleGoToPage}
        />
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal 
        transaction={selectedTransaction}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Transaction Timeline Modal */}
      {showTimelineModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transaction Timeline</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTimelineModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="p-4">
              <TransactionTimeline 
                transactionId={selectedTransaction?.id || 'TXN001'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
