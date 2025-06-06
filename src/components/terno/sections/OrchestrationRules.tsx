
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface OrchestrationRulesProps {
  formData: any;
  setFormData: (data: any) => void;
}

const OrchestrationRules = ({ formData, setFormData }: OrchestrationRulesProps) => {
  const addOrchestrationRule = () => {
    setFormData({
      ...formData,
      orchestrationRules: [...formData.orchestrationRules, {
        id: Date.now(),
        name: '',
        priority: 1,
        conditions: [],
        actions: []
      }]
    });
  };

  const removeOrchestrationRule = (index: number) => {
    setFormData({
      ...formData,
      orchestrationRules: formData.orchestrationRules.filter((_: any, i: number) => i !== index)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Orchestration Rules
          <Button type="button" onClick={addOrchestrationRule} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formData.orchestrationRules.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No orchestration rules configured. Click "Add Rule" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {formData.orchestrationRules.map((rule: any, index: number) => (
              <div key={rule.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Rule #{index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeOrchestrationRule(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Rule Name</Label>
                    <Input
                      value={rule.name}
                      onChange={(e) => {
                        const updatedRules = [...formData.orchestrationRules];
                        updatedRules[index].name = e.target.value;
                        setFormData({...formData, orchestrationRules: updatedRules});
                      }}
                      placeholder="Rule name"
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Input
                      type="number"
                      value={rule.priority}
                      onChange={(e) => {
                        const updatedRules = [...formData.orchestrationRules];
                        updatedRules[index].priority = parseInt(e.target.value);
                        setFormData({...formData, orchestrationRules: updatedRules});
                      }}
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrchestrationRules;
