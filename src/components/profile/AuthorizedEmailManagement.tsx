
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Plus, 
  Check, 
  Clock, 
  AlertCircle,
  Trash2,
  Send,
  Shield
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AuthorizedEmail {
  id: string;
  email: string;
  status: 'verified' | 'pending' | 'failed';
  isPrimary: boolean;
  addedAt: string;
  verifiedAt?: string;
  lastUsed?: string;
  permissions: string[];
}

const AuthorizedEmailManagement = () => {
  const [newEmail, setNewEmail] = useState('');
  const [authorizedEmails, setAuthorizedEmails] = useState<AuthorizedEmail[]>([
    {
      id: '1',
      email: 'admin@acmecorp.com',
      status: 'verified',
      isPrimary: true,
      addedAt: '2024-01-15T10:00:00Z',
      verifiedAt: '2024-01-15T10:05:00Z',
      lastUsed: '2024-06-07T09:30:00Z',
      permissions: ['notifications', 'reports', 'alerts', 'settlements']
    },
    {
      id: '2',
      email: 'finance@acmecorp.com',
      status: 'verified',
      isPrimary: false,
      addedAt: '2024-02-01T14:30:00Z',
      verifiedAt: '2024-02-01T14:35:00Z',
      lastUsed: '2024-06-06T16:45:00Z',
      permissions: ['reports', 'settlements']
    },
    {
      id: '3',
      email: 'support@acmecorp.com',
      status: 'pending',
      isPrimary: false,
      addedAt: '2024-06-07T08:15:00Z',
      permissions: ['notifications', 'alerts']
    },
    {
      id: '4',
      email: 'backup@acmecorp.com',
      status: 'failed',
      isPrimary: false,
      addedAt: '2024-06-05T12:00:00Z',
      permissions: ['notifications']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return Check;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  const handleAddEmail = () => {
    if (newEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      const newEmailObj: AuthorizedEmail = {
        id: Date.now().toString(),
        email: newEmail.trim(),
        status: 'pending',
        isPrimary: false,
        addedAt: new Date().toISOString(),
        permissions: ['notifications']
      };
      setAuthorizedEmails(prev => [...prev, newEmailObj]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (id: string) => {
    setAuthorizedEmails(prev => prev.filter(email => email.id !== id));
  };

  const handleResendVerification = (id: string) => {
    setAuthorizedEmails(prev => 
      prev.map(email => 
        email.id === id ? { ...email, status: 'pending' as const } : email
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Authorized Email Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage email addresses authorized to receive notifications, reports, and communications
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {authorizedEmails.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Emails</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {authorizedEmails.filter(email => email.status === 'verified').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Verified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {authorizedEmails.filter(email => email.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {authorizedEmails.filter(email => email.isPrimary).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Primary</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Authorized Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter email address (e.g., admin@company.com)"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
              />
            </div>
            <Button onClick={handleAddEmail} disabled={!newEmail.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Email
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            A verification email will be sent to the provided address
          </p>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Security Best Practices
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                <li>• Only add business email addresses that you control</li>
                <li>• Regularly review and remove unused email addresses</li>
                <li>• Primary emails receive all critical communications</li>
                <li>• Verification is required for all new email addresses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authorized Emails Table */}
      <Card>
        <CardHeader>
          <CardTitle>Authorized Email Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authorizedEmails.map((email) => {
                const StatusIcon = getStatusIcon(email.status);
                
                return (
                  <TableRow key={email.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{email.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge className={getStatusColor(email.status)}>
                          {email.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {email.isPrimary && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          Primary
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {email.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(email.addedAt)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {email.lastUsed ? formatDate(email.lastUsed) : 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {email.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResendVerification(email.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {email.status === 'failed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleResendVerification(email.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {!email.isPrimary && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Email Address</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove "{email.email}" from authorized emails? 
                                  This action cannot be undone and the email will no longer receive notifications.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => handleRemoveEmail(email.id)}
                                >
                                  Remove Email
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorizedEmailManagement;
