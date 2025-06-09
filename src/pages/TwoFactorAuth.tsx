
import React, { useState } from 'react';
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { KeyRound, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (value.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    // Accept 123456 as valid code
    if (value !== '123456') {
      toast.error("Invalid verification code. Please try again.");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('2FA code:', value);
      
      // Set last login timestamp
      localStorage.setItem('lastLoginTime', new Date().toISOString());
      
      toast.success("Two-factor authentication successful");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecovery = () => {
    toast.info("Recovery instructions have been sent to your email");
    setShowRecoveryDialog(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code (use 123456 for demo)
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={value} onChange={setValue}>
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
                "Verify"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            variant="link" 
            className="w-full text-blue-600 dark:text-blue-400"
            onClick={() => setShowRecoveryDialog(true)}
          >
            Can't access your authenticator app?
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-500 text-white p-3 rounded-full">
                <ShieldAlert className="h-6 w-6" />
              </div>
            </div>
            <DialogTitle className="text-center">Two-Factor Recovery</DialogTitle>
            <DialogDescription className="text-center">
              If you've lost access to your authenticator app, we can help you recover your account or reset your 2FA.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For security reasons, you will need to verify your identity before we can disable 2FA on your account. 
              We'll send instructions to your registered email address.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => setShowRecoveryDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="sm:flex-1"
              onClick={handleRecovery}
            >
              Send Recovery Instructions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TwoFactorAuth;
