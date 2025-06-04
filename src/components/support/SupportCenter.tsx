
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Search, 
  Book, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Plus,
  Filter,
  ExternalLink
} from 'lucide-react';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTicket, setNewTicket] = useState({ subject: '', category: '', priority: 'medium', description: '' });

  const tickets = [
    {
      id: 'TK-001',
      subject: 'Payment Gateway Integration Issue',
      status: 'open',
      priority: 'high',
      category: 'Technical',
      created: '2024-01-15',
      lastUpdate: '2 hours ago',
      messages: 3
    },
    {
      id: 'TK-002',
      subject: 'Refund Processing Delay',
      status: 'in-progress',
      priority: 'medium',
      category: 'Billing',
      created: '2024-01-14',
      lastUpdate: '1 day ago',
      messages: 5
    },
    {
      id: 'TK-003',
      subject: 'API Documentation Request',
      status: 'resolved',
      priority: 'low',
      category: 'Documentation',
      created: '2024-01-13',
      lastUpdate: '3 days ago',
      messages: 2
    }
  ];

  const knowledgeBase = [
    {
      title: 'Getting Started with Payment Processing',
      category: 'Getting Started',
      views: 1250,
      helpful: 98
    },
    {
      title: 'How to Handle Failed Transactions',
      category: 'Troubleshooting',
      views: 890,
      helpful: 95
    },
    {
      title: 'Setting Up Webhooks',
      category: 'API',
      views: 756,
      helpful: 92
    },
    {
      title: 'Understanding Chargeback Process',
      category: 'Risk Management',
      views: 634,
      helpful: 88
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCreateTicket = () => {
    console.log('Creating ticket:', newTicket);
    // Reset form
    setNewTicket({ subject: '', category: '', priority: 'medium', description: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-600 mt-2">Get help, manage tickets, and access our knowledge base</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            My Tickets
          </TabsTrigger>
          <TabsTrigger value="new-ticket" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Ticket
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Support Tickets</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority)}`} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>#{ticket.id}</span>
                          <span>{ticket.category}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ticket.lastUpdate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {ticket.messages} messages
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-ticket" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select 
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Management</option>
                    <option value="integration">Integration Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewTicket({...newTicket, priority})}
                      className={`px-4 py-2 rounded-lg capitalize ${
                        newTicket.priority === priority
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  rows={6}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                />
              </div>

              <Button onClick={handleCreateTicket} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Knowledge Base</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {knowledgeBase.map((article, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge variant="outline">{article.category}</Badge>
                          <span>{article.views} views</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {article.helpful}% helpful
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@merchantpay.com</p>
                    <p className="text-xs text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                    <p className="text-xs text-gray-500">Click the chat widget</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-red-900">Critical Issues</h3>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    For urgent issues affecting payment processing or security
                  </p>
                  <Button variant="destructive" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Hotline
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Status Page</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Check real-time system status and planned maintenance
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Status
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

export default SupportCenter;
