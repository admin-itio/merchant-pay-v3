
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const FeeNotice = () => {
  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
              Transfer Fee Structure
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              <strong>Company Bank Accounts:</strong> No fees applied<br />
              <strong>External Beneficiaries:</strong> 2.5% + $5 fixed transaction fee
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeNotice;
