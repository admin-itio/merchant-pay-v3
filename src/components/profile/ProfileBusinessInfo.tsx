
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Phone, Mail, Globe, FileText, Upload, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BusinessInfo {
  companyName: string;
  legalName: string;
  businessType: string;
  industry: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  taxId: string;
  registrationNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

const ProfileBusinessInfo = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: 'Acme Corporation',
    legalName: 'Acme Corporation LLC',
    businessType: 'LLC',
    industry: 'Technology',
    description: 'We provide innovative payment solutions for modern businesses.',
    website: 'https://acme.com',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    taxId: 'XX-XXXXXXX',
    registrationNumber: 'REG123456789',
    address: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    verificationStatus: 'verified'
  });

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Corporation',
    'Non-Profit',
    'Other'
  ];

  const industries = [
    'Technology',
    'E-commerce',
    'Healthcare',
    'Education',
    'Finance',
    'Retail',
    'Manufacturing',
    'Services',
    'Other'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Other'
  ];

  const handleSave = () => {
    toast({
      title: "Business Information Updated",
      description: "Your business information has been successfully updated",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form would go here
  };

  const updateBusinessInfo = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBusinessInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BusinessInfo],
          [child]: value
        }
      }));
    } else {
      setBusinessInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getVerificationBadge = () => {
    switch (businessInfo.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">
          <Check className="h-3 w-3 mr-1" />
          Verified
        </Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Verification</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Verification Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Verification Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>Manage your business details and verification status</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {getVerificationBadge()}
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Information
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>Basic information about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={businessInfo.companyName}
                onChange={(e) => updateBusinessInfo('companyName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Business Name</Label>
              <Input
                id="legalName"
                value={businessInfo.legalName}
                onChange={(e) => updateBusinessInfo('legalName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={businessInfo.businessType}
                onValueChange={(value) => updateBusinessInfo('businessType', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={businessInfo.industry}
                onValueChange={(value) => updateBusinessInfo('industry', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={businessInfo.description}
              onChange={(e) => updateBusinessInfo('description', e.target.value)}
              placeholder="Describe your business and what you do"
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>How customers and partners can reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={businessInfo.email}
                  onChange={(e) => updateBusinessInfo('email', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={businessInfo.phone}
                  onChange={(e) => updateBusinessInfo('phone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="website"
                type="url"
                value={businessInfo.website}
                onChange={(e) => updateBusinessInfo('website', e.target.value)}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal Information
          </CardTitle>
          <CardDescription>Tax and registration details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={businessInfo.taxId}
                onChange={(e) => updateBusinessInfo('taxId', e.target.value)}
                disabled={!isEditing}
                placeholder="XX-XXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={businessInfo.registrationNumber}
                onChange={(e) => updateBusinessInfo('registrationNumber', e.target.value)}
                disabled={!isEditing}
                placeholder="Business registration number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Business Address
          </CardTitle>
          <CardDescription>Your registered business location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={businessInfo.address.street}
              onChange={(e) => updateBusinessInfo('address.street', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={businessInfo.address.city}
                onChange={(e) => updateBusinessInfo('address.city', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={businessInfo.address.state}
                onChange={(e) => updateBusinessInfo('address.state', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={businessInfo.address.postalCode}
                onChange={(e) => updateBusinessInfo('address.postalCode', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={businessInfo.address.country}
                onValueChange={(value) => updateBusinessInfo('address.country', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Verification Documents
          </CardTitle>
          <CardDescription>Upload required documents for business verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Business License</h3>
                <p className="text-xs text-gray-500 mt-1">Upload your business license or registration certificate</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload File
                </Button>
              </div>
            </div>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Tax Documents</h3>
                <p className="text-xs text-gray-500 mt-1">Upload tax ID verification or similar documents</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBusinessInfo;
