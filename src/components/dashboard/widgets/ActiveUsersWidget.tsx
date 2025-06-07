
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ActiveUsersWidget = () => {
  const [userData, setUserData] = useState({
    active: 1234,
    new: 47,
    returning: 1187,
    growth: 5.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        active: prev.active + Math.floor(Math.random() * 6) - 3,
        new: prev.new + Math.floor(Math.random() * 3) - 1
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const newUserPercentage = (userData.new / userData.active) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Active Users
        </CardTitle>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Users className="h-4 w-4 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {userData.active.toLocaleString()}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <UserPlus className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600">+{userData.growth}%</span>
          <span className="text-sm text-gray-500">vs last month</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>New Users</span>
            <span>{userData.new}</span>
          </div>
          <Progress value={newUserPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Returning: {userData.returning}</span>
            <span>{newUserPercentage.toFixed(1)}% new</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersWidget;
