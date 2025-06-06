
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BasicInformation from './sections/BasicInformation';
import URLsAndPolicies from './sections/URLsAndPolicies';
import TechnicalConfiguration from './sections/TechnicalConfiguration';
import KeyGeneration from './sections/KeyGeneration';
import NotificationSettings from './sections/NotificationSettings';
import OrchestrationRules from './sections/OrchestrationRules';

interface TerNoFormProps {
  terno?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const TerNoForm = ({ terno, onClose, onSave }: TerNoFormProps) => {
  const [formData, setFormData] = useState({
    businessName: terno?.businessName || '',
    businessUrl: terno?.businessUrl || '',
    businessDescription: terno?.businessDescription || '',
    terminalType: terno?.terminalType || '',
    dbaName: terno?.dbaName || '',
    customerServiceNo: terno?.customerServiceNo || '',
    customerServiceEmail: terno?.customerServiceEmail || '',
    termsConditionsUrl: terno?.termsConditionsUrl || '',
    refundPolicyUrl: terno?.refundPolicyUrl || '',
    privacyPolicyUrl: terno?.privacyPolicyUrl || '',
    contactUsUrl: terno?.contactUsUrl || '',
    logoUrl: terno?.logoUrl || '',
    notificationEmail: terno?.notificationEmail || '',
    returnUrl: terno?.returnUrl || '',
    webhookUrl: terno?.webhookUrl || '',
    gateway: terno?.gateway || '',
    status: terno?.status || 'pending',
    // Notification settings
    notificationSettings: terno?.notificationSettings || {
      approved: false,
      declined: false,
      withdraw: false,
      chargeback: false,
      refund: false,
      customer: false
    },
    // Orchestration rules - ensure it's always an array
    orchestrationRules: Array.isArray(terno?.orchestrationRules) ? terno.orchestrationRules : []
  });

  const [generatedKeys, setGeneratedKeys] = useState<{publicKey: string, privateKey: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      publicKey: generatedKeys?.publicKey,
      privateKey: generatedKeys?.privateKey
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to TerNo List
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {terno ? 'Edit TerNo' : 'Add New TerNo'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure terminal number settings and gateway connections
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInformation formData={formData} setFormData={setFormData} />
        <URLsAndPolicies formData={formData} setFormData={setFormData} />
        <TechnicalConfiguration formData={formData} setFormData={setFormData} />
        <KeyGeneration generatedKeys={generatedKeys} setGeneratedKeys={setGeneratedKeys} />
        <NotificationSettings formData={formData} setFormData={setFormData} />
        <OrchestrationRules formData={formData} setFormData={setFormData} />

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {terno ? 'Update TerNo' : 'Create TerNo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TerNoForm;
