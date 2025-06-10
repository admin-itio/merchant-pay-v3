import React, { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal, Edit, Trash2, Building2, CreditCard, MapPin
} from 'lucide-react';
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
  const [tableColumns, setTableColumns] = useState([
    { key: 'benId', label: 'Ben ID', visible: true, order: 0 },
    { key: 'name', label: 'Name', visible: true, order: 1 },
    { key: 'type', label: 'Type', visible: true, order: 2 },
    { key: 'account', label: 'Account', visible: true, order: 3 },
    { key: 'country', label: 'Country', visible: true, order: 4 },
    { key: 'currency', label: 'Currency', visible: true, order: 5 },
    { key: 'status', label: 'Status', visible: true, order: 6 },
    { key: 'lastUsed', label: 'Last Used', visible: true, order: 7 },
  ]);

  const handleColumnsChange = (columns: typeof tableColumns) => {
    setTableColumns(columns);
  };

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
              {tableColumns
                .filter(col => col.visible)
                .sort((a, b) => a.order - b.order)
                .map(col => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {beneficiaries.map((beneficiary) => {
              const TypeIcon = getTypeIcon(beneficiary.type);
              return (
                <TableRow key={beneficiary.id}>
                  {tableColumns
                    .filter(col => col.visible)
                    .sort((a, b) => a.order - b.order)
                    .map(col => {
                      const key = col.key;
                      switch (key) {
                        case 'benId':
                          return (
                            <TableCell key="benId" className="font-mono text-sm">
                              {beneficiary.benId}
                            </TableCell>
                          );
                        case 'name':
                          return (
                            <TableCell key="name">
                              <div className="flex items-center gap-2">
                                <TypeIcon className="h-4 w-4 text-gray-500" />
                                <div className="font-medium">{beneficiary.name}</div>
                              </div>
                            </TableCell>
                          );
                        case 'type':
                          return (
                            <TableCell key="type">
                              <Badge variant="outline">{beneficiary.type}</Badge>
                            </TableCell>
                          );
                        case 'account':
                          return (
                            <TableCell key="account">
                              <div className="text-sm">
                                <div className="font-medium">{beneficiary.accountType}</div>
                                <div className="text-gray-500">{beneficiary.accountNumber}</div>
                                {beneficiary.bankName && (
                                  <div className="text-xs text-gray-400">{beneficiary.bankName}</div>
                                )}
                              </div>
                            </TableCell>
                          );
                        case 'country':
                          return (
                            <TableCell key="country">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                {beneficiary.country}
                              </div>
                            </TableCell>
                          );
                        case 'currency':
                          return (
                            <TableCell key="currency">{beneficiary.currency}</TableCell>
                          );
                        case 'status':
                          return (
                            <TableCell key="status">
                              <Badge className={getStatusColor(beneficiary.status)}>
                                {beneficiary.status}
                              </Badge>
                            </TableCell>
                          );
                        case 'lastUsed':
                          return (
                            <TableCell key="lastUsed">
                              {beneficiary.lastUsed ? (
                                <div className="text-sm">
                                  {new Date(beneficiary.lastUsed).toLocaleDateString()}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">Never</span>
                              )}
                            </TableCell>
                          );
                        default:
                          return null;
                      }
                    })}
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
