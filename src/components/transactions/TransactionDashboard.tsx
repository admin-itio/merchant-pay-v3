
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, List, Settings } from 'lucide-react';
import TransactionManagement from './TransactionManagement';
import TransactionsList from './TransactionsList';
import TransactionAnalytics from './TransactionAnalytics';

// Mock transaction data - in a real app this would come from an API
const mockTransactions = [
  {
    id: 'TXN-2024-001',
    amount: 299.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'Visa *4242',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1-555-0123',
    merchantRef: 'ORDER-123',
    timestamp: '2024-01-15T10:30:00Z',
    fraudScore: 15,
    gateway: 'Stripe',
    country: 'US',
    category: 'E-commerce',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0...',
    responseCode: '00'
  },
  {
    id: 'TXN-2024-002',
    amount: 149.50,
    currency: 'USD',
    status: 'pending',
    paymentMethod: 'PayPal',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1-555-0124',
    merchantRef: 'ORDER-124',
    timestamp: '2024-01-15T11:15:00Z',
    fraudScore: 45,
    gateway: 'PayPal',
    country: 'CA',
    category: 'Subscription',
    ipAddress: '192.168.1.2',
    userAgent: 'Mozilla/5.0...',
    responseCode: '01'
  },
  {
    id: 'TXN-2024-003',
    amount: 75.00,
    currency: 'USD',
    status: 'failed',
    paymentMethod: 'Mastercard *5555',
    customer: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerPhone: '+1-555-0125',
    merchantRef: 'ORDER-125',
    timestamp: '2024-01-15T12:00:00Z',
    fraudScore: 85,
    gateway: 'Square',
    country: 'UK',
    category: 'Services',
    ipAddress: '192.168.1.3',
    userAgent: 'Mozilla/5.0...',
    responseCode: '05'
  }
];

const TransactionDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction Center</h1>
        <p className="text-muted-foreground">
          Comprehensive transaction management, analytics, and monitoring
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6">
          <TransactionAnalytics transactions={mockTransactions} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsList />
        </TabsContent>

        <TabsContent value="management" className="mt-6">
          <TransactionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionDashboard;
