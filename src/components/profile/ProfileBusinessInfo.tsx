
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Phone, Mail, Globe, FileText, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileBusinessInfo = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [businessInfo, setBusinessInfo] = useState({
    companyName: 'Acme Corporation',
    legalName: 'Acme Corporation Ltd.',
    businessType: 'Corporation',
    industry: 'Technology',
    taxId: '12-3456789',
    registrationNumber: 'REG123456789',
    website: 'https://acme.com',
    description: 'Leading technology solutions provider focusing on payment processing and financial services.',
    address: {
      street: '123 Business Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'contact@acme.com',
      supportEmail: 'support@acme.com'
    },
    compliance: {
      pciCompliant: true,
      kycVerified: true,
      amlCompliant: true,
      gdprCompliant: true
    }
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    toast({
      title: "Business Information Updated",
      description: "Your business information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes
  };

  const handleInputChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section: string, field: string, value: string | boolean) => {
    setBusinessInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as object,
        [field]: value
      }
    }));
  };

  const businessTypes = [
    'Corporation',
    'LLC',
    'Partnership',
    'Sole Proprietorship',
    'Non-Profit'
  ];

  const industries = [
    'Technology',
    'E-commerce',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>Manage your company details and compliance status</CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Information</Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={businessInfo.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Name</Label>
              <Input
                id="legalName"
                value={businessInfo.legalName}
                onChange={(e) => handleInputChange('legalName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={businessInfo.businessType}
                onValueChange={(value) => handleInputChange('businessType', value)}
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
                onValueChange={(value) => handleInputChange('industry', value)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={businessInfo.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={businessInfo.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={businessInfo.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={businessInfo.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={businessInfo.address.street}
              onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={businessInfo.address.city}
                onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={businessInfo.address.state}
                onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={businessInfo.address.zipCode}
                onChange={(e) => handleNestedChange('address', 'zipCode', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={businessInfo.address.country}
              onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
              disabled={!isEditing}
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={businessInfo.contact.phone}
                onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                value={businessInfo.contact.email}
                onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              value={businessInfo.contact.supportEmail}
              onChange={(e) => handleNestedChange('contact', 'supportEmail', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Status
          </CardTitle>
          <CardDescription>Your current compliance certifications and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Badge variant={businessInfo.compliance.pciCompliant ? "default" : "destructive"} className="mb-2">
                {businessInfo.compliance.pciCompliant ? "Certified" : "Pending"}
              </Badge>
              <p className="text-sm font-medium">PCI DSS</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Badge variant={businessInfo.compliance.kycVerified ? "default" : "destructive"} className="mb-2">
                {businessInfo.compliance.kycVerified ? "Verified" : "Pending"}
              </Badge>
              <p className="text-sm font-medium">KYC</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Badge variant={businessInfo.compliance.amlCompliant ? "default" : "destructive"} className="mb-2">
                {businessInfo.compliance.amlCompliant ? "Compliant" : "Pending"}
              </Badge>
              <p className="text-sm font-medium">AML</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Badge variant={businessInfo.compliance.gdprCompliant ? "default" : "destructive"} className="mb-2">
                {businessInfo.compliance.gdprCompliant ? "Compliant" : "Pending"}
              </Badge>
              <p className="text-sm font-medium">GDPR</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBusinessInfo;
