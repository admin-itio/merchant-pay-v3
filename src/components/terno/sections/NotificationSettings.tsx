
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface NotificationSettingsProps {
  formData: any;
  setFormData: (data: any) => void;
}

const NotificationSettings = ({ formData, setFormData }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Alert Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(formData.notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={Boolean(value)}
                onCheckedChange={(checked) => 
                  setFormData({
                    ...formData,
                    notificationSettings: {
                      ...formData.notificationSettings,
                      [key]: checked === true
                    }
                  })
                }
              />
              <Label htmlFor={key} className="capitalize text-sm">
                {key}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
