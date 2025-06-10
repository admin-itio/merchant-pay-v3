
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, DollarSign, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ReviewPricingStrategyProps {
  onBack: () => void;
}

const ReviewPricingStrategy = ({ onBack }: ReviewPricingStrategyProps) => {
  const pricingRecommendations = [
    {
      category: 'High-Value Transactions',
      currentFee: '2.9%',
      recommendedFee: '2.7%',
      impact: '+$4,200/month',
      confidence: 'High'
    },
    {
      category: 'Weekend Transactions',
      currentFee: '2.9%',
      recommendedFee: '3.1%',
      impact: '+$2,800/month',
      confidence: 'Medium'
    },
    {
      category: 'International Cards',
      currentFee: '3.4%',
      recommendedFee: '3.6%',
      impact: '+$1,500/month',
      confidence: 'High'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Pricing Strategy Review</h1>
          <p className="text-gray-600">AI-powered pricing optimization recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Potential Revenue Increase</span>
            </div>
            <p className="text-2xl font-bold text-green-600">+$8,500</p>
            <p className="text-sm text-gray-600">Per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Optimized Categories</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">Pricing segments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Implementation Risk</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">Low</p>
            <p className="text-sm text-gray-600">Easy to implement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pricingRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{rec.category}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Current: {rec.currentFee} → Recommended: {rec.recommendedFee}
                      </span>
                      <Badge variant={rec.confidence === 'High' ? 'default' : 'secondary'}>
                        {rec.confidence} Confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{rec.impact}</p>
                    <p className="text-sm text-gray-600">Revenue impact</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Review Details</Button>
                  <Button size="sm">Implement</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span>Update pricing for high-value transactions (Expected impact: +$4,200/month)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span>Adjust weekend pricing strategy (Expected impact: +$2,800/month)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span>Optimize international card fees (Expected impact: +$1,500/month)</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Implement All Changes</Button>
            <Button variant="outline">Schedule Implementation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPricingStrategy;
