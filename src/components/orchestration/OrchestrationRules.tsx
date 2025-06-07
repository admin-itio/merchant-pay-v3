
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
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
      name: 'High Value Transactions',
      description: 'Route high-value transactions to premium processor',
      conditions: 'Amount > $1000',
      actions: 'Route to Stripe',
      priority: 'High',
      status: 'Active',
      lastModified: '2024-01-15'
    },
    {
      id: 'ORG-002',
      name: 'EU Transactions',
      description: 'Handle European transactions with local processors',
      conditions: 'Country in EU',
      actions: 'Route to Adyen',
      priority: 'Medium',
      status: 'Active',
      lastModified: '2024-01-14'
    },
    {
      id: 'ORG-003',
      name: 'Failed Payment Retry',
      description: 'Retry failed payments with alternative processor',
      conditions: 'Status = Failed',
      actions: 'Retry with PayPal',
      priority: 'Low',
      status: 'Inactive',
      lastModified: '2024-01-13'
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
      // Update existing rule
      setRules(rules.map(rule => rule.id === selectedRule.id ? {...rule, ...ruleData} : rule));
      toast({
        title: "Rule Updated",
        description: "Orchestration rule has been updated successfully.",
      });
    } else {
      // Create new rule
      setRules([...rules, {...ruleData, status: 'Active', lastModified: new Date().toISOString().split('T')[0]}]);
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
        ? {...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active'}
        : rule
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orchestration Rules</h1>
          <p className="text-gray-600">Configure payment routing and processing rules</p>
        </div>
        <Button onClick={handleCreateRule}>
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Rules</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by rule ID, name, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{rule.conditions}</TableCell>
                  <TableCell className="text-sm">{rule.actions}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{rule.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRuleStatus(rule.id)}
                      >
                        {rule.status === 'Active' ? (
                          <ToggleLeft className="h-4 w-4" />
                        ) : (
                          <ToggleRight className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
