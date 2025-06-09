
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  DollarSign,
  CreditCard,
  User,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SmartFilter {
  id: string;
  type: 'amount' | 'date' | 'status' | 'customer' | 'country' | 'payment_method' | 'fraud_score';
  label: string;
  value: any;
  operator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'between';
}

interface SmartTransactionSearchProps {
  onSearch: (query: string, filters: SmartFilter[]) => void;
  placeholder?: string;
}

const SmartTransactionSearch = ({ onSearch, placeholder = "Search transactions..." }: SmartTransactionSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SmartFilter[]>([]);
  const [showFilterBuilder, setShowFilterBuilder] = useState(false);

  const filterTypes = [
    { type: 'amount', label: 'Amount', icon: DollarSign },
    { type: 'date', label: 'Date Range', icon: Calendar },
    { type: 'status', label: 'Status', icon: Shield },
    { type: 'customer', label: 'Customer', icon: User },
    { type: 'country', label: 'Country', icon: MapPin },
    { type: 'payment_method', label: 'Payment Method', icon: CreditCard },
    { type: 'fraud_score', label: 'Fraud Score', icon: Shield }
  ];

  const statusOptions = ['completed', 'pending', 'failed', 'refunded', 'chargeback'];
  const paymentMethodOptions = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'];
  const countryOptions = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada'];

  const addFilter = (type: string) => {
    const newFilter: SmartFilter = {
      id: Date.now().toString(),
      type: type as any,
      label: filterTypes.find(f => f.type === type)?.label || type,
      value: '',
      operator: 'eq'
    };
    
    setActiveFilters([...activeFilters, newFilter]);
    setShowFilterBuilder(false);
  };

  const updateFilter = (filterId: string, updates: Partial<SmartFilter>) => {
    setActiveFilters(filters => 
      filters.map(filter => 
        filter.id === filterId ? { ...filter, ...updates } : filter
      )
    );
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters(filters => filters.filter(f => f.id !== filterId));
  };

  const handleSearch = () => {
    onSearch(searchQuery, activeFilters);
  };

  const renderFilterValue = (filter: SmartFilter) => {
    switch (filter.type) {
      case 'amount':
        return (
          <div className="flex gap-2 items-center">
            <Select 
              value={filter.operator} 
              onValueChange={(value) => updateFilter(filter.id, { operator: value as any })}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eq">=</SelectItem>
                <SelectItem value="gt">&gt;</SelectItem>
                <SelectItem value="lt">&lt;</SelectItem>
                <SelectItem value="gte">≥</SelectItem>
                <SelectItem value="lte">≤</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Amount"
              value={filter.value}
              onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
              className="w-24"
            />
          </div>
        );
      
      case 'status':
        return (
          <Select 
            value={filter.value} 
            onValueChange={(value) => updateFilter(filter.id, { value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'payment_method':
        return (
          <Select 
            value={filter.value} 
            onValueChange={(value) => updateFilter(filter.id, { value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'country':
        return (
          <Select 
            value={filter.value} 
            onValueChange={(value) => updateFilter(filter.id, { value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'fraud_score':
        return (
          <div className="flex gap-2 items-center">
            <Select 
              value={filter.operator} 
              onValueChange={(value) => updateFilter(filter.id, { operator: value as any })}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lt">&lt;</SelectItem>
                <SelectItem value="lte">≤</SelectItem>
                <SelectItem value="gt">&gt;</SelectItem>
                <SelectItem value="gte">≥</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Score"
              value={filter.value}
              onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
              className="w-20"
              min="0"
              max="100"
            />
          </div>
        );

      case 'date':
        return (
          <div className="flex gap-2">
            <Input
              type="date"
              value={filter.value?.from || ''}
              onChange={(e) => updateFilter(filter.id, { 
                value: { ...filter.value, from: e.target.value }
              })}
              className="w-32"
            />
            <span className="text-gray-500">to</span>
            <Input
              type="date"
              value={filter.value?.to || ''}
              onChange={(e) => updateFilter(filter.id, { 
                value: { ...filter.value, to: e.target.value }
              })}
              className="w-32"
            />
          </div>
        );

      default:
        return (
          <Input
            placeholder={`Enter ${filter.label.toLowerCase()}`}
            value={filter.value}
            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
            className="w-32"
          />
        );
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Popover open={showFilterBuilder} onOpenChange={setShowFilterBuilder}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Add Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Add Filter</h4>
                  <div className="grid gap-2">
                    {filterTypes.map(filterType => {
                      const Icon = filterType.icon;
                      return (
                        <Button
                          key={filterType.type}
                          variant="ghost"
                          size="sm"
                          onClick={() => addFilter(filterType.type)}
                          className="justify-start h-8"
                        >
                          <Icon className="h-3 w-3 mr-2" />
                          {filterType.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button onClick={handleSearch} className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-3 w-3" />
                Active Filters:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <div key={filter.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded border">
                    <span className="text-xs font-medium text-blue-700">{filter.label}:</span>
                    {renderFilterValue(filter)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFilter(filter.id)}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              Quick filters:
            </span>
            {[
              { label: 'High Value (>$1000)', filter: { type: 'amount', operator: 'gt', value: '1000' } },
              { label: 'Failed Today', filter: { type: 'status', value: 'failed' } },
              { label: 'High Risk (>70)', filter: { type: 'fraud_score', operator: 'gt', value: '70' } }
            ].map((quick, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  const newFilter: SmartFilter = {
                    id: Date.now().toString(),
                    type: quick.filter.type as any,
                    label: filterTypes.find(f => f.type === quick.filter.type)?.label || quick.filter.type,
                    value: quick.filter.value,
                    operator: (quick.filter.operator as any) || 'eq'
                  };
                  setActiveFilters([...activeFilters, newFilter]);
                }}
              >
                {quick.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartTransactionSearch;
