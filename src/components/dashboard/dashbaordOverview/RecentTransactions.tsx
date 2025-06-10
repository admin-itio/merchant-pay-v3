import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';

const RecentTransactions = ({ transactions }: { transactions: any[] }) => (
  <Card>
    <CardHeader className="p-4 lg:p-6">
      <CardTitle className="text-base lg:text-lg">Recent Transactions</CardTitle>
      <CardDescription className="text-xs lg:text-sm">Latest payment activities</CardDescription>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 pt-0">
      <div className="space-y-3 lg:space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-2 lg:p-3 rounded-lg border">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <CreditCard className="h-3 w-3 lg:h-4 lg:w-4" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-medium">{transaction.customer}</p>
                <p className="text-xs text-muted-foreground">{transaction.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs lg:text-sm font-medium">{transaction.amount}</p>
              <div className="flex items-center gap-1">
                <Badge
                  variant={
                    transaction.status === 'completed' ? 'default' :
                    transaction.status === 'pending' ? 'secondary' : 'destructive'
                  }
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentTransactions;