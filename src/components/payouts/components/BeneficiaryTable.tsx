
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Building2, CreditCard, MapPin } from 'lucide-react';
import TransactionSettings from '@/components/transactions/TransactionSettings';

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

interface BeneficiaryTableProps {
  beneficiaries: Beneficiary[];
}

const BeneficiaryTable = ({ beneficiaries }: BeneficiaryTableProps) => {
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
  const [tableColumns, setTableColumns] = useState([
    { key: 'id', label: 'Settlement ID', visible: true, order: 0 },
    { key: 'amount', label: 'Amount', visible: true, order: 1 },
    { key: 'transactions', label: 'Transactions', visible: true, order: 2 },
    { key: 'fees', label: 'Fees', visible: true, order: 3 },
    { key: 'bankAccount', label: 'Bank Account', visible: true, order: 4 },
    { key: 'status', label: 'Status', visible: true, order: 5 },
    { key: 'date', label: 'Date', visible: true, order: 6 },
   
  ]);
 const handleColumnsChange = (columns: typeof tableColumns) => {
    setTableColumns(columns);
  };

  return (
    <Card>
      <CardHeader>
         <CardTitle className="text-base lg:text-lg font-semibold">
            <div className="flex items-center justify-between">
              <span>Beneficiaries ({beneficiaries.length})</span>
              <TransactionSettings
                columns={tableColumns}
                onColumnsChange={handleColumnsChange}
              />
            </div>
          </CardTitle>
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
            {beneficiaries.map((beneficiary) => {
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
  );
};

export default BeneficiaryTable;
