
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: LucideIcon;
  className?: string;
}

export function StatsCard({ title, value, change, icon: Icon, className }: StatsCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
              {title}
            </p>
            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {value}
            </p>
            {change && (
              <p className={cn(
                'text-xs lg:text-sm font-medium',
                change.trend === 'up' && 'text-green-600 dark:text-green-400',
                change.trend === 'down' && 'text-red-600 dark:text-red-400',
                change.trend === 'neutral' && 'text-gray-600 dark:text-gray-400'
              )}>
                {change.value}
              </p>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0 p-2 lg:p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
