
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardEnhanced from '@/components/dashboard/DashboardEnhanced';
import TransactionDashboard from '@/components/transactions/TransactionDashboard';
import { CreditCard, BarChart3, Users, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardEnhanced />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionDashboard />
          </TabsContent>

          <TabsContent value="customers">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
              <p className="text-muted-foreground">Customer management features coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
