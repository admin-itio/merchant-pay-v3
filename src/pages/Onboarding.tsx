
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Building, 
  MapPin, 
  FileText, 
  Camera, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Trash2,
  User,
  Shield
} from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const businessInfoSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const addressSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [documents, setDocuments] = useState<Array<{
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    uploadedAt: Date;
  }>>([]);
  const [idVerification, setIdVerification] = useState({
    frontUploaded: false,
    backUploaded: false,
    selfieUploaded: false,
    livenessCompleted: false,
  });

  const businessForm = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
      industry: '',
      website: '',
      description: '',
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const steps = [
    { title: 'Business Information', icon: Building },
    { title: 'Address Details', icon: MapPin },
    { title: 'Document Upload', icon: FileText },
    { title: 'Identity Verification', icon: User },
    { title: 'Preferences', icon: Shield },
  ];

  const standardDocuments = [
    'Business License',
    'Tax ID Certificate',
    'Bank Statement',
    'Utility Bill',
    'Certificate of Incorporation',
    'VAT Registration',
    'Other'
  ];

  const handleDocumentUpload = (docType: string, customName?: string) => {
    const docName = docType === 'Other' ? customName || 'Custom Document' : docType;
    
    // Fix the status assignment to ensure proper TypeScript typing
    const randomValue = Math.random();
    const status: 'pending' | 'approved' | 'rejected' = 
      randomValue > 0.7 ? 'approved' : 
      randomValue > 0.5 ? 'pending' : 'rejected';
    
    const newDoc = {
      id: Date.now().toString(),
      name: docName,
      type: docType,
      status,
      rejectionReason: status === 'rejected' ? 'Document quality is poor. Please upload a clearer image.' : undefined,
      uploadedAt: new Date(),
    };
    
    setDocuments(prev => [...prev, newDoc]);
    toast.success(`${docName} uploaded successfully`);
  };

  const handleDocumentDelete = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc?.status === 'approved') {
      toast.error('Cannot delete approved documents');
      return;
    }
    setDocuments(prev => prev.filter(d => d.id !== docId));
    toast.success('Document deleted');
  };

  const handleIdUpload = (type: 'front' | 'back' | 'selfie') => {
    setIdVerification(prev => ({
      ...prev,
      [`${type}Uploaded`]: true,
    }));
    toast.success(`ID ${type} uploaded successfully`);
  };

  const handleLivenessCheck = () => {
    setIdVerification(prev => ({
      ...prev,
      livenessCompleted: true,
    }));
    toast.success('Liveness check completed successfully');
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Onboarding completed successfully!');
      navigate('/');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBusinessInfo = () => (
    <Form {...businessForm}>
      <form className="space-y-4">
        <FormField
          control={businessForm.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Business Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={businessForm.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={businessForm.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={businessForm.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://yourwebsite.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={businessForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your business..."
                  className="min-h-20"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const renderAddressDetails = () => (
    <Form {...addressForm}>
      <form className="space-y-4">
        <FormField
          control={addressForm.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={addressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={addressForm.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={addressForm.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={addressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Upload Required Documents</h3>
        <div className="grid grid-cols-2 gap-3">
          {standardDocuments.map((docType) => (
            <Button
              key={docType}
              variant="outline"
              onClick={() => {
                if (docType === 'Other') {
                  const customName = prompt('Enter document name:');
                  if (customName) {
                    handleDocumentUpload(docType, customName);
                  }
                } else {
                  handleDocumentUpload(docType);
                }
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Upload className="h-6 w-6" />
              <span className="text-sm">{docType}</span>
            </Button>
          ))}
        </div>
      </div>

      {documents.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded {doc.uploadedAt.toLocaleDateString()}
                    </p>
                    {doc.status === 'rejected' && doc.rejectionReason && (
                      <p className="text-sm text-red-600 mt-1">{doc.rejectionReason}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      doc.status === 'approved' ? 'default' :
                      doc.status === 'pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {doc.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {doc.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                    {doc.status}
                  </Badge>
                  {doc.status !== 'approved' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentDelete(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderIdVerification = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Identity Verification</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please upload your government-issued ID and complete the liveness check
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Upload ID Documents</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={idVerification.frontUploaded ? "default" : "outline"}
              onClick={() => handleIdUpload('front')}
              className="h-24 flex flex-col items-center gap-2"
              disabled={idVerification.frontUploaded}
            >
              {idVerification.frontUploaded ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <Camera className="h-6 w-6" />
              )}
              <span className="text-sm">ID Front</span>
            </Button>
            <Button
              variant={idVerification.backUploaded ? "default" : "outline"}
              onClick={() => handleIdUpload('back')}
              className="h-24 flex flex-col items-center gap-2"
              disabled={idVerification.backUploaded}
            >
              {idVerification.backUploaded ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <Camera className="h-6 w-6" />
              )}
              <span className="text-sm">ID Back</span>
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Liveness Check</h4>
          <div className="space-y-3">
            <Button
              variant={idVerification.selfieUploaded ? "default" : "outline"}
              onClick={() => handleIdUpload('selfie')}
              className="w-full h-16 flex items-center justify-center gap-2"
              disabled={idVerification.selfieUploaded}
            >
              {idVerification.selfieUploaded ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              <span>Upload Selfie</span>
            </Button>
            
            <Button
              variant={idVerification.livenessCompleted ? "default" : "outline"}
              onClick={handleLivenessCheck}
              className="w-full h-16 flex items-center justify-center gap-2"
              disabled={!idVerification.selfieUploaded || idVerification.livenessCompleted}
            >
              {idVerification.livenessCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
              <span>Complete Liveness Check</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">User Preferences</h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize your experience with notification settings, themes, and layouts
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Notifications</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">Email notifications for transactions</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">SMS alerts for large payments</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Weekly summary reports</span>
            </label>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Theme Preferences</h4>
          <Select defaultValue="system">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light Mode</SelectItem>
              <SelectItem value="dark">Dark Mode</SelectItem>
              <SelectItem value="system">System Default</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Dashboard Layout</h4>
          <Select defaultValue="standard">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBusinessInfo();
      case 1:
        return renderAddressDetails();
      case 2:
        return renderDocumentUpload();
      case 3:
        return renderIdVerification();
      case 4:
        return renderPreferences();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Onboarding</CardTitle>
            <div className="mt-6">
              <Progress value={(currentStep + 1) / steps.length * 100} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-8 h-0.5 bg-gray-200 mx-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>
              {renderStepContent()}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <Button onClick={handleNextStep}>
                {currentStep === steps.length - 1 ? 'Complete Onboarding' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
