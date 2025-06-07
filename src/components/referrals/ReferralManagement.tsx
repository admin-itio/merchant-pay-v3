
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Share2, 
  Users, 
  DollarSign, 
  Mail, 
  Link as LinkIcon,
  Copy,
  Twitter,
  MessageCircle,
  Send,
  Gift,
  TrendingUp,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

const ReferralManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const referralStats = {
    totalReferred: 24,
    activeReferrals: 18,
    totalEarnings: 1250.00,
    pendingEarnings: 380.00,
    availableBalance: 870.00,
    conversionRate: 75,
    lifetimeCommission: 3420.50
  };

  const recentReferrals = [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'active', joinDate: '2024-06-01', commission: 50.00 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'pending', joinDate: '2024-06-05', commission: 0.00 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'active', joinDate: '2024-05-28', commission: 75.00 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', joinDate: '2024-05-25', commission: 60.00 },
  ];

  const payoutHistory = [
    { id: 1, amount: 250.00, date: '2024-05-01', status: 'completed', txnId: 'REF001' },
    { id: 2, amount: 180.00, date: '2024-04-01', status: 'completed', txnId: 'REF002' },
    { id: 3, amount: 320.00, date: '2024-03-01', status: 'completed', txnId: 'REF003' },
  ];

  const referralLink = 'https://merchantpay.com/signup?ref=YOUR_CODE';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link has been copied to your clipboard.",
    });
  };

  const handleShareEmail = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the invitation.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "You have done a great job!",
      description: "If your referral joins by this link in the next 30 days, you would be awarded the referral incentive. Your invitation has been sent successfully!",
    });
    setEmail('');
    setShareModalOpen(false);
  };

  const handleShareX = () => {
    const text = "Join MerchantPay and start accepting payments with ease! Use my referral link to get started.";
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
    
    toast({
      title: "You have done a great job!",
      description: "If your referral joins by this link in the next 30 days, you would be awarded the referral incentive.",
    });
  };

  const handleShareWhatsApp = () => {
    const text = `Join MerchantPay and start accepting payments with ease! ${referralLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    toast({
      title: "You have done a great job!",
      description: "If your referral joins by this link in the next 30 days, you would be awarded the referral incentive.",
    });
  };

  const handleShareTelegram = () => {
    const text = `Join MerchantPay and start accepting payments with ease! ${referralLink}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    toast({
      title: "You have done a great job!",
      description: "If your referral joins by this link in the next 30 days, you would be awarded the referral incentive.",
    });
  };

  const handleMoveToMainBalance = () => {
    toast({
      title: "Balance Transfer Initiated",
      description: `$${referralStats.availableBalance.toFixed(2)} has been moved to your main balance. A new transaction has been created.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
          <p className="text-gray-600">Earn rewards by referring new merchants to MerchantPay</p>
        </div>
        <Button onClick={() => setShareModalOpen(true)}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Program
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="payouts">Payout History</TabsTrigger>
          <TabsTrigger value="invite">Invite Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Referred</p>
                    <p className="text-2xl font-bold text-gray-900">{referralStats.totalReferred}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">+3 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Referrals</p>
                    <p className="text-2xl font-bold text-gray-900">{referralStats.activeReferrals}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">{referralStats.conversionRate}% conversion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-900">${referralStats.availableBalance.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mt-1">Ready to withdraw</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${referralStats.lifetimeCommission.toFixed(2)}</p>
                  </div>
                  <Gift className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">Lifetime commission</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Referral Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Balance:</span>
                  <span className="text-2xl font-bold text-green-600">${referralStats.availableBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Earnings:</span>
                  <span className="text-lg font-semibold text-yellow-600">${referralStats.pendingEarnings.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleMoveToMainBalance}
                  disabled={referralStats.availableBalance === 0}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Move to Main Balance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input value={referralLink} readOnly className="flex-1" />
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleShareX} className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Share on X
                  </Button>
                  <Button variant="outline" onClick={handleShareWhatsApp} className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{referral.name}</h3>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                        <p className="text-xs text-gray-500">Joined: {new Date(referral.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={referral.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {referral.status}
                      </Badge>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${referral.commission.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
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
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Referral Payout</h3>
                        <p className="text-sm text-gray-600">Transaction ID: {payout.txnId}</p>
                        <p className="text-xs text-gray-500">{new Date(payout.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600">${payout.amount.toFixed(2)}</p>
                      <Badge className="bg-green-100 text-green-800">
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <Gift className="h-16 w-16 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold">Earn $50 for each referral!</h3>
                <p className="text-gray-600">Share MerchantPay with your network and earn rewards when they join.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Link</label>
                  <div className="flex items-center space-x-2">
                    <Input value={referralLink} readOnly className="flex-1" />
                    <Button variant="outline" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={handleShareX} className="flex items-center justify-center gap-2 h-12">
                    <Twitter className="h-5 w-5" />
                    Share on X
                  </Button>
                  <Button variant="outline" onClick={handleShareWhatsApp} className="flex items-center justify-center gap-2 h-12">
                    <MessageCircle className="h-5 w-5" />
                    Share on WhatsApp
                  </Button>
                  <Button variant="outline" onClick={handleShareTelegram} className="flex items-center justify-center gap-2 h-12">
                    <Send className="h-5 w-5" />
                    Share on Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Referral Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send via Email</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleShareEmail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Share on Social Media</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={handleShareX} className="flex items-center justify-center gap-2">
                  <Twitter className="h-4 w-4" />
                  X
                </Button>
                <Button variant="outline" onClick={handleShareWhatsApp} className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" onClick={handleShareTelegram} className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Telegram
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Referral Link</p>
              <div className="flex items-center space-x-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralManagement;
