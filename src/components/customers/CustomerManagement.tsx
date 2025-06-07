
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import CustomerTable from './CustomerTable';
import CustomerDetailsModal from './CustomerDetailsModal';
import AddCustomerModal from './AddCustomerModal';
import CustomerFilters from './CustomerFilters';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'last30days' // Default to 30 days
  });

  // Mock customer data
  const customers = [
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      status: 'active',
      totalTransactions: 45,
      totalSpent: 12450.00,
      currency: 'USD',
      joinDate: '2023-03-15',
      lastTransaction: '2024-06-05',
      country: 'United States',
      city: 'New York',
      riskLevel: 'low',
      preferredPayment: 'Visa ****1234',
      tags: ['VIP', 'Frequent Buyer']
    },
    {
      id: 'CUST002',
      name: 'Mary Smith',
      email: 'mary.smith@email.com',
      phone: '+49-123-456789',
      status: 'active',
      totalTransactions: 23,
      totalSpent: 5680.50,
      currency: 'EUR',
      joinDate: '2023-07-22',
      lastTransaction: '2024-06-04',
      country: 'Germany',
      city: 'Berlin',
      riskLevel: 'low',
      preferredPayment: 'PayPal',
      tags: ['Regular Customer']
    },
    {
      id: 'CUST003',
      name: 'Suspicious User',
      email: 'suspicious@email.com',
      phone: '+1-000-000000',
      status: 'flagged',
      totalTransactions: 3,
      totalSpent: 2100.00,
      currency: 'USD',
      joinDate: '2024-05-30',
      lastTransaction: '2024-06-01',
      country: 'Unknown',
      city: 'Unknown',
      riskLevel: 'high',
      preferredPayment: 'Mastercard ****5678',
      tags: ['High Risk', 'Review Required']
    }
  ];

  const handleViewDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const handleAddCustomer = () => {
    setIsAddModalOpen(true);
  };

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
    console.log('Applied filters:', filters);
  };

  const handleBulkAction = (action: string, selectedIds: string[]) => {
    console.log(`Bulk action: ${action} on customers:`, selectedIds);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage and monitor your customer base (Last 30 days)</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddCustomer}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
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

      {/* Quick Stats with time filter note */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+23 in last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">1,156</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">92.7% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Lifetime Value</p>
                <p className="text-2xl font-bold text-gray-900">$2,341</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">+12.3% vs last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged Customers</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-red-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or customer ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <CustomerFilters 
                onFiltersChange={handleFiltersChange}
                activeFilters={activeFilters}
              />
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <CustomerTable 
        customers={customers}
        onViewDetails={handleViewDetails}
        onBulkAction={handleBulkAction}
      />

      {/* Modals */}
      <CustomerDetailsModal 
        customer={selectedCustomer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CustomerManagement;
