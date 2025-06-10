
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';

interface OrchestrationOverviewProps {
  data: any;
  onChange: (data: any) => void;
}

const OrchestrationOverview = ({ data, onChange }: OrchestrationOverviewProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Payment Orchestration Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Smart Routing</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically route to best processor
              </p>
            </div>
            <Switch
              checked={data.smartRouting || true}
              onCheckedChange={(checked) => handleInputChange('smartRouting', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cascade Fallback</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Try alternative processors on failure
              </p>
            </div>
            <Switch
              checked={data.cascadeFallback || true}
              onCheckedChange={(checked) => handleInputChange('cascadeFallback', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Load Balancing</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Distribute load across processors
              </p>
            </div>
            <Switch
              checked={data.loadBalancing || false}
              onCheckedChange={(checked) => handleInputChange('loadBalancing', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrchestrationOverview;
