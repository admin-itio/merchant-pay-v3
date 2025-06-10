
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import EditRuleModal from './EditRuleModal';
import { useToast } from '@/hooks/use-toast';

const OrchestrationRules = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [rules, setRules] = useState([
    {
      id: 'ORG-001',
      name: 'High Value Route',
      description: 'Route high-value transactions through Stripe for better success rates',
      conditions: 'Amount > $1000',
      actions: 'Route to Stripe',
      priority: 1,
      status: 'Enabled',
      lastModified: '2024-01-15'
    },
    {
      id: 'ORG-002',
      name: 'EU Card Route',
      description: 'Route European cards through Adyen for optimal processing',
      conditions: 'Card Region = EU',
      actions: 'Route to Adyen',
      priority: 2,
      status: 'Enabled',
      lastModified: '2024-01-14'
    },
    {
      id: 'ORG-003',
      name: 'Retry Logic',
      description: 'Automatically retry failed transactions through alternative gateway',
      conditions: 'Transaction Failed',
      actions: 'Retry with PayPal',
      priority: 3,
      status: 'Enabled',
      lastModified: '2024-01-13'
    },
    {
      id: 'ORG-004',
      name: 'Low Risk Mobile',
      description: 'Route low-risk mobile transactions through Square',
      conditions: 'Device = Mobile AND Risk Score < 30',
      actions: 'Route to Square',
      priority: 4,
      status: 'Disabled',
      lastModified: '2024-01-12'
    }
  ]);

  const { toast } = useToast();

  const filteredRules = rules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRule = (rule: any) => {
    setSelectedRule(rule);
    setEditModalOpen(true);
  };

  const handleCreateRule = () => {
    setSelectedRule(null);
    setEditModalOpen(true);
  };

  const handleSaveRule = (ruleData: any) => {
    if (selectedRule) {
      setRules(rules.map(rule => rule.id === selectedRule.id ? {...rule, ...ruleData} : rule));
      toast({
        title: "Rule Updated",
        description: "Orchestration rule has been updated successfully.",
      });
    } else {
      setRules([...rules, {...ruleData, status: 'Enabled', lastModified: new Date().toISOString().split('T')[0]}]);
      toast({
        title: "Rule Created",
        description: "New orchestration rule has been created successfully.",
      });
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "Rule Deleted",
      description: "Orchestration rule has been deleted successfully.",
    });
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? {...rule, status: rule.status === 'Enabled' ? 'Disabled' : 'Enabled'}
        : rule
    ));
  };

  const getBorderColor = (status: string) => {
    return status === 'Enabled' ? 'border-l-green-500' : 'border-l-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Orchestration</h1>
          <p className="text-gray-600">Configure routing rules to optimize payment processing</p>
        </div>
        <Button onClick={handleCreateRule} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <Card key={rule.id} className={`border-l-4 ${getBorderColor(rule.status)} shadow-sm hover:shadow-md transition-shadow`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{rule.priority}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      Priority {rule.priority}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Condition</p>
                      <p className="text-gray-900">{rule.conditions}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Action</p>
                      <p className="text-gray-900">{rule.actions}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Rule ID</p>
                      <p className="text-gray-900 font-mono text-sm">{rule.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Last Modified</p>
                      <p className="text-gray-900">{rule.lastModified}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
                
                <div className="flex items-center gap-4 ml-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.status === 'Enabled'}
                      onCheckedChange={() => toggleRuleStatus(rule.id)}
                    />
                    <span className="text-sm text-gray-600">
                      {rule.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditRule(rule)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Orchestration Rule</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the rule "{rule.name}"? This action cannot be undone and may affect payment processing.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteRule(rule.id)}>
                            Delete Rule
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditRuleModal 
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        rule={selectedRule}
        onSave={handleSaveRule}
      />
    </div>
  );
};

export default OrchestrationRules;
