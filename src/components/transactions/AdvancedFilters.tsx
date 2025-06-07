import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FilterValues {
  [key: string]: string;
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterValues) => void;
  activeFilters: FilterValues;
}

const AdvancedFilters = ({ onFiltersChange, activeFilters }: AdvancedFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterValues>({
    status: '',
    gateway: '',
    paymentMethod: '',
    country: '',
    minAmount: '',
    maxAmount: '',
    fraudScoreMin: '',
    fraudScoreMax: '',
    dateFrom: '',
    dateTo: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'chargeback', label: 'Chargeback' }
  ];

  const gatewayOptions = [
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'square', label: 'Square' },
    { value: 'adyen', label: 'Adyen' },
    { value: 'authorize', label: 'Authorize.Net' }
  ];

  const paymentMethodOptions = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'apple-pay', label: 'Apple Pay' },
    { value: 'google-pay', label: 'Google Pay' }
  ];

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setLocalFilters({
      status: '',
      gateway: '',
      paymentMethod: '',
      country: '',
      minAmount: '',
      maxAmount: '',
      fraudScoreMin: '',
      fraudScoreMax: '',
      dateFrom: '',
      dateTo: ''
    });
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).filter(value => value !== '').length;
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Advanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
            
            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={localFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Gateway</Label>
                <Select value={localFilters.gateway} onValueChange={(value) => handleFilterChange('gateway', value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    {gatewayOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Payment Method</Label>
                <Select value={localFilters.paymentMethod} onValueChange={(value) => handleFilterChange('paymentMethod', value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethodOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Country</Label>
                <Select value={localFilters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amount Range</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  value={localFilters.minAmount}
                  onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                  className="h-8"
                />
                <Input
                  placeholder="Max"
                  value={localFilters.maxAmount}
                  onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fraud Score Range</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  value={localFilters.fraudScoreMin}
                  onChange={(e) => handleFilterChange('fraudScoreMin', e.target.value)}
                  className="h-8"
                />
                <Input
                  placeholder="Max"
                  value={localFilters.fraudScoreMax}
                  onChange={(e) => handleFilterChange('fraudScoreMax', e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filter Badges - Fixed TypeScript error */}
      {Object.entries(activeFilters).map(([key, value]) => (
        value ? (
          <Badge key={key} variant="secondary" className="flex items-center gap-1">
            {key}: {String(value)}
            <X 
              className="h-3 w-3 cursor-pointer hover:text-red-500" 
              onClick={() => removeFilter(key)}
            />
          </Badge>
        ) : null
      ))}
    </div>
  );
};

export default AdvancedFilters;
