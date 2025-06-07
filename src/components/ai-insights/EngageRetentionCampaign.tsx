
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Target, Mail, MessageSquare } from 'lucide-react';

interface EngageRetentionCampaignProps {
  onBack: () => void;
}

const EngageRetentionCampaign = ({ onBack }: EngageRetentionCampaignProps) => {
  const churnRiskCustomers = [
    {
      segment: 'High-Value At Risk',
      count: 23,
      avgValue: '$2,450',
      churnProbability: '78%',
      lastActivity: '15 days ago'
    },
    {
      segment: 'Regular Customers',
      count: 45,
      avgValue: '$890',
      churnProbability: '45%',
      lastActivity: '22 days ago'
    },
    {
      segment: 'New Users',
      count: 67,
      avgValue: '$340',
      churnProbability: '65%',
      lastActivity: '8 days ago'
    }
  ];

  const campaignTemplates = [
    {
      name: 'Win-Back Offer',
      type: 'Email',
      description: 'Special discount to re-engage inactive customers',
      expectedResponse: '12-18%'
    },
    {
      name: 'Loyalty Rewards',
      type: 'In-App',
      description: 'Points-based incentive for continued usage',
      expectedResponse: '22-28%'
    },
    {
      name: 'Personal Check-in',
      type: 'SMS',
      description: 'Personalized message from account manager',
      expectedResponse: '8-15%'
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
          <h1 className="text-2xl font-bold">Customer Retention Campaign</h1>
          <p className="text-gray-600">Engage at-risk customers with targeted retention strategies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-red-600" />
              <span className="font-semibold">At Risk</span>
            </div>
            <p className="text-2xl font-bold text-red-600">135</p>
            <p className="text-sm text-gray-600">Customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Revenue at Risk</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">$156K</p>
            <p className="text-sm text-gray-600">Potential loss</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Campaign Ready</span>
            </div>
            <p className="text-2xl font-bold text-green-600">89</p>
            <p className="text-sm text-gray-600">Customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Success Rate</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">23%</p>
            <p className="text-sm text-gray-600">Expected retention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {churnRiskCustomers.map((segment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{segment.segment}</h3>
                      <p className="text-sm text-gray-600">{segment.count} customers</p>
                    </div>
                    <Badge variant="destructive">{segment.churnProbability}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Avg Value: </span>
                      <span className="font-medium">{segment.avgValue}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Activity: </span>
                      <span className="font-medium">{segment.lastActivity}</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3" variant="outline">
                    Target This Segment
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignTemplates.map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">
                      Expected Response: {template.expectedResponse}
                    </span>
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Launch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Select Segments</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>High-Value At Risk (23 customers)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Regular Customers (45 customers)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>New Users (67 customers)</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Campaign Type</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="campaign" defaultChecked />
                  <span>Email Campaign</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="campaign" />
                  <span>In-App Notification</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="campaign" />
                  <span>Multi-Channel</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Schedule</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="schedule" defaultChecked />
                  <span>Send Immediately</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="schedule" />
                  <span>Schedule for Later</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="schedule" />
                  <span>Automated Trigger</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button>Launch Campaign</Button>
            <Button variant="outline">Save as Draft</Button>
            <Button variant="outline">Preview</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngageRetentionCampaign;
