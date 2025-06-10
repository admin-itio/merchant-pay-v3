import { Button } from '@/components/ui/button';
import { Calendar, Filter, Download, RefreshCw } from 'lucide-react';

const DashboardHeader = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-sm lg:text-base text-muted-foreground">
        Monitor your payment processing performance and key metrics
      </p>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" className="text-xs lg:text-sm">
        <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
        Last 7 days
      </Button>
      <Button variant="outline" size="sm" className="text-xs lg:text-sm">
        <Filter className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
        Filter
      </Button>
      <Button variant="outline" size="sm" className="text-xs lg:text-sm">
        <Download className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
        Export
      </Button>
      <Button size="sm" className="text-xs lg:text-sm">
        <RefreshCw className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
        Refresh
      </Button>
    </div>
  </div>
);

export default DashboardHeader;