
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Copy,
  ExternalLink,
  CreditCard,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Shield,
  Clock
} from 'lucide-react';

interface Transfer {
  id: string;
  beneficiaryName: string;
  beneficiaryId: string;
  amount: number;
  currency: string;
  type: 'PAYIN' | 'PAYOUT' | 'Invoice';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'Web' | 'API' | 'Upload';
  fee: number;
  createdAt: string;
  completedAt?: string;
  description?: string;
  reference?: string;
  processingTime?: string;
  accountDetails?: {
    accountNumber: string;
    bankName?: string;
    country: string;
  };
}

interface TransferTransactionModalProps {
  transfer: Transfer | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransferTransactionModal = ({ transfer, isOpen, onClose }: TransferTransactionModalProps) => {
  if (!transfer) return null;

  const formatAmount = (amount: number, currency: string) => {
    const cryptoCurrencies = ['USDT', 'BTC', 'ETH', 'USDC', 'BNB', 'ADA', 'DOT', 'MATIC'];
    
    if (cryptoCurrencies.includes(currency.toUpperCase())) {
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch (error) {
      return `${amount.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })} ${currency}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transfer Details - {transfer.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transfer Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transfer Summary</span>
                <Badge className={getStatusColor(transfer.status)}>
                  {transfer.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Amount</div>
                      <div className="font-semibold text-lg">
                        {formatAmount(transfer.amount, transfer.currency)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Beneficiary</div>
                      <div className="font-medium">{transfer.beneficiaryName}</div>
                      <div className="text-sm text-gray-500">ID: {transfer.beneficiaryId}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Created</div>
                      <div className="font-medium">
                        {new Date(transfer.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {transfer.completedAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Completed</div>
                        <div className="font-medium">
                          {new Date(transfer.completedAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{transfer.id}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(transfer.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <Badge variant="outline">{transfer.type}</Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span>{transfer.method}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span className="font-medium">${transfer.fee}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {transfer.reference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-mono">{transfer.reference}</span>
                    </div>
                  )}

                  {transfer.description && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Description:</span>
                      <span>{transfer.description}</span>
                    </div>
                  )}

                  {transfer.processingTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span>{transfer.processingTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          {transfer.accountDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-mono">{transfer.accountDetails.accountNumber}</span>
                  </div>

                  {transfer.accountDetails.bankName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span>{transfer.accountDetails.bankName}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {transfer.accountDetails.country}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {transfer.status === 'pending' && (
              <Button variant="outline">
                Cancel Transfer
              </Button>
            )}
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Explorer
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferTransactionModal;
