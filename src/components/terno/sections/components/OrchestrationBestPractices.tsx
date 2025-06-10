
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const OrchestrationBestPractices = () => {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Orchestration Best Practices
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Rules are processed in priority order (1 = highest priority)</li>
              <li>• Test orchestration rules in sandbox before deploying to production</li>
              <li>• Monitor processor performance to optimize routing decisions</li>
              <li>• Use geographic routing for international transactions</li>
              <li>• Consider cost vs. success rate when configuring routing logic</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrchestrationBestPractices;
