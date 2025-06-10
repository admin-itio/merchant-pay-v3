
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Building,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileBilling = () => {
  const [currentPlan, setCurrentPlan] = useState('starter');
  const [monthlyVolume, setMonthlyVolume] = useState(125000); // Current month volume
  const { toast } = useToast();

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      monthlyFee: 49,
      transactionFee: '2.9% + $0.30',
      volumeThreshold: 100000,
      features: ['Basic dashboard', 'Email support', 'Standard reporting'],
      color: 'border-blue-500'
    },
    {
      id: 'business',
      name: 'Business Plan', 
      monthlyFee: 29,
      transactionFee: '2.7% + $0.25',
      volumeThreshold: 500000,
      features: ['Advanced analytics', 'Priority support', 'Custom reporting', 'API access'],
      color: 'border-green-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      monthlyFee: 0,
      transactionFee: '2.5% + $0.20',
      volumeThreshold: 500000,
      features: ['Full analytics suite', '24/7 phone support', 'Custom integrations', 'Dedicated account manager'],
      color: 'border-purple-500'
    }
  ];

  const currentPlanData = plans.find(p => p.id === currentPlan);
  const nextPlan = monthlyVolume > 100000 && monthlyVolume < 500000 ? plans[1] : 
                   monthlyVolume >= 500000 ? plans[2] : null;

  const billingHistory = [
    {
      id: 'INV-001',
      date: '2024-01-01',
      description: 'Monthly Fee - January 2024',
      amount: currentPlanData?.monthlyFee || 0,
      status: 'paid',
      type: 'monthly-fee'
    },
    {
      id: 'INV-002',
      date: '2023-12-01', 
      description: 'Monthly Fee - December 2023',
      amount: currentPlanData?.monthlyFee || 0,
      status: 'paid',
      type: 'monthly-fee'
    },
    {
      id: 'INV-003',
      date: '2023-11-01',
      description: 'Monthly Fee - November 2023', 
      amount: currentPlanData?.monthlyFee || 0,
      status: 'paid',
      type: 'monthly-fee'
    }
  ];

  const usage = {
    currentMonth: monthlyVolume,
    transactionCount: 1247,
    fees: 3240.50
  };

  const handlePlanUpgrade = () => {
    if (nextPlan) {
      toast({
        title: "Plan Upgrade Available",
        description: `Your volume qualifies for ${nextPlan.name} with lower fees!`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Billing & Plans</h2>
        <p className="text-sm text-muted-foreground">
          Manage your billing information and subscription plan
        </p>
      </div>

      {/* Plan Upgrade Alert */}
      {nextPlan && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Upgrade Available!
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Your monthly volume of ${monthlyVolume.toLocaleString()} qualifies you for {nextPlan.name} 
                  with ${currentPlanData?.monthlyFee! - nextPlan.monthlyFee} lower monthly fee and better transaction rates.
                </p>
              </div>
              <Button size="sm" onClick={handlePlanUpgrade}>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Plan */}
      <Card className={`${currentPlanData?.color} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentPlan === 'enterprise' ? <Crown className="h-5 w-5 text-purple-600" /> :
             currentPlan === 'business' ? <Building className="h-5 w-5 text-green-600" /> :
             <Zap className="h-5 w-5 text-blue-600" />}
            Current Plan: {currentPlanData?.name}
            <Badge variant="secondary">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Fee</p>
              <p className="text-2xl font-bold">
                ${currentPlanData?.monthlyFee}{currentPlanData?.monthlyFee === 0 ? '' : '/mo'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction Fee</p>
              <p className="text-lg font-medium">{currentPlanData?.transactionFee}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volume Tier</p>
              <p className="text-lg font-medium">
                {currentPlanData?.volumeThreshold === 500000 ? '$500K+' : `Up to $${(currentPlanData?.volumeThreshold! / 1000)}K`}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Plan Features</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentPlanData?.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage This Month */}
      <Card>
        <CardHeader>
          <CardTitle>Current Month Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Transaction Volume</p>
              <p className="text-2xl font-bold">${usage.currentMonth.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Transaction Count</p>
              <p className="text-2xl font-bold">{usage.transactionCount}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Total Fees</p>
              <p className="text-2xl font-bold">${usage.fees}</p>
            </div>
          </div>
          
          {nextPlan && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Volume Progress to {nextPlan.name}
              </p>
              <Progress 
                value={Math.min((usage.currentMonth / nextPlan.volumeThreshold) * 100, 100)} 
                className="mb-2" 
              />
              <p className="text-xs text-muted-foreground">
                ${usage.currentMonth.toLocaleString()} / ${nextPlan.volumeThreshold.toLocaleString()} 
                {usage.currentMonth >= nextPlan.volumeThreshold && ' - Eligible for upgrade!'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Monthly Fee Collection
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  Monthly fees are automatically collected on the 1st of every month based on your previous month's 
                  transaction volume and plan tier. You'll see a "Monthly Fee" transaction in your system.
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-2">
                  <strong>Plan changes:</strong> Plans are automatically upgraded based on your monthly volume:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-200 mt-1 ml-4 list-disc">
                  <li>Under $100K/month: Starter Plan ($49/month)</li>
                  <li>$100K - $500K/month: Business Plan ($29/month)</li>
                  <li>Over $500K/month: Enterprise Plan ($0/month)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> No payment method required. All fees are deducted from your transaction 
              processing balance automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Billing History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${invoice.amount}</p>
                  <Badge variant="secondary">Paid</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBilling;
