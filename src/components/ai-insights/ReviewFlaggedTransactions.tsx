
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  CheckCircle,
  XCircle,
  ArrowLeft,
  Filter,
  Download
} from 'lucide-react';

interface ReviewFlaggedTransactionsProps {
  onBack: () => void;
}

const ReviewFlaggedTransactions = ({ onBack }: ReviewFlaggedTransactionsProps) => {
  const [selectedTab, setSelectedTab] = useState('high-risk');

  const flaggedTransactions = {
    'high-risk': [
      {
        id: 'TXN-FR-001',
        amount: '$2,450.00',
        customer: 'Anonymous User',
        location: 'Unknown',
        riskScore: 95,
        reason: 'Velocity fraud pattern detected',
        timestamp: '2 min ago',
        status: 'pending'
      },
      {
        id: 'TXN-FR-002',
        amount: '$890.00',
        customer: 'John Doe',
        location: 'Multiple IPs',
        riskScore: 88,
        reason: 'Geographic anomaly + new device',
        timestamp: '8 min ago',
        status: 'pending'
      }
    ],
    'medium-risk': [
      {
        id: 'TXN-FR-003',
        amount: '$156.99',
        customer: 'Sarah Johnson',
        location: 'New York, US',
        riskScore: 67,
        reason: 'First-time large purchase',
        timestamp: '15 min ago',
        status: 'pending'
      },
      {
        id: 'TXN-FR-004',
        amount: '$299.00',
        customer: 'Mike Wilson',
        location: 'London, UK',
        riskScore: 54,
        reason: 'Unusual purchase pattern',
        timestamp: '22 min ago',
        status: 'pending'
      }
    ],
    'resolved': [
      {
        id: 'TXN-FR-005',
        amount: '$1,200.00',
        customer: 'Alice Brown',
        location: 'Sydney, AU',
        riskScore: 92,
        reason: 'Card testing detected',
        timestamp: '1 hour ago',
        status: 'blocked'
      }
    ]
  };

  const handleAction = (transactionId: string, action: 'approve' | 'block' | 'investigate') => {
    console.log(`${action} transaction ${transactionId}`);
    // Implementation for handling transaction actions
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Flagged Transactions</h1>
          <p className="text-gray-600">AI-detected fraud patterns requiring attention</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            High Risk: {flaggedTransactions['high-risk'].length}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Medium Risk: {flaggedTransactions['medium-risk'].length}
          </span>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="high-risk">High Risk ({flaggedTransactions['high-risk'].length})</TabsTrigger>
          <TabsTrigger value="medium-risk">Medium Risk ({flaggedTransactions['medium-risk'].length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({flaggedTransactions['resolved'].length})</TabsTrigger>
        </TabsList>

        {Object.entries(flaggedTransactions).map(([riskLevel, transactions]) => (
          <TabsContent key={riskLevel} value={riskLevel} className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className={`border-l-4 ${
                riskLevel === 'high-risk' ? 'border-l-red-500' :
                riskLevel === 'medium-risk' ? 'border-l-yellow-500' :
                'border-l-green-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{transaction.id}</h3>
                        <Badge variant={
                          transaction.riskScore > 80 ? 'destructive' :
                          transaction.riskScore > 60 ? 'secondary' : 'default'
                        }>
                          Risk Score: {transaction.riskScore}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <span className="ml-2 font-semibold">{transaction.amount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <span className="ml-2">{transaction.customer}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Location:</span>
                          <span className="ml-2">{transaction.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Time:</span>
                          <span className="ml-2">{transaction.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-700">{transaction.reason}</span>
                      </div>
                    </div>
                    
                    {transaction.status === 'pending' ? (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAction(transaction.id, 'investigate')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleAction(transaction.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleAction(transaction.id, 'block')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Block
                        </Button>
                      </div>
                    ) : (
                      <Badge variant={transaction.status === 'blocked' ? 'destructive' : 'default'}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ReviewFlaggedTransactions;
