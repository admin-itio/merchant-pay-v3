
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FraudAnalysis = () => {
  const fraudAnalysisData = [
    { range: '0-20 (Low)', count: 3200, percentage: 89.2, color: '#10B981' },
    { range: '21-50 (Medium)', count: 280, percentage: 7.8, color: '#F59E0B' },
    { range: '51-80 (High)', count: 85, percentage: 2.4, color: '#EF4444' },
    { range: '81-100 (Critical)', count: 21, percentage: 0.6, color: '#DC2626' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Fraud Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fraudAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fraud Risk Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudAnalysisData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium">{item.range}</p>
                    <p className="text-sm text-gray-600">{item.count} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.percentage}%</p>
                  <p className="text-sm text-gray-600">of total</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudAnalysis;
