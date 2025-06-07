
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, ArrowLeft, Settings, Globe, Shield, Bell, Mail, Key } from 'lucide-react';
import BasicInformation from './sections/BasicInformation';
import TechnicalConfiguration from './sections/TechnicalConfiguration';
import OrchestrationRules from './sections/OrchestrationRules';
import URLsAndPolicies from './sections/URLsAndPolicies';
import NotificationSettings from './sections/NotificationSettings';
import EmailReportSettings from './sections/EmailReportSettings';
import KeyGeneration from './sections/KeyGeneration';

interface TerNo {
  id: string;
  ternoNumber: string;
  name: string;
  description: string;
  environment: 'sandbox' | 'production';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  businessType: string;
  country: string;
  currency: string;
  createdAt: string;
  lastUsed?: string;
  transactionCount: number;
  monthlyVolume: number;
  apiKey: string;
  webhookUrl?: string;
  callbackUrl?: string;
}

interface TerNoFormProps {
  terno?: TerNo | null;
  onSave: () => void;
  onCancel: () => void;
}

const TerNoForm = ({ terno, onSave, onCancel }: TerNoFormProps) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: terno?.name || '',
    description: terno?.description || '',
    businessType: terno?.businessType || '',
    country: terno?.country || '',
    currency: terno?.currency || '',
    environment: terno?.environment || 'sandbox',
    // Add more fields as needed
  });

  const isEditing = !!terno;

  const handleSave = () => {
    // Handle form submission
    console.log('Saving TerNo:', formData);
    onSave();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Settings },
    { id: 'technical', label: 'Technical', icon: Globe },
    { id: 'orchestration', label: 'Orchestration', icon: Shield },
    { id: 'urls', label: 'URLs & Policies', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email-reports', label: 'Email Reports', icon: Mail },
    { id: 'keys', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {isEditing ? `Edit TerNo: ${terno.ternoNumber}` : 'Create New TerNo'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing ? 'Update TerNo configuration and settings' : 'Configure your new payment terminal number'}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          {isEditing ? 'Update TerNo' : 'Create TerNo'}
        </Button>
      </div>

      {/* Form Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="grid grid-cols-7 w-full min-w-max bg-gray-100 p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="basic">
                <BasicInformation 
                  data={formData} 
                  onChange={setFormData}
                  isEditing={isEditing}
                />
              </TabsContent>

              <TabsContent value="technical">
                <TechnicalConfiguration 
                  data={formData} 
                  onChange={setFormData}
                />
              </TabsContent>

              <TabsContent value="orchestration">
                <OrchestrationRules 
                  data={formData} 
                  onChange={setFormData}
                />
              </TabsContent>

              <TabsContent value="urls">
                <URLsAndPolicies 
                  data={formData} 
                  onChange={setFormData}
                />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationSettings 
                  data={formData} 
                  onChange={setFormData}
                />
              </TabsContent>

              <TabsContent value="email-reports">
                <EmailReportSettings 
                  data={formData} 
                  onChange={setFormData}
                />
              </TabsContent>

              <TabsContent value="keys">
                <KeyGeneration 
                  data={formData} 
                  onChange={setFormData}
                  isEditing={isEditing}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerNoForm;
