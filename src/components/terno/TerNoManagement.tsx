
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Settings,
  Eye,
  Edit,
  Trash2,
  Key,
  Globe,
  Shield,
  Bell,
  Mail,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TerNoForm from './TerNoForm';
import TerNoDetails from './TerNoDetails';

interface TerNo {
  id: string;
  ternoNumber: string;
  name: string;
  description: string;
  environment: 'sandbox' | 'production';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  businessType: string;
  country: string;
  currency: string;
  createdAt: string;
  lastUsed?: string;
  transactionCount: number;
  monthlyVolume: number;
  apiKey: string;
  webhookUrl?: string;
  callbackUrl?: string;
}

const TerNoManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [selectedTerNo, setSelectedTerNo] = useState<TerNo | null>(null);

  const [terNos] = useState<TerNo[]>([
    {
      id: '1',
      ternoNumber: 'TRN001',
      name: 'Main Store Terminal',
      description: 'Primary payment terminal for main store operations',
      environment: 'production',
      status: 'active',
      businessType: 'Retail',
      country: 'MY',
      currency: 'MYR',
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-06-07T09:30:00Z',
      transactionCount: 1547,
      monthlyVolume: 125000,
      apiKey: 'pk_live_51H...',
      webhookUrl: 'https://api.merchant.com/webhook',
      callbackUrl: 'https://merchant.com/callback'
    },
    {
      id: '2',
      ternoNumber: 'TRN002',
      name: 'Online Store API',
      description: 'API integration for e-commerce website',
      environment: 'production',
      status: 'active',
      businessType: 'E-commerce',
      country: 'SG',
      currency: 'SGD',
      createdAt: '2024-02-01T14:30:00Z',
      lastUsed: '2024-06-07T11:15:00Z',
      transactionCount: 3298,
      monthlyVolume: 485000,
      apiKey: 'pk_live_52J...',
      webhookUrl: 'https://shop.merchant.com/payment-webhook'
    },
    {
      id: '3',
      ternoNumber: 'TRN003',
      name: 'Mobile App Terminal',
      description: 'Payment processing for mobile application',
      environment: 'sandbox',
      status: 'pending',
      businessType: 'Mobile App',
      country: 'TH',
      currency: 'THB',
      createdAt: '2024-06-01T09:00:00Z',
      transactionCount: 45,
      monthlyVolume: 2500,
      apiKey: 'pk_test_abc123...'
    },
    {
      id: '4',
      ternoNumber: 'TRN004',
      name: 'Branch Office Terminal',
      description: 'Secondary terminal for branch operations',
      environment: 'production',
      status: 'inactive',
      businessType: 'Retail',
      country: 'MY',
      currency: 'MYR',
      createdAt: '2024-03-10T16:45:00Z',
      lastUsed: '2024-05-15T14:20:00Z',
      transactionCount: 892,
      monthlyVolume: 67500,
      apiKey: 'pk_live_53K...'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return AlertCircle;
      case 'pending': return Clock;
      case 'suspended': return AlertCircle;
      default: return Clock;
    }
  };

  const getEnvironmentColor = (environment: string) => {
    return environment === 'production' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTerNos = terNos.filter(terno => {
    const matchesSearch = terno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terno.ternoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terno.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || terno.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || terno.environment === environmentFilter;
    
    return matchesSearch && matchesStatus && matchesEnvironment;
  });

  const handleViewDetails = (terno: TerNo) => {
    setSelectedTerNo(terno);
    setActiveTab('details');
  };

  const handleEdit = (terno: TerNo) => {
    setSelectedTerNo(terno);
    setActiveTab('form');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            TerNo Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your payment terminal numbers and configurations. Create, configure, and monitor your TerNos.
          </p>
        </div>
        <Button 
          onClick={() => {
            setSelectedTerNo(null);
            setActiveTab('form');
          }}
          className="gap-2"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          Create New TerNo
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setStatusFilter('active')}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Active TerNos ({terNos.filter(t => t.status === 'active').length})
        </Button>
        <Button variant="outline" size="sm" onClick={() => setEnvironmentFilter('production')}>
          <Shield className="h-4 w-4 mr-2" />
          Production ({terNos.filter(t => t.environment === 'production').length})
        </Button>
        <Button variant="outline" size="sm" onClick={() => setStatusFilter('pending')}>
          <Clock className="h-4 w-4 mr-2" />
          Pending ({terNos.filter(t => t.status === 'pending').length})
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {terNos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total TerNos</div>
            <div className="text-xs text-gray-500 mt-1">
              +{terNos.filter(t => new Date(t.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} this month
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {terNos.filter(t => t.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            <div className="text-xs text-gray-500 mt-1">
              {((terNos.filter(t => t.status === 'active').length / terNos.length) * 100).toFixed(1)}% of total
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {terNos.filter(t => t.environment === 'production').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Production</div>
            <div className="text-xs text-gray-500 mt-1">
              Live payment processing
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {terNos.reduce((sum, t) => sum + t.transactionCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</div>
            <div className="text-xs text-gray-500 mt-1">
              Across all TerNos
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list" className="gap-2">
            <Key className="h-4 w-4" />
            TerNo List
          </TabsTrigger>
          <TabsTrigger value="form" className="gap-2">
            {selectedTerNo ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {selectedTerNo ? 'Edit TerNo' : 'Create TerNo'}
          </TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedTerNo} className="gap-2">
            <Eye className="h-4 w-4" />
            TerNo Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name, TerNo number, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Environments</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setEnvironmentFilter('all');
                  }}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredTerNos.length} of {terNos.length} TerNos
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export List
              </Button>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          </div>

          {/* TerNo Table */}
          <Card>
            <CardHeader>
              <CardTitle>TerNo List ({filteredTerNos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TerNo Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Monthly Volume</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTerNos.map((terno) => {
                    const StatusIcon = getStatusIcon(terno.status);
                    
                    return (
                      <TableRow key={terno.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-gray-400" />
                            <span className="font-mono font-medium">{terno.ternoNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{terno.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48">
                              {terno.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StatusIcon className="h-4 w-4" />
                            <Badge className={getStatusColor(terno.status)}>
                              {terno.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getEnvironmentColor(terno.environment)}>
                            {terno.environment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span>{terno.country}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{terno.transactionCount.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {formatCurrency(terno.monthlyVolume, terno.currency)}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {terno.lastUsed ? formatDate(terno.lastUsed) : 'Never'}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(terno)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(terno)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => copyToClipboard(terno.apiKey)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy API Key
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <TerNoForm 
            terno={selectedTerNo} 
            onSave={() => setActiveTab('list')}
            onCancel={() => setActiveTab('list')}
          />
        </TabsContent>

        <TabsContent value="details">
          {selectedTerNo && (
            <TerNoDetails 
              terno={selectedTerNo}
              onEdit={() => setActiveTab('form')}
              onBack={() => setActiveTab('list')}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TerNoManagement;
