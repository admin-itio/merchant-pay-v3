
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Trash2, Info } from 'lucide-react';

interface EditRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  rule?: any;
  onSave: (rule: any) => void;
}

const EditRuleModal = ({ isOpen, onClose, rule, onSave }: EditRuleModalProps) => {
  const [step, setStep] = useState(1);
  const [ruleData, setRuleData] = useState({
    id: rule?.id || `ORG-${Date.now()}`,
    name: rule?.name || '',
    description: rule?.description || '',
    conditions: rule?.conditions || [{ field: '', operator: '', value: '' }],
    actions: rule?.actions || [{ type: '', value: '' }],
    priority: rule?.priority || 'medium',
    enabled: rule?.enabled || true
  });

  const addCondition = () => {
    setRuleData({
      ...ruleData,
      conditions: [...ruleData.conditions, { field: '', operator: '', value: '' }]
    });
  };

  const removeCondition = (index: number) => {
    setRuleData({
      ...ruleData,
      conditions: ruleData.conditions.filter((_, i) => i !== index)
    });
  };

  const updateCondition = (index: number, field: string, value: string) => {
    const newConditions = [...ruleData.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setRuleData({ ...ruleData, conditions: newConditions });
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    onSave(ruleData);
    onClose();
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {rule ? 'Edit' : 'Create'} Orchestration Rule
              <span className="text-sm font-normal text-gray-500">ID: {ruleData.id}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="text-sm">Configure Rule</span>
              <div className="flex-1 h-px bg-gray-200" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm">Review & Confirm</span>
            </div>
          </div>

          {step === 1 && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="ruleName" className="flex items-center gap-1">
                          Rule Name <Info className="h-3 w-3" />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter a unique rule name that you can easily identify
                      </TooltipContent>
                    </Tooltip>
                    <Input 
                      id="ruleName"
                      value={ruleData.name}
                      onChange={(e) => setRuleData({...ruleData, name: e.target.value})}
                      placeholder="e.g., High Value Transactions"
                    />
                  </div>

                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label htmlFor="description" className="flex items-center gap-1">
                          Description <Info className="h-3 w-3" />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        Provide a detailed description of what this rule does
                      </TooltipContent>
                    </Tooltip>
                    <Textarea 
                      id="description"
                      value={ruleData.description}
                      onChange={(e) => setRuleData({...ruleData, description: e.target.value})}
                      placeholder="Describe what this rule does..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={ruleData.priority} onValueChange={(value) => setRuleData({...ruleData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Rule Conditions</h3>
                    <Button onClick={addCondition} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>

                  {ruleData.conditions.map((condition, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-4 gap-4 items-end">
                          <div>
                            <Label>Field</Label>
                            <Select value={condition.field} onValueChange={(value) => updateCondition(index, 'field', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="amount">Transaction Amount</SelectItem>
                                <SelectItem value="currency">Currency</SelectItem>
                                <SelectItem value="country">Country</SelectItem>
                                <SelectItem value="payment_method">Payment Method</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Operator</Label>
                            <Select value={condition.operator} onValueChange={(value) => updateCondition(index, 'operator', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="greater_than">Greater Than</SelectItem>
                                <SelectItem value="less_than">Less Than</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Value</Label>
                            <Input 
                              value={condition.value}
                              onChange={(e) => updateCondition(index, 'value', e.target.value)}
                              placeholder="Enter value"
                            />
                          </div>
                          <div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeCondition(index)}
                              disabled={ruleData.conditions.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Rule Actions</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Action Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="route_to">Route To Processor</SelectItem>
                              <SelectItem value="block">Block Transaction</SelectItem>
                              <SelectItem value="require_3ds">Require 3D Secure</SelectItem>
                              <SelectItem value="apply_fee">Apply Additional Fee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Value</Label>
                          <Input placeholder="Enter action value" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review Rule Configuration</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Rule Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-medium">Rule ID:</Label>
                    <p className="text-sm text-gray-600">{ruleData.id}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Name:</Label>
                    <p className="text-sm text-gray-600">{ruleData.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Description:</Label>
                    <p className="text-sm text-gray-600">{ruleData.description}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Conditions:</Label>
                    <ul className="text-sm text-gray-600 mt-1">
                      {ruleData.conditions.map((condition, index) => (
                        <li key={index}>
                          {condition.field} {condition.operator} {condition.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              {step < 2 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSave}>Confirm & Create</Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default EditRuleModal;
