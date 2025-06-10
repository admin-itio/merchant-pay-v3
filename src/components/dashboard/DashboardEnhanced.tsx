import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Activity, Globe, Brain, Zap, Users } from 'lucide-react';

import DashboardAnalytics from './DashboardAnalytics';
import WorldMapAnalytics from '../analytics/WorldMapAnalytics';
import PredictiveAnalytics from '../analytics/PredictiveAnalytics';
import RealTimeDashboard from '../analytics/RealTimeDashboard';
import CustomerInsights from '../analytics/CustomerInsights';
import DashboardCustomizer from './DashboardCustomizer';
import DashboardHeader from './dashbaordOverview/DashboardHeader';
import KeyMetricsCards from './dashbaordOverview/KeyMetricsCards';
import TransactionVolumeChart from './dashbaordOverview/TransactionVolumeChart';
import PaymentMethodsChart from './dashbaordOverview/PaymentMethodsChart';
import RecentTransactions from './dashbaordOverview/RecentTransactions';
import SystemHealth from './dashbaordOverview/SystemHealth';

const transactionData = [
	{ name: 'Mon', transactions: 65, revenue: 2400 },
	{ name: 'Tue', transactions: 78, revenue: 2800 },
	{ name: 'Wed', transactions: 52, revenue: 1900 },
	{ name: 'Thu', transactions: 91, revenue: 3200 },
	{ name: 'Fri', transactions: 84, revenue: 2900 },
	{ name: 'Sat', transactions: 67, revenue: 2100 },
	{ name: 'Sun', transactions: 45, revenue: 1600 }
];

const paymentMethodData = [
	{ name: 'Credit Cards', value: 60, color: '#3B82F6' },
	{ name: 'Digital Wallets', value: 25, color: '#10B981' },
	{ name: 'Bank Transfers', value: 15, color: '#F59E0B' }
];

const recentTransactions = [
	{ id: 'TXN001', customer: 'John Smith', amount: '$245.00', status: 'completed', time: '2 min ago' },
	{ id: 'TXN002', customer: 'Sarah Johnson', amount: '$89.50', status: 'pending', time: '5 min ago' },
	{ id: 'TXN003', customer: 'Mike Davis', amount: '$1,234.00', status: 'completed', time: '8 min ago' },
	{ id: 'TXN004', customer: 'Emma Wilson', amount: '$67.25', status: 'failed', time: '12 min ago' },
	{ id: 'TXN005', customer: 'David Brown', amount: '$156.75', status: 'completed', time: '15 min ago' }
];

interface DashboardWidget {
	id: string;
	title: string;
	type: string;
	visible: boolean;
	size: 'small' | 'medium' | 'large';
	icon: React.ComponentType<any>;
	component: React.ComponentType<any>;
}

const initialOverviewWidgets: DashboardWidget[] = [
	{
		id: 'header',
		title: 'Header',
		type: 'header',
		visible: true,
		size: 'large',
		icon: BarChart3,
		component: DashboardHeader
	},
	{
		id: 'metrics',
		title: 'Key Metrics',
		type: 'metrics',
		visible: true,
		size: 'medium',
		icon: Activity,
		component: KeyMetricsCards
	},
	{
		id: 'transaction-volume',
		title: 'Transaction Volume',
		type: 'chart',
		visible: true,
		size: 'medium',
		icon: BarChart3,
		component: (props: any) => <TransactionVolumeChart data={transactionData} {...props} />
	},
	{
		id: 'payment-methods',
		title: 'Payment Methods',
		type: 'chart',
		visible: true,
		size: 'small',
		icon: BarChart3,
		component: (props: any) => <PaymentMethodsChart data={paymentMethodData} {...props} />
	},
	{
		id: 'recent-transactions',
		title: 'Recent Transactions',
		type: 'list',
		visible: true,
		size: 'medium',
		icon: Users,
		component: (props: any) => <RecentTransactions transactions={recentTransactions} {...props} />
	},
	{
		id: 'system-health',
		title: 'System Health',
		type: 'status',
		visible: true,
		size: 'small',
		icon: Brain,
		component: SystemHealth
	}
];

const DashboardEnhanced = () => {
	const [activeTab, setActiveTab] = useState('overview');
	const [overviewWidgets, setOverviewWidgets] = useState<DashboardWidget[]>(initialOverviewWidgets);

	const tabs = [
		{
			id: 'overview',
			label: 'Overview',
			icon: BarChart3,
			component: () => (
				<div className="space-y-4 lg:space-y-6 p-4 lg:p-0 relative">
					<div className="flex justify-end mb-2">
						<DashboardCustomizer
							widgets={overviewWidgets}
							onWidgetsChange={setOverviewWidgets}
              initialWidgets={initialOverviewWidgets}
						/>
					</div>
					{/* Render widgets based on visibility and order */}
					{/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{overviewWidgets
							.filter((widget) => widget.visible)
							.map((widget) => {
								const Component = widget.component;
								const sizeClasses = {
									small: 'col-span-1',
									medium: 'md:col-span-2',
									large: 'md:col-span-2 lg:col-span-3',
								};
								return (
									<div key={widget.id} className={sizeClasses[widget.size]}>
										<Component />
									</div>
								);
							})}
					</div> */}
				</div>
			)
		},
		{ id: 'analytics', label: 'Analytics', icon: Activity, component: DashboardAnalytics },
		{ id: 'world-map', label: 'Global View', icon: Globe, component: WorldMapAnalytics },
		{ id: 'predictive', label: 'AI Insights', icon: Brain, component: PredictiveAnalytics },
		{ id: 'realtime', label: 'Real-time', icon: Zap, component: RealTimeDashboard },
		{ id: 'customers', label: 'Customers', icon: Users, component: CustomerInsights },
	];

	return (
		<div className="space-y-6">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-gray-100 dark:bg-gray-800">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<TabsTrigger
								key={tab.id}
								value={tab.id}
								className="flex items-center gap-2 text-sm font-medium px-3 py-2"
							>
								<Icon className="h-4 w-4" />
								<span className="hidden sm:inline">{tab.label}</span>
							</TabsTrigger>
						);
					})}
				</TabsList>

				{tabs.map((tab) => {
					const Component = tab.component;
					return (
						<TabsContent key={tab.id} value={tab.id} className="mt-0">
							<Component />
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
};

export default DashboardEnhanced;
