
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';

const OrchestrationRules = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'High Value Route',
      condition: 'Amount > $1000',
      action: 'Route to Stripe',
      priority: 1,
      enabled: true,
      description: 'Route high-value transactions through Stripe for better success rates'
    },
    {
      id: 2,
      name: 'EU Card Route',
      condition: 'Card Region = EU',
      action: 'Route to Adyen',
      priority: 2,
      enabled: true,
      description: 'Route European cards through Adyen for optimal processing'
    },
    {
      id: 3,
      name: 'Retry Logic',
      condition: 'Transaction Failed',
      action: 'Retry with PayPal',
      priority: 3,
      enabled: true,
      description: 'Automatically retry failed transactions through alternative gateway'
    },
    {
      id: 4,
      name: 'Low Risk Mobile',
      condition: 'Device = Mobile AND Risk Score < 30',
      action: 'Route to Square',
      priority: 4,
      enabled: false,
      description: 'Route low-risk mobile transactions through Square'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    condition: '',
    action: '',
    priority: rules.length + 1,
    enabled: true,
    description: ''
  });

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const createRule = () => {
    const rule = {
      ...newRule,
      id: Math.max(...rules.map(r => r.id)) + 1
    };
    setRules([...rules, rule]);
    setNewRule({
      name: '',
      condition: '',
      action: '',
      priority: rules.length + 2,
      enabled: true,
      description: ''
    });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Orchestration</h2>
          <p className="text-gray-600 mt-1">Configure routing rules to optimize payment processing</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Create Rule Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Create New Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
                <Input
                  placeholder="Enter rule name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={newRule.priority}
                  onChange={(e) => setNewRule({...newRule, priority: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <Select value={newRule.condition} onValueChange={(value) => setNewRule({...newRule, condition: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amount > $500">Amount > $500</SelectItem>
                  <SelectItem value="Amount > $1000">Amount > $1000</SelectItem>
                  <SelectItem value="Card Region = US">Card Region = US</SelectItem>
                  <SelectItem value="Card Region = EU">Card Region = EU</SelectItem>
                  <SelectItem value="Device = Mobile">Device = Mobile</SelectItem>
                  <SelectItem value="Risk Score < 30">Risk Score < 30</SelectItem>
                  <SelectItem value="Transaction Failed">Transaction Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
              <Select value={newRule.action} onValueChange={(value) => setNewRule({...newRule, action: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Route to Stripe">Route to Stripe</SelectItem>
                  <SelectItem value="Route to Adyen">Route to Adyen</SelectItem>
                  <SelectItem value="Route to PayPal">Route to PayPal</SelectItem>
                  <SelectItem value="Route to Square">Route to Square</SelectItem>
                  <SelectItem value="Retry with PayPal">Retry with PayPal</SelectItem>
                  <SelectItem value="Block Transaction">Block Transaction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Input
                placeholder="Describe what this rule does"
                value={newRule.description}
                onChange={(e) => setNewRule({...newRule, description: e.target.value})}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={createRule}>Create Rule</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        {rules
          .sort((a, b) => a.priority - b.priority)
          .map((rule) => (
          <Card key={rule.id} className={`border-l-4 ${rule.enabled ? 'border-l-green-500' : 'border-l-gray-300'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Priority {rule.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Condition</p>
                      <p className="text-gray-900">{rule.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Action</p>
                      <p className="text-gray-900">{rule.action}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <span className="text-sm text-gray-600">
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteRule(rule.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrchestrationRules;
