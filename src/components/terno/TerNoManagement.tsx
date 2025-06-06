
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2, Copy, Download, Upload } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TerNoForm from './TerNoForm';
import TerNoDetails from './TerNoDetails';

interface TerNoData {
  id: string;
  terNo: string;
  businessName: string;
  businessUrl: string;
  publicKey: string;
  privateKey: string;
  status: 'active' | 'inactive' | 'pending';
  gateway: string;
  orchestrationRules: number;
  createdAt: string;
}

const TerNoManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTerNo, setSelectedTerNo] = useState<TerNoData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - in real app this would come from API
  const [terNos, setTerNos] = useState<TerNoData[]>([
    {
      id: '1',
      terNo: '951',
      businessName: 'Yalla999',
      businessUrl: 'https://yalla999.com/',
      publicKey: 'MTE3MjhfOTUxXzIwMjUwNTA3Tg',
      privateKey: '***HIDDEN***',
      status: 'active',
      gateway: 'Razorpay',
      orchestrationRules: 3,
      createdAt: '2024-01-15'
    }
  ]);

  const handleViewDetails = (terno: TerNoData) => {
    setSelectedTerNo(terno);
    setShowDetails(true);
  };

  const handleEdit = (terno: TerNoData) => {
    setSelectedTerNo(terno);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setTerNos(terNos.filter(t => t.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In real app, show toast notification
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (showForm) {
    return (
      <TerNoForm
        terno={selectedTerNo}
        onClose={() => {
          setShowForm(false);
          setSelectedTerNo(null);
        }}
        onSave={(data) => {
          if (selectedTerNo) {
            setTerNos(terNos.map(t => t.id === selectedTerNo.id ? { ...t, ...data } : t));
          } else {
            const newTerNo = {
              id: Date.now().toString(),
              terNo: Math.floor(100 + Math.random() * 900).toString(),
              ...data,
              publicKey: `MTE3MjhfOTUxXzIwMjUwNTA3Tg${Math.random().toString(36).substr(2, 9)}`,
              privateKey: '***HIDDEN***',
              createdAt: new Date().toISOString().split('T')[0]
            };
            setTerNos([...terNos, newTerNo]);
          }
          setShowForm(false);
          setSelectedTerNo(null);
        }}
      />
    );
  }

  if (showDetails && selectedTerNo) {
    return (
      <TerNoDetails
        terno={selectedTerNo}
        onClose={() => {
          setShowDetails(false);
          setSelectedTerNo(null);
        }}
        onEdit={() => {
          setShowDetails(false);
          setShowForm(true);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            TerNo Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage terminal numbers, keys, and gateway configurations
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New TerNo
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {terNos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total TerNos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {terNos.filter(t => t.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {terNos.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {terNos.filter(t => t.status === 'inactive').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Inactive</div>
          </CardContent>
        </Card>
      </div>

      {/* TerNo Table */}
      <Card>
        <CardHeader>
          <CardTitle>TerNo List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Business URL</TableHead>
                <TableHead>TerNo</TableHead>
                <TableHead>Public Key</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Rules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terNos.map((terno, index) => (
                <TableRow key={terno.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{terno.businessName}</TableCell>
                  <TableCell>
                    <a href={terno.businessUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline dark:text-blue-400">
                      {terno.businessUrl}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300">
                      {terno.terNo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {terno.publicKey.substring(0, 20)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(terno.publicKey)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{terno.gateway}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{terno.orchestrationRules}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(terno.status)}`} />
                      <span className="capitalize">{terno.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(terno)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(terno)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(terno.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerNoManagement;
