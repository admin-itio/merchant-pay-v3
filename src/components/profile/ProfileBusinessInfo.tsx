
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building, Upload, CheckCircle, AlertCircle, Clock, FileText, CreditCard } from 'lucide-react';

const ProfileBusinessInfo = () => {
  const [kycStatus, setKycStatus] = useState('verified');
  const [complianceDocuments, setComplianceDocuments] = useState([
    { name: 'Business License', status: 'verified', uploadDate: '2024-01-15', expiryDate: '2025-01-15' },
    { name: 'Tax Registration', status: 'verified', uploadDate: '2024-01-10', expiryDate: '2024-12-31' },
    { name: 'Bank Statement', status: 'pending', uploadDate: '2024-01-20', expiryDate: null },
    { name: 'Director ID', status: 'rejected', uploadDate: '2024-01-18', expiryDate: null }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified': return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Business Information</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Manage your business details and registration information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Legal Business Name</label>
              <Input defaultValue="Acme Corporation Ltd." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">DBA/Trading Name</label>
              <Input defaultValue="Acme Store" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <Select defaultValue="corporation">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">Limited Liability Company</SelectItem>
                  <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry Category</label>
              <Select defaultValue="ecommerce">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / VAT Number</label>
              <Input defaultValue="12-3456789" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <Input defaultValue="REG123456789" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
            <Textarea 
              defaultValue="123 Business Street, Suite 100, New York, NY 10001, United States"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <Input defaultValue="https://acmecorp.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <Input defaultValue="support@acmecorp.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC/AML Status */}
      <Card className="border-green-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">KYC/AML Verification Status</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Know Your Customer and Anti-Money Laundering compliance</p>
              </div>
            </div>
            {getStatusBadge(kycStatus)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Identity Verification</span>
              </div>
              <p className="text-sm text-green-700">Completed on Jan 15, 2024</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Business Verification</span>
              </div>
              <p className="text-sm text-green-700">Completed on Jan 16, 2024</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Bank Account Verification</span>
              </div>
              <p className="text-sm text-green-700">Completed on Jan 18, 2024</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Risk Assessment Score</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-blue-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm font-medium text-blue-900">Low Risk (25/100)</span>
            </div>
            <p className="text-sm text-blue-700 mt-2">Your account maintains a low risk profile based on transaction patterns and compliance history.</p>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Documents */}
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Compliance Documents</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Upload and manage required business documents</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {complianceDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">
                      Uploaded: {doc.uploadDate}
                      {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                    </p>
                    {doc.status === 'rejected' && (
                      <p className="text-sm text-red-600 mt-1">Document quality insufficient. Please re-upload.</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(doc.status)}
                  <Button variant="outline" size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    {doc.status === 'rejected' ? 'Re-upload' : 'Replace'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">Upload additional compliance documents</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settlement & Banking */}
      <Card className="border-indigo-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Settlement & Banking Information</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Manage your payout and settlement preferences</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <Input defaultValue="Chase Bank" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
              <Input defaultValue="Acme Corporation Ltd." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <Input defaultValue="****1234" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
              <Input defaultValue="****5678" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="inr">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Schedule</label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button size="lg">Save Changes</Button>
        <Button variant="outline" size="lg">Cancel</Button>
      </div>
    </div>
  );
};

export default ProfileBusinessInfo;
