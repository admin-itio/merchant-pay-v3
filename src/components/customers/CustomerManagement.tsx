
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  UserPlus,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock
} from 'lucide-react';
import CustomerTable from './CustomerTable';
import AddCustomerModal from './AddCustomerModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import CustomerFilters from './CustomerFilters';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('30'); // Default to 30 days
  const [timeFilterLabel, setTimeFilterLabel] = useState('Last 30 Days');

  // Generate dummy customers with timestamps
  const generateDummyCustomers = () => {
    const customers = [];
    const statuses = ['active', 'inactive', 'suspended', 'pending'];
    const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada'];
    
    for (let i = 1; i <= 50; i++) {
      const daysAgo = Math.floor(Math.random() * parseInt(dateFilter));
      const customerDate = new Date();
      customerDate.setDate(customerDate.getDate() - daysAgo);
      
      customers.push({
        id: `CUST${String(i).padStart(3, '0')}`,
        name: `Customer ${i}`,
        email: `customer${i}@email.com`,
        phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        totalTransactions: Math.floor(Math.random() * 100) + 1,
        totalSpent: parseFloat((Math.random() * 10000 + 100).toFixed(2)),
        country: countries[Math.floor(Math.random() * countries.length)],
        registrationDate: customerDate.toISOString().split('T')[0],
        lastActivity: new Date(customerDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
    
    return customers.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
  };

  const customers = generateDummyCustomers();

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    const labels = {
      '7': 'Last 7 Days',
      '30': 'Last 30 Days', 
      '90': 'Last 90 Days',
      '180': 'Last 6 Months',
      '365': 'Last Year'
    };
    setTimeFilterLabel(labels[value as keyof typeof labels] || 'Custom Period');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage your customers and their transaction history</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">
              Showing data from: {timeFilterLabel}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">+12 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">94.2% active rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">+8.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalTransactions, 0)).toFixed(2)}
                </p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">+3.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="180">Last 6 Months</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setIsFiltersOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <CustomerTable 
        customers={customers}
        onViewCustomer={handleViewCustomer}
        searchTerm={searchTerm}
        statusFilter={selectedStatus}
      />

      {/* Modals */}
      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <CustomerDetailsModal 
        customer={selectedCustomer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
      
      <CustomerFilters 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={(filters) => console.log('Applied filters:', filters)}
      />
    </div>
  );
};

export default CustomerManagement;
