
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const ProcessorConfiguration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processor Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Primary Processors
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Stripe</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Credit/Debit Cards</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Digital Wallet</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Fallback Processors
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Adyen</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Credit/Debit Cards</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Standby</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Square</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Local Payments</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Standby</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessorConfiguration;
