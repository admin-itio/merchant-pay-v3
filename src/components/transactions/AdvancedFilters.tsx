
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  Search, 
  Calendar,
  CreditCard,
  MapPin,
  DollarSign,
  AlertTriangle,
  User
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FilterProps {
  onFiltersChange: (filters: any) => void;
  activeFilters: any;
}

const AdvancedFilters = ({ onFiltersChange, activeFilters }: FilterProps) => {
  const [filters, setFilters] = useState({
    transactionId: '',
    customerEmail: '',
    customerPhone: '',
    merchantRef: '',
    amountMin: '',
    amountMax: '',
    status: 'all',
    paymentMethod: 'all',
    gateway: 'all',
    country: 'all',
    currency: 'all',
    fraudScoreMin: '',
    fraudScoreMax: '',
    ipAddress: '',
    dateFrom: '',
    dateTo: '',
    responseCode: '',
    ...activeFilters
  });

  const filterCategories = [
    {
      title: 'Transaction Details',
      icon: CreditCard,
      fields: [
        { key: 'transactionId', label: 'Transaction ID', type: 'text', placeholder: 'TXN-2024-001' },
        { key: 'merchantRef', label: 'Merchant Reference', type: 'text', placeholder: 'ORD-2024-001' },
        { key: 'responseCode', label: 'Response Code', type: 'text', placeholder: '00, 51, etc.' }
      ]
    },
    {
      title: 'Amount & Currency',
      icon: DollarSign,
      fields: [
        { key: 'amountMin', label: 'Min Amount', type: 'number', placeholder: '0' },
        { key: 'amountMax', label: 'Max Amount', type: 'number', placeholder: '100000' },
        { key: 'currency', label: 'Currency', type: 'select', options: [
          { value: 'all', label: 'All Currencies' },
          { value: 'INR', label: 'INR' },
          { value: 'USD', label: 'USD' },
          { value: 'EUR', label: 'EUR' },
          { value: 'GBP', label: 'GBP' }
        ]}
      ]
    },
    {
      title: 'Customer Information',
      icon: User,
      fields: [
        { key: 'customerEmail', label: 'Customer Email', type: 'email', placeholder: 'customer@email.com' },
        { key: 'customerPhone', label: 'Customer Phone', type: 'tel', placeholder: '+91 9876543210' },
        { key: 'ipAddress', label: 'IP Address', type: 'text', placeholder: '192.168.1.1' }
      ]
    },
    {
      title: 'Payment & Gateway',
      icon: CreditCard,
      fields: [
        { key: 'status', label: 'Status', type: 'select', options: [
          { value: 'all', label: 'All Status' },
          { value: 'completed', label: 'Completed' },
          { value: 'pending', label: 'Pending' },
          { value: 'failed', label: 'Failed' },
          { value: 'refunded', label: 'Refunded' },
          { value: 'chargeback', label: 'Chargeback' }
        ]},
        { key: 'paymentMethod', label: 'Payment Method', type: 'select', options: [
          { value: 'all', label: 'All Methods' },
          { value: 'card', label: 'Card' },
          { value: 'upi', label: 'UPI' },
          { value: 'netbanking', label: 'Net Banking' },
          { value: 'wallet', label: 'Wallet' }
        ]},
        { key: 'gateway', label: 'Gateway', type: 'select', options: [
          { value: 'all', label: 'All Gateways' },
          { value: 'stripe', label: 'Stripe' },
          { value: 'razorpay', label: 'Razorpay' },
          { value: 'payu', label: 'PayU' },
          { value: 'ccavenue', label: 'CCAvenue' }
        ]}
      ]
    },
    {
      title: 'Risk & Geography',
      icon: AlertTriangle,
      fields: [
        { key: 'fraudScoreMin', label: 'Min Fraud Score', type: 'number', placeholder: '0' },
        { key: 'fraudScoreMax', label: 'Max Fraud Score', type: 'number', placeholder: '100' },
        { key: 'country', label: 'Country', type: 'select', options: [
          { value: 'all', label: 'All Countries' },
          { value: 'IN', label: 'India' },
          { value: 'US', label: 'United States' },
          { value: 'GB', label: 'United Kingdom' },
          { value: 'CA', label: 'Canada' }
        ]}
      ]
    },
    {
      title: 'Date Range',
      icon: Calendar,
      fields: [
        { key: 'dateFrom', label: 'From Date', type: 'date' },
        { key: 'dateTo', label: 'To Date', type: 'date' }
      ]
    }
  ];

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = key.includes('Min') || key.includes('Max') || key.includes('date') ? '' : 'all';
      return acc;
    }, {} as any);
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (typeof value === 'string') {
        return value !== '' && value !== 'all';
      }
      return false;
    }).length;
  };

  const renderField = (field: any) => {
    if (field.type === 'select') {
      return (
        <Select value={filters[field.key]} onValueChange={(value) => updateFilter(field.key, value)}>
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type={field.type}
        placeholder={field.placeholder}
        value={filters[field.key]}
        onChange={(e) => updateFilter(field.key, e.target.value)}
        className="text-sm"
      />
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Advanced </span>Filters
          {getActiveFilterCount() > 0 && (
            <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-2xl lg:max-w-4xl bg-white max-h-[90vh] overflow-y-auto p-4 lg:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg lg:text-xl">
            <Filter className="h-5 w-5" />
            Advanced Transaction Filters
          </DialogTitle>
          <DialogDescription className="text-sm lg:text-base">
            Search and filter transactions by any field or combination of criteria
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 lg:space-y-6">
          {filterCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title}>
                <CardHeader className="pb-2 lg:pb-3">
                  <CardTitle className="text-sm lg:text-base flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 lg:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {category.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="flex flex-col sm:flex-row justify-between gap-3 lg:gap-4 pt-2">
            <Button variant="outline" onClick={clearFilters} className="flex-1 text-sm">
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
            <Button onClick={applyFilters} className="flex-1 text-sm">
              <Search className="h-4 w-4 mr-2" />
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilters;
