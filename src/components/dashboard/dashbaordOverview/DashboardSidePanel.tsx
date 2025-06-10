import RecentTransactions from './RecentTransactions';
import SystemHealth from './SystemHealth';

interface DashboardSidePanelProps {
  transactions: any[];
}

const DashboardSidePanel = ({ transactions }: DashboardSidePanelProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
    <RecentTransactions transactions={transactions} />
    <SystemHealth />
  </div>
);

export default DashboardSidePanel;