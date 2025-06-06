
import React, { useEffect } from 'react';
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
import { LogOut, CheckCircle } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    console.log('User logged out');
    
    // In a real application, you would clear auth tokens, etc.
    // localStorage.removeItem('authToken');
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

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
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Thank you for using MerchantPay.</p>
            <p className="mt-2">For security reasons, please close your browser if you're on a public computer.</p>
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
};

export default Logout;
