
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  RefreshCw,
  FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface BulkOperation {
  id: string;
  type: 'refund' | 'cancel' | 'approve';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalItems: number;
  processedItems: number;
  successCount: number;
  errorCount: number;
  createdAt: string;
  completedAt?: string;
  errors?: Array<{ row: number; transactionId: string; error: string }>;
}

interface BulkTransactionOperationsProps {
  selectedTransactions: string[];
  onBulkAction: (action: string, transactionIds: string[]) => void;
}

const BulkTransactionOperations = ({ 
  selectedTransactions, 
  onBulkAction 
}: BulkTransactionOperationsProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bulkOperations, setBulkOperations] = useState<BulkOperation[]>([]);
  const [showOperations, setShowOperations] = useState(false);

  // Generate Excel template for bulk refunds
  const generateExcelTemplate = () => {
    const csvContent = `Transaction ID,Amount,Reason,Notes
TXN001,100.00,Customer Request,Duplicate charge
TXN002,250.50,Quality Issue,Product defective
TXN003,75.25,Billing Error,Incorrect amount charged`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'bulk_refund_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: "Excel template for bulk refunds has been downloaded.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        toast({
          title: "Invalid File",
          description: "File must contain header row and at least one data row.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Create new bulk operation
      const newOperation: BulkOperation = {
        id: Date.now().toString(),
        type: 'refund',
        status: 'processing',
        totalItems: lines.length - 1, // Exclude header
        processedItems: 0,
        successCount: 0,
        errorCount: 0,
        createdAt: new Date().toISOString(),
      };

      setBulkOperations(prev => [...prev, newOperation]);

      // Simulate processing with progress updates
      let processed = 0;
      const total = lines.length - 1;
      
      const processInterval = setInterval(() => {
        processed++;
        const progress = (processed / total) * 100;
        setUploadProgress(progress);

        // Update operation status
        setBulkOperations(prev => prev.map(op => 
          op.id === newOperation.id ? {
            ...op,
            processedItems: processed,
            successCount: Math.floor(processed * 0.85), // 85% success rate
            errorCount: processed - Math.floor(processed * 0.85)
          } : op
        ));

        if (processed >= total) {
          clearInterval(processInterval);
          
          // Mark as completed
          setBulkOperations(prev => prev.map(op => 
            op.id === newOperation.id ? {
              ...op,
              status: 'completed',
              completedAt: new Date().toISOString()
            } : op
          ));

          setIsProcessing(false);
          setUploadProgress(0);
          
          toast({
            title: "Bulk Operation Completed",
            description: `Processed ${total} transactions. ${Math.floor(total * 0.85)} successful, ${total - Math.floor(total * 0.85)} failed.`,
          });
        }
      }, 200);
    };

    reader.readAsText(file);
  };

  const handleBulkRefund = () => {
    if (selectedTransactions.length === 0) {
      toast({
        title: "No Transactions Selected",
        description: "Please select transactions to refund.",
        variant: "destructive",
      });
      return;
    }

    const newOperation: BulkOperation = {
      id: Date.now().toString(),
      type: 'refund',
      status: 'processing',
      totalItems: selectedTransactions.length,
      processedItems: 0,
      successCount: 0,
      errorCount: 0,
      createdAt: new Date().toISOString(),
    };

    setBulkOperations(prev => [...prev, newOperation]);
    onBulkAction('bulk_refund', selectedTransactions);

    toast({
      title: "Bulk Refund Started",
      description: `Processing refunds for ${selectedTransactions.length} transactions.`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Bulk Transaction Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Transactions Info */}
          {selectedTransactions.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{selectedTransactions.length}</strong> transactions selected
              </p>
            </div>
          )}

          {/* Bulk Actions */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleBulkRefund}
              disabled={selectedTransactions.length === 0}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Bulk Refund Selected
            </Button>

            <Button variant="outline" onClick={generateExcelTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>

            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Excel File
            </Button>

            <Dialog open={showOperations} onOpenChange={setShowOperations}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Operations ({bulkOperations.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Bulk Operation History</DialogTitle>
                  <DialogDescription>
                    Track the status of your bulk transaction operations.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {bulkOperations.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No bulk operations yet.</p>
                  ) : (
                    bulkOperations.map((operation) => (
                      <Card key={operation.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                operation.status === 'completed' ? 'default' :
                                operation.status === 'failed' ? 'destructive' :
                                'secondary'
                              }>
                                {operation.status}
                              </Badge>
                              <span className="font-medium capitalize">{operation.type}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(operation.createdAt).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Total Items</p>
                              <p className="font-medium">{operation.totalItems}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Successful</p>
                              <p className="font-medium text-green-600">{operation.successCount}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Errors</p>
                              <p className="font-medium text-red-600">{operation.errorCount}</p>
                            </div>
                          </div>
                          
                          {operation.status === 'processing' && (
                            <div className="mt-3">
                              <Progress 
                                value={(operation.processedItems / operation.totalItems) * 100} 
                                className="h-2"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Processing... {operation.processedItems}/{operation.totalItems}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Upload Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Processing file...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkTransactionOperations;
