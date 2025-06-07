
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  CreditCard,
  MapPin,
  User
} from 'lucide-react';

interface TransactionSearchProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
  searchTerm: string;
  activeFilters: Record<string, string>;
}

const TransactionSearch = ({ 
  onSearch, 
  onFilterChange, 
  searchTerm, 
  activeFilters 
}: TransactionSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(activeFilters);

  const filterOptions = {
    status: ['completed', 'pending', 'failed', 'refunded', 'chargeback'],
    gateway: ['Stripe', 'PayPal', 'Square', 'Adyen', 'Authorize.Net'],
    paymentMethod: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'],
    country: ['United States', 'United Kingdom', 'Germany', 'France', 'Canada']
  };

  const handleFilterApply = () => {
    onFilterChange(tempFilters);
    setShowFilters(false);
  };

  const handleFilterClear = () => {
    setTempFilters({});
    onFilterChange({});
    setShowFilters(false);
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    onFilterChange(newFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by transaction ID, customer, email, or reference..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              <span className="capitalize">{key}: {value}</span>
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => removeFilter(key)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({})}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-muted/50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Status
              </label>
              <Select 
                value={tempFilters.status || ''} 
                onValueChange={(value) => setTempFilters({...tempFilters, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  {filterOptions.status.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Gateway
              </label>
              <Select 
                value={tempFilters.gateway || ''} 
                onValueChange={(value) => setTempFilters({...tempFilters, gateway: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All gateways" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All gateways</SelectItem>
                  {filterOptions.gateway.map(gateway => (
                    <SelectItem key={gateway} value={gateway}>
                      {gateway}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Country
              </label>
              <Select 
                value={tempFilters.country || ''} 
                onValueChange={(value) => setTempFilters({...tempFilters, country: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All countries</SelectItem>
                  {filterOptions.country.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <User className="h-4 w-4" />
                Amount Range
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={tempFilters.minAmount || ''}
                  onChange={(e) => setTempFilters({...tempFilters, minAmount: e.target.value})}
                  className="w-20"
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={tempFilters.maxAmount || ''}
                  onChange={(e) => setTempFilters({...tempFilters, maxAmount: e.target.value})}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleFilterClear}>
              Clear All
            </Button>
            <Button onClick={handleFilterApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSearch;
