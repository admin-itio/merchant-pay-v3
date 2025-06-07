
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ReviewPricingStrategyProps {
  onBack: () => void;
}

const ReviewPricingStrategy = ({ onBack }: ReviewPricingStrategyProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');

  const currentPricing = [
    { product: 'Premium Plan', currentPrice: 99, suggestedPrice: 119, impact: '+15%' },
    { product: 'Standard Plan', currentPrice: 49, suggestedPrice: 59, impact: '+12%' },
    { product: 'Basic Plan', currentPrice: 19, suggestedPrice: 24, impact: '+8%' },
  ];

  const impactAnalysis = [
    { month: 'Jan', current: 450000, optimized: 520000 },
    { month: 'Feb', current: 480000, optimized: 556000 },
    { month: 'Mar', current: 520000, optimized: 612000 },
    { month: 'Apr', current: 580000, optimized: 695000 },
    { month: 'May', current: 620000, optimized: 748000 },
    { month: 'Jun', current: 675000, optimized: 820000 },
  ];

  const strategies = [
    {
      id: 'dynamic',
      name: 'Dynamic Pricing',
      description: 'Adjust prices based on demand, time, and customer segments',
      impact: 'High',
      revenue: '+18%',
      complexity: 'Medium'
    },
    {
      id: 'tiered',
      name: 'Value-Based Tiering',
      description: 'Create pricing tiers based on feature value perception',
      impact: 'Medium',
      revenue: '+12%',
      complexity: 'Low'
    },
    {
      id: 'psychological',
      name: 'Psychological Pricing',
      description: 'Use pricing psychology to optimize conversion rates',
      impact: 'Medium',
      revenue: '+8%',
      complexity: 'Low'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Pricing Strategy</h1>
          <p className="text-gray-600">AI-powered pricing optimization recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current vs Suggested Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentPricing.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{item.product}</h3>
                      <p className="text-sm text-gray-600">Current: ${item.currentPrice}/month</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${item.suggestedPrice}</span>
                        <Badge variant="default">{item.impact}</Badge>
                      </div>
                      <p className="text-sm text-green-600">Suggested price</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Impact Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                  <Bar dataKey="current" fill="#94A3B8" name="Current Revenue" />
                  <Bar dataKey="optimized" fill="#10B981" name="Optimized Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {strategies.map((strategy) => (
                <div 
                  key={strategy.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedStrategy === strategy.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStrategy(strategy.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{strategy.name}</h3>
                    <Badge variant={strategy.impact === 'High' ? 'default' : 'secondary'}>
                      {strategy.revenue}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>Impact: {strategy.impact}</span>
                    <span>Complexity: {strategy.complexity}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" disabled={!selectedStrategy}>
                <Save className="h-4 w-4 mr-2" />
                Apply Selected Strategy
              </Button>
              <Button variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Run A/B Test
              </Button>
              <Button variant="outline" className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Schedule Price Change
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewPricingStrategy;
