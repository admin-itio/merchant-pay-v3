
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Mail, Calendar, Clock } from 'lucide-react';

interface EmailReportSettingsProps {
  formData: any;
  setFormData: (data: any) => void;
}

const EmailReportSettings = ({ formData, setFormData }: EmailReportSettingsProps) => {
  const reportSettings = formData.emailReportSettings || {
    enabled: false,
    frequency: 'weekly',
    email: '',
    reportTypes: {
      transactions: true,
      settlements: true,
      analytics: false
    },
    time: '09:00',
    dayOfWeek: 'monday'
  };

  const updateReportSettings = (updates: any) => {
    setFormData({
      ...formData,
      emailReportSettings: {
        ...reportSettings,
        ...updates
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Report Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enableReports"
            checked={reportSettings.enabled}
            onCheckedChange={(checked) => 
              updateReportSettings({ enabled: checked === true })
            }
          />
          <Label htmlFor="enableReports" className="text-sm font-medium">
            Enable automated email reports
          </Label>
        </div>

        {reportSettings.enabled && (
          <div className="space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportEmail">Report Email Address</Label>
                <Input
                  id="reportEmail"
                  type="email"
                  value={reportSettings.email}
                  onChange={(e) => updateReportSettings({ email: e.target.value })}
                  placeholder="reports@company.com"
                />
              </div>
              <div>
                <Label htmlFor="frequency">Report Frequency</Label>
                <Select 
                  value={reportSettings.frequency} 
                  onValueChange={(value) => updateReportSettings({ frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Delivery Time
                </Label>
                <Input
                  id="reportTime"
                  type="time"
                  value={reportSettings.time}
                  onChange={(e) => updateReportSettings({ time: e.target.value })}
                />
              </div>
              {reportSettings.frequency === 'weekly' && (
                <div>
                  <Label htmlFor="dayOfWeek" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Day of Week
                  </Label>
                  <Select 
                    value={reportSettings.dayOfWeek} 
                    onValueChange={(value) => updateReportSettings({ dayOfWeek: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Report Types</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(reportSettings.reportTypes).map(([type, enabled]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={Boolean(enabled)}
                      onCheckedChange={(checked) => 
                        updateReportSettings({
                          reportTypes: {
                            ...reportSettings.reportTypes,
                            [type]: checked === true
                          }
                        })
                      }
                    />
                    <Label htmlFor={type} className="capitalize text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                📧 Reports will be sent automatically based on your selected frequency and will include data for the specified period.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailReportSettings;
