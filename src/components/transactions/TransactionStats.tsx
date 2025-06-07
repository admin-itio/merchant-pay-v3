
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  Users,
  Clock,
  Globe
} from 'lucide-react';

interface TransactionStatsProps {
  transactions: Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    timestamp: string;
    fraudScore: number;
    gateway: string;
    country: string;
    customer: string;
  }>;
  period?: string;
}

const TransactionStats = ({ transactions, period = '24h' }: TransactionStatsProps) => {
  const stats = React.useMemo(() => {
    const total = transactions.length;
    const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
    const successful = transactions.filter(t => t.status === 'completed').length;
    const failed = transactions.filter(t => t.status === 'failed').length;
    const pending = transactions.filter(t => t.status === 'pending').length;
    
    const avgTransaction = total > 0 ? totalVolume / total : 0;
    const successRate = total > 0 ? (successful / total) * 100 : 0;
    const avgFraudScore = total > 0 ? 
      transactions.reduce((sum, t) => sum + t.fraudScore, 0) / total : 0;
    
    const uniqueCustomers = new Set(transactions.map(t => t.customer)).size;
    const uniqueCountries = new Set(transactions.map(t => t.country)).size;
    
    return {
      total,
      totalVolume,
      successful,
      failed,
      pending,
      avgTransaction,
      successRate,
      avgFraudScore,
      uniqueCustomers,
      uniqueCountries
    };
  }, [transactions]);

  const statCards = [
    {
      title: 'Total Volume',
      value: `$${stats.totalVolume.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate.toFixed(1)}%`,
      change: '+2.1%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Avg Transaction',
      value: `$${stats.avgTransaction.toFixed(0)}`,
      change: '-3.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Fraud Score',
      value: stats.avgFraudScore.toFixed(0),
      change: '-5.0',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Unique Customers',
      value: stats.uniqueCustomers.toString(),
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Countries',
      value: stats.uniqueCountries.toString(),
      change: '+2',
      trend: 'up',
      icon: Globe,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'Failed Transactions',
      value: stats.failed.toString(),
      change: '-15.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Pending',
      value: stats.pending.toString(),
      change: '+5.1%',
      trend: 'up',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-3">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">vs {period}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TransactionStats;
