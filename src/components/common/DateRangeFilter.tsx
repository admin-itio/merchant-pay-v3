
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, X, Clock, Download } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangeFilterProps {
  onExport: (dateRange: { from: Date; to: Date; format: string }) => void;
  exportFormats?: Array<{ value: string; label: string }>;
  defaultFormat?: string;
  showTimeSelection?: boolean;
}

const DateRangeFilter = ({ 
  onExport, 
  exportFormats = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Workbook' },
    { value: 'csv', label: 'CSV Data' }
  ],
  defaultFormat = 'pdf',
  showTimeSelection = true 
}: DateRangeFilterProps) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const [selectedFormat, setSelectedFormat] = useState(defaultFormat);
  const [fromTime, setFromTime] = useState('00:00');
  const [toTime, setToTime] = useState('23:59');
  const [quickRange, setQuickRange] = useState('7d');

  const quickRanges = [
    { value: '1d', label: 'Last 24 Hours', days: 1 },
    { value: '7d', label: 'Last 7 Days', days: 7 },
    { value: '30d', label: 'Last 30 Days', days: 30 },
    { value: '90d', label: 'Last 90 Days', days: 90 },
    { value: 'custom', label: 'Custom Range', days: 0 }
  ];

  const handleQuickRangeChange = (value: string) => {
    setQuickRange(value);
    if (value !== 'custom') {
      const range = quickRanges.find(r => r.value === value);
      if (range) {
        const to = new Date();
        const from = new Date();
        from.setDate(from.getDate() - range.days);
        setDateRange({ from, to });
      }
    }
  };

  const handleExport = () => {
    const fromDateTime = new Date(dateRange.from);
    const toDateTime = new Date(dateRange.to);
    
    if (showTimeSelection) {
      const [fromHours, fromMinutes] = fromTime.split(':');
      const [toHours, toMinutes] = toTime.split(':');
      
      fromDateTime.setHours(parseInt(fromHours), parseInt(fromMinutes));
      toDateTime.setHours(parseInt(toHours), parseInt(toMinutes));
    }

    onExport({
      from: fromDateTime,
      to: toDateTime,
      format: selectedFormat
    });
  };

  const clearDateRange = () => {
    const defaultFrom = new Date();
    defaultFrom.setDate(defaultFrom.getDate() - 7);
    setDateRange({ from: defaultFrom, to: new Date() });
    setQuickRange('7d');
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Export Data</h3>
        <Button variant="ghost" size="sm" onClick={clearDateRange}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Range Selection */}
      <div>
        <Label className="text-sm font-medium">Quick Selection</Label>
        <Select value={quickRange} onValueChange={handleQuickRangeChange}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {quickRanges.map(range => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Date Range */}
      {quickRange === 'custom' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.from, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-sm font-medium">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dateRange.to, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Time Selection */}
          {showTimeSelection && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  From Time
                </Label>
                <Input
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  To Time
                </Label>
                <Input
                  type="time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Export Format */}
      <div>
        <Label className="text-sm font-medium">Export Format</Label>
        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {exportFormats.map(format => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected Range Display */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="text-xs">
          {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
        </Badge>
        {showTimeSelection && quickRange === 'custom' && (
          <Badge variant="outline" className="text-xs">
            {fromTime} - {toTime}
          </Badge>
        )}
        <Badge variant="outline" className="text-xs">
          {exportFormats.find(f => f.value === selectedFormat)?.label}
        </Badge>
      </div>

      {/* Export Button */}
      <Button onClick={handleExport} className="w-full">
        <Download className="h-4 w-4 mr-2" />
        Export Data
      </Button>
    </div>
  );
};

export default DateRangeFilter;
