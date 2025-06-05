
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  Users,
  Percent,
  Clock,
  Target
} from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    {
      title: 'Total Volume',
      value: '₹12,45,67,890',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Last 7 days',
      additionalInfo: '3,586 transactions'
    },
    {
      title: 'Success Rate',
      value: '96.8%',
      change: '+1.4%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Payment success',
      additionalInfo: '3,468 successful'
    },
    {
      title: 'Avg Transaction',
      value: '₹3,474',
      change: '+8.7%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Per transaction',
      additionalInfo: 'Up from ₹3,195'
    },
    {
      title: 'Chargeback Rate',
      value: '0.18%',
      change: '-0.05%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Last 30 days',
      additionalInfo: '6 disputes'
    },
    {
      title: 'Active Customers',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: 'This month',
      additionalInfo: '347 new customers'
    },
    {
      title: 'Conversion Rate',
      value: '78.9%',
      change: '+2.1%',
      trend: 'up',
      icon: Percent,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      description: 'Cart to payment',
      additionalInfo: '4,544 attempts'
    },
    {
      title: 'Avg Settlement',
      value: '2.3 days',
      change: '-0.2 days',
      trend: 'down',
      icon: Clock,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Settlement time',
      additionalInfo: 'Faster by 4 hours'
    },
    {
      title: 'Revenue Today',
      value: '₹1,78,945',
      change: '+23.5%',
      trend: 'up',
      icon: Target,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      description: 'Today vs yesterday',
      additionalInfo: '89 transactions'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-3 w-3" />
                  {metric.change}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-gray-600 text-xs mt-1">{metric.title}</p>
                <p className="text-gray-500 text-xs">{metric.description}</p>
                <p className="text-gray-400 text-xs mt-1">{metric.additionalInfo}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;
