
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, TrendingUp, DollarSign, Users, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WorldMapAnalytics = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('volume');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showToken, setShowToken] = useState(false);

  // Sample country data with enhanced metrics
  const countryData = [
    {
      country: 'India',
      code: 'IN',
      volume: 45600000,
      transactions: 156000,
      successRate: 96.8,
      avgTicket: 2920,
      growth: 15.2,
      coordinates: [77.2090, 28.6139],
      topCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      paymentMethods: {
        upi: 45,
        cards: 35,
        netBanking: 15,
        wallet: 5
      },
      riskScore: 'Low',
      currency: 'INR'
    },
    {
      country: 'United States',
      code: 'US',
      volume: 89200000,
      transactions: 245000,
      successRate: 98.2,
      avgTicket: 3640,
      growth: 12.7,
      coordinates: [-95.7129, 37.0902],
      topCities: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
      paymentMethods: {
        cards: 70,
        digitalWallet: 20,
        ach: 8,
        crypto: 2
      },
      riskScore: 'Low',
      currency: 'USD'
    },
    {
      country: 'United Kingdom',
      code: 'GB',
      volume: 34500000,
      transactions: 89000,
      successRate: 97.5,
      avgTicket: 3876,
      growth: 8.9,
      coordinates: [-3.4360, 55.3781],
      topCities: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
      paymentMethods: {
        cards: 65,
        openBanking: 25,
        digitalWallet: 8,
        other: 2
      },
      riskScore: 'Low',
      currency: 'GBP'
    },
    {
      country: 'Germany',
      code: 'DE',
      volume: 28900000,
      transactions: 67000,
      successRate: 96.1,
      avgTicket: 4313,
      growth: 6.4,
      coordinates: [10.4515, 51.1657],
      topCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
      paymentMethods: {
        cards: 55,
        sepa: 30,
        digitalWallet: 12,
        other: 3
      },
      riskScore: 'Low',
      currency: 'EUR'
    },
    {
      country: 'Brazil',
      code: 'BR',
      volume: 23400000,
      transactions: 112000,
      successRate: 94.8,
      avgTicket: 2089,
      growth: 22.1,
      coordinates: [-47.8825, -15.7942],
      topCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
      paymentMethods: {
        pix: 40,
        cards: 35,
        boleto: 20,
        other: 5
      },
      riskScore: 'Medium',
      currency: 'BRL'
    },
    {
      country: 'Singapore',
      code: 'SG',
      volume: 18700000,
      transactions: 45000,
      successRate: 98.9,
      avgTicket: 4156,
      growth: 18.3,
      coordinates: [103.8198, 1.3521],
      topCities: ['Singapore'],
      paymentMethods: {
        cards: 50,
        paynow: 30,
        digitalWallet: 18,
        other: 2
      },
      riskScore: 'Very Low',
      currency: 'SGD'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current) return;

    // Enhanced map visualization
    const mapElement = document.createElement('div');
    mapElement.className = 'w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-lg relative overflow-hidden';
    
    if (mapboxToken) {
      mapElement.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center p-8">
            <div class="text-6xl mb-4 animate-pulse">🗺️</div>
            <p class="text-gray-700 dark:text-gray-300 font-medium">Mapbox Integration Ready</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Token configured successfully</p>
            <div class="mt-4 grid grid-cols-2 gap-2 max-w-md">
              ${countryData.map(country => `
                <div class="bg-white dark:bg-gray-800 p-2 rounded shadow-sm text-xs">
                  <div class="font-medium">${country.country}</div>
                  <div class="text-gray-600 dark:text-gray-400">$${(country.volume / 1000000).toFixed(1)}M</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      mapElement.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center p-8">
            <div class="text-6xl mb-4">🌍</div>
            <p class="text-gray-600 dark:text-gray-300 font-medium">Interactive World Map</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter Mapbox token to view detailed map</p>
            <div class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p class="text-sm text-yellow-700 dark:text-yellow-300">
                Get your free token at <a href="https://mapbox.com" target="_blank" class="underline font-medium">mapbox.com</a>
              </p>
            </div>
          </div>
        </div>
      `;
    }
    
    if (mapContainer.current.firstChild) {
      mapContainer.current.removeChild(mapContainer.current.firstChild);
    }
    mapContainer.current.appendChild(mapElement);
  };

  useEffect(() => {
    initializeMap();
  }, [mapboxToken]);

  const selectedCountryData = selectedCountry 
    ? countryData.find(c => c.code === selectedCountry)
    : null;

  const getMetricValue = (country: any) => {
    switch (selectedMetric) {
      case 'volume': return `$${(country.volume / 1000000).toFixed(1)}M`;
      case 'transactions': return country.transactions.toLocaleString();
      case 'successRate': return `${country.successRate}%`;
      case 'growth': return `+${country.growth}%`;
      default: return country.volume;
    }
  };

  const getMetricColor = (country: any) => {
    const value = selectedMetric === 'volume' ? country.volume :
                  selectedMetric === 'transactions' ? country.transactions :
                  selectedMetric === 'successRate' ? country.successRate :
                  country.growth;
    
    if (value > 90 || value > 200000 || value > 40000000) return 'bg-green-500';
    if (value > 70 || value > 100000 || value > 20000000) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Global Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Country-wise transaction insights and market analysis</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">Transaction Volume</SelectItem>
              <SelectItem value="transactions">Transaction Count</SelectItem>
              <SelectItem value="successRate">Success Rate</SelectItem>
              <SelectItem value="growth">Growth Rate</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              placeholder="Enter Mapbox Token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-48 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => setShowToken(!showToken)}
            >
              {showToken ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Interactive World Map - {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={mapContainer} className="w-full h-96 rounded-lg border bg-gray-50 dark:bg-gray-900" />
              
              {/* Country Markers */}
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
                {countryData.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(selectedCountry === country.code ? null : country.code)}
                    className={`p-3 rounded-lg border text-left hover:shadow-md transition-all ${
                      selectedCountry === country.code 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{country.country}</span>
                      <div className={`w-3 h-3 rounded-full ${getMetricColor(country)}`} />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {getMetricValue(country)}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Country Details */}
        <div className="space-y-4">
          {selectedCountryData ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {selectedCountryData.country}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Volume</p>
                      <p className="font-semibold">${(selectedCountryData.volume / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Transactions</p>
                      <p className="font-semibold">{selectedCountryData.transactions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="font-semibold">{selectedCountryData.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Growth</p>
                      <p className="font-semibold text-green-600">+{selectedCountryData.growth}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Risk Score</p>
                    <Badge variant={selectedCountryData.riskScore === 'Low' || selectedCountryData.riskScore === 'Very Low' ? 'default' : 'secondary'}>
                      {selectedCountryData.riskScore}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Top Cities</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCountryData.topCities.map((city) => (
                        <Badge key={city} variant="outline" className="text-xs">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(selectedCountryData.paymentMethods).map(([method, percentage]) => (
                      <div key={method} className="flex items-center justify-between">
                        <span className="text-xs capitalize">{method.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium w-8">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Select a country to view details</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Click on any country card above</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldMapAnalytics;
