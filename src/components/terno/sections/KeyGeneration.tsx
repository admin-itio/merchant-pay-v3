
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Key, Eye, EyeOff } from 'lucide-react';

interface KeyGenerationProps {
  generatedKeys: {publicKey: string, privateKey: string} | null;
  setGeneratedKeys: (keys: {publicKey: string, privateKey: string} | null) => void;
}

const KeyGeneration = ({ generatedKeys, setGeneratedKeys }: KeyGenerationProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const generateKeyPair = () => {
    // In real implementation, this would call a secure API
    const publicKey = `MTE3MjhfOTUxXzIwMjUwNTA3Tg${Math.random().toString(36).substr(2, 20)}`;
    const privateKey = `PRIV_${Math.random().toString(36).substr(2, 32).toUpperCase()}`;
    setGeneratedKeys({ publicKey, privateKey });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Public/Private Key Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button type="button" onClick={generateKeyPair} variant="outline">
            Generate New Key Pair
          </Button>
          {generatedKeys && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Keys Generated Successfully
            </Badge>
          )}
        </div>

        {generatedKeys && (
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <Label>Public Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input value={generatedKeys.publicKey} readOnly className="font-mono text-xs" />
                <Button type="button" variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedKeys.publicKey)}>
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                Private Key
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input 
                  value={showPrivateKey ? generatedKeys.privateKey : '•'.repeat(generatedKeys.privateKey.length)} 
                  readOnly 
                  className="font-mono text-xs" 
                />
                <Button type="button" variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedKeys.privateKey)}>
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyGeneration;
