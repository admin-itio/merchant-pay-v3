
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Phone, Mail, FileText, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupportCenter = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: '',
    description: ''
  });

  const tickets = [
    {
      id: 'TICK-001',
      subject: 'Payment processing issue',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      created: '2024-01-15',
      lastUpdate: '2024-01-15',
      assignee: 'Support Team A'
    },
    {
      id: 'TICK-002',
      subject: 'API integration question',
      category: 'Development',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-01-14',
      lastUpdate: '2024-01-14',
      assignee: 'Tech Support'
    },
    {
      id: 'TICK-003',
      subject: 'Account billing inquiry',
      category: 'Billing',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-01-13',
      lastUpdate: '2024-01-13',
      assignee: 'Billing Team'
    }
  ];

  const faqItems = [
    {
      question: 'How do I integrate the payment API?',
      answer: 'You can integrate our payment API by following our comprehensive documentation. Start by obtaining your API keys from the dashboard, then use our SDKs or make direct HTTP requests to our endpoints.',
      category: 'Integration'
    },
    {
      question: 'What are the transaction fees?',
      answer: 'Our transaction fees vary by payment method and volume. Standard credit card processing is 2.9% + $0.30 per transaction. Volume discounts are available for high-volume merchants.',
      category: 'Pricing'
    },
    {
      question: 'How long do settlements take?',
      answer: 'Standard settlements are processed daily and typically arrive in your bank account within 1-2 business days. Express settlements are available for an additional fee.',
      category: 'Settlements'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and are PCI DSS Level 1 compliant. All sensitive data is encrypted at rest and in transit using AES-256 encryption.',
      category: 'Security'
    }
  ];

  const knowledgeBaseArticles = [
    {
      title: 'Getting Started with Payment Processing',
      category: 'Getting Started',
      readTime: '5 min',
      description: 'Learn the basics of setting up payment processing for your business.'
    },
    {
      title: 'API Authentication Guide',
      category: 'Development',
      readTime: '8 min',
      description: 'Complete guide to authenticating with our API using API keys and tokens.'
    },
    {
      title: 'Handling Failed Payments',
      category: 'Troubleshooting',
      readTime: '6 min',
      description: 'Best practices for handling and retrying failed payment attempts.'
    },
    {
      title: 'Setting up Webhooks',
      category: 'Development',
      readTime: '10 min',
      description: 'Configure webhooks to receive real-time payment notifications.'
    }
  ];

  const handleSubmitTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.priority || !newTicket.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been created successfully. We'll get back to you soon.",
    });

    setNewTicket({
      subject: '',
      category: '',
      priority: '',
      description: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 lg:p-0">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
          <p className="text-gray-600 mt-1">Get help with your account and payment processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call Support
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Create Ticket</h3>
            <p className="text-sm text-gray-600">Get personalized support</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Knowledge Base</h3>
            <p className="text-sm text-gray-600">Find answers quickly</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-sm text-gray-600">support@company.com</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        <span className="font-mono text-sm text-blue-600">{ticket.id}</span>
                        <Badge variant="outline">{ticket.status}</Badge>
                      </div>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <h4 className="font-medium mb-1">{ticket.subject}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Category: {ticket.category}</span>
                      <span>Created: {ticket.created}</span>
                      <span>Assignee: {ticket.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Support Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide detailed information about your issue..."
                  rows={5}
                />
              </div>

              <Button onClick={handleSubmitTicket} className="w-full">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{item.question}</h4>
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {knowledgeBaseArticles.map((article, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-gray-500">{article.readTime} read</span>
                    </div>
                    <h4 className="font-medium mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportCenter;
