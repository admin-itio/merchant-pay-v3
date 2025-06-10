
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Settings,
  Eye,
  Edit,
  Trash2,
  Terminal,
  Globe,
  Shield,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import TerNoForm from './TerNoForm';
import { useToast } from '@/hooks/use-toast';

const TerNoManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [selectedTerNo, setSelectedTerNo] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTerNo, setEditingTerNo] = useState(null);
  const [customBusinessType, setCustomBusinessType] = useState('');
  const [showCustomBusinessType, setShowCustomBusinessType] = useState(false);

  const { toast } = useToast();

  // Business classifications with search capability
  const businessClassifications = [
    'E-commerce/Online Retail',
    'Restaurants & Food Services', 
    'Professional Services',
    'Healthcare & Medical',
    'Education & Training',
    'Travel & Tourism',
    'Entertainment & Events',
    'Software & Technology',
    'Financial Services',
    'Real Estate',
    'Automotive',
    'Beauty & Wellness',
    'Sports & Fitness',
    'Non-profit Organizations',
    'Manufacturing',
    'Construction',
    'Agriculture',
    'Energy & Utilities',
    'Media & Publishing',
    'Fashion & Apparel',
    'Others'
  ];

  // MCC Codes with search capability
  const mccCodes = [
    { code: '5411', description: 'Grocery Stores, Supermarkets' },
    { code: '5812', description: 'Eating Places, Restaurants' },
    { code: '5999', description: 'Miscellaneous and Specialty Retail Stores' },
    { code: '7372', description: 'Computer Programming, Data Processing' },
    { code: '8299', description: 'Schools and Educational Services' },
    { code: '4829', description: 'Money Transfer' },
    { code: '6012', description: 'Financial Institutions' },
    { code: '5734', description: 'Computer Software Stores' },
    { code: '5945', description: 'Hobby, Toy, and Game Shops' },
    { code: '7273', description: 'Dating Services' }
  ];

  // Generate dummy TerNos
  const generateDummyTerNos = () => {
    const ternos = [];
    for (let i = 1; i <= 15; i++) {
      ternos.push({
        id: `TER${String(i).padStart(3, '0')}`,
        ternoNumber: `TER${String(i).padStart(3, '0')}`,
        name: `Terminal ${i}`,
        description: `Payment terminal for business unit ${i}`,
        businessClassification: businessClassifications[Math.floor(Math.random() * businessClassifications.length)],
        mccCode: mccCodes[Math.floor(Math.random() * mccCodes.length)],
        primaryUrl: `https://business${i}.example.com`,
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
        environment: 'sandbox',
        businessType: businessClassifications[Math.floor(Math.random() * businessClassifications.length)],
        country: 'US',
        currency: 'USD',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        transactionCount: Math.floor(Math.random() * 1000) + 100,
        monthlyVolume: Math.floor(Math.random() * 100000) + 10000,
        apiKey: `ak_${Math.random().toString(36).substr(2, 20)}`
      });
    }
    return ternos;
  };

  const [ternos, setTernos] = useState(generateDummyTerNos());

  const filteredTerNos = ternos.filter(terno => 
    terno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terno.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terno.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBusinessClassificationChange = (value: string) => {
    if (value === 'Others') {
      setShowCustomBusinessType(true);
    } else {
      setShowCustomBusinessType(false);
    }
  };

  const handleTerNoDetails = (terno: any) => {
    setSelectedTerNo(terno);
    setActiveTab('details');
  };

  const handleEditTerNo = (terno: any) => {
    setEditingTerNo(terno);
    setIsEditModalOpen(true);
  };

  const handleCreateTerNo = () => {
    setEditingTerNo(null);
    setIsCreateModalOpen(true);
  };

  const handleSaveTerNo = () => {
    toast({
      title: editingTerNo ? "TerNo Updated" : "TerNo Created",
      description: editingTerNo ? "TerNo has been updated successfully." : "New TerNo has been created successfully.",
    });
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEditingTerNo(null);
  };

  const handleCancelTerNoForm = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEditingTerNo(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">TerNo Management</h1>
          <p className="text-gray-600">Manage your payment terminals and configurations</p>
        </div>
        <Button onClick={handleCreateTerNo}>
          <Plus className="h-4 w-4 mr-2" />
          Create TerNo
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">TerNo List</TabsTrigger>
          <TabsTrigger value="create">Create TerNo</TabsTrigger>
          <TabsTrigger value="details">TerNo Details</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by TerNo ID, name, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTerNos.map((terno) => (
                  <div key={terno.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Terminal className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">{terno.name}</h3>
                          <Badge className={getStatusColor(terno.status)}>
                            {terno.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{terno.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">TerNo ID:</span> {terno.id}
                          </div>
                          <div>
                            <span className="font-medium">Business:</span> {terno.businessClassification}
                          </div>
                          <div>
                            <span className="font-medium">MCC:</span> {terno.mccCode.code}
                          </div>
                          <div>
                            <span className="font-medium">Monthly Volume:</span> ${terno.monthlyVolume.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTerNoDetails(terno)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTerNo(terno)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New TerNo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ternoName">TerNo Name *</Label>
                  <Input id="ternoName" placeholder="Enter terminal name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryUrl">Primary URL *</Label>
                  <Input id="primaryUrl" placeholder="https://yourdomain.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the purpose of this terminal" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessClassification">Business Classification *</Label>
                  <Select onValueChange={handleBusinessClassificationChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <Input placeholder="Search business type..." className="mb-2" />
                      </div>
                      {businessClassifications.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mccCode">Merchant Category Code (MCC) *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MCC code" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <Input placeholder="Search MCC code..." className="mb-2" />
                      </div>
                      {mccCodes.map((mcc) => (
                        <SelectItem key={mcc.code} value={mcc.code}>
                          {mcc.code} - {mcc.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {showCustomBusinessType && (
                <div className="space-y-2">
                  <Label htmlFor="customBusinessType">Custom Business Category</Label>
                  <Input 
                    id="customBusinessType"
                    placeholder="Enter your business category"
                    value={customBusinessType}
                    onChange={(e) => setCustomBusinessType(e.target.value)}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveTerNo}>Create TerNo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          {selectedTerNo ? (
            <Card>
              <CardHeader>
                <CardTitle>TerNo Details - {selectedTerNo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Basic Information</h3>
                    <div className="space-y-2">
                      <div><strong>TerNo ID:</strong> {selectedTerNo.id}</div>
                      <div><strong>Name:</strong> {selectedTerNo.name}</div>
                      <div><strong>Description:</strong> {selectedTerNo.description}</div>
                      <div><strong>Status:</strong> 
                        <Badge className={`ml-2 ${getStatusColor(selectedTerNo.status)}`}>
                          {selectedTerNo.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Business Information</h3>
                    <div className="space-y-2">
                      <div><strong>Business Classification:</strong> {selectedTerNo.businessClassification}</div>
                      <div><strong>MCC Code:</strong> {selectedTerNo.mccCode.code} - {selectedTerNo.mccCode.description}</div>
                      <div><strong>Primary URL:</strong> {selectedTerNo.primaryUrl}</div>
                      <div><strong>Created:</strong> {selectedTerNo.createdAt}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{selectedTerNo.transactionCount}</div>
                        <div className="text-sm text-gray-600">Total Transactions</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">${selectedTerNo.monthlyVolume.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Monthly Volume</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">98.5%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Terminal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No TerNo Selected</h3>
                  <p className="text-gray-600">Select a TerNo from the list to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Create TerNo Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New TerNo</DialogTitle>
          </DialogHeader>
          <TerNoForm 
            terno={null}
            onSave={handleSaveTerNo}
            onCancel={handleCancelTerNoForm}
          />
        </DialogContent>
      </Dialog>

      {/* Edit TerNo Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit TerNo</DialogTitle>
          </DialogHeader>
          <TerNoForm 
            terno={editingTerNo}
            onSave={handleSaveTerNo}
            onCancel={handleCancelTerNoForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TerNoManagement;
