
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Building2, 
  Wallet,
  Globe,
  FileText,
  Smartphone
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Beneficiary {
  id: string;
  name: string;
  type: 'bank' | 'crypto';
  accountDetails: string;
  country?: string;
  currency: string;
  addedMethod: 'Web' | 'API' | 'Upload';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

const BeneficiaryManagement = () => {
  const [beneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      name: 'ABC Corp Ltd',
      type: 'bank',
      accountDetails: 'GB29 NWBK 6016 1331 9268 19',
      country: 'United Kingdom',
      currency: 'GBP',
      addedMethod: 'Web',
      status: 'active',
      createdAt: '2025-06-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Crypto Payments',
      type: 'crypto',
      accountDetails: '0x1234567890abcdef1234567890abcdef12345678',
      currency: 'USDT',
      addedMethod: 'API',
      status: 'active',
      createdAt: '2025-06-02T14:30:00Z'
    },
    {
      id: '3',
      name: 'Supplier XYZ',
      type: 'bank',
      accountDetails: 'US64 SVBK US6S 1234 5678 9012',
      country: 'United States',
      currency: 'USD',
      addedMethod: 'Upload',
      status: 'pending',
      createdAt: '2025-06-05T09:15:00Z'
    }
  ]);

  const getTypeIcon = (type: string) => {
    return type === 'bank' ? Building2 : Wallet;
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Web': return Globe;
      case 'API': return FileText;
      case 'Upload': return Upload;
      default: return Globe;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const downloadSampleFile = () => {
    // Create sample CSV data
    const csvContent = `Name,Type,Account Details,Country,Currency,Swift Code
ABC Corp,bank,GB29 NWBK 6016 1331 9268 19,United Kingdom,GBP,NWBKGB2L
Crypto Wallet,crypto,0x1234567890abcdef1234567890abcdef12345678,,USDT,
XYZ Supplier,bank,US64 SVBK US6S 1234 5678 9012,United States,USD,SVBKUS6S`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beneficiary_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Beneficiary Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage payout beneficiaries and their account details
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>
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
              {beneficiaries.filter(b => b.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {beneficiaries.filter(b => b.type === 'bank').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Bank Accounts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {beneficiaries.filter(b => b.type === 'crypto').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Crypto Wallets</div>
          </CardContent>
        </Card>
      </div>

      {/* Beneficiaries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Beneficiary List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account Details</TableHead>
                <TableHead>Country/Network</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Added Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {beneficiaries.map((beneficiary) => {
                const TypeIcon = getTypeIcon(beneficiary.type);
                const MethodIcon = getMethodIcon(beneficiary.addedMethod);
                
                return (
                  <TableRow key={beneficiary.id}>
                    <TableCell className="font-medium">{beneficiary.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        <span className="capitalize">{beneficiary.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {beneficiary.accountDetails.length > 20 
                          ? `${beneficiary.accountDetails.substring(0, 20)}...`
                          : beneficiary.accountDetails}
                      </span>
                    </TableCell>
                    <TableCell>{beneficiary.country || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{beneficiary.currency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MethodIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        {beneficiary.addedMethod}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(beneficiary.status)}>
                        {beneficiary.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
