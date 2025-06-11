
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Smartphone, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrustDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrust: (trustDevice: boolean) => void;
  deviceInfo: {
    browser: string;
    os: string;
    location: string;
    ip: string;
  };
}

const TrustDeviceModal = ({ isOpen, onClose, onTrust, deviceInfo }: TrustDeviceModalProps) => {
  const [trustThisDevice, setTrustThisDevice] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const { toast } = useToast();

  const handleContinue = () => {
    // Store device trust preferences
    const trustData = {
      trusted: trustThisDevice,
      dontAskAgain,
      deviceInfo,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('deviceTrustPreference', JSON.stringify(trustData));
    
    if (trustThisDevice) {
      toast({
        title: "Device Trusted",
        description: "This device has been added to your trusted devices list.",
      });
    }
    
    onTrust(trustThisDevice);
    onClose();
  };

  const handleSkip = () => {
    onTrust(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          <DialogTitle className="text-center">Trust This Device?</DialogTitle>
          <DialogDescription className="text-center">
            We've detected you're logging in from a new device. Would you like to trust this device for future logins?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Device Information */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-sm text-gray-900">Device Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>{deviceInfo.browser} on {deviceInfo.os}</span>
              </div>
              <div>Location: {deviceInfo.location}</div>
              <div>IP Address: {deviceInfo.ip}</div>
            </div>
          </div>

          {/* Trust Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Trust this device
                </Label>
                <p className="text-sm text-gray-500">
                  Skip 2FA verification on this device for 30 days
                </p>
              </div>
              <Switch
                checked={trustThisDevice}
                onCheckedChange={setTrustThisDevice}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Remember my choice</Label>
                <p className="text-sm text-gray-500">
                  Don't ask me again for this device
                </p>
              </div>
              <Switch
                checked={dontAskAgain}
                onCheckedChange={setDontAskAgain}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Security Tip</p>
                <p className="text-yellow-700">
                  Only trust devices you personally own and use regularly. 
                  Trusted devices will have reduced security verification for convenience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="sm:flex-1"
          >
            Not Now
          </Button>
          <Button
            onClick={handleContinue}
            className="sm:flex-1"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrustDeviceModal;
