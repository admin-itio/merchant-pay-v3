
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, AlertTriangle, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ReviewFlaggedTransactionsProps {
  onBack: () => void;
}

const ReviewFlaggedTransactions = ({ onBack }: ReviewFlaggedTransactionsProps) => {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const flaggedTransactions = [
    {
      id: 'TXN001',
      amount: '$2,450.00',
      customer: 'John Smith',
      riskScore: 85,
      reason: 'Unusual spending pattern',
      status: 'Under Review',
      timestamp: '2024-01-15 14:32'
    },
    {
      id: 'TXN002',
      amount: '$750.00',
      customer: 'Sarah Johnson',
      riskScore: 78,
      reason: 'Geographic anomaly',
      status: 'Flagged',
      timestamp: '2024-01-15 13:21'
    },
    {
      id: 'TXN003',
      amount: '$1,200.00',
      customer: 'Mike Davis',
      riskScore: 92,
      reason: 'Card testing pattern',
      status: 'Blocked',
      timestamp: '2024-01-15 12:45'
    }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Flagged Transactions Review</h1>
          <p className="text-gray-600">AI-detected suspicious transactions requiring attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-semibold">High Risk</span>
            </div>
            <p className="text-2xl font-bold text-red-600">15</p>
            <p className="text-sm text-gray-600">Transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold">Medium Risk</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">28</p>
            <p className="text-sm text-gray-600">Transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Total Amount</span>
            </div>
            <p className="text-2xl font-bold text-green-600">$45,750</p>
            <p className="text-sm text-gray-600">At risk</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Reviewed</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">67%</p>
            <p className="text-sm text-gray-600">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Transactions</CardTitle>
          <div className="flex gap-2">
            <Button size="sm">Approve Selected</Button>
            <Button size="sm" variant="outline">Block Selected</Button>
            <Button size="sm" variant="outline">Request More Info</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge className={`${getRiskColor(transaction.riskScore)} border-0`}>
                      {transaction.riskScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Risk Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Critical Patterns Detected</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Card testing attempts from multiple IP addresses</li>
                <li>• Unusual transaction amounts during off-hours</li>
                <li>• Geographic mismatches in billing vs shipping addresses</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Recommended Actions</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Implement additional verification for high-risk transactions</li>
                <li>• Review and update velocity rules</li>
                <li>• Consider enabling 3D Secure for international transactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewFlaggedTransactions;
