
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, FileText, Calendar, Settings, CheckCircle } from 'lucide-react';
import DateRangeFilter from './DateRangeFilter';

interface ExportModalProps {
  title: string;
  description: string;
  triggerText?: string;
  exportFormats?: Array<{ value: string; label: string }>;
  onExport: (config: {
    from: Date;
    to: Date;
    format: string;
  }) => void;
  children?: React.ReactNode;
}

const ExportModal = ({ 
  title, 
  description, 
  triggerText = "Export Data",
  exportFormats,
  onExport,
  children 
}: ExportModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async (config: { from: Date; to: Date; format: string }) => {
    setIsExporting(true);
    try {
      await onExport(config);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        {exportComplete ? (
          <div className="py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Export Complete!</h3>
            <p className="text-sm text-gray-600">Your file has been generated and will download shortly.</p>
          </div>
        ) : isExporting ? (
          <div className="py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Export...</h3>
            <p className="text-sm text-gray-600">Please wait while we prepare your data.</p>
          </div>
        ) : (
          <DateRangeFilter 
            onExport={handleExport}
            exportFormats={exportFormats}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
