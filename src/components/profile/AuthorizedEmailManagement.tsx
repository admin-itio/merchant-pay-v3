
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Plus, Trash2, UserCheck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthorizedEmailManagement = () => {
  const { toast } = useToast();
  const [authorizedEmails, setAuthorizedEmails] = useState([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Admin',
      permissions: ['view_transactions', 'export_reports', 'manage_users'],
      status: 'active',
      addedDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Finance Manager',
      permissions: ['view_transactions', 'export_reports'],
      status: 'pending',
      addedDate: '2024-01-12'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@company.com',
      role: 'Viewer',
      permissions: ['view_transactions'],
      status: 'active',
      addedDate: '2024-01-08'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Viewer'
  });

  const roles = [
    { value: 'Admin', label: 'Administrator', permissions: ['view_transactions', 'export_reports', 'manage_users', 'manage_settings'] },
    { value: 'Finance Manager', label: 'Finance Manager', permissions: ['view_transactions', 'export_reports', 'view_settlements'] },
    { value: 'Support', label: 'Support Agent', permissions: ['view_transactions', 'customer_support'] },
    { value: 'Viewer', label: 'Read Only', permissions: ['view_transactions'] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addAuthorizedEmail = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const emailExists = authorizedEmails.some(user => user.email === newUser.email);
    if (emailExists) {
      toast({
        title: "Error",
        description: "This email is already authorized",
        variant: "destructive",
      });
      return;
    }

    const selectedRole = roles.find(role => role.value === newUser.role);
    const newAuthorizedUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      permissions: selectedRole?.permissions || [],
      status: 'pending',
      addedDate: new Date().toISOString().split('T')[0]
    };

    setAuthorizedEmails(prev => [...prev, newAuthorizedUser]);
    setNewUser({ name: '', email: '', role: 'Viewer' });
    
    toast({
      title: "Success",
      description: "Authorized email added successfully. Invitation sent.",
    });
  };

  const removeAuthorizedEmail = (id: string) => {
    setAuthorizedEmails(prev => prev.filter(user => user.id !== id));
    toast({
      title: "Success",
      description: "Authorized email removed successfully",
    });
  };

  const resendInvitation = (email: string) => {
    toast({
      title: "Invitation Sent",
      description: `Invitation resent to ${email}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Add Authorized User
          </CardTitle>
          <CardDescription>
            Grant access to team members for viewing transactions and reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Full Name *</Label>
              <Input
                id="userName"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email Address *</Label>
              <Input
                id="userEmail"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select 
                value={newUser.role}
                onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={addAuthorizedEmail} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authorized Users</CardTitle>
          <CardDescription>
            Manage users who have access to your merchant dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authorizedEmails.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.addedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resendInvitation(user.email)}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAuthorizedEmail(user.id)}
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

export default AuthorizedEmailManagement;
