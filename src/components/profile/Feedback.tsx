
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const feedbackHistory = [
    {
      id: 'FB001',
      type: 'Feature Request',
      subject: 'Dark mode for mobile app',
      status: 'In Progress',
      date: '2024-12-10',
      rating: 4
    },
    {
      id: 'FB002',
      type: 'Bug Report',
      subject: 'Transaction export issue',
      status: 'Resolved',
      date: '2024-12-05',
      rating: 5
    },
    {
      id: 'FB003',
      type: 'General',
      subject: 'Overall service feedback',
      status: 'Reviewed',
      date: '2024-11-28',
      rating: 5
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackType || !rating || !message.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll review it and get back to you soon.",
      });
      
      // Reset form
      setFeedbackType('');
      setRating('');
      setMessage('');
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>;
      case 'Reviewed':
        return <Badge className="bg-gray-100 text-gray-800"><AlertCircle className="h-3 w-3 mr-1" />Reviewed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Feedback & Suggestions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us improve by sharing your thoughts and suggestions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit New Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feedback-type">Feedback Type *</Label>
                <Select value={feedbackType} onValueChange={setFeedbackType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="compliment">Compliment</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Overall Rating *</Label>
                <RadioGroup value={rating} onValueChange={setRating} className="flex gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="flex items-center space-x-2">
                      <RadioGroupItem value={star.toString()} id={`rating-${star}`} />
                      <Label htmlFor={`rating-${star}`} className="flex items-center gap-1">
                        {star} {renderStars(star).slice(0, 1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please share your feedback, suggestions, or report any issues you've encountered..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="mt-1"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback History */}
        <Card>
          <CardHeader>
            <CardTitle>Your Feedback History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackHistory.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {feedback.subject}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feedback.type} • {feedback.date}
                      </p>
                    </div>
                    {getStatusBadge(feedback.status)}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                    <div className="flex">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">ID: {feedback.id}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">For Bug Reports:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Describe the issue clearly</li>
                <li>• Include steps to reproduce</li>
                <li>• Mention browser/device used</li>
                <li>• Include screenshots if helpful</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Feature Requests:</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Explain the desired functionality</li>
                <li>• Describe the business benefit</li>
                <li>• Suggest implementation details</li>
                <li>• Mention similar features elsewhere</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
