import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogOut, CheckCircle } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [lastLoginTime, setLastLoginTime] = useState<string>('');

  useEffect(() => {
    // Get last login time from localStorage
    const loginTime = localStorage.getItem('lastLoginTime');
    if (loginTime) {
      const date = new Date(loginTime);
      setLastLoginTime(date.toLocaleString());
    }
  }, []);

  const handleConfirmLogout = () => {
    console.log('User logged out');
    
    // Clear auth tokens, user data, etc.
    localStorage.removeItem('authToken');
    // Keep lastLoginTime for display
    
    setShowConfirmDialog(false);
    setIsLoggedOut(true);
  };

  const handleCancelLogout = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (showConfirmDialog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <LogOut className="h-6 w-6" />
                </div>
              </div>
              <DialogTitle className="text-center">Confirm Logout</DialogTitle>
              <DialogDescription className="text-center">
                Are you sure you want to log out of your MerchantPay account?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                You will need to sign in again to access your dashboard and account features.
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="sm:flex-1"
                onClick={handleCancelLogout}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                className="sm:flex-1"
                onClick={handleConfirmLogout}
              >
                Yes, Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (isLoggedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl">Logged Out Successfully</CardTitle>
            <CardDescription>
              You have been securely logged out of your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center pt-6">
            <div className="text-center text-gray-600 dark:text-gray-400 space-y-3">
              <p>Thank you for using MerchantPay.</p>
              <p>For security reasons, please close your browser if you're on a public computer.</p>
              {lastLoginTime && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium">Last successful login:</p>
                  <p className="text-sm">{lastLoginTime}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleLogin} className="w-full max-w-xs">
              <LogOut className="mr-2 h-4 w-4" />
              Log In Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return null;
};

export default Logout;
