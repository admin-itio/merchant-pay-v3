
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, TestTube, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebhookTestModalProps {
  webhookUrl: string;
}

const WebhookTestModal = ({ webhookUrl }: WebhookTestModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testData, setTestData] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const defaultWebhookData = {
    event: 'payment.success',
    timestamp: new Date().toISOString(),
    data: {
      transaction_id: 'txn_test_123456789',
      amount: 100.00,
      currency: 'USD',
      status: 'completed',
      payment_method: 'credit_card',
      customer: {
        id: 'cust_test_123',
        email: 'test@example.com',
        name: 'Test Customer'
      },
      merchant: {
        id: 'mer_test_456',
        name: 'Test Merchant'
      }
    },
    signature: 'sha256=test_signature_hash'
  };

  React.useEffect(() => {
    if (isOpen) {
      setTestData(JSON.stringify(defaultWebhookData, null, 2));
    }
  }, [isOpen]);

  const handleSendWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Webhook URL is not configured",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(testData);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your webhook data format",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Source': 'MerchantPay-Test',
        },
        body: testData,
      });

      if (response.ok) {
        toast({
          title: "Webhook Sent Successfully",
          description: `Test webhook sent to ${webhookUrl}`,
        });
        setIsOpen(false);
      } else {
        toast({
          title: "Webhook Failed",
          description: `HTTP ${response.status}: ${response.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to send webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={!webhookUrl}
          className="gap-2"
        >
          <TestTube className="h-4 w-4" />
          Test Webhook
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Test Webhook Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Webhook Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Webhook Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Target URL</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm flex-1">
                    {webhookUrl}
                  </code>
                  <Badge variant="outline" className="text-xs">
                    POST
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Expected Headers</Label>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-1">
                  <code className="text-xs">
                    Content-Type: application/json<br/>
                    X-Webhook-Source: MerchantPay-Test<br/>
                    X-Signature: sha256=[hash]
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Data</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is the sample data that will be sent to your webhook endpoint. You can modify it as needed.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="testData">Webhook Payload (JSON)</Label>
                <Textarea
                  id="testData"
                  value={testData}
                  onChange={(e) => setTestData(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                  placeholder="Enter your test webhook data here..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendWebhook}
              disabled={isSending || !testData.trim()}
              className="gap-2"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Test Webhook
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookTestModal;
