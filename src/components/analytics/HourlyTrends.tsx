
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HourlyTrends = () => {
  const hourlyData = [
    { hour: '00:00', transactions: 45, volume: 12500 },
    { hour: '01:00', transactions: 23, volume: 6800 },
    { hour: '02:00', transactions: 18, volume: 5200 },
    { hour: '03:00', transactions: 12, volume: 3400 },
    { hour: '04:00', transactions: 15, volume: 4100 },
    { hour: '05:00', transactions: 28, volume: 7800 },
    { hour: '06:00', transactions: 65, volume: 18200 },
    { hour: '07:00', transactions: 89, volume: 24500 },
    { hour: '08:00', transactions: 134, volume: 36800 },
    { hour: '09:00', transactions: 189, volume: 52300 },
    { hour: '10:00', transactions: 234, volume: 64700 },
    { hour: '11:00', transactions: 267, volume: 73800 },
    { hour: '12:00', transactions: 298, volume: 82400 },
    { hour: '13:00', transactions: 245, volume: 67800 },
    { hour: '14:00', transactions: 278, volume: 76900 },
    { hour: '15:00', transactions: 312, volume: 86200 },
    { hour: '16:00', transactions: 289, volume: 79800 },
    { hour: '17:00', transactions: 256, volume: 70800 },
    { hour: '18:00', transactions: 198, volume: 54700 },
    { hour: '19:00', transactions: 167, volume: 46200 },
    { hour: '20:00', transactions: 145, volume: 40100 },
    { hour: '21:00', transactions: 123, volume: 34000 },
    { hour: '22:00', transactions: 89, volume: 24600 },
    { hour: '23:00', transactions: 67, volume: 18500 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Hourly Transaction Pattern
        </CardTitle>
        <p className="text-sm text-gray-600">
          Analyze your transaction patterns throughout the day to identify peak hours, optimize staffing, 
          and plan maintenance windows. This data shows both transaction count and volume trends across 24 hours.
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              name === 'volume' ? `₹${value.toLocaleString()}` : value,
              name === 'volume' ? 'Volume' : 'Transactions'
            ]} />
            <Area type="monotone" dataKey="transactions" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900">Peak Hours</p>
            <p className="text-blue-700">3:00 PM - 5:00 PM</p>
            <p className="text-xs text-blue-600">Highest transaction volume</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-900">Off-Peak Hours</p>
            <p className="text-green-700">2:00 AM - 5:00 AM</p>
            <p className="text-xs text-green-600">Best for maintenance</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium text-purple-900">Business Hours</p>
            <p className="text-purple-700">9:00 AM - 9:00 PM</p>
            <p className="text-xs text-purple-600">85% of daily volume</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTrends;
