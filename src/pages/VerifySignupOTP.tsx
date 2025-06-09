
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

const VerifySignupOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const locationState = location.state as { email: string; name: string } | null;
    if (!locationState?.email) {
      navigate('/signup');
      return;
    }
    setEmail(locationState.email);
    setName(locationState.name);
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (value.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('OTP code:', value);
      
      // Check if the code is 123456
      if (value === '123456') {
        toast.success("Email verified successfully");
        setTimeout(() => {
          navigate('/setup-password', { state: { email, name } });
        }, 1000);
      } else {
        toast.error("Invalid OTP. Please use 123456 for testing.");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Mail className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {email} (use 123456 for testing)
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={value} onChange={setValue} pattern="[0-9]">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifySignupOTP;
