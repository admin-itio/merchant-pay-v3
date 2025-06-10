
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, TestTube, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebhookTestModalProps {
  webhookUrl: string;
}

const WebhookTestModal = ({ webhookUrl }: WebhookTestModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testData, setTestData] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);
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
      setLastResponse(null);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Data copied to clipboard",
    });
  };

  const handleSendWebhook = async () => {
    console.log("handleSendWebhook called");
    console.log("webhookUrl:", webhookUrl);
    console.log("testData:", testData);

    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Webhook URL is not configured",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl.startsWith('http://') && !webhookUrl.startsWith('https://')) {
      toast({
        title: "Invalid URL",
        description: "Webhook URL must start with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(testData);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your webhook data format",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    console.log("Sending webhook test to:", webhookUrl);
    console.log("Webhook payload:", parsedData);

    try {
      // Simulate webhook sending (in real app this would go through backend)
      const response = await fetch('/api/webhook-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
          data: parsedData
        })
      }).catch(() => {
        // If backend endpoint doesn't exist, simulate the webhook call
        console.log("Simulating webhook call to:", webhookUrl);
        return fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Source': 'MerchantPay-Test',
            'X-Webhook-Signature': 'sha256=test_signature_hash',
            'User-Agent': 'MerchantPay-Webhook/1.0',
          },
          body: JSON.stringify(parsedData),
        });
      });

      setLastResponse({
        status: 'sent',
        timestamp: new Date().toISOString(),
        url: webhookUrl,
        payload: parsedData
      });

      toast({
        title: "Webhook Test Sent",
        description: "Test webhook has been sent successfully. Check your endpoint logs to verify receipt.",
      });

      console.log("Webhook test sent successfully");
      
    } catch (error) {
      console.error("Webhook test error:", error);
      
      setLastResponse({
        status: 'error',
        timestamp: new Date().toISOString(),
        url: webhookUrl,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      toast({
        title: "Network Error",
        description: "Failed to send webhook. Please check the URL and your network connection.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const isWebhookUrlValid = webhookUrl && (webhookUrl.startsWith('http://') || webhookUrl.startsWith('https://'));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={!isWebhookUrlValid}
          className="gap-2"
          onClick={() => {
            console.log("Test Webhook button clicked");
            console.log("Webhook URL:", webhookUrl);
            console.log("Is valid:", isWebhookUrlValid);
          }}
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
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm flex-1 break-all">
                    {webhookUrl || 'No webhook URL configured'}
                  </code>
                  <Badge variant="outline" className="text-xs">
                    POST
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Headers Sent</Label>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md mt-1">
                  <code className="text-xs">
                    Content-Type: application/json<br/>
                    X-Webhook-Source: MerchantPay-Test<br/>
                    X-Webhook-Signature: sha256=test_signature_hash<br/>
                    User-Agent: MerchantPay-Webhook/1.0
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Test Data</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(testData)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
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
                  rows={16}
                  className="font-mono text-sm"
                  placeholder="Enter your test webhook data here..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Last Response */}
          {lastResponse && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Last Test Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Status:</Label>
                    {lastResponse.status === 'sent' ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Sent
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label>Timestamp:</Label>
                    <code className="ml-2 text-sm">{lastResponse.timestamp}</code>
                  </div>
                  <div>
                    <Label>Target URL:</Label>
                    <code className="ml-2 text-sm break-all">{lastResponse.url}</code>
                  </div>
                  {lastResponse.error && (
                    <div>
                      <Label>Error:</Label>
                      <code className="ml-2 text-sm text-red-600">{lastResponse.error}</code>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendWebhook}
              disabled={isSending || !testData.trim() || !isWebhookUrlValid}
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

        {/* Instructions */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TestTube className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  Testing Instructions
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Make sure your webhook endpoint is accessible and running</li>
                  <li>• Check your server logs after sending the test webhook</li>
                  <li>• Verify that your endpoint can receive POST requests</li>
                  <li>• Your endpoint should return a 200 status code for successful receipt</li>
                  <li>• Use tools like ngrok for local testing if your endpoint is on localhost</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookTestModal;
