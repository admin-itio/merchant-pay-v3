import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import BeneficiaryStats from './components/BeneficiaryStats';
import BeneficiaryTable from './components/BeneficiaryTable';

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

  const filteredBeneficiaries = beneficiaries.filter(ben => {
    const matchesSearch = ben.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ben.benId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ben.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: beneficiaries.length,
    active: beneficiaries.filter(b => b.status === 'Active').length,
    pending: beneficiaries.filter(b => b.status === 'Pending').length,
    business: beneficiaries.filter(b => b.type === 'Business').length
  };

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

      <BeneficiaryStats {...stats} />

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

      <BeneficiaryTable beneficiaries={filteredBeneficiaries} />
    </div>
  );
};

export default BeneficiaryManagement;
