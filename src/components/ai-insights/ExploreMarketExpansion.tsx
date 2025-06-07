
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  TrendingUp, 
  DollarSign, 
  Users,
  ArrowLeft,
  Target,
  BarChart3,
  Map
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ExploreMarketExpansionProps {
  onBack: () => void;
}

const ExploreMarketExpansion = ({ onBack }: ExploreMarketExpansionProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const marketOpportunities = [
    {
      region: 'Southeast Asia',
      countries: ['Thailand', 'Vietnam', 'Philippines', 'Indonesia'],
      growthPotential: 45,
      marketSize: '$2.3B',
      competition: 'Low',
      difficulty: 'Medium',
      estimatedRevenue: '$12M',
      timeToMarket: '6 months',
      investmentRequired: '$500K'
    },
    {
      region: 'Latin America',
      countries: ['Brazil', 'Mexico', 'Colombia', 'Argentina'],
      growthPotential: 38,
      marketSize: '$1.8B',
      competition: 'Medium',
      difficulty: 'Medium',
      estimatedRevenue: '$8M',
      timeToMarket: '4 months',
      investmentRequired: '$350K'
    },
    {
      region: 'Eastern Europe',
      countries: ['Poland', 'Czech Republic', 'Hungary', 'Romania'],
      growthPotential: 32,
      marketSize: '$1.2B',
      competition: 'High',
      difficulty: 'Low',
      estimatedRevenue: '$5M',
      timeToMarket: '3 months',
      investmentRequired: '$200K'
    }
  ];

  const revenueProjection = [
    { month: 'Month 1', existing: 675000, expansion: 0 },
    { month: 'Month 3', existing: 720000, expansion: 45000 },
    { month: 'Month 6', existing: 780000, expansion: 120000 },
    { month: 'Month 9', existing: 850000, expansion: 230000 },
    { month: 'Month 12', existing: 920000, expansion: 380000 },
  ];

  const marketShare = [
    { name: 'Current Markets', value: 65, color: '#3B82F6' },
    { name: 'Expansion Opportunity', value: 35, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Market Expansion</h1>
          <p className="text-gray-600">AI-identified growth opportunities in new markets</p>
        </div>
      </div>

      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="opportunities">Market Opportunities</TabsTrigger>
          <TabsTrigger value="analysis">Financial Analysis</TabsTrigger>
          <TabsTrigger value="strategy">Expansion Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {marketOpportunities.map((market, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-colors ${
                  selectedRegion === market.region ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedRegion(market.region)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {market.region}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Potential</span>
                    <Badge variant="default">{market.growthPotential}%</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Market Size</span>
                      <p className="font-semibold">{market.marketSize}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Competition</span>
                      <p className="font-semibold">{market.competition}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Est. Revenue</span>
                      <p className="font-semibold text-green-600">{market.estimatedRevenue}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Investment</span>
                      <p className="font-semibold">{market.investmentRequired}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Key Countries</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {market.countries.map((country) => (
                        <Badge key={country} variant="outline" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={selectedRegion === market.region ? "default" : "outline"}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      {selectedRegion === market.region ? "Selected" : "Select Market"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Projection (12 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                    <Bar dataKey="existing" fill="#94A3B8" name="Existing Markets" />
                    <Bar dataKey="expansion" fill="#10B981" name="New Markets" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Share Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketShare}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {marketShare.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          {selectedRegion ? (
            <Card>
              <CardHeader>
                <CardTitle>Expansion Strategy for {selectedRegion}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Phase 1: Market Entry</h3>
                      <p className="text-sm text-gray-600">Establish local partnerships and compliance</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Phase 2: Customer Acquisition</h3>
                      <p className="text-sm text-gray-600">Launch targeted marketing campaigns</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-semibold">Phase 3: Scale & Optimize</h3>
                      <p className="text-sm text-gray-600">Expand services and optimize operations</p>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Start Market Research
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Create Business Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Market</h3>
                <p className="text-gray-500">Choose a market opportunity to see the expansion strategy</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExploreMarketExpansion;
