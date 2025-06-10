
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbNavProps {
  activeTab: string;
}

const BreadcrumbNav = ({ activeTab }: BreadcrumbNavProps) => {
  const getBreadcrumbItems = (tab: string) => {
    const tabLabels: Record<string, string> = {
      'dashboard': 'Dashboard',
      'transactions': 'Transactions',
      'customers': 'Customer Management',
      'payment-methods': 'Payment Methods',
      'profile': 'Profile',
      'orchestration': 'Orchestration Rules',
      'settlements': 'Settlements',
      'payouts': 'Payouts',
      'terno': 'TerNo Management',
      'announcements': 'Announcements',
      'referrals': 'Referrals',
      'support': 'Support Center',
      'support-tickets': 'Support Tickets',
      'account-settings': 'Account Settings',
      'feedback': 'Feedback',
    };

    const items = [
      { label: 'Home', href: '#', isCurrent: false },
    ];

    if (tab !== 'dashboard') {
      items.push({
        label: tabLabels[tab] || 'Unknown Page',
        href: '#',
        isCurrent: true,
      });
    } else {
      items[0].isCurrent = true;
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems(activeTab);

  return (
    <div className="hidden sm:block mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {index === 0 && <Home className="h-4 w-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink 
                    href={item.href}
                    className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {index === 0 && <Home className="h-4 w-4" />}
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
