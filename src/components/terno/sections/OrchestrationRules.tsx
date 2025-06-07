
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Info, Shield, ArrowRight } from 'lucide-react';

interface OrchestrationRulesProps {
  data: any;
  onChange: (data: any) => void;
}

const OrchestrationRules = ({ data, onChange }: OrchestrationRulesProps) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addRule = () => {
    const currentRules = data.orchestrationRules || [];
    const newRule = {
      id: Date.now().toString(),
      name: '',
      condition: '',
      action: '',
      priority: currentRules.length + 1,
      enabled: true
    };
    handleInputChange('orchestrationRules', [...currentRules, newRule]);
  };

  const removeRule = (ruleId: string) => {
    const currentRules = data.orchestrationRules || [];
    const updatedRules = currentRules.filter((rule: any) => rule.id !== ruleId);
    handleInputChange('orchestrationRules', updatedRules);
  };

  const updateRule = (ruleId: string, field: string, value: any) => {
    const currentRules = data.orchestrationRules || [];
    const updatedRules = currentRules.map((rule: any) =>
      rule.id === ruleId ? { ...rule, [field]: value } : rule
    );
    handleInputChange('orchestrationRules', updatedRules);
  };

  const rules = data.orchestrationRules || [];

  return (
    <div className="space-y-6">
      {/* Orchestration Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Payment Orchestration Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Smart Routing</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically route to best processor
                </p>
              </div>
              <Switch
                checked={data.smartRouting || true}
                onCheckedChange={(checked) => handleInputChange('smartRouting', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cascade Fallback</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try alternative processors on failure
                </p>
              </div>
              <Switch
                checked={data.cascadeFallback || true}
                onCheckedChange={(checked) => handleInputChange('cascadeFallback', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Load Balancing</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Distribute load across processors
                </p>
              </div>
              <Switch
                checked={data.loadBalancing || false}
                onCheckedChange={(checked) => handleInputChange('loadBalancing', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default Routing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Default Routing Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryProcessor">Primary Processor</Label>
              <Select value={data.primaryProcessor || ''} onValueChange={(value) => handleInputChange('primaryProcessor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary processor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="adyen">Adyen</SelectItem>
                  <SelectItem value="worldpay">Worldpay</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fallbackProcessor">Fallback Processor</Label>
              <Select value={data.fallbackProcessor || ''} onValueChange={(value) => handleInputChange('fallbackProcessor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fallback processor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="adyen">Adyen</SelectItem>
                  <SelectItem value="worldpay">Worldpay</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="routingLogic">Routing Logic</Label>
              <Select value={data.routingLogic || 'cost-optimized'} onValueChange={(value) => handleInputChange('routingLogic', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select routing logic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost-optimized">Cost Optimized</SelectItem>
                  <SelectItem value="success-rate">Success Rate</SelectItem>
                  <SelectItem value="speed">Fastest Processing</SelectItem>
                  <SelectItem value="geographic">Geographic</SelectItem>
                  <SelectItem value="round-robin">Round Robin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRetries">Max Retry Attempts</Label>
              <Input
                id="maxRetries"
                type="number"
                placeholder="3"
                value={data.maxRetries || '3'}
                onChange={(e) => handleInputChange('maxRetries', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Orchestration Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Custom Orchestration Rules</CardTitle>
            <Button onClick={addRule} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {rules.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No custom orchestration rules defined</p>
              <p className="text-sm">Add rules to customize payment routing logic</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rules.map((rule: any, index: number) => (
                <Card key={rule.id} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Rule {index + 1}</Badge>
                        <Badge className={rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) => updateRule(rule.id, 'enabled', checked)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRule(rule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Rule Name</Label>
                        <Input
                          placeholder="e.g., High Value Transactions"
                          value={rule.name}
                          onChange={(e) => updateRule(rule.id, 'name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Condition</Label>
                        <Select value={rule.condition} onValueChange={(value) => updateRule(rule.id, 'condition', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amount-greater">Amount Greater Than</SelectItem>
                            <SelectItem value="amount-less">Amount Less Than</SelectItem>
                            <SelectItem value="currency">Currency Equals</SelectItem>
                            <SelectItem value="country">Country Equals</SelectItem>
                            <SelectItem value="card-type">Card Type</SelectItem>
                            <SelectItem value="time-range">Time Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Action</Label>
                        <Select value={rule.action} onValueChange={(value) => updateRule(rule.id, 'action', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="route-to-stripe">Route to Stripe</SelectItem>
                            <SelectItem value="route-to-adyen">Route to Adyen</SelectItem>
                            <SelectItem value="route-to-worldpay">Route to Worldpay</SelectItem>
                            <SelectItem value="require-3ds">Require 3D Secure</SelectItem>
                            <SelectItem value="block-transaction">Block Transaction</SelectItem>
                            <SelectItem value="manual-review">Manual Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={rule.priority}
                          onChange={(e) => updateRule(rule.id, 'priority', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processor Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Processor Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Primary Processors
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Stripe</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Credit/Debit Cards</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Digital Wallet</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Fallback Processors
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Adyen</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Credit/Debit Cards</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Standby</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Square</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Local Payments</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Standby</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orchestration Notes */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Orchestration Best Practices
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• Rules are processed in priority order (1 = highest priority)</li>
                <li>• Test orchestration rules in sandbox before deploying to production</li>
                <li>• Monitor processor performance to optimize routing decisions</li>
                <li>• Use geographic routing for international transactions</li>
                <li>• Consider cost vs. success rate when configuring routing logic</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrchestrationRules;
