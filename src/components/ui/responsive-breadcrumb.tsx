
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface ResponsiveBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ResponsiveBreadcrumb({ items, className }: ResponsiveBreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400', className)}>
      <Home className="h-4 w-4 flex-shrink-0" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          {item.href && !item.current ? (
            <a
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors truncate"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                'truncate',
                item.current && 'text-gray-900 dark:text-gray-100 font-medium'
              )}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
