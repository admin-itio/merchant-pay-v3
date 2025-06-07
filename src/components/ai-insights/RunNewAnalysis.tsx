
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Brain, BarChart3, Users, TrendingUp, Shield, Play } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface RunNewAnalysisProps {
  onBack: () => void;
}

const RunNewAnalysis = ({ onBack }: RunNewAnalysisProps) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  const analysisTypes = [
    {
      id: 'revenue',
      name: 'Revenue Optimization',
      description: 'Identify pricing strategies and revenue growth opportunities',
      icon: TrendingUp,
      estimatedTime: '5-10 minutes',
      dataSources: ['Transactions', 'Customer Data', 'Pricing History']
    },
    {
      id: 'fraud',
      name: 'Fraud Pattern Detection',
      description: 'Detect suspicious patterns and potential fraud risks',
      icon: Shield,
      estimatedTime: '3-7 minutes',
      dataSources: ['Transactions', 'Device Data', 'Geographic Data']
    },
    {
      id: 'customer',
      name: 'Customer Behavior Analysis',
      description: 'Analyze customer segments and behavior patterns',
      icon: Users,
      estimatedTime: '8-12 minutes',
      dataSources: ['Customer Data', 'Transactions', 'Engagement Data']
    },
    {
      id: 'market',
      name: 'Market Opportunity Analysis',
      description: 'Identify new market opportunities and growth potential',
      icon: BarChart3,
      estimatedTime: '10-15 minutes',
      dataSources: ['Market Data', 'Competitor Data', 'Geographic Data']
    }
  ];

  const dataSources = [
    { id: 'transactions', label: 'Transaction Data', count: '50,000+ records' },
    { id: 'customers', label: 'Customer Data', count: '2,500+ profiles' },
    { id: 'pricing', label: 'Pricing History', count: '12 months' },
    { id: 'devices', label: 'Device Data', count: '15,000+ devices' },
    { id: 'geographic', label: 'Geographic Data', count: '25+ countries' },
    { id: 'engagement', label: 'Engagement Data', count: '6 months' },
    { id: 'market', label: 'Market Data', count: 'External sources' },
    { id: 'competitor', label: 'Competitor Data', count: 'Industry reports' }
  ];

  const handleRunAnalysis = () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const selectedAnalysisData = analysisTypes.find(a => a.id === selectedAnalysis);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Run New AI Analysis</h1>
          <p className="text-gray-600">Generate fresh insights with AI-powered data analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Select Analysis Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisTypes.map((analysis) => {
                  const Icon = analysis.icon;
                  return (
                    <div
                      key={analysis.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAnalysis === analysis.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAnalysis(analysis.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-6 w-6 ${
                          selectedAnalysis === analysis.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <div className="flex-1">
                          <h3 className="font-semibold">{analysis.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{analysis.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Est. time: {analysis.estimatedTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {selectedAnalysisData && (
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <p className="text-sm text-gray-600">
                  Select the data sources to include in your analysis
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dataSources
                    .filter(source => selectedAnalysisData.dataSources.some(req => 
                      source.label.toLowerCase().includes(req.toLowerCase().split(' ')[0])
                    ))
                    .map((source) => (
                      <div key={source.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={source.id}
                          checked={selectedDataSources.includes(source.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDataSources([...selectedDataSources, source.id]);
                            } else {
                              setSelectedDataSources(selectedDataSources.filter(id => id !== source.id));
                            }
                          }}
                        />
                        <div className="flex-1">
                          <label htmlFor={source.id} className="font-medium cursor-pointer">
                            {source.label}
                          </label>
                          <p className="text-sm text-gray-600">{source.count}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Period</label>
                <Select defaultValue="30d">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="6m">Last 6 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Analysis Depth</label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Analysis</SelectItem>
                    <SelectItem value="standard">Standard Analysis</SelectItem>
                    <SelectItem value="deep">Deep Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <Select defaultValue="dashboard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                    <SelectItem value="report">PDF Report</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Run Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {!isRunning ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Ready to run analysis</p>
                    {selectedAnalysisData && (
                      <p>Estimated time: {selectedAnalysisData.estimatedTime}</p>
                    )}
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleRunAnalysis}
                    disabled={!selectedAnalysis || selectedDataSources.length === 0}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Analysis in Progress...</p>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-gray-600 mt-1">{Math.round(progress)}% complete</p>
                  </div>
                  {progress === 100 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">Analysis Complete!</p>
                      <Button size="sm" className="mt-2" onClick={onBack}>
                        View Results
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RunNewAnalysis;
