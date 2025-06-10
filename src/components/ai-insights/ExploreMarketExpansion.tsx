
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, TrendingUp, Users, DollarSign } from 'lucide-react';

interface ExploreMarketExpansionProps {
  onBack: () => void;
}

const ExploreMarketExpansion = ({ onBack }: ExploreMarketExpansionProps) => {
  const marketOpportunities = [
    {
      region: 'Southeast Asia',
      countries: ['Singapore', 'Malaysia', 'Thailand', 'Indonesia'],
      growthPotential: '45%',
      marketSize: '$2.3B',
      competitionLevel: 'Medium',
      entryDifficulty: 'Low',
      estimatedRevenue: '$450K',
      timeToMarket: '3-6 months'
    },
    {
      region: 'European Union',
      countries: ['Germany', 'France', 'Netherlands', 'Italy'],
      growthPotential: '28%',
      marketSize: '$8.7B',
      competitionLevel: 'High',
      entryDifficulty: 'Medium',
      estimatedRevenue: '$680K',
      timeToMarket: '6-12 months'
    },
    {
      region: 'Latin America',
      countries: ['Brazil', 'Mexico', 'Argentina', 'Colombia'],
      growthPotential: '52%',
      marketSize: '$1.8B',
      competitionLevel: 'Low',
      entryDifficulty: 'Medium',
      estimatedRevenue: '$320K',
      timeToMarket: '4-8 months'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Market Expansion Opportunities</h1>
          <p className="text-gray-600">AI-identified growth markets and expansion strategies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">New Markets</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">Opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Growth Potential</span>
            </div>
            <p className="text-2xl font-bold text-green-600">45%</p>
            <p className="text-sm text-gray-600">Average increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Revenue Potential</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">$1.45M</p>
            <p className="text-sm text-gray-600">First year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="font-semibold">Target Markets</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">3</p>
            <p className="text-sm text-gray-600">High priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {marketOpportunities.map((market, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {market.region}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    {market.countries.join(', ')}
                  </p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {market.growthPotential} Growth Potential
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Market Size</p>
                  <p className="font-bold text-lg">{market.marketSize}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Est. Revenue</p>
                  <p className="font-bold text-lg text-green-600">{market.estimatedRevenue}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Time to Market</p>
                  <p className="font-bold text-lg">{market.timeToMarket}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Countries</p>
                  <p className="font-bold text-lg">{market.countries.length}</p>
                </div>
              </div>
              
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Competition:</span>
                  <Badge className={getCompetitionColor(market.competitionLevel)}>
                    {market.competitionLevel}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Entry Difficulty:</span>
                  <Badge className={getDifficultyColor(market.entryDifficulty)}>
                    {market.entryDifficulty}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">View Detailed Analysis</Button>
                <Button size="sm" variant="outline">Create Expansion Plan</Button>
                <Button size="sm" variant="outline">Market Research</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expansion Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">Q1</div>
              <div>
                <p className="font-semibold">Southeast Asia Launch</p>
                <p className="text-sm text-gray-600">Start with Singapore and Malaysia - lowest entry barrier</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">Q2</div>
              <div>
                <p className="font-semibold">Latin America Research</p>
                <p className="text-sm text-gray-600">Conduct detailed market research and regulatory analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">Q3</div>
              <div>
                <p className="font-semibold">European Union Preparation</p>
                <p className="text-sm text-gray-600">Begin compliance preparation and partnership development</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button>Download Full Report</Button>
            <Button variant="outline">Schedule Strategy Session</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreMarketExpansion;
