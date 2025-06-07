
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  status: string;
  amount: number;
  currency: string;
  customer: string;
}

interface TransactionStatusUpdaterProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (transactionId: string, newStatus: string, reason?: string) => void;
}

const TransactionStatusUpdater = ({ transaction, isOpen, onClose, onStatusUpdate }: TransactionStatusUpdaterProps) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [reason, setReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return null;

  const statusOptions = [
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-600' },
    { value: 'failed', label: 'Failed', icon: XCircle, color: 'text-red-600' },
    { value: 'refunded', label: 'Refunded', icon: AlertTriangle, color: 'text-blue-600' },
    { value: 'chargeback', label: 'Chargeback', icon: AlertTriangle, color: 'text-purple-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      case 'chargeback': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(transaction.id, selectedStatus, reason);
      onClose();
      setSelectedStatus('');
      setReason('');
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedStatus('');
    setReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Transaction Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Transaction Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{transaction.id}</p>
                <p className="text-sm text-gray-600">{transaction.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{transaction.currency} {transaction.amount.toFixed(2)}</p>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>

          {/* New Status Selection */}
          <div className="space-y-2">
            <Label>New Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions
                  .filter(option => option.value !== transaction.status)
                  .map(option => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label>Reason (Optional)</Label>
            <Textarea
              placeholder="Enter reason for status change..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStatusUpdate}
            disabled={!selectedStatus || isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionStatusUpdater;
