
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  BarChart3, 
  Shield,
  ArrowLeft,
  Play,
  CheckCircle,
  Clock
} from 'lucide-react';

interface RunNewAnalysisProps {
  onBack: () => void;
}

const RunNewAnalysis = ({ onBack }: RunNewAnalysisProps) => {
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedAnalyses, setCompletedAnalyses] = useState<string[]>([]);

  const analysisTypes = [
    {
      id: 'revenue-optimization',
      name: 'Revenue Optimization',
      description: 'Analyze pricing strategies and revenue opportunities',
      icon: BarChart3,
      estimatedTime: '3-5 minutes',
      impact: 'High'
    },
    {
      id: 'fraud-detection',
      name: 'Advanced Fraud Detection',
      description: 'Deep learning analysis of transaction patterns',
      icon: Shield,
      estimatedTime: '5-8 minutes',
      impact: 'Critical'
    },
    {
      id: 'customer-segmentation',
      name: 'Customer Segmentation',
      description: 'AI-powered customer behavior analysis and segmentation',
      icon: Brain,
      estimatedTime: '4-6 minutes',
      impact: 'Medium'
    },
    {
      id: 'market-trends',
      name: 'Market Trend Analysis',
      description: 'Identify emerging market opportunities and threats',
      icon: Zap,
      estimatedTime: '2-4 minutes',
      impact: 'High'
    }
  ];

  const handleAnalysisToggle = (analysisId: string) => {
    setSelectedAnalyses(prev => 
      prev.includes(analysisId) 
        ? prev.filter(id => id !== analysisId)
        : [...prev, analysisId]
    );
  };

  const handleRunAnalysis = async () => {
    setIsRunning(true);
    setProgress(0);
    setCompletedAnalyses([]);

    // Simulate analysis progress
    const totalSteps = selectedAnalyses.length * 100;
    let currentProgress = 0;

    for (const analysisId of selectedAnalyses) {
      // Simulate analysis time
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        currentProgress += 10;
        setProgress((currentProgress / totalSteps) * 100);
      }
      setCompletedAnalyses(prev => [...prev, analysisId]);
    }

    setIsRunning(false);
  };

  const getAnalysisStatus = (analysisId: string) => {
    if (completedAnalyses.includes(analysisId)) return 'completed';
    if (isRunning && selectedAnalyses.includes(analysisId)) return 'running';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to AI Insights
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Run New Analysis</h1>
          <p className="text-gray-600">Configure and execute AI-powered business analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Analysis Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisTypes.map((analysis) => {
                const Icon = analysis.icon;
                const status = getAnalysisStatus(analysis.id);
                
                return (
                  <div 
                    key={analysis.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedAnalyses.includes(analysis.id) ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedAnalyses.includes(analysis.id)}
                        onCheckedChange={() => handleAnalysisToggle(analysis.id)}
                        disabled={isRunning}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold">{analysis.name}</h3>
                          <Badge variant={analysis.impact === 'Critical' ? 'destructive' : analysis.impact === 'High' ? 'default' : 'secondary'}>
                            {analysis.impact} Impact
                          </Badge>
                          {status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {status === 'running' && (
                            <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{analysis.description}</p>
                        <p className="text-xs text-gray-500">Estimated time: {analysis.estimatedTime}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Selected Analyses</p>
                  <p className="font-semibold">{selectedAnalyses.length} of {analysisTypes.length}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Estimated Total Time</p>
                  <p className="font-semibold">
                    {selectedAnalyses.length === 0 ? '0 minutes' : 
                     selectedAnalyses.length < 3 ? '5-15 minutes' : '15-25 minutes'}
                  </p>
                </div>

                {isRunning && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Progress</p>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</p>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleRunAnalysis}
                  disabled={selectedAnalyses.length === 0 || isRunning}
                >
                  {isRunning ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Running Analysis...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {completedAnalyses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Results Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {completedAnalyses.map((analysisId) => {
                    const analysis = analysisTypes.find(a => a.id === analysisId);
                    return (
                      <div key={analysisId} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{analysis?.name}</span>
                      </div>
                    );
                  })}
                </div>
                {completedAnalyses.length === selectedAnalyses.length && !isRunning && (
                  <Button className="w-full mt-4" onClick={onBack}>
                    View Results
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunNewAnalysis;
