
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface Transaction {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

interface TransactionStatusUpdaterProps {
  transaction: Transaction;
  onStatusUpdate: (transactionId: string, newStatus: string, notes?: string) => void;
}

const TransactionStatusUpdater = ({ transaction, onStatusUpdate }: TransactionStatusUpdaterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(transaction.status);
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { value: 'failed', label: 'Failed', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { value: 'refunded', label: 'Refunded', icon: RefreshCw, color: 'bg-blue-100 text-blue-800' },
  ];

  const currentStatus = statusOptions.find(option => option.value === transaction.status);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onStatusUpdate(transaction.id, selectedStatus, notes);
      setIsOpen(false);
      setNotes('');
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Transaction Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Transaction ID</Label>
            <p className="font-mono text-sm">{transaction.id}</p>
          </div>

          <div>
            <Label>Amount</Label>
            <p className="font-medium">{transaction.currency} {transaction.amount.toFixed(2)}</p>
          </div>

          <div>
            <Label>Current Status</Label>
            {currentStatus && (
              <Badge className={currentStatus.color}>
                <currentStatus.icon className="h-3 w-3 mr-1" />
                {currentStatus.label}
              </Badge>
            )}
          </div>

          <div>
            <Label htmlFor="status">New Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Update Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate} 
              disabled={isUpdating || selectedStatus === transaction.status}
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Status'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionStatusUpdater;
