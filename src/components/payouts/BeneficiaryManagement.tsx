
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Building2,
  CreditCard,
  MapPin
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Beneficiary {
  id: string;
  benId: string;
  name: string;
  type: 'Individual' | 'Business';
  accountType: 'Bank Account' | 'Crypto Wallet' | 'PayPal';
  accountNumber: string;
  bankName?: string;
  country: string;
  currency: string;
  status: 'Active' | 'Pending' | 'Suspended';
  createdAt: string;
  lastUsed?: string;
}

const BeneficiaryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const [beneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      benId: 'BEN001',
      name: 'ABC Corp Ltd',
      type: 'Business',
      accountType: 'Bank Account',
      accountNumber: '****1234',
      bankName: 'Chase Bank',
      country: 'United States',
      currency: 'USD',
      status: 'Active',
      createdAt: '2025-06-01T10:30:00Z',
      lastUsed: '2025-06-07T10:30:00Z'
    },
    {
      id: '2',
      benId: 'BEN002',
      name: 'Crypto Payments',
      type: 'Business',
      accountType: 'Crypto Wallet',
      accountNumber: '0x1234...abcd',
      country: 'Singapore',
      currency: 'USDT',
      status: 'Active',
      createdAt: '2025-06-02T14:20:00Z',
      lastUsed: '2025-06-07T09:15:00Z'
    },
    {
      id: '3',
      benId: 'BEN003',
      name: 'John Smith',
      type: 'Individual',
      accountType: 'PayPal',
      accountNumber: 'john.smith@email.com',
      country: 'United Kingdom',
      currency: 'GBP',
      status: 'Pending',
      createdAt: '2025-06-05T09:45:00Z'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Business': return Building2;
      case 'Individual': return CreditCard;
      default: return CreditCard;
    }
  };

  const filteredBeneficiaries = beneficiaries.filter(ben => {
    const matchesSearch = ben.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ben.benId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ben.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || ben.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Beneficiary Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage payout recipients and their account details
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Beneficiary
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {beneficiaries.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Beneficiaries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {beneficiaries.filter(b => b.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {beneficiaries.filter(b => b.status === 'Pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {beneficiaries.filter(b => b.type === 'Business').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Business Accounts</div>
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
                  placeholder="Search by name, Ben ID, or account number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficiaries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Beneficiaries ({filteredBeneficiaries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ben ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.map((beneficiary) => {
                const TypeIcon = getTypeIcon(beneficiary.type);
                return (
                  <TableRow key={beneficiary.id}>
                    <TableCell className="font-mono text-sm">
                      {beneficiary.benId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium">{beneficiary.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{beneficiary.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{beneficiary.accountType}</div>
                        <div className="text-gray-500">{beneficiary.accountNumber}</div>
                        {beneficiary.bankName && (
                          <div className="text-xs text-gray-400">{beneficiary.bankName}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {beneficiary.country}
                      </div>
                    </TableCell>
                    <TableCell>{beneficiary.currency}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(beneficiary.status)}>
                        {beneficiary.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {beneficiary.lastUsed ? (
                        <div className="text-sm">
                          {new Date(beneficiary.lastUsed).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
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
    </div>
  );
};

export default BeneficiaryManagement;
