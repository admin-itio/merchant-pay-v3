
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import RuleCard from './RuleCard';
import RuleModal from './RuleModal';

interface Rule {
  id: number;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
  description: string;
}

const OrchestrationRules = () => {
  const [rules, setRules] = useState<Rule[]>([
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

  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingRule(null);
    setShowModal(true);
  };

  const handleSave = (ruleData: Omit<Rule, 'id'> | Rule) => {
    if ('id' in ruleData) {
      // Editing existing rule
      setRules(rules.map(rule => 
        rule.id === ruleData.id ? ruleData : rule
      ));
    } else {
      // Creating new rule
      const newRule = {
        ...ruleData,
        id: Math.max(...rules.map(r => r.id), 0) + 1
      };
      setRules([...rules, newRule]);
    }
  };

  const maxPriority = Math.max(...rules.map(r => r.priority), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Orchestration</h2>
          <p className="text-gray-600 mt-1">Configure routing rules to optimize payment processing</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">No orchestration rules configured</p>
              <Button onClick={handleCreate}>Create Your First Rule</Button>
            </CardContent>
          </Card>
        ) : (
          rules
            .sort((a, b) => a.priority - b.priority)
            .map((rule) => (
              <RuleCard
                key={rule.id}
                rule={rule}
                onToggle={toggleRule}
                onEdit={handleEdit}
                onDelete={deleteRule}
              />
            ))
        )}
      </div>

      {/* Rule Modal */}
      <RuleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        rule={editingRule}
        maxPriority={maxPriority}
      />
    </div>
  );
};

export default OrchestrationRules;
