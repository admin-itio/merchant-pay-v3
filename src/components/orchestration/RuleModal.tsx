
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Rule {
  id: number;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
  description: string;
}

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<Rule, 'id'> | Rule) => void;
  rule?: Rule | null;
  maxPriority: number;
}

const RuleModal = ({ isOpen, onClose, onSave, rule, maxPriority }: RuleModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    condition: '',
    action: '',
    priority: maxPriority + 1,
    enabled: true,
    description: ''
  });

  useEffect(() => {
    if (rule) {
      setFormData(rule);
    } else {
      setFormData({
        name: '',
        condition: '',
        action: '',
        priority: maxPriority + 1,
        enabled: true,
        description: ''
      });
    }
  }, [rule, maxPriority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rule) {
      onSave({ ...formData, id: rule.id });
    } else {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {rule ? 'Edit Rule' : 'Create New Rule'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter rule name"
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
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
            <Label htmlFor="action">Action</Label>
            <Select value={formData.action} onValueChange={(value) => setFormData({ ...formData, action: value })}>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this rule does"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {rule ? 'Update Rule' : 'Create Rule'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RuleModal;
