
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Clock, Mail, Edit, Trash2, Play, Pause, Info } from 'lucide-react';

const ScheduledReports = () => {
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      name: 'Daily Transaction Summary',
      frequency: 'daily',
      time: '09:00',
      recipients: ['admin@company.com', 'finance@company.com'],
      lastRun: '2024-01-15 09:00',
      nextRun: '2024-01-16 09:00',
      status: 'active',
      format: 'PDF'
    },
    {
      id: '2',
      name: 'Weekly Revenue Report',
      frequency: 'weekly',
      time: '10:00',
      recipients: ['ceo@company.com'],
      lastRun: '2024-01-14 10:00',
      nextRun: '2024-01-21 10:00',
      status: 'active',
      format: 'Excel'
    },
    {
      id: '3',
      name: 'Monthly Fraud Analysis',
      frequency: 'monthly',
      time: '08:00',
      recipients: ['security@company.com', 'risk@company.com'],
      lastRun: '2024-01-01 08:00',
      nextRun: '2024-02-01 08:00',
      status: 'paused',
      format: 'PDF'
    }
  ]);

  const [newReport, setNewReport] = useState({
    name: '',
    frequency: '',
    time: '',
    recipients: '',
    format: ''
  });

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const formats = [
    { value: 'PDF', label: 'PDF Report' },
    { value: 'Excel', label: 'Excel Workbook' },
    { value: 'CSV', label: 'CSV Data' },
    { value: 'Dashboard', label: 'Dashboard Link' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleReportStatus = (reportId: string) => {
    setScheduledReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: report.status === 'active' ? 'paused' : 'active' }
        : report
    ));
  };

  const deleteReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId));
  };

  const addNewReport = () => {
    if (newReport.name && newReport.frequency && newReport.time) {
      const report = {
        id: Date.now().toString(),
        ...newReport,
        recipients: newReport.recipients.split(',').map(email => email.trim()),
        lastRun: 'Never',
        nextRun: 'Next scheduled time',
        status: 'active'
      };
      setScheduledReports(prev => [...prev, report]);
      setNewReport({ name: '', frequency: '', time: '', recipients: '', format: '' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Scheduled Reports - Automation Made Easy
          </CardTitle>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Purpose:</strong> Set up automated report delivery to save time and ensure stakeholders receive regular updates. 
              Perfect for daily operational reviews, weekly management summaries, and monthly board reports.
            </p>
            <p className="text-xs text-blue-600 mt-2">
              <strong>Benefits:</strong> Never miss important data updates • Consistent reporting schedule • Automatic delivery to multiple recipients • Reduces manual work
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-amber-800">
              <strong>How it works:</strong> Choose your report type, set the frequency (daily/weekly/monthly), 
              select recipients, and we'll automatically generate and email the reports at your specified time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                value={newReport.name}
                onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Daily Sales Report"
              />
            </div>
            <div>
              <Label>Frequency</Label>
              <Select value={newReport.frequency} onValueChange={(value) => setNewReport(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map(freq => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time">Delivery Time</Label>
              <Input
                id="time"
                type="time"
                value={newReport.time}
                onChange={(e) => setNewReport(prev => ({ ...prev, time: e.target.value }))}
              />
              <p className="text-xs text-gray-500 mt-1">Time when report will be sent</p>
            </div>
            <div>
              <Label>Format</Label>
              <Select value={newReport.format} onValueChange={(value) => setNewReport(prev => ({ ...prev, format: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map(format => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="recipients">Recipients (comma-separated emails)</Label>
              <Input
                id="recipients"
                value={newReport.recipients}
                onChange={(e) => setNewReport(prev => ({ ...prev, recipients: e.target.value }))}
                placeholder="admin@company.com, finance@company.com"
              />
              <p className="text-xs text-gray-500 mt-1">Email addresses who will receive the reports</p>
            </div>
          </div>
          <Button onClick={addNewReport} className="mt-4">
            <Mail className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Scheduled Reports</CardTitle>
          <p className="text-sm text-gray-600">
            Manage your automated reports. You can pause, edit, or delete any scheduled report below.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.format}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{report.frequency} at {report.time}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {report.recipients.map((email, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{report.lastRun}</TableCell>
                  <TableCell className="text-sm">{report.nextRun}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReportStatus(report.id)}
                        title={report.status === 'active' ? 'Pause report' : 'Resume report'}
                      >
                        {report.status === 'active' ? 
                          <Pause className="h-4 w-4" /> : 
                          <Play className="h-4 w-4" />
                        }
                      </Button>
                      <Button variant="ghost" size="sm" title="Edit report">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteReport(report.id)}
                        title="Delete report"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduledReports;
