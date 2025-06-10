import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Building, CreditCard, Shield, Bell, Mail } from 'lucide-react';

import ProfileEnhanced from './ProfileEnhanced';

const Profile = () => {
const [activeProfileTab, setActiveProfileTab] = useState('user'); 

  return <ProfileEnhanced 
    activeProfileTab={activeProfileTab}
    setActiveProfileTab={setActiveProfileTab}
  />;
};

export default Profile;
