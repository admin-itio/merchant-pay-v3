
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Webhook, Code, BookOpen, Monitor, Shield } from 'lucide-react';
import ApiKeyManager from './ApiKeyManager';
import WebhookManager from './WebhookManager';
import SdkResources from './SdkResources';
import DocumentationHub from './DocumentationHub';
import ApiMonitoring from './ApiMonitoring';
import SecurityCenter from './SecurityCenter';

const ApiDeveloperToolsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('api-keys');

  const tabs = [
    { id: 'api-keys', label: 'API Keys', icon: Key, component: ApiKeyManager },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, component: WebhookManager },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor, component: ApiMonitoring },
    { id: 'security', label: 'Security', icon: Shield, component: SecurityCenter },
    { id: 'sdks', label: 'SDKs & Tools', icon: Code, component: SdkResources },
    { id: 'docs', label: 'Documentation', icon: BookOpen, component: DocumentationHub },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enhanced API & Developer Tools</h1>
        <p className="text-gray-600 mt-2">
          Comprehensive developer platform with advanced API management, monitoring, and security features
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-gray-100 dark:bg-gray-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 text-sm font-medium px-3 py-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ApiDeveloperToolsEnhanced;
