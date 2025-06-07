
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target,
  Eye,
  Shield
} from 'lucide-react';

interface Insight {
  title: string;
  impact: string;
  description: string;
  action: string;
  actionKey: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface InsightsGridProps {
  onInsightAction: (actionKey: string) => void;
}

const InsightsGrid = ({ onInsightAction }: InsightsGridProps) => {
  const insights: Insight[] = [
    {
      title: 'Revenue Optimization',
      impact: 'High',
      description: 'Implementing dynamic pricing could increase revenue by 12-18%',
      action: 'Review pricing strategy',
      actionKey: 'pricing-strategy',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Fraud Prevention',
      impact: 'Critical',
      description: 'AI model detected 15 potential fraud patterns requiring immediate attention',
      action: 'Review flagged transactions',
      actionKey: 'flagged-transactions',
      icon: Shield,
      color: 'text-red-600'
    },
    {
      title: 'Customer Retention',
      impact: 'Medium',
      description: '23% of high-value customers show early churn indicators',
      action: 'Engage retention campaigns',
      actionKey: 'retention-campaign',
      icon: Target,
      color: 'text-orange-600'
    },
    {
      title: 'Market Opportunity',
      impact: 'High',
      description: 'Southeast Asian markets show 45% growth potential',
      action: 'Explore market expansion',
      actionKey: 'market-expansion',
      icon: Eye,
      color: 'text-blue-600'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <Icon className={`h-5 w-5 ${insight.color}`} />
                <Badge variant={insight.impact === 'Critical' ? 'destructive' : insight.impact === 'High' ? 'default' : 'secondary'}>
                  {insight.impact}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mb-2">{insight.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => onInsightAction(insight.actionKey)}
              >
                {insight.action}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InsightsGrid;
