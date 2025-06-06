
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface URLsAndPoliciesProps {
  formData: any;
  setFormData: (data: any) => void;
}

const URLsAndPolicies = ({ formData, setFormData }: URLsAndPoliciesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>URLs and Policies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="termsConditionsUrl">T & C URL</Label>
            <Input
              id="termsConditionsUrl"
              value={formData.termsConditionsUrl}
              onChange={(e) => setFormData({...formData, termsConditionsUrl: e.target.value})}
              placeholder="https://example.com/terms"
            />
          </div>
          <div>
            <Label htmlFor="refundPolicyUrl">URL of Refund Policy</Label>
            <Input
              id="refundPolicyUrl"
              value={formData.refundPolicyUrl}
              onChange={(e) => setFormData({...formData, refundPolicyUrl: e.target.value})}
              placeholder="https://example.com/refund"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="privacyPolicyUrl">URL of Privacy Policy</Label>
            <Input
              id="privacyPolicyUrl"
              value={formData.privacyPolicyUrl}
              onChange={(e) => setFormData({...formData, privacyPolicyUrl: e.target.value})}
              placeholder="https://example.com/privacy"
            />
          </div>
          <div>
            <Label htmlFor="contactUsUrl">URL of Contact US</Label>
            <Input
              id="contactUsUrl"
              value={formData.contactUsUrl}
              onChange={(e) => setFormData({...formData, contactUsUrl: e.target.value})}
              placeholder="https://example.com/contact"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="logoUrl">URL of Logo</Label>
          <Input
            id="logoUrl"
            value={formData.logoUrl}
            onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
            placeholder="https://example.com/logo.png"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default URLsAndPolicies;
