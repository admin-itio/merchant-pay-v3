
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Info } from 'lucide-react';

interface BasicInformationProps {
  data: any;
  onChange: (data: any) => void;
  isEditing: boolean;
}

const BasicInformation = ({ data, onChange, isEditing }: BasicInformationProps) => {
  const countries = [
    { code: 'MY', name: 'Malaysia', currency: 'MYR' },
    { code: 'SG', name: 'Singapore', currency: 'SGD' },
    { code: 'TH', name: 'Thailand', currency: 'THB' },
    { code: 'ID', name: 'Indonesia', currency: 'IDR' },
    { code: 'PH', name: 'Philippines', currency: 'PHP' },
    { code: 'VN', name: 'Vietnam', currency: 'VND' },
  ];

  const businessTypes = [
    'E-commerce',
    'Retail',
    'Restaurant',
    'Hotel',
    'Healthcare',
    'Education',
    'Professional Services',
    'Technology',
    'Gaming',
    'Travel',
    'Financial Services',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
    
    // Auto-set currency when country changes
    if (field === 'country') {
      const country = countries.find(c => c.code === value);
      if (country) {
        onChange({ ...data, [field]: value, currency: country.currency });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* TerNo Number - only shown when editing */}
      {isEditing && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  TerNo Number: TRN001
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  This is your unique Terminal Number identifier. It cannot be changed after creation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">TerNo Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Main Store Terminal"
                  value={data.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A descriptive name for this payment terminal
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose and usage of this TerNo"
                  value={data.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={data.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Operating Country *</Label>
                <Select value={data.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name} ({country.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Base Currency *</Label>
                <Select value={data.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.currency} value={country.currency}>
                        {country.currency} - {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primary currency for transactions processed through this TerNo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment *</Label>
                <Select value={data.environment} onValueChange={(value) => handleInputChange('environment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                    <SelectItem value="production">Production (Live)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose sandbox for testing or production for live transactions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information Card */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Important Notes
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                <li>• Fields marked with * are required</li>
                <li>• Country and currency settings affect available payment methods</li>
                <li>• Environment cannot be changed after TerNo creation</li>
                <li>• Choose sandbox environment for testing and development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInformation;
