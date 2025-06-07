
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  CreditCard, 
  User, 
  Globe, 
  Calendar,
  Shield,
  AlertTriangle,
  Download,
  RefreshCw,
  ExternalLink,
  RotateCcw,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  customer: string;
  merchantRef: string;
  timestamp: string;
  fraudScore: number;
  gateway: string;
  country: string;
  category: string;
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsModal = ({ transaction, isOpen, onClose }: TransactionDetailsModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  if (!transaction) return null;

  const refundReasons = [
    'Customer Request',
    'Duplicate Transaction',
    'Fraudulent Transaction',
    'Product Not Delivered',
    'Product Defective',
    'Billing Error',
    'Merchant Error',
    'Customer Dispute',
    'Technical Issue',
    'Custom'
  ];

  const transactionLogs = [
    {
      id: 1,
      timestamp: '2024-06-07 14:30:25',
      event: 'Transaction Initiated',
      status: 'success',
      details: 'Payment request received from merchant',
      payload: '{"amount": 1250.00, "currency": "USD", "customer": "john.doe@email.com"}'
    },
    {
      id: 2,
      timestamp: '2024-06-07 14:30:26',
      event: 'Risk Assessment',
      status: 'success',
      details: 'Fraud score calculated: 15/100 (Low Risk)',
      payload: '{"fraud_score": 15, "risk_level": "low", "checks_passed": 8}'
    },
    {
      id: 3,
      timestamp: '2024-06-07 14:30:27',
      event: 'Gateway Processing',
      status: 'success',
      details: 'Payment sent to Stripe gateway',
      payload: '{"gateway": "stripe", "gateway_txn_id": "pi_1234567890"}'
    },
    {
      id: 4,
      timestamp: '2024-06-07 14:30:28',
      event: 'Payment Processed',
      status: 'success',
      details: 'Payment successfully processed by gateway',
      payload: '{"response_code": "00", "auth_code": "123456", "reference": "TXN001"}'
    },
    {
      id: 5,
      timestamp: '2024-06-07 14:30:29',
      event: 'Webhook Sent',
      status: 'success',
      details: 'Transaction completion webhook sent to merchant',
      payload: '{"webhook_url": "https://merchant.com/webhook", "response_code": 200}'
    }
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

  const getFraudScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-50';
    if (score < 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  };

  const handleRefundSubmit = () => {
    if (!refundAmount || (!refundReason || (refundReason === 'Custom' && !customReason))) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(refundAmount);
    if (amount <= 0 || amount > transaction.amount) {
      toast({
        title: "Error",
        description: `Refund amount must be between $0.01 and ${formatCurrency(transaction.amount, transaction.currency)}`,
        variant: "destructive",
      });
      return;
    }

    // Simulate refund processing
    toast({
      title: "Refund Request Submitted",
      description: "Your refund request has been received successfully. The transaction status will be updated soon, typically this can take up to 24-48 hours. Refund processing is subject to the Acquirer approval.",
    });

    // Reset form
    setRefundAmount('');
    setRefundReason('');
    setCustomReason('');
    setActiveTab('overview');
  };

  const handleResendWebhook = () => {
    toast({
      title: "Webhook Sent",
      description: "Transaction webhook has been resent to your configured endpoint",
    });
  };

  const getLogIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transaction Details - {transaction.id}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="refund">Refund</TabsTrigger>
            <TabsTrigger value="logs">Transaction Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Transaction Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Amount</label>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <div className="mt-1">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Merchant Reference</label>
                        <p className="text-gray-900">{transaction.merchantRef}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Payment Method</label>
                        <p className="text-gray-900">{transaction.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Gateway</label>
                        <p className="text-gray-900">{transaction.gateway}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <p className="text-gray-900">{transaction.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Customer Email</label>
                      <p className="text-gray-900">{transaction.customer}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Country</label>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{transaction.country}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Transaction Date</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-900">{transaction.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold ${getFraudScoreColor(transaction.fraudScore)}`}>
                        {transaction.fraudScore}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Fraud Score</p>
                      <div className="mt-4">
                        {transaction.fraudScore < 30 && (
                          <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                        )}
                        {transaction.fraudScore >= 30 && transaction.fraudScore < 70 && (
                          <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                        )}
                        {transaction.fraudScore >= 70 && (
                          <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setActiveTab('refund')}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Request Refund
                    </Button>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View in Gateway
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={handleResendWebhook}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Resend Webhook
                    </Button>
                    {transaction.fraudScore > 70 && (
                      <Button className="w-full" variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Fraud
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="refund" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Request Refund
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="refundAmount">Refund Amount</Label>
                    <Input
                      id="refundAmount"
                      type="number"
                      placeholder="0.00"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      max={transaction.amount}
                      step="0.01"
                    />
                    <p className="text-sm text-gray-500">
                      Maximum: {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refundReason">Refund Reason</Label>
                    <Select value={refundReason} onValueChange={setRefundReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {refundReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {refundReason === 'Custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="customReason">Custom Reason</Label>
                    <Textarea
                      id="customReason"
                      placeholder="Please specify the reason for refund..."
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleRefundSubmit} className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Submit Refund Request
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('overview')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Transaction Timeline & Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionLogs.map((log, index) => (
                    <div key={log.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <div className="flex flex-col items-center">
                        {getLogIcon(log.status)}
                        {index < transactionLogs.length - 1 && (
                          <div className="w-px h-8 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{log.event}</h4>
                          <span className="text-sm text-gray-500">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600">{log.details}</p>
                        <details className="text-xs">
                          <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                            View Payload
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-50 rounded border text-xs overflow-x-auto">
                            {JSON.stringify(JSON.parse(log.payload), null, 2)}
                          </pre>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsModal;
