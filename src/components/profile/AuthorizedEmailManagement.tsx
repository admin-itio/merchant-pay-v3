
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Plus, Trash2, Check, Clock, AlertCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthorizedEmail {
  id: string;
  email: string;
  purpose: 'reports' | 'alerts' | 'settlements' | 'support' | 'all';
  status: 'verified' | 'pending' | 'failed';
  addedDate: string;
  lastUsed: string;
  isActive: boolean;
}

const AuthorizedEmailManagement = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPurpose, setNewPurpose] = useState<'reports' | 'alerts' | 'settlements' | 'support' | 'all'>('reports');

  const [authorizedEmails, setAuthorizedEmails] = useState<AuthorizedEmail[]>([
    {
      id: '1',
      email: 'admin@acme.com',
      purpose: 'all',
      status: 'verified',
      addedDate: '2024-01-15',
      lastUsed: '2024-06-07',
      isActive: true
    },
    {
      id: '2',
      email: 'finance@acme.com',
      purpose: 'settlements',
      status: 'verified',
      addedDate: '2024-02-01',
      lastUsed: '2024-06-06',
      isActive: true
    },
    {
      id: '3',
      email: 'ops@acme.com',
      purpose: 'alerts',
      status: 'verified',
      addedDate: '2024-03-10',
      lastUsed: '2024-06-05',
      isActive: true
    },
    {
      id: '4',
      email: 'reports@acme.com',
      purpose: 'reports',
      status: 'pending',
      addedDate: '2024-06-07',
      lastUsed: 'Never',
      isActive: false
    }
  ]);

  const emailPurposes = {
    all: { label: 'All Notifications', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    reports: { label: 'Reports', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    alerts: { label: 'Security Alerts', color: 'bg-red-100 text-red-800 border-red-200' },
    settlements: { label: 'Settlements', color: 'bg-green-100 text-green-800 border-green-200' },
    support: { label: 'Support', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  };

  const handleAddEmail = () => {
    if (!newEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    if (!newEmail.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const emailExists = authorizedEmails.some(email => email.email === newEmail);
    if (emailExists) {
      toast({
        title: "Error",
        description: "This email is already authorized",
        variant: "destructive",
      });
      return;
    }

    const newAuthorizedEmail: AuthorizedEmail = {
      id: Date.now().toString(),
      email: newEmail,
      purpose: newPurpose,
      status: 'pending',
      addedDate: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      isActive: false
    };

    setAuthorizedEmails([...authorizedEmails, newAuthorizedEmail]);
    setNewEmail('');
    setNewPurpose('reports');
    setShowAddForm(false);

    toast({
      title: "Email Added",
      description: `Verification email sent to ${newEmail}`,
    });
  };

  const handleRemoveEmail = (emailId: string) => {
    setAuthorizedEmails(emails => emails.filter(email => email.id !== emailId));
    toast({
      title: "Email Removed",
      description: "The email has been removed from authorized list",
    });
  };

  const handleToggleStatus = (emailId: string) => {
    setAuthorizedEmails(emails =>
      emails.map(email =>
        email.id === emailId
          ? { ...email, isActive: !email.isActive }
          : email
      )
    );
  };

  const handleResendVerification = (email: string) => {
    toast({
      title: "Verification Sent",
      description: `Verification email sent to ${email}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Verification</Badge>;
      case 'failed':
        return <Badge variant="destructive">Verification Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Authorized Email Management
              </CardTitle>
              <CardDescription>
                Manage email addresses authorized to receive notifications and reports
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Email
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Add Email Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Authorized Email</CardTitle>
            <CardDescription>Add a new email address to receive specific notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Select value={newPurpose} onValueChange={(value: any) => setNewPurpose(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(emailPurposes).map(([key, purpose]) => (
                      <SelectItem key={key} value={key}>{purpose.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddEmail}>
                Add Email
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {authorizedEmails.filter(email => email.status === 'verified').length}
                </p>
                <p className="text-sm text-gray-600">Verified Emails</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {authorizedEmails.filter(email => email.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {authorizedEmails.filter(email => email.isActive).length}
                </p>
                <p className="text-sm text-gray-600">Active Emails</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">
                  {authorizedEmails.filter(email => email.status === 'failed').length}
                </p>
                <p className="text-sm text-gray-600">Failed Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Authorized Emails Table */}
      <Card>
        <CardHeader>
          <CardTitle>Authorized Email Addresses</CardTitle>
          <CardDescription>Manage your authorized email recipients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email Address</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authorizedEmails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(email.status)}
                      <span className="font-medium">{email.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={emailPurposes[email.purpose].color}>
                      {emailPurposes[email.purpose].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(email.status)}
                  </TableCell>
                  <TableCell className="text-sm">{email.addedDate}</TableCell>
                  <TableCell className="text-sm">{email.lastUsed}</TableCell>
                  <TableCell>
                    <Switch
                      checked={email.isActive}
                      onCheckedChange={() => handleToggleStatus(email.id)}
                      disabled={email.status !== 'verified'}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {email.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResendVerification(email.email)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEmail(email.id)}
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

      {/* Email Template Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Types of notifications that will be sent to authorized emails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Reports</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Daily transaction summaries</li>
                <li>• Weekly settlement reports</li>
                <li>• Monthly analytics reports</li>
                <li>• Custom scheduled reports</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Security Alerts</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Login from new device</li>
                <li>• Failed login attempts</li>
                <li>• API key usage alerts</li>
                <li>• Account changes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Settlements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Settlement notifications</li>
                <li>• Payout confirmations</li>
                <li>• Failed settlement alerts</li>
                <li>• Reconciliation reports</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Support</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ticket updates</li>
                <li>• System maintenance</li>
                <li>• Service announcements</li>
                <li>• Support responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorizedEmailManagement;
