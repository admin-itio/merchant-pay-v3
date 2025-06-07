
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Transaction {
  id: string;
  status: string;
  customer: string;
  amount: number;
}

interface TransactionStatusUpdaterProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (transactionId: string, newStatus: string, reason?: string) => void;
}

const TransactionStatusUpdater = ({ 
  transaction, 
  isOpen, 
  onClose, 
  onStatusUpdate 
}: TransactionStatusUpdaterProps) => {
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!transaction || !newStatus) return;
    
    onStatusUpdate(transaction.id, newStatus, reason);
    setNewStatus('');
    setReason('');
    onClose();
  };

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'chargeback', label: 'Chargeback' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Transaction Status</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Transaction</Label>
            <p className="text-sm text-muted-foreground">
              {transaction.id} - {transaction.customer} - ${transaction.amount}
            </p>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Current Status</Label>
            <p className="text-sm capitalize">{transaction.status}</p>
          </div>
          
          <div>
            <Label htmlFor="status">New Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for status change..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!newStatus}>
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionStatusUpdater;
