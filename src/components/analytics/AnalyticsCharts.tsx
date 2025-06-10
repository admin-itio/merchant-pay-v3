
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const AnalyticsCharts = () => {
  const transactionData = [
    { date: 'Jan 1', successful: 4250, failed: 187, volume: 185000, chargebacks: 12, refunds: 45 },
    { date: 'Jan 2', successful: 3890, failed: 145, volume: 156000, chargebacks: 8, refunds: 38 },
    { date: 'Jan 3', successful: 4100, failed: 203, volume: 174000, chargebacks: 15, refunds: 52 },
    { date: 'Jan 4', successful: 4580, failed: 165, volume: 198000, chargebacks: 9, refunds: 41 },
    { date: 'Jan 5', successful: 3950, failed: 178, volume: 167000, chargebacks: 11, refunds: 47 },
    { date: 'Jan 6', successful: 4320, failed: 192, volume: 189000, chargebacks: 13, refunds: 55 },
    { date: 'Jan 7', successful: 4670, failed: 156, volume: 203000, chargebacks: 7, refunds: 43 }
  ];

  const paymentMethodData = [
    { name: 'Credit Card', value: 42, color: '#8B5CF6', volume: 420000, count: 1680 },
    { name: 'Debit Card', value: 28, color: '#06B6D4', volume: 280000, count: 1120 },
    { name: 'UPI', value: 18, color: '#10B981', volume: 180000, count: 720 },
    { name: 'Net Banking', value: 8, color: '#F59E0B', volume: 80000, count: 320 },
    { name: 'Digital Wallet', value: 4, color: '#EF4444', volume: 40000, count: 160 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Transaction Volume Trend (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'volume' ? `₹${value.toLocaleString()}` : value,
                  name === 'volume' ? 'Volume' : name
                ]} />
                <Area type="monotone" dataKey="volume" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Success vs Failed Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="successful" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {paymentMethodData.map((method, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: method.color }}
                      />
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <span className="text-sm font-medium">{method.value}%</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Volume: ₹{method.volume.toLocaleString()}</div>
                    <div>Transactions: {method.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
