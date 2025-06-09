
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TransferStatsProps {
  totalTransfers: number;
  completedTransfers: number;
  totalAmount: number;
  totalFees: number;
}

const TransferStats = ({ totalTransfers, completedTransfers, totalAmount, totalFees }: TransferStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalTransfers}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {completedTransfers}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            ${totalAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Page Total</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            ${totalFees.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Page Fees</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferStats;
