
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, Mail, CalendarIcon, FileText, Shield, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

const ReportsSection = () => {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');

  const reports = [
    {
      id: 'transaction',
      title: 'Transaction Report (CSV)',
      icon: CreditCard,
      description: 'Complete transaction data including customer details, amounts, status, payment methods, timestamps, and reference IDs. Perfect for reconciliation and financial analysis.'
    },
    {
      id: 'settlement',
      title: 'Settlement Report (Excel)',
      icon: FileText,
      description: 'Detailed settlement information with payout schedules, fees, adjustments, and net amounts. Includes bank transfer details and settlement status for accounting purposes.'
    },
    {
      id: 'fraud',
      title: 'Fraud Analysis (PDF)',
      icon: Shield,
      description: 'Risk assessment report with fraud scores, flagged transactions, prevention actions taken, and security insights. Helps identify patterns and improve fraud prevention strategies.'
    }
  ];

  const handleExportClick = (reportId: string) => {
    setSelectedReport(reportId);
    setShowDateFilter(true);
  };

  const handleExport = () => {
    console.log(`Exporting ${selectedReport} from ${format(dateRange.from, 'PPP')} to ${format(dateRange.to, 'PPP')}`);
    setShowDateFilter(false);
    // Here you would implement the actual export logic
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <p className="text-sm text-gray-600">
            Download comprehensive reports in various formats. Click on any report to select date range and export.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <div key={report.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <Button 
                  className="w-full justify-start h-auto p-0 bg-transparent hover:bg-transparent text-left"
                  variant="ghost"
                  onClick={() => handleExportClick(report.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Icon className="h-5 w-5 mt-0.5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </div>
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Automated Reports
          </CardTitle>
          <p className="text-sm text-gray-600">
            Schedule regular report delivery to your email. Choose frequency and recipients for automatic report generation.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Summary - End of day transaction overview</SelectItem>
                <SelectItem value="weekly">Weekly Analytics - 7-day performance insights</SelectItem>
                <SelectItem value="monthly">Monthly Report - Complete monthly analysis</SelectItem>
                <SelectItem value="custom">Custom Report - Personalized data selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients</label>
            <Input placeholder="admin@merchant.com, finance@merchant.com" />
          </div>
          <Button className="w-full">Setup Automated Reports</Button>
        </CardContent>
      </Card>

      {showDateFilter && (
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Date Range for Export</CardTitle>
              <p className="text-sm text-gray-600">
                Choose the date range for your {reports.find(r => r.id === selectedReport)?.title} export.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, 'PPP') : 'Select start date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, from: date || new Date() }))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, 'PPP') : 'Select end date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange(prev => ({ ...prev, to: date || new Date() }))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleExport} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" onClick={() => setShowDateFilter(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsSection;
