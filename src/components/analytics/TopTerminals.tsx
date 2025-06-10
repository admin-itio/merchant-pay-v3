
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, TrendingUp } from 'lucide-react';

const TopTerminals = () => {
  const topTerminals = [
    {
      terminalId: 'TER001',
      terminalName: 'Main Store POS',
      location: 'Mumbai Store',
      transactions: 5420,
      volume: 1240000,
      successRate: 96.8,
      trend: '+15.2%'
    },
    {
      terminalId: 'TER002',
      terminalName: 'Online Gateway',
      location: 'E-commerce',
      transactions: 4890,
      volume: 980000,
      successRate: 94.5,
      trend: '+8.7%'
    },
    {
      terminalId: 'TER003',
      terminalName: 'Mobile App',
      location: 'Mobile Platform',
      transactions: 3670,
      volume: 750000,
      successRate: 97.2,
      trend: '+22.1%'
    },
    {
      terminalId: 'TER004',
      terminalName: 'Delhi Branch POS',
      location: 'Delhi Store',
      transactions: 2890,
      volume: 560000,
      successRate: 95.1,
      trend: '+5.8%'
    },
    {
      terminalId: 'TER005',
      terminalName: 'API Terminal',
      location: 'Third-party Integration',
      transactions: 2340,
      volume: 480000,
      successRate: 93.7,
      trend: '+12.3%'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Top Performing Terminals (TerNo)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Monitor your terminal performance by transaction volume, success rates, and growth trends. 
          Use this data to identify your best-performing payment channels and optimize underperforming ones.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topTerminals.map((terminal, index) => (
            <div key={terminal.terminalId} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{terminal.terminalName}</h3>
                    <Badge variant="outline" className="text-xs">{terminal.terminalId}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{terminal.location}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>{terminal.transactions.toLocaleString()} transactions</span>
                    <span>•</span>
                    <span>₹{terminal.volume.toLocaleString()}</span>
                    <span>•</span>
                    <span>{terminal.successRate}% success rate</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {terminal.trend}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTerminals;
