
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import TransactionsList from './TransactionsList';

const TransactionManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  const statusCounts = {
    all: 1247,
    pending: 23,
    completed: 1198,
    failed: 18,
    flagged: 8
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600">Manage and monitor all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({statusCounts.all})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({statusCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({statusCounts.completed})
              </TabsTrigger>
              <TabsTrigger value="failed" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Failed ({statusCounts.failed})
              </TabsTrigger>
              <TabsTrigger value="flagged" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Flagged ({statusCounts.flagged})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <TransactionsList />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <TransactionsList />
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <TransactionsList />
            </TabsContent>

            <TabsContent value="failed" className="mt-6">
              <TransactionsList />
            </TabsContent>

            <TabsContent value="flagged" className="mt-6">
              <TransactionsList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;
