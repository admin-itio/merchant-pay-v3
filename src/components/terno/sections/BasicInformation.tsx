
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BasicInformationProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BasicInformation = ({ formData, setFormData }: BasicInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              placeholder="Add New Business of your choice"
              required
            />
          </div>
          <div>
            <Label htmlFor="businessUrl">Business URL *</Label>
            <Input
              id="businessUrl"
              value={formData.businessUrl}
              onChange={(e) => setFormData({...formData, businessUrl: e.target.value})}
              placeholder="https://example.com"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="businessDescription">Business Description</Label>
          <Textarea
            id="businessDescription"
            value={formData.businessDescription}
            onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
            placeholder="Describe your business..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="terminalType">Terminal Type</Label>
            <Input
              id="terminalType"
              value={formData.terminalType}
              onChange={(e) => setFormData({...formData, terminalType: e.target.value})}
              placeholder="Start typing the Terminal Type"
            />
          </div>
          <div>
            <Label htmlFor="dbaName">DBA/Brand Name</Label>
            <Input
              id="dbaName"
              value={formData.dbaName}
              onChange={(e) => setFormData({...formData, dbaName: e.target.value})}
              placeholder="Doing Business As name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerServiceNo">Customer Service No.</Label>
            <Input
              id="customerServiceNo"
              value={formData.customerServiceNo}
              onChange={(e) => setFormData({...formData, customerServiceNo: e.target.value})}
              placeholder="+1-800-123-4567"
            />
          </div>
          <div>
            <Label htmlFor="customerServiceEmail">Customer Service Email</Label>
            <Input
              id="customerServiceEmail"
              type="email"
              value={formData.customerServiceEmail}
              onChange={(e) => setFormData({...formData, customerServiceEmail: e.target.value})}
              placeholder="support@example.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInformation;
