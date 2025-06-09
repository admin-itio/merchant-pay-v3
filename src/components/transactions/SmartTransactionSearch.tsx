
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  X, 
  DollarSign, 
  Calendar,
  Users,
  CreditCard,
  MapPin,
  Hash
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SearchFilter {
  type: 'amount' | 'date' | 'customer' | 'payment_method' | 'country' | 'transaction_id';
  label: string;
  value: any;
  display: string;
}

interface SmartTransactionSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  placeholder?: string;
}

const SmartTransactionSearch = ({ onSearch, placeholder }: SmartTransactionSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter configurations
  const [amountRange, setAmountRange] = useState([0, 10000]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [customerSegment, setCustomerSegment] = useState('');

  const paymentMethods = [
    'Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer'
  ];

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 
    'Australia', 'Japan', 'Singapore', 'Netherlands', 'Sweden'
  ];

  const customerSegments = [
    'VIP Customers', 'New Customers', 'Returning Customers', 'High Volume', 'At Risk'
  ];

  const addFilter = (filter: SearchFilter) => {
    const exists = activeFilters.find(f => f.type === filter.type && f.value === filter.value);
    if (!exists) {
      setActiveFilters(prev => [...prev, filter]);
    }
  };

  const removeFilter = (index: number) => {
    setActiveFilters(prev => prev.filter((_, i) => i !== index));
  };

  const handleAmountFilter = () => {
    addFilter({
      type: 'amount',
      label: 'Amount Range',
      value: amountRange,
      display: `$${amountRange[0]} - $${amountRange[1]}`
    });
  };

  const handlePaymentMethodFilter = (method: string) => {
    const newMethods = selectedPaymentMethods.includes(method)
      ? selectedPaymentMethods.filter(m => m !== method)
      : [...selectedPaymentMethods, method];
    
    setSelectedPaymentMethods(newMethods);
    
    if (newMethods.length > 0) {
      addFilter({
        type: 'payment_method',
        label: 'Payment Method',
        value: newMethods,
        display: newMethods.join(', ')
      });
    } else {
      setActiveFilters(prev => prev.filter(f => f.type !== 'payment_method'));
    }
  };

  const handleCountryFilter = (country: string) => {
    const newCountries = selectedCountries.includes(country)
      ? selectedCountries.filter(c => c !== country)
      : [...selectedCountries, country];
    
    setSelectedCountries(newCountries);
    
    if (newCountries.length > 0) {
      addFilter({
        type: 'country',
        label: 'Country',
        value: newCountries,
        display: newCountries.join(', ')
      });
    } else {
      setActiveFilters(prev => prev.filter(f => f.type !== 'country'));
    }
  };

  const handleCustomerSegmentFilter = (segment: string) => {
    setCustomerSegment(segment);
    addFilter({
      type: 'customer',
      label: 'Customer Segment',
      value: segment,
      display: segment
    });
  };

  const handleSearch = () => {
    onSearch(searchQuery, activeFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setAmountRange([0, 10000]);
    setSelectedPaymentMethods([]);
    setSelectedCountries([]);
    setCustomerSegment('');
  };

  const getFilterIcon = (type: string) => {
    switch (type) {
      case 'amount': return <DollarSign className="h-3 w-3" />;
      case 'date': return <Calendar className="h-3 w-3" />;
      case 'customer': return <Users className="h-3 w-3" />;
      case 'payment_method': return <CreditCard className="h-3 w-3" />;
      case 'country': return <MapPin className="h-3 w-3" />;
      case 'transaction_id': return <Hash className="h-3 w-3" />;
      default: return <Filter className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder || "Search transactions by ID, email, amount, or any keyword..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white" side="bottom" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Smart Filters</h4>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Amount Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount Range</Label>
                  <Slider
                    value={amountRange}
                    onValueChange={setAmountRange}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${amountRange[0]}</span>
                    <span>${amountRange[1]}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={handleAmountFilter}>
                    Apply Amount Filter
                  </Button>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Payment Methods</Label>
                  <div className="grid grid-cols-2 gap-1">
                    {paymentMethods.map((method) => (
                      <Badge
                        key={method}
                        variant={selectedPaymentMethods.includes(method) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => handlePaymentMethodFilter(method)}
                      >
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Countries</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {countries.map((country) => (
                      <Badge
                        key={country}
                        variant={selectedCountries.includes(country) ? "default" : "outline"}
                        className="cursor-pointer text-xs mr-1 mb-1"
                        onClick={() => handleCountryFilter(country)}
                      >
                        {country}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Customer Segments */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Customer Segments</Label>
                  <div className="space-y-1">
                    {customerSegments.map((segment) => (
                      <Badge
                        key={segment}
                        variant={customerSegment === segment ? "default" : "outline"}
                        className="cursor-pointer text-xs mr-1"
                        onClick={() => handleCustomerSegmentFilter(segment)}
                      >
                        {segment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {getFilterIcon(filter.type)}
                  <span className="text-xs">{filter.label}: {filter.display}</span>
                  <button
                    onClick={() => removeFilter(index)}
                    className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Suggestions */}
      <div className="text-xs text-gray-500">
        <p>💡 Try searching for: "amount:>1000", "status:failed", "last week", or specific transaction IDs</p>
      </div>
    </div>
  );
};

export default SmartTransactionSearch;
