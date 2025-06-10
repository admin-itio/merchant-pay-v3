
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
  const businessClassifications = [
    'Accounting & Bookkeeping Services',
    'Advertising & Marketing',
    'Agriculture & Farming',
    'Airlines & Aviation',
    'Architecture & Engineering',
    'Arts & Entertainment',
    'Automotive Sales & Services',
    'Banking & Financial Services',
    'Beauty & Personal Care',
    'Building & Construction',
    'Business Consulting',
    'Charitable Organizations',
    'Chemical Manufacturing',
    'Childcare & Education Services',
    'Clothing & Fashion',
    'Computer Hardware & Software',
    'Consulting Services',
    'Consumer Electronics',
    'Cosmetics & Beauty Products',
    'Data Processing & Hosting',
    'Dental Services',
    'Digital Marketing',
    'E-commerce & Online Retail',
    'Education & Training',
    'Electronics Manufacturing',
    'Emergency Services',
    'Energy & Utilities',
    'Environmental Services',
    'Event Planning & Management',
    'Fashion & Apparel',
    'Financial Planning & Investment',
    'Fitness & Health Clubs',
    'Food & Beverage Manufacturing',
    'Food & Restaurant Services',
    'Freight & Logistics',
    'Furniture & Home Decor',
    'Gaming & Entertainment',
    'Government Services',
    'Grocery & Supermarkets',
    'Healthcare & Medical Services',
    'Home Improvement & Repair',
    'Hospitality & Hotels',
    'Human Resources',
    'Insurance Services',
    'Interior Design',
    'Internet & Technology',
    'Investment Services',
    'IT Services & Consulting',
    'Jewelry & Luxury Goods',
    'Legal Services',
    'Leisure & Recreation',
    'Logistics & Transportation',
    'Manufacturing & Industrial',
    'Marketing & Advertising',
    'Media & Publishing',
    'Medical Devices & Equipment',
    'Mining & Extraction',
    'Mobile App Development',
    'Music & Audio Services',
    'Non-profit Organizations',
    'Office Supplies & Equipment',
    'Oil & Gas',
    'Online Services',
    'Pharmaceutical',
    'Photography & Video',
    'Physical Therapy & Rehabilitation',
    'Professional Services',
    'Real Estate',
    'Renewable Energy',
    'Repair & Maintenance',
    'Research & Development',
    'Restaurant & Food Service',
    'Retail & Shopping',
    'Security Services',
    'Social Media & Networking',
    'Software Development',
    'Sports & Recreation',
    'Telecommunications',
    'Textiles & Clothing',
    'Tourism & Travel',
    'Transportation & Delivery',
    'Veterinary Services',
    'Waste Management',
    'Web Development & Design',
    'Wholesale & Distribution',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
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
                <Label htmlFor="businessClassification">Business Classification *</Label>
                <Select value={data.businessClassification} onValueChange={(value) => handleInputChange('businessClassification', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business classification" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <div className="p-2">
                      <Input placeholder="Search business classification..." className="mb-2" />
                    </div>
                    {businessClassifications.map((classification) => (
                      <SelectItem key={classification} value={classification}>
                        {classification}
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
              <CardTitle>Environment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <li>• Business classification affects available payment methods and features</li>
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
