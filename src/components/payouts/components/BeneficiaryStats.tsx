
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BeneficiaryStatsProps {
  total: number;
  active: number;
  pending: number;
  business: number;
}

const BeneficiaryStats = ({ total, active, pending, business }: BeneficiaryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Beneficiaries</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {active}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pending}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {business}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Business Accounts</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeneficiaryStats;
