
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Building, CreditCard, Shield, Bell, Mail } from 'lucide-react';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('business');

  const sections = [
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <Input defaultValue="Acme Corporation" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
          <Select defaultValue="corporation">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporation">Corporation</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
          <Input defaultValue="12-3456789" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <Select defaultValue="ecommerce">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
        <Textarea defaultValue="123 Business Street, Suite 100, New York, NY 10001" rows={3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <Input defaultValue="https://acmecorp.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <Input defaultValue="support@acmecorp.com" />
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <Input defaultValue="John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <Input defaultValue="Doe" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input defaultValue="john@acmecorp.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <Input defaultValue="+1 (555) 123-4567" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
        <Select defaultValue="admin">
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <Select defaultValue="est">
          <SelectTrigger className="w-full md:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="est">Eastern Standard Time</SelectItem>
            <SelectItem value="cst">Central Standard Time</SelectItem>
            <SelectItem value="mst">Mountain Standard Time</SelectItem>
            <SelectItem value="pst">Pacific Standard Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Change Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <Input type="password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <Input type="password" />
          </div>
          <Button>Update Password</Button>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Authentication</p>
              <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Authenticator App</p>
              <p className="text-sm text-gray-600">Use Google Authenticator or similar apps</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">API Keys</h4>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Production API Key</p>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
            <p className="text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">pk_live_****************************</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Test API Key</p>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
            <p className="text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">pk_test_****************************</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
        <div className="space-y-4">
          {[
            { label: 'Transaction notifications', description: 'Get notified of all transactions' },
            { label: 'Failed payment alerts', description: 'Immediate alerts for failed payments' },
            { label: 'Weekly reports', description: 'Weekly summary of your account activity' },
            { label: 'Settlement notifications', description: 'Get notified when settlements are processed' },
            { label: 'Security alerts', description: 'Important security-related notifications' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <Switch defaultChecked={index < 3} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">SMS Notifications</h4>
        <div className="space-y-4">
          {[
            { label: 'High-value transactions', description: 'SMS alerts for transactions over $1,000' },
            { label: 'Account security', description: 'Critical security alerts via SMS' },
            { label: 'System maintenance', description: 'Scheduled maintenance notifications' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <Switch defaultChecked={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Current Plan</h4>
        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="text-lg font-semibold text-gray-900">Professional Plan</h5>
              <p className="text-gray-600">$99/month + transaction fees</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Monthly Fee</p>
              <p className="text-gray-900">$99.00</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Transaction Fee</p>
              <p className="text-gray-900">2.9% + $0.30</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Next Billing</p>
              <p className="text-gray-900">Feb 15, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Payment Method</h4>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Visa ending in 1234</p>
                <p className="text-sm text-gray-600">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Billing History</h4>
        <div className="space-y-2">
          {[
            { date: 'Jan 15, 2024', amount: '$99.00', status: 'Paid' },
            { date: 'Dec 15, 2023', amount: '$99.00', status: 'Paid' },
            { date: 'Nov 15, 2023', amount: '$99.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{invoice.date}</p>
                  <p className="text-sm text-gray-600">Monthly subscription</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">{invoice.amount}</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {invoice.status}
                </span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'business': return renderBusinessInfo();
      case 'account': return renderAccountSettings();
      case 'security': return renderSecurity();
      case 'notifications': return renderNotifications();
      case 'billing': return renderBilling();
      default: return renderBusinessInfo();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {sections.find(s => s.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
              <div className="flex gap-2 mt-6">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
