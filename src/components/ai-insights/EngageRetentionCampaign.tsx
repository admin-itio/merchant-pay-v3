
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Users, 
  Mail, 
  Gift,
  ArrowLeft,
  Send,
  Calendar,
  TrendingDown
} from 'lucide-react';

interface EngageRetentionCampaignProps {
  onBack: () => void;
}

const EngageRetentionCampaign = ({ onBack }: EngageRetentionCampaignProps) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [campaignType, setCampaignType] = useState<string>('');

  const customerSegments = [
    {
      id: 'high-value-risk',
      name: 'High-Value at Risk',
      count: 234,
      churnRisk: 85,
      avgValue: '$2,450',
      description: 'High-value customers showing early churn indicators'
    },
    {
      id: 'declining-engagement',
      name: 'Declining Engagement',
      count: 456,
      churnRisk: 67,
      avgValue: '$890',
      description: 'Customers with decreasing activity over last 60 days'
    },
    {
      id: 'new-customers',
      name: 'New Customers',
      count: 789,
      churnRisk: 45,
      avgValue: '$345',
      description: 'Recently acquired customers (last 30 days)'
    }
  ];

  const campaignTemplates = [
    {
      id: 'personalized-offer',
      name: 'Personalized Discount Offer',
      description: 'AI-generated personalized discount based on customer behavior',
      expectedRetention: '+23%',
      cost: 'Low'
    },
    {
      id: 'loyalty-program',
      name: 'VIP Loyalty Program Invitation',
      description: 'Exclusive access to premium features and benefits',
      expectedRetention: '+31%',
      cost: 'Medium'
    },
    {
      id: 'win-back',
      name: 'Win-Back Campaign',
      description: 'Re-engagement series with progressive incentives',
      expectedRetention: '+18%',
      cost: 'Low'
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
          <h1 className="text-2xl font-bold text-gray-900">Engage Retention Campaign</h1>
          <p className="text-gray-600">Launch targeted campaigns to prevent customer churn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Target Segment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerSegments.map((segment) => (
                <div 
                  key={segment.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedSegment === segment.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSegment(segment.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{segment.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline">{segment.count} customers</Badge>
                      <Badge variant={segment.churnRisk > 70 ? 'destructive' : 'secondary'}>
                        {segment.churnRisk}% risk
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>Avg. Value: {segment.avgValue}</span>
                    <span className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      Churn Risk: {segment.churnRisk}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaignTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    campaignType === template.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCampaignType(template.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant="default">{template.expectedRetention}</Badge>
                      <Badge variant="outline">{template.cost} cost</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input 
                  id="campaign-name" 
                  placeholder="Enter campaign name"
                  disabled={!selectedSegment || !campaignType}
                />
              </div>
              
              <div>
                <Label htmlFor="campaign-message">Custom Message</Label>
                <Textarea 
                  id="campaign-message" 
                  placeholder="Customize your campaign message..."
                  disabled={!selectedSegment || !campaignType}
                />
              </div>

              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input 
                  id="schedule" 
                  type="datetime-local"
                  disabled={!selectedSegment || !campaignType}
                />
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  className="w-full" 
                  disabled={!selectedSegment || !campaignType}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Launch Campaign Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled={!selectedSegment || !campaignType}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expected Impact</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSegment && campaignType ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Target Customers:</span>
                    <span className="font-semibold">
                      {customerSegments.find(s => s.id === selectedSegment)?.count}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Retention:</span>
                    <span className="font-semibold text-green-600">
                      {campaignTemplates.find(t => t.id === campaignType)?.expectedRetention}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Revenue:</span>
                    <span className="font-semibold">$45,230</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campaign Cost:</span>
                    <span className="font-semibold">$1,250</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Net ROI:</span>
                    <span className="font-semibold text-green-600">3,518%</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Select a segment and campaign type to see impact</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EngageRetentionCampaign;
