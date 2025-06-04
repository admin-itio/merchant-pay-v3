
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserPlus, 
  Shield, 
  DollarSign, 
  TrendingUp, 
  Gift,
  Copy,
  Mail,
  Settings,
  Eye,
  Edit,
  Trash2,
  Award,
  Target
} from 'lucide-react';

const ReferralManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // Mock data for referrals
  const referralStats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalCommissions: 12500.00,
    pendingCommissions: 2350.00,
    conversionRate: 68.5
  };

  const referralTiers = [
    { name: 'Bronze', minReferrals: 1, commission: 2.5, color: 'bg-amber-600' },
    { name: 'Silver', minReferrals: 10, commission: 3.0, color: 'bg-gray-400' },
    { name: 'Gold', minReferrals: 25, commission: 3.5, color: 'bg-yellow-500' },
    { name: 'Platinum', minReferrals: 50, commission: 4.0, color: 'bg-purple-500' }
  ];

  const currentTier = referralTiers.find(tier => 
    referralStats.totalReferrals >= tier.minReferrals
  ) || referralTiers[0];

  const nextTier = referralTiers.find(tier => 
    referralStats.totalReferrals < tier.minReferrals
  );

  const subAccounts = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      permissions: ['View', 'Manage Transactions', 'API Access']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '1 day ago',
      permissions: ['View', 'Manage Transactions']
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@example.com',
      role: 'Viewer',
      status: 'Inactive',
      lastLogin: '1 week ago',
      permissions: ['View']
    }
  ];

  const referrals = [
    {
      id: '1',
      name: 'Tech Solutions Inc',
      email: 'contact@techsolutions.com',
      status: 'Active',
      joinDate: '2024-01-15',
      volume: 45000,
      commission: 1350.00,
      tier: 'Gold'
    },
    {
      id: '2',
      name: 'Digital Commerce Ltd',
      email: 'info@digitalcommerce.com',
      status: 'Active',
      joinDate: '2024-02-08',
      volume: 28000,
      commission: 840.00,
      tier: 'Silver'
    },
    {
      id: '3',
      name: 'StartupX',
      email: 'hello@startupx.com',
      status: 'Pending',
      joinDate: '2024-03-20',
      volume: 0,
      commission: 0,
      tier: 'Bronze'
    }
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://merchantpay.com/ref/your-unique-code');
    // You would show a toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral & Sub-Account Management</h1>
          <p className="text-muted-foreground">
            Manage your referral program and sub-account permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>
                  Send an invitation to create a sub-account with specific permissions
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="user@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="view" />
                      <Label htmlFor="view">View Dashboard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="transactions" />
                      <Label htmlFor="transactions">Manage Transactions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="api" />
                      <Label htmlFor="api">API Access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="users" />
                      <Label htmlFor="users">Manage Users</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="sub-accounts">Sub-Accounts</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Referral Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
                <p className="text-xs text-muted-foreground">
                  +4 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{referralStats.activeReferrals}</div>
                <p className="text-xs text-muted-foreground">
                  {((referralStats.activeReferrals / referralStats.totalReferrals) * 100).toFixed(1)}% conversion
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${referralStats.totalCommissions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${referralStats.pendingCommissions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Next payout in 5 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Tier & Progress */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Current Tier: {currentTier.name}
                </CardTitle>
                <CardDescription>
                  {currentTier.commission}% commission rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-full ${currentTier.color}`}></div>
                  {nextTier && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {nextTier.name}</span>
                        <span>{referralStats.totalReferrals}/{nextTier.minReferrals}</span>
                      </div>
                      <Progress 
                        value={(referralStats.totalReferrals / nextTier.minReferrals) * 100} 
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        {nextTier.minReferrals - referralStats.totalReferrals} more referrals needed
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Referral Link
                </CardTitle>
                <CardDescription>
                  Share your unique referral link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://merchantpay.com/ref/your-unique-code" 
                      readOnly 
                      className="flex-1"
                    />
                    <Button size="sm" onClick={copyReferralLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Share via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tier Information */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Tiers</CardTitle>
              <CardDescription>
                Unlock higher commission rates as you refer more merchants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {referralTiers.map((tier) => (
                  <div key={tier.name} className="text-center space-y-2">
                    <div className={`w-16 h-16 rounded-full ${tier.color} mx-auto`}></div>
                    <h3 className="font-semibold">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.minReferrals}+ referrals
                    </p>
                    <p className="text-lg font-bold">{tier.commission}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
              <CardDescription>
                Track the merchants you've referred and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-sm text-muted-foreground">{referral.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={referral.status === 'Active' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{referral.joinDate}</TableCell>
                      <TableCell>${referral.volume.toLocaleString()}</TableCell>
                      <TableCell>${referral.commission.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{referral.tier}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sub-accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sub-Account Management</CardTitle>
              <CardDescription>
                Manage user access and permissions for your merchant account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subAccounts.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,450.00</div>
                <p className="text-xs text-muted-foreground">
                  +23% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,350.00</div>
                <p className="text-xs text-muted-foreground">
                  Available in 5 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,500.00</div>
                <p className="text-xs text-muted-foreground">
                  Since program start
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Commission History</CardTitle>
              <CardDescription>
                Track your commission earnings over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Earned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>March 2024</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>$125,000</TableCell>
                    <TableCell>3.5%</TableCell>
                    <TableCell>$4,375.00</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>February 2024</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>$89,000</TableCell>
                    <TableCell>3.0%</TableCell>
                    <TableCell>$2,670.00</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>January 2024</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>$67,000</TableCell>
                    <TableCell>2.5%</TableCell>
                    <TableCell>$1,675.00</TableCell>
                    <TableCell>
                      <Badge>Paid</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferralManagement;
