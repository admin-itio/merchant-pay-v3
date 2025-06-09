
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Download, RefreshCw } from 'lucide-react';

interface TransferHeaderProps {
  onDownloadSample: () => void;
}

const TransferHeader = ({ onDownloadSample }: TransferHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Transfer Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create and manage payout transfers
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onDownloadSample}>
          <Download className="h-4 w-4 mr-2" />
          Sample File
        </Button>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload Excel
        </Button>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Quick Transfer
        </Button>
      </div>
    </div>
  );
};

export default TransferHeader;
