
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

const MerchantsList = () => {
  const topMerchantsData = [
    { merchant: 'E-commerce Store A', volume: 145000, transactions: 567, successRate: 96.8 },
    { merchant: 'Subscription Service B', volume: 98000, transactions: 234, successRate: 98.2 },
    { merchant: 'Digital Marketplace C', volume: 87000, transactions: 445, successRate: 94.5 },
    { merchant: 'SaaS Platform D', volume: 76000, transactions: 189, successRate: 97.1 },
    { merchant: 'Online Retailer E', volume: 65000, transactions: 356, successRate: 95.3 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Top Performing Merchants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topMerchantsData.map((merchant, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium dark:text-white">{merchant.merchant}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{merchant.transactions} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium dark:text-white">₹{merchant.volume.toLocaleString()}</p>
                <Badge variant={merchant.successRate > 95 ? 'default' : 'secondary'}>
                  {merchant.successRate}% success
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantsList;
