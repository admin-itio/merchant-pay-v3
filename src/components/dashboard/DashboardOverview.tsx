import React from 'react';import DashboardHeader from './dashbaordOverview/DashboardHeader';
import KeyMetricsCards from './dashbaordOverview/KeyMetricsCards';
import TransactionVolumeChart from './dashbaordOverview/TransactionVolumeChart';
import PaymentMethodsChart from './dashbaordOverview/PaymentMethodsChart';
import RecentTransactions from './dashbaordOverview/RecentTransactions';
import SystemHealth from './dashbaordOverview/SystemHealth';
import DashboardSidePanel from './dashbaordOverview/DashboardSidePanel';
;

const transactionData = [
  { name: 'Mon', transactions: 65, revenue: 2400 },
  { name: 'Tue', transactions: 78, revenue: 2800 },
  { name: 'Wed', transactions: 52, revenue: 1900 },
  { name: 'Thu', transactions: 91, revenue: 3200 },
  { name: 'Fri', transactions: 84, revenue: 2900 },
  { name: 'Sat', transactions: 67, revenue: 2100 },
  { name: 'Sun', transactions: 45, revenue: 1600 }
];

const paymentMethodData = [
  { name: 'Credit Cards', value: 60, color: '#3B82F6' },
  { name: 'Digital Wallets', value: 25, color: '#10B981' },
  { name: 'Bank Transfers', value: 15, color: '#F59E0B' }
];

const recentTransactions = [
  { id: 'TXN001', customer: 'John Smith', amount: '$245.00', status: 'completed', time: '2 min ago' },
  { id: 'TXN002', customer: 'Sarah Johnson', amount: '$89.50', status: 'pending', time: '5 min ago' },
  { id: 'TXN003', customer: 'Mike Davis', amount: '$1,234.00', status: 'completed', time: '8 min ago' },
  { id: 'TXN004', customer: 'Emma Wilson', amount: '$67.25', status: 'failed', time: '12 min ago' },
  { id: 'TXN005', customer: 'David Brown', amount: '$156.75', status: 'completed', time: '15 min ago' }
];

const DashboardOverview = () => (
  <div className="space-y-4 lg:space-y-6 p-4 lg:p-0 relative">
    <DashboardHeader />
    <KeyMetricsCards />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <TransactionVolumeChart data={transactionData} />
      <PaymentMethodsChart data={paymentMethodData} />
    </div>
   <DashboardSidePanel transactions={recentTransactions} />
  </div>
);

export default DashboardOverview;