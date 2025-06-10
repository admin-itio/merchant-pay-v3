
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, ExternalLink, Download, Video, MessageCircle, Users, Zap } from 'lucide-react';

const DocumentationHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const documentationSections = [
    {
      title: 'Getting Started',
      description: 'Quick start guide and basic concepts',
      icon: Zap,
      items: [
        { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes', type: 'guide', readTime: '5 min' },
        { title: 'Authentication', description: 'Learn how to authenticate API requests', type: 'guide', readTime: '10 min' },
        { title: 'Making Your First Request', description: 'Step-by-step first API call', type: 'tutorial', readTime: '15 min' },
        { title: 'Error Handling', description: 'Understanding error codes and responses', type: 'reference', readTime: '8 min' }
      ]
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation with examples',
      icon: BookOpen,
      items: [
        { title: 'Payments API', description: 'Create, retrieve, and manage payments', type: 'reference', readTime: '20 min' },
        { title: 'Refunds API', description: 'Process refunds and cancellations', type: 'reference', readTime: '15 min' },
        { title: 'Webhooks API', description: 'Real-time event notifications', type: 'reference', readTime: '25 min' },
        { title: 'Customers API', description: 'Manage customer data and profiles', type: 'reference', readTime: '18 min' }
      ]
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step integration guides',
      icon: Video,
      items: [
        { title: 'E-commerce Integration', description: 'Complete e-commerce payment flow', type: 'tutorial', readTime: '45 min' },
        { title: 'Subscription Payments', description: 'Implementing recurring payments', type: 'tutorial', readTime: '35 min' },
        { title: 'Mobile App Integration', description: 'React Native and Flutter guides', type: 'tutorial', readTime: '40 min' },
        { title: 'Multi-party Payments', description: 'Split payments and marketplace', type: 'tutorial', readTime: '50 min' }
      ]
    },
    {
      title: 'Best Practices',
      description: 'Security, performance, and optimization',
      icon: Users,
      items: [
        { title: 'Security Best Practices', description: 'Keep your integration secure', type: 'guide', readTime: '20 min' },
        { title: 'Performance Optimization', description: 'Optimize your API usage', type: 'guide', readTime: '15 min' },
        { title: 'Testing Strategies', description: 'Test your payment integration', type: 'guide', readTime: '25 min' },
        { title: 'Monitoring and Alerting', description: 'Monitor your integration health', type: 'guide', readTime: '18 min' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'Setting up Webhook Endpoints', views: '15.2k', category: 'Webhooks' },
    { title: 'Handling Payment Failures', views: '12.8k', category: 'Payments' },
    { title: 'PCI Compliance Guide', views: '9.4k', category: 'Security' },
    { title: 'Testing in Sandbox Mode', views: '8.7k', category: 'Testing' },
    { title: 'Implementing 3D Secure', views: '7.3k', category: 'Security' }
  ];

  const communityResources = [
    {
      title: 'Developer Forum',
      description: 'Ask questions and share knowledge with other developers',
      icon: MessageCircle,
      stats: '2.1k discussions',
      link: '#'
    },
    {
      title: 'Discord Community',
      description: 'Real-time chat with developers and our support team',
      icon: Users,
      stats: '5.8k members',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step integration tutorials',
      icon: Video,
      stats: '47 videos',
      link: '#'
    },
    {
      title: 'GitHub Examples',
      description: 'Browse complete working examples',
      icon: BookOpen,
      stats: '234 repositories',
      link: '#'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'tutorial': return 'bg-green-100 text-green-800';
      case 'reference': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSections = documentationSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Documentation Hub</h2>
        <p className="text-gray-600">Comprehensive guides, references, and resources for developers</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="docs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="popular">Popular Articles</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="docs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getTypeColor(item.type)} variant="secondary">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{item.readTime}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Articles</CardTitle>
              <CardDescription>Frequently accessed documentation and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex-1">
                      <div className="font-medium">{article.title}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm text-gray-500">{article.views} views</span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Commonly requested resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Download className="h-6 w-6" />
                  <div className="font-medium">Download PDF Guide</div>
                  <div className="text-sm text-gray-600">Complete integration guide</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  <div className="font-medium">API Changelog</div>
                  <div className="text-sm text-gray-600">Latest updates and changes</div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <ExternalLink className="h-6 w-6" />
                  <div className="font-medium">Status Page</div>
                  <div className="text-sm text-gray-600">System status and uptime</div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{resource.stats}</span>
                      <Button size="sm">
                        Join Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Latest Community Posts</CardTitle>
              <CardDescription>Recent discussions and questions from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'How to handle webhook retries?', author: 'DevUser123', replies: 8, time: '2 hours ago' },
                  { title: 'Best practices for error handling', author: 'APIExpert', replies: 15, time: '4 hours ago' },
                  { title: 'Integration with React Native', author: 'MobileDevGuru', replies: 12, time: '6 hours ago' },
                  { title: 'PCI compliance checklist', author: 'SecurePayments', replies: 23, time: '8 hours ago' }
                ].map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <div className="font-medium text-sm">{post.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        by {post.author} • {post.replies} replies • {post.time}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
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

export default DocumentationHub;
