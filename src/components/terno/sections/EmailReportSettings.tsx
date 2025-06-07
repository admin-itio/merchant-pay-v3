
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Calendar, Clock, Download, Users, Info, Plus, Trash2 } from 'lucide-react';

interface EmailReportSettingsProps {
  data: any;
  onChange: (data: any) => void;
}

const EmailReportSettings = ({ data, onChange }: EmailReportSettingsProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addRecipient = () => {
    const currentRecipients = data.reportRecipients || [];
    const newRecipient = {
      id: Date.now().toString(),
      email: '',
      name: '',
      reports: []
    };
    handleInputChange('reportRecipients', [...currentRecipients, newRecipient]);
  };

  const removeRecipient = (recipientId: string) => {
    const currentRecipients = data.reportRecipients || [];
    const updatedRecipients = currentRecipients.filter((r: any) => r.id !== recipientId);
    handleInputChange('reportRecipients', updatedRecipients);
  };

  const updateRecipient = (recipientId: string, field: string, value: any) => {
    const currentRecipients = data.reportRecipients || [];
    const updatedRecipients = currentRecipients.map((r: any) =>
      r.id === recipientId ? { ...r, [field]: value } : r
    );
    handleInputChange('reportRecipients', updatedRecipients);
  };

  const reportTypes = [
    {
      id: 'daily_summary',
      name: 'Daily Summary',
      description: 'Daily transaction summary and performance metrics',
      frequency: 'Daily'
    },
    {
      id: 'weekly_report',
      name: 'Weekly Report',
      description: 'Comprehensive weekly business performance report',
      frequency: 'Weekly'
    },
    {
      id: 'monthly_analytics',
      name: 'Monthly Analytics',
      description: 'Detailed monthly analytics and trend analysis',
      frequency: 'Monthly'
    },
    {
      id: 'settlement_report',
      name: 'Settlement Report',
      description: 'Settlement details and fund transfer summaries',
      frequency: 'As needed'
    },
    {
      id: 'chargeback_report',
      name: 'Chargeback Report',
      description: 'Chargeback and dispute management report',
      frequency: 'As needed'
    },
    {
      id: 'reconciliation_report',
      name: 'Reconciliation Report',
      description: 'Transaction reconciliation and accounting report',
      frequency: 'Daily'
    }
  ];

  const recipients = data.reportRecipients || [];

  return (
    <div className="space-y-6">
      {/* Email Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Email Reports</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Send automated email reports
                </p>
              </div>
              <Switch
                checked={data.emailReportsEnabled || true}
                onCheckedChange={(checked) => handleInputChange('emailReportsEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Include Attachments</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Attach CSV/PDF files to reports
                </p>
              </div>
              <Switch
                checked={data.includeAttachments || true}
                onCheckedChange={(checked) => handleInputChange('includeAttachments', checked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input
                id="senderName"
                placeholder="MerchantPay Reports"
                value={data.senderName || 'MerchantPay Reports'}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input
                id="senderEmail"
                type="email"
                placeholder="reports@merchantpay.com"
                value={data.senderEmail || 'reports@merchantpay.com'}
                onChange={(e) => handleInputChange('senderEmail', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Report Timezone</Label>
              <Select value={data.reportTimezone || 'Asia/Kuala_Lumpur'} onValueChange={(value) => handleInputChange('reportTimezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kuala_Lumpur">Malaysia (UTC+8)</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                  <SelectItem value="Asia/Bangkok">Thailand (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Jakarta">Indonesia (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Manila">Philippines (UTC+8)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportFormat">Report Format</Label>
              <Select value={data.reportFormat || 'both'} onValueChange={(value) => handleInputChange('reportFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML Only</SelectItem>
                  <SelectItem value="pdf">PDF Only</SelectItem>
                  <SelectItem value="csv">CSV Only</SelectItem>
                  <SelectItem value="both">HTML + PDF</SelectItem>
                  <SelectItem value="all">HTML + PDF + CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Report Types & Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportTypes.map((report) => (
            <Card key={report.id} className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {report.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {report.description}
                    </p>
                  </div>
                  <Switch
                    checked={data.enabledReports?.includes(report.id) || false}
                    onCheckedChange={(checked) => {
                      const currentReports = data.enabledReports || [];
                      const updatedReports = checked
                        ? [...currentReports, report.id]
                        : currentReports.filter((r: string) => r !== report.id);
                      handleInputChange('enabledReports', updatedReports);
                    }}
                  />
                </div>

                {data.enabledReports?.includes(report.id) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-3 border-t">
                    <div className="space-y-2">
                      <Label>Delivery Time</Label>
                      <Input
                        type="time"
                        value={data.reportSchedule?.[report.id]?.time || '09:00'}
                        onChange={(e) => {
                          const currentSchedule = data.reportSchedule || {};
                          const updatedSchedule = {
                            ...currentSchedule,
                            [report.id]: {
                              ...currentSchedule[report.id],
                              time: e.target.value
                            }
                          };
                          handleInputChange('reportSchedule', updatedSchedule);
                        }}
                      />
                    </div>

                    {report.frequency === 'Weekly' && (
                      <div className="space-y-2">
                        <Label>Day of Week</Label>
                        <Select
                          value={data.reportSchedule?.[report.id]?.dayOfWeek || 'monday'}
                          onValueChange={(value) => {
                            const currentSchedule = data.reportSchedule || {};
                            const updatedSchedule = {
                              ...currentSchedule,
                              [report.id]: {
                                ...currentSchedule[report.id],
                                dayOfWeek: value
                              }
                            };
                            handleInputChange('reportSchedule', updatedSchedule);
                          }}
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

                    {report.frequency === 'Monthly' && (
                      <div className="space-y-2">
                        <Label>Day of Month</Label>
                        <Input
                          type="number"
                          min="1"
                          max="28"
                          value={data.reportSchedule?.[report.id]?.dayOfMonth || '1'}
                          onChange={(e) => {
                            const currentSchedule = data.reportSchedule || {};
                            const updatedSchedule = {
                              ...currentSchedule,
                              [report.id]: {
                                ...currentSchedule[report.id],
                                dayOfMonth: e.target.value
                              }
                            };
                            handleInputChange('reportSchedule', updatedSchedule);
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Include Charts</Label>
                      <Switch
                        checked={data.reportSchedule?.[report.id]?.includeCharts || true}
                        onCheckedChange={(checked) => {
                          const currentSchedule = data.reportSchedule || {};
                          const updatedSchedule = {
                            ...currentSchedule,
                            [report.id]: {
                              ...currentSchedule[report.id],
                              includeCharts: checked
                            }
                          };
                          handleInputChange('reportSchedule', updatedSchedule);
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Report Recipients */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Report Recipients
            </CardTitle>
            <Button onClick={addRecipient} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Recipient
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recipients.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No report recipients configured</p>
              <p className="text-sm">Add recipients to receive automated reports</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recipients.map((recipient: any, index: number) => (
                <Card key={recipient.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Recipient {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRecipient(recipient.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={recipient.name}
                          onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          value={recipient.email}
                          onChange={(e) => updateRecipient(recipient.id, 'email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Reports to Receive</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {reportTypes.map((report) => (
                          <div key={report.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`${recipient.id}-${report.id}`}
                              checked={recipient.reports?.includes(report.id) || false}
                              onChange={(e) => {
                                const currentReports = recipient.reports || [];
                                const updatedReports = e.target.checked
                                  ? [...currentReports, report.id]
                                  : currentReports.filter((r: string) => r !== report.id);
                                updateRecipient(recipient.id, 'reports', updatedReports);
                              }}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={`${recipient.id}-${report.id}`} className="text-sm font-normal">
                              {report.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Template Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Email Template Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailSubjectTemplate">Email Subject Template</Label>
            <Input
              id="emailSubjectTemplate"
              placeholder="[MerchantPay] {report_type} Report - {date}"
              value={data.emailSubjectTemplate || '[MerchantPay] {report_type} Report - {date}'}
              onChange={(e) => handleInputChange('emailSubjectTemplate', e.target.value)}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use {'{report_type}'}, {'{date}'}, {'{merchant_name}'} as variables
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailFooter">Email Footer</Label>
            <Textarea
              id="emailFooter"
              placeholder="Custom footer text or company information"
              value={data.emailFooter || ''}
              onChange={(e) => handleInputChange('emailFooter', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Include Company Logo</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add your company logo to reports
                </p>
              </div>
              <Switch
                checked={data.includeCompanyLogo || true}
                onCheckedChange={(checked) => handleInputChange('includeCompanyLogo', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Custom Branding</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use custom colors and styling
                </p>
              </div>
              <Switch
                checked={data.customBranding || false}
                onCheckedChange={(checked) => handleInputChange('customBranding', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Report Info */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Email Report Guidelines
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Reports are generated based on your configured timezone</li>
                <li>• Large reports may take a few minutes to generate and deliver</li>
                <li>• Recipients can unsubscribe from individual report types</li>
                <li>• Failed deliveries are automatically retried up to 3 times</li>
                <li>• Test email delivery before deploying to production</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailReportSettings;
