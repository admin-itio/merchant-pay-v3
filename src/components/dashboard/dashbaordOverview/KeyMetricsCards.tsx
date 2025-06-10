import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, CreditCard, Users, DollarSign, CheckCircle } from 'lucide-react';

const KeyMetricsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
    <Card className="hover-lift">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 lg:space-y-2">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground">Total Revenue</p>
            <p className="text-xl lg:text-2xl font-bold">$24,531</p>
            <div className="flex items-center text-xs lg:text-sm text-green-600">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              +12.5%
            </div>
          </div>
          <div className="rounded-full bg-green-100 p-2 lg:p-3">
            <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover-lift">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 lg:space-y-2">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground">Transactions</p>
            <p className="text-xl lg:text-2xl font-bold">1,247</p>
            <div className="flex items-center text-xs lg:text-sm text-green-600">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              +8.2%
            </div>
          </div>
          <div className="rounded-full bg-blue-100 p-2 lg:p-3">
            <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover-lift">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 lg:space-y-2">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground">Success Rate</p>
            <p className="text-xl lg:text-2xl font-bold">94.2%</p>
            <div className="flex items-center text-xs lg:text-sm text-red-600">
              <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              -2.1%
            </div>
          </div>
          <div className="rounded-full bg-yellow-100 p-2 lg:p-3">
            <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover-lift">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 lg:space-y-2">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground">Active Customers</p>
            <p className="text-xl lg:text-2xl font-bold">892</p>
            <div className="flex items-center text-xs lg:text-sm text-green-600">
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
              +15.3%
            </div>
          </div>
          <div className="rounded-full bg-purple-100 p-2 lg:p-3">
            <Users className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default KeyMetricsCards;