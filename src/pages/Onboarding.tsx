
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { 
  Building, 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Camera,
  User,
  Phone,
  MapPin,
  Trash2
} from 'lucide-react';

const onboardingSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  description: z.string().min(10, 'Business description is required'),
});

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  file?: File;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [livenessCheck, setLivenessCheck] = useState({
    frontId: null as File | null,
    backId: null as File | null,
    selfie: null as File | null,
    status: 'pending' as 'pending' | 'completed'
  });

  const standardDocuments = [
    'Business Registration Certificate',
    'Tax ID Certificate',
    'Bank Statement',
    'Articles of Incorporation',
    'Operating Agreement',
    'Professional License',
    'Insurance Certificate',
    'Other'
  ];

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
      industry: '',
      website: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      description: '',
    },
  });

  useEffect(() => {
    const locationState = location.state as { email: string; name: string } | null;
    if (!locationState?.email) {
      navigate('/signup');
      return;
    }
    setEmail(locationState.email);
    setName(locationState.name);
  }, [location, navigate]);

  const handleDocumentUpload = (documentType: string, file: File) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      name: documentType,
      type: file.type,
      status: 'pending',
      file
    };
    setDocuments([...documents, newDocument]);
    toast.success(`${documentType} uploaded successfully`);
  };

  const handleDocumentDelete = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc?.status === 'approved') {
      toast.error("Cannot delete approved documents");
      return;
    }
    setDocuments(documents.filter(d => d.id !== docId));
    toast.success("Document deleted");
  };

  const handleLivenessUpload = (type: 'frontId' | 'backId' | 'selfie', file: File) => {
    setLivenessCheck(prev => ({
      ...prev,
      [type]: file
    }));
    toast.success(`${type} uploaded successfully`);
  };

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    setIsLoading(true);
    try {
      console.log('Onboarding data:', values);
      console.log('Documents:', documents);
      console.log('Liveness check:', livenessCheck);
      
      toast.success("Onboarding completed successfully");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error("Failed to complete onboarding. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
                control={form.control}
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
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your business activities..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="address"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                <FormField
                  control={form.control}
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
              </div>
              <FormField
                control={form.control}
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
                        <SelectItem value="gb">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Document Upload</h3>
            
            {/* Standard Documents */}
            <div>
              <h4 className="font-medium mb-3">Required Documents</h4>
              <div className="grid gap-3">
                {standardDocuments.map((docType) => (
                  <div key={docType} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{docType}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id={`doc-${docType}`}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleDocumentUpload(docType, file);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById(`doc-${docType}`)?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Documents */}
            {documents.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Uploaded Documents</h4>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                        <Badge variant={
                          doc.status === 'approved' ? 'default' : 
                          doc.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {doc.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {doc.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {doc.status}
                        </Badge>
                      </div>
                      {doc.status !== 'approved' && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDocumentDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Identity Verification</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium">Upload ID Documents</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-2">Front of ID</h5>
                  <input
                    type="file"
                    id="front-id"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLivenessUpload('frontId', file);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('front-id')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {livenessCheck.frontId ? 'Change Front ID' : 'Upload Front ID'}
                  </Button>
                  {livenessCheck.frontId && (
                    <p className="text-xs text-green-600 mt-1">✓ Front ID uploaded</p>
                  )}
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-2">Back of ID</h5>
                  <input
                    type="file"
                    id="back-id"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLivenessUpload('backId', file);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('back-id')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {livenessCheck.backId ? 'Change Back ID' : 'Upload Back ID'}
                  </Button>
                  {livenessCheck.backId && (
                    <p className="text-xs text-green-600 mt-1">✓ Back ID uploaded</p>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h5 className="text-sm font-medium mb-2">Liveness Check Selfie</h5>
                <input
                  type="file"
                  id="selfie"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLivenessUpload('selfie', file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('selfie')?.click()}
                >
                  <User className="h-4 w-4 mr-2" />
                  {livenessCheck.selfie ? 'Change Selfie' : 'Upload Selfie'}
                </Button>
                {livenessCheck.selfie && (
                  <p className="text-xs text-green-600 mt-1">✓ Selfie uploaded</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Take a clear selfie while holding your ID document next to your face
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Merchant Onboarding</CardTitle>
                <p className="text-gray-600">Complete your profile to start processing payments</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Business Info' : 
                     step === 2 ? 'Address' : 
                     step === 3 ? 'Documents' : 'Identity'}
                  </span>
                  {step < 4 && <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />}
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderStepContent()}
                
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Completing...</span>
                        </div>
                      ) : (
                        "Complete Onboarding"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
