
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  Share2, 
  Copy, 
  Mail, 
  Facebook, 
  Twitter, 
  MessageCircle,
  Gift,
  TrendingUp,
  Calendar,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralManagement = () => {
  const { toast } = useToast();
  const [referralCode] = useState('REF-ABC123');
  const [emailInput, setEmailInput] = useState('');

  const referralStats = [
    {
      title: 'Total Referrals',
      value: '24',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Referrals',
      value: '18',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Earnings',
      value: '$1,240.50',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pending Payouts',
      value: '$320.00',
      icon: Gift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const referralHistory = [
    {
      id: 'REF-001',
      email: 'john@example.com',
      name: 'John Smith',
      status: 'Active',
      signupDate: '2024-01-15',
      commission: '$45.00',
      transactions: 12
    },
    {
      id: 'REF-002',
      email: 'sarah@example.com',
      name: 'Sarah Johnson',
      status: 'Active',
      signupDate: '2024-01-10',
      commission: '$78.50',
      transactions: 8
    },
    {
      id: 'REF-003',
      email: 'mike@example.com',
      name: 'Mike Wilson',
      status: 'Pending',
      signupDate: '2024-01-08',
      commission: '$0.00',
      transactions: 0
    },
    {
      id: 'REF-004',
      email: 'emma@example.com',
      name: 'Emma Davis',
      status: 'Active',
      signupDate: '2024-01-05',
      commission: '$125.75',
      transactions: 15
    }
  ];

  const payoutHistory = [
    {
      id: 'PAY-001',
      amount: '$450.00',
      date: '2024-01-01',
      status: 'Completed',
      method: 'Bank Transfer'
    },
    {
      id: 'PAY-002',
      amount: '$320.50',
      date: '2023-12-01',
      status: 'Completed',
      method: 'PayPal'
    },
    {
      id: 'PAY-003',
      amount: '$275.25',
      date: '2023-11-01',
      status: 'Completed',
      method: 'Bank Transfer'
    }
  ];

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleCopyReferralLink = () => {
    const referralLink = `https://app.company.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const handleSendEmail = () => {
    if (!emailInput.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation Sent",
      description: `Referral invitation sent to ${emailInput}`,
    });
    setEmailInput('');
  };

  const handleSocialShare = (platform: string) => {
    const referralLink = `https://app.company.com/signup?ref=${referralCode}`;
    const message = "Join me on this amazing payment platform and get started with a special bonus!";
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + referralLink)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Referral Management</h2>
          <p className="text-gray-600 mt-1">Invite friends and earn rewards for every successful referral</p>
        </div>
        <Button className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Program
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {referralStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="invite">Invite Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Referral Code Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="bg-gray-50 font-mono"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyReferralCode}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  value={`https://app.company.com/signup?ref=${referralCode}`}
                  readOnly 
                  className="bg-gray-50 text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyReferralLink}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Program Details */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Program Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">How it works</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Share your referral link with friends
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      They sign up and complete verification
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      You earn 5% of their transaction fees
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Get paid monthly via your preferred method
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reward Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Commission Rate:</span>
                      <span className="font-medium">5% of transaction fees</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum Payout:</span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payout Schedule:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cookie Duration:</span>
                      <span className="font-medium">30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Signup Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Transactions</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralHistory.map((referral) => (
                      <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{referral.name}</div>
                            <div className="text-sm text-gray-500">{referral.id}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{referral.email}</td>
                        <td className="py-3 px-4">{getStatusBadge(referral.status)}</td>
                        <td className="py-3 px-4 text-sm">{referral.signupDate}</td>
                        <td className="py-3 px-4 text-sm">{referral.transactions}</td>
                        <td className="py-3 px-4 font-medium">{referral.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{payout.amount}</div>
                        <div className="text-sm text-gray-600">via {payout.method}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(payout.status)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {payout.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Invitation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Invitation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="friend@example.com"
                  />
                </div>
                <Button onClick={handleSendEmail} className="w-full">
                  Send Invitation
                </Button>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Social Media Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialShare('facebook')}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Facebook className="h-4 w-4" />
                    Share on Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialShare('twitter')}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Twitter className="h-4 w-4" />
                    Share on Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialShare('whatsapp')}
                    className="flex items-center gap-2 justify-start"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Share on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralManagement;
