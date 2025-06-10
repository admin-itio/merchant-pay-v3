
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Settings, Trash2, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubAccount {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer' | 'developer';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  permissions: string[];
  createdAt: string;
}

const SubAccountManagement = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    role: 'viewer' as const,
    permissions: [] as string[]
  });

  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@acme.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-06-07 14:30',
      permissions: ['all'],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@acme.com',
      role: 'manager',
      status: 'active',
      lastActive: '2024-06-07 12:15',
      permissions: ['transactions', 'reports', 'settlements'],
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Mike Developer',
      email: 'mike@acme.com',
      role: 'developer',
      status: 'active',
      lastActive: '2024-06-06 16:45',
      permissions: ['api', 'webhooks', 'logs'],
      createdAt: '2024-03-01'
    },
    {
      id: '4',
      name: 'Lisa Analyst',
      email: 'lisa@acme.com',
      role: 'viewer',
      status: 'pending',
      lastActive: 'Never',
      permissions: ['dashboard', 'reports'],
      createdAt: '2024-06-05'
    }
  ]);

  const roles = {
    admin: { label: 'Administrator', color: 'bg-red-100 text-red-800 border-red-200' },
    manager: { label: 'Manager', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    developer: { label: 'Developer', color: 'bg-green-100 text-green-800 border-green-200' },
    viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-800 border-gray-200' }
  };

  const availablePermissions = [
    { id: 'dashboard', label: 'Dashboard', description: 'View dashboard and basic metrics' },
    { id: 'transactions', label: 'Transactions', description: 'View and manage transactions' },
    { id: 'settlements', label: 'Settlements', description: 'Access settlement data' },
    { id: 'reports', label: 'Reports', description: 'Generate and view reports' },
    { id: 'api', label: 'API Management', description: 'Manage API keys and settings' },
    { id: 'webhooks', label: 'Webhooks', description: 'Configure webhook endpoints' },
    { id: 'users', label: 'User Management', description: 'Manage sub-accounts' },
    { id: 'settings', label: 'Settings', description: 'Modify account settings' }
  ];

  const handleCreateAccount = () => {
    if (!newAccount.name || !newAccount.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const account: SubAccount = {
      id: Date.now().toString(),
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      status: 'pending',
      lastActive: 'Never',
      permissions: newAccount.permissions,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSubAccounts([...subAccounts, account]);
    setNewAccount({ name: '', email: '', role: 'viewer', permissions: [] });
    setShowCreateForm(false);

    toast({
      title: "Sub-account Created",
      description: `Invitation sent to ${newAccount.email}`,
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    setSubAccounts(accounts => accounts.filter(account => account.id !== accountId));
    toast({
      title: "Sub-account Deleted",
      description: "The sub-account has been removed",
    });
  };

  const handleToggleStatus = (accountId: string) => {
    setSubAccounts(accounts =>
      accounts.map(account =>
        account.id === accountId
          ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
          : account
      )
    );
  };

  const handleResendInvitation = (email: string) => {
    toast({
      title: "Invitation Sent",
      description: `New invitation sent to ${email}`,
    });
  };

  const togglePermission = (permission: string) => {
    setNewAccount(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'admin':
        return ['all'];
      case 'manager':
        return ['dashboard', 'transactions', 'settlements', 'reports'];
      case 'developer':
        return ['dashboard', 'api', 'webhooks'];
      case 'viewer':
        return ['dashboard', 'reports'];
      default:
        return [];
    }
  };

  const handleRoleChange = (role: string) => {
    setNewAccount(prev => ({
      ...prev,
      role: role as any,
      permissions: getRolePermissions(role)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sub-Account Management
              </CardTitle>
              <CardDescription>Manage team access and permissions for your account</CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Sub-Account
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Sub-Account</CardTitle>
            <CardDescription>Add a new team member to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newAccount.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roles).map(([key, role]) => (
                    <SelectItem key={key} value={key}>{role.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Switch
                      id={permission.id}
                      checked={newAccount.permissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <div className="space-y-0.5">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateAccount}>
                Create Sub-Account
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sub-Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team's access and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roles[account.role].color}>
                      {roles[account.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.status === 'active'}
                        onCheckedChange={() => handleToggleStatus(account.id)}
                        disabled={account.status === 'pending'}
                      />
                      <Badge
                        variant={
                          account.status === 'active' ? 'default' :
                          account.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {account.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{account.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {account.permissions.includes('all') ? (
                        <Badge variant="secondary">All Permissions</Badge>
                      ) : (
                        account.permissions.slice(0, 2).map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))
                      )}
                      {account.permissions.length > 2 && !account.permissions.includes('all') && (
                        <Badge variant="outline" className="text-xs">
                          +{account.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {account.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResendInvitation(account.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-red-600 hover:text-red-700"
                      >
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
    </div>
  );
};

export default SubAccountManagement;
