
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Users,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupportCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isChatOnline, setIsChatOnline] = useState(true);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const { toast } = useToast();

  const supportTickets = [
    {
      id: 'SUP-001',
      subject: 'Payment Gateway Integration Issue',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-01-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'SUP-002', 
      subject: 'Transaction Declined - Need Help',
      status: 'in-progress',
      priority: 'medium',
      category: 'billing',
      createdAt: '2024-01-14',
      lastUpdate: '1 day ago'
    },
    {
      id: 'SUP-003',
      subject: 'API Documentation Clarification',
      status: 'resolved',
      priority: 'low',
      category: 'general',
      createdAt: '2024-01-13',
      lastUpdate: '3 days ago'
    }
  ];

  const knowledgeBase = [
    {
      title: 'How to integrate payment gateway',
      category: 'Integration',
      views: 1234,
      helpful: 89
    },
    {
      title: 'Understanding transaction fees',
      category: 'Billing',
      views: 987,
      helpful: 76
    },
    {
      title: 'Setting up webhooks',
      category: 'Technical',
      views: 654,
      helpful: 92
    },
    {
      title: 'Handling failed transactions',
      category: 'Troubleshooting',
      views: 543,
      helpful: 85
    }
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      // Simulate knowledge base search
      console.log('Searching knowledge base and tickets for:', value);
    }
  };

  const handleCreateTicket = () => {
    if (!ticketSubject || !ticketDescription || !selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Created Successfully",
      description: `Your support ticket has been created with ID SUP-${Math.floor(Math.random() * 1000)}.`,
    });
    
    setIsCreateTicketOpen(false);
    setTicketSubject('');
    setTicketDescription('');
    setSelectedCategory('');
  };

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
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help, find answers, and contact our support team</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <div className={`w-2 h-2 rounded-full ${isChatOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            Live Chat ({isChatOnline ? 'Online' : 'Offline'})
          </Button>
          <Button onClick={() => setIsCreateTicketOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search support tickets, knowledge base articles, or ask a question..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
          {searchTerm && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Searching knowledge base and existing tickets for "{searchTerm}"...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} priority
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{ticket.lastUpdate}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{ticket.subject}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Category: {ticket.category}</span>
                      <span>Created: {ticket.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {knowledgeBase.map((article, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{article.title}</h4>
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <Badge variant="outline" className="mb-2">{article.category}</Badge>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{article.views} views</span>
                      <span>{article.helpful}% helpful</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our support team in real-time</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${isChatOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">{isChatOnline ? 'Online' : 'Offline'}</span>
                </div>
                <Button className="w-full" disabled={!isChatOnline}>
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-4">Call our support hotline for urgent issues</p>
                <Button variant="outline" className="w-full">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">API Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Complete API reference and guides</p>
                <Button variant="outline" size="sm">View Docs</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Video className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600 mb-4">Step-by-step video guides</p>
                <Button variant="outline" size="sm">Watch Videos</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Community Forum</h3>
                <p className="text-sm text-gray-600 mb-4">Connect with other developers</p>
                <Button variant="outline" size="sm">Join Forum</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Quick Start</h3>
                <p className="text-sm text-gray-600 mb-4">Get up and running quickly</p>
                <Button variant="outline" size="sm">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Ticket Modal */}
      {isCreateTicketOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="integration">Integration Help</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {selectedCategory === 'other' && (
                  <div className="mt-2">
                    <Input placeholder="Please specify your category" />
                  </div>
                )}
              </div>

              <div>
                <Label>Subject *</Label>
                <Input
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Detailed description of your issue..."
                  rows={5}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTicket}>
                  Create Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SupportCenter;
