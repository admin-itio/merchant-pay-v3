
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Shield } from 'lucide-react';

interface CustomOrchestrationRulesProps {
  data: any;
  onChange: (data: any) => void;
}

const CustomOrchestrationRules = ({ data, onChange }: CustomOrchestrationRulesProps) => {
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
  );
};

export default CustomOrchestrationRules;
