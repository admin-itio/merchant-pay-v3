import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const SystemHealth = () => (
  <Card className='h-full'>
    <CardHeader className="p-4 lg:p-6">
      <CardTitle className="text-base lg:text-lg">System Health</CardTitle>
      <CardDescription className="text-xs lg:text-sm">Performance metrics and alerts</CardDescription>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 pt-0">
      <div className="space-y-4 lg:space-y-6">
        <div>
          <div className="flex justify-between text-xs lg:text-sm mb-2">
            <span>API Response Time</span>
            <span>245ms</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-xs lg:text-sm mb-2">
            <span>System Uptime</span>
            <span>99.9%</span>
          </div>
          <Progress value={99.9} className="h-2" />
        </div>
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs lg:text-sm font-medium text-green-800">All Systems Operational</p>
              <p className="text-xs text-green-600">No issues detected</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs lg:text-sm font-medium text-yellow-800">High Transaction Volume</p>
              <p className="text-xs text-yellow-600">Monitor for potential delays</p>
            </div>
          </div>
          <div className="flex items-start space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-blue-50">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs lg:text-sm font-medium text-blue-800">Scheduled Maintenance</p>
              <p className="text-xs text-blue-600">Tomorrow 2:00 AM - 4:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default SystemHealth;