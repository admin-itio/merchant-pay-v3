
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  CreditCard,
  Shield,
  RefreshCw,
  FileText,
  Eye
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  status: 'success' | 'warning' | 'error' | 'info';
  description: string;
  details?: Record<string, any>;
  actor?: string;
}

interface TransactionTimelineProps {
  transactionId: string;
  events?: TimelineEvent[];
}

const TransactionTimeline = ({ transactionId, events }: TransactionTimelineProps) => {
  const defaultEvents: TimelineEvent[] = [
    {
      id: '1',
      timestamp: '2024-01-20T10:30:00Z',
      event: 'Transaction Initiated',
      status: 'info',
      description: 'Customer initiated payment',
      details: { amount: 150.00, currency: 'USD', method: 'Credit Card' },
      actor: 'Customer'
    },
    {
      id: '2',
      timestamp: '2024-01-20T10:30:15Z',
      event: 'Fraud Check',
      status: 'success',
      description: 'Fraud screening passed',
      details: { score: 15, threshold: 50, provider: 'Internal AI' },
      actor: 'System'
    },
    {
      id: '3',
      timestamp: '2024-01-20T10:30:30Z',
      event: 'Payment Authorization',
      status: 'success',
      description: 'Payment authorized by processor',
      details: { processor: 'Stripe', authCode: 'AUTH123456' },
      actor: 'Payment Processor'
    },
    {
      id: '4',
      timestamp: '2024-01-20T10:30:45Z',
      event: 'Risk Assessment',
      status: 'warning',
      description: 'High-value transaction flagged for review',
      details: { riskScore: 75, rule: 'High Amount Rule' },
      actor: 'Risk Engine'
    },
    {
      id: '5',
      timestamp: '2024-01-20T10:45:00Z',
      event: 'Manual Review',
      status: 'success',
      description: 'Transaction approved after manual review',
      details: { reviewer: 'John Smith', decision: 'Approved' },
      actor: 'Risk Analyst'
    },
    {
      id: '6',
      timestamp: '2024-01-20T10:45:30Z',
      event: 'Payment Captured',
      status: 'success',
      description: 'Payment successfully captured',
      details: { captureId: 'CAP789012', amount: 150.00 },
      actor: 'System'
    }
  ];

  const timelineEvents = events || defaultEvents;

  const getEventIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Transaction Timeline
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Timeline
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Transaction ID: <span className="font-mono font-medium">{transactionId}</span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStatusColor(event.status)}`}>
                    {getEventIcon(event.status)}
                  </div>
                  
                  {/* Event content */}
                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{event.event}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                        {event.actor && (
                          <div className="text-gray-400">by {event.actor}</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Event details */}
                    {event.details && (
                      <div className="mt-2 p-3 bg-gray-50 rounded text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(event.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="ml-1 font-medium">
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Timeline Summary</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Events</p>
                <p className="font-medium">{timelineEvents.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">15 minutes</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <Badge variant="default">Completed</Badge>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTimeline;
