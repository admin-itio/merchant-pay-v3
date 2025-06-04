
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  Settings
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const SubAccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const subAccounts = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@techsolutions.com',
      phone: '+91 9876543210',
      role: 'Admin',
      department: 'Finance',
      status: 'active',
      lastLogin: '2 hours ago',
      createdDate: '2024-01-15',
      permissions: {
        viewTransactions: true,
        processRefunds: true,
        manageSettings: true,
        accessReports: true,
        manageUsers: true
      },
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techsolutions.com',
      phone: '+91 9876543211',
      role: 'Manager',
      department: 'Operations',
      status: 'active',
      lastLogin: '1 day ago',
      createdDate: '2024-01-10',
      permissions: {
        viewTransactions: true,
        processRefunds: true,
        manageSettings: false,
        accessReports: true,
        manageUsers: false
      },
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@techsolutions.com',
      phone: '+91 9876543212',
      role: 'Operator',
      department: 'Customer Support',
      status: 'inactive',
      lastLogin: '5 days ago',
      createdDate: '2024-01-05',
      permissions: {
        viewTransactions: true,
        processRefunds: false,
        manageSettings: false,
        accessReports: false,
        manageUsers: false
      },
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@techsolutions.com',
      phone: '+91 9876543213',
      role: 'Viewer',
      department: 'Accounts',
      status: 'active',
      lastLogin: '3 hours ago',
      createdDate: '2024-01-20',
      permissions: {
        viewTransactions: true,
        processRefunds: false,
        manageSettings: false,
        accessReports: true,
        manageUsers: false
      },
      avatar: '/placeholder.svg'
    }
  ];

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full access to all features', color: 'bg-red-100 text-red-800' },
    { id: 'manager', name: 'Manager', description: 'Manage transactions and reports', color: 'bg-blue-100 text-blue-800' },
    { id: 'operator', name: 'Operator', description: 'View transactions and basic operations', color: 'bg-green-100 text-green-800' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access to reports', color: 'bg-gray-100 text-gray-800' }
  ];

  const filteredAccounts = subAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || account.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    const roleObj = roles.find(r => r.name.toLowerCase() === role.toLowerCase());
    return roleObj?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sub-Account Management
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Manage user access and permissions for your organization
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new sub-account with specific permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input type="email" placeholder="user@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            <div>
                              <div className="font-medium">{role.name}</div>
                              <div className="text-xs text-gray-500">{role.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <Input placeholder="e.g., Finance, Operations" />
                  </div>
                  <Button className="w-full">Create Sub-Account</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role.id} value={role.name.toLowerCase()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {filteredAccounts.map((account) => (
              <Card key={account.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={account.avatar} alt={account.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {account.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{account.name}</h3>
                          <Badge className={getRoleColor(account.role)}>
                            {account.role}
                          </Badge>
                          <Badge className={getStatusColor(account.status)}>
                            {account.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {account.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {account.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Created: {account.createdDate} • Last login: {account.lastLogin}
                          </div>
                          <div className="text-xs text-gray-500">
                            Department: {account.department}
                          </div>
                        </div>

                        <div className="mt-3">
                          <h4 className="text-xs font-medium text-gray-700 mb-2">Permissions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(account.permissions).map(([key, value]) => (
                              <Badge 
                                key={key} 
                                variant={value ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={account.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        {account.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role & Permission Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <Badge className={role.color}>
                      {subAccounts.filter(a => a.role.toLowerCase() === role.name.toLowerCase()).length} users
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Permissions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubAccountManagement;
