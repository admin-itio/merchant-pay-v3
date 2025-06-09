
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Phone, HeadphonesIcon } from 'lucide-react';

const SupportSection = () => {
  const handleContactSupport = () => {
    // Navigate to support or open contact modal
    console.log('Contact Customer Support clicked');
  };

  const handleCallUs = () => {
    // Open call functionality or dial number
    console.log('Need Help? Call US clicked');
  };

  return (
    <Card className="fixed bottom-4 left-4 w-64 bg-background border shadow-lg z-10 hidden lg:block">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
            <HeadphonesIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                Have any problems or have suggestion?
              </p>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={handleContactSupport}
                variant="outline" 
                size="sm" 
                className="w-full text-xs justify-start"
              >
                <MessageSquare className="h-3 w-3 mr-2" />
                Try Contact Customer Support
              </Button>
              <Button 
                onClick={handleCallUs}
                variant="default" 
                size="sm" 
                className="w-full text-xs justify-start bg-orange-500 hover:bg-orange-600"
              >
                <Phone className="h-3 w-3 mr-2" />
                Need Help? Call US
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
