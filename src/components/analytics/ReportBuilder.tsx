
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Download, Save, Eye, Trash2, Info } from 'lucide-react';
import { format } from 'date-fns';

const ReportBuilder = () => {
  const [reportName, setReportName] = useState('');
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState('');
  const [reportType, setReportType] = useState('');

  const availableMetrics = [
    { id: 'revenue', label: 'Total Revenue', category: 'Financial' },
    { id: 'volume', label: 'Transaction Volume', category: 'Financial' },
    { id: 'count', label: 'Transaction Count', category: 'Volume' },
    { id: 'avg_amount', label: 'Average Amount', category: 'Financial' },
    { id: 'success_rate', label: 'Success Rate', category: 'Performance' },
    { id: 'fraud_rate', label: 'Fraud Rate', category: 'Risk' },
    { id: 'chargeback_rate', label: 'Chargeback Rate', category: 'Risk' },
    { id: 'settlement_time', label: 'Average Settlement Time', category: 'Performance' }
  ];

  const availableFilters = [
    { id: 'status', label: 'Transaction Status' },
    { id: 'payment_method', label: 'Payment Method' },
    { id: 'currency', label: 'Currency' },
    { id: 'country', label: 'Country' },
    { id: 'gateway', label: 'Gateway' },
    { id: 'amount_range', label: 'Amount Range' },
    { id: 'fraud_score', label: 'Fraud Score Range' }
  ];

  const groupByOptions = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'gateway', label: 'By Gateway' },
    { value: 'country', label: 'By Country' },
    { value: 'currency', label: 'By Currency' }
  ];

  const reportTypes = [
    { value: 'dashboard', label: 'Dashboard Report' },
    { value: 'csv', label: 'CSV Export' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Workbook' }
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const generateReport = () => {
    console.log('Generating report with:', {
      reportName,
      dateRange,
      selectedMetrics,
      selectedFilters,
      groupBy,
      reportType
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Custom Report Builder
          </CardTitle>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Purpose:</strong> Create personalized reports tailored to your business needs. Select specific metrics, 
              apply filters, and choose how to group your data to generate insights that matter most to your business operations.
            </p>
            <p className="text-xs text-blue-600 mt-2">
              Perfect for monthly reviews, stakeholder presentations, or detailed analysis of specific time periods or transaction types.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input
                    id="reportName"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Monthly Revenue Report"
                  />
                </div>
                <div>
                  <Label>Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Date Range</Label>
                <div className="flex gap-2 mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, 'PPP') : 'From date'}
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, 'PPP') : 'To date'}
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
              </div>

              <div>
                <Label>Group By</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grouping" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupByOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-amber-800">
                  <strong>Metrics Selection:</strong> Choose the key performance indicators you want to analyze. 
                  Financial metrics show revenue and amounts, Performance metrics show success rates, and Risk metrics help identify potential issues.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableMetrics.map(metric => (
                  <div key={metric.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={metric.id}
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => handleMetricToggle(metric.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={metric.id} className="font-medium">
                        {metric.label}
                      </Label>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {metric.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="filters" className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-green-800">
                  <strong>Filters:</strong> Narrow down your data by applying specific criteria. 
                  Use filters to focus on particular transaction types, payment methods, regions, or amount ranges for targeted analysis.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableFilters.map(filter => (
                  <div key={filter.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => handleFilterToggle(filter.id)}
                    />
                    <Label htmlFor={filter.id} className="font-medium">
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-2">Report Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {reportName || 'Untitled Report'}</p>
                  <p><strong>Type:</strong> {reportType || 'Not selected'}</p>
                  <p><strong>Date Range:</strong> {format(dateRange.from, 'PPP')} - {format(dateRange.to, 'PPP')}</p>
                  <p><strong>Metrics:</strong> {selectedMetrics.length} selected</p>
                  <p><strong>Filters:</strong> {selectedFilters.length} applied</p>
                  <p><strong>Group By:</strong> {groupBy || 'None'}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={generateReport} className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportBuilder;
