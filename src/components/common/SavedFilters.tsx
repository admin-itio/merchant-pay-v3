
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Save, 
  Star, 
  StarOff, 
  Trash2, 
  Filter,
  Search,
  Plus
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
  isFavorite: boolean;
  createdAt: string;
  lastUsed: string;
}

interface SavedFiltersProps {
  currentFilters: Record<string, any>;
  onFilterApply: (filters: Record<string, any>) => void;
  onFilterSave?: (filter: SavedFilter) => void;
}

const SavedFilters = ({ currentFilters, onFilterApply, onFilterSave }: SavedFiltersProps) => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: '1',
      name: 'High Value Transactions',
      filters: { minAmount: 1000, status: 'completed' },
      isFavorite: true,
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20'
    },
    {
      id: '2',
      name: 'Failed Payments',
      filters: { status: 'failed', dateRange: 'last7days' },
      isFavorite: false,
      createdAt: '2024-01-10',
      lastUsed: '2024-01-18'
    },
    {
      id: '3',
      name: 'Credit Card Transactions',
      filters: { paymentMethod: 'credit_card', fraudScore: { max: 30 } },
      isFavorite: true,
      createdAt: '2024-01-05',
      lastUsed: '2024-01-19'
    }
  ]);
  
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveFilter = () => {
    if (!filterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: filterName,
      filters: currentFilters,
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0]
    };

    setSavedFilters(prev => [...prev, newFilter]);
    onFilterSave?.(newFilter);
    setFilterName('');
    setShowSaveDialog(false);
  };

  const handleApplyFilter = (filter: SavedFilter) => {
    const updatedFilters = savedFilters.map(f =>
      f.id === filter.id ? { ...f, lastUsed: new Date().toISOString().split('T')[0] } : f
    );
    setSavedFilters(updatedFilters);
    onFilterApply(filter.filters);
  };

  const toggleFavorite = (filterId: string) => {
    setSavedFilters(prev => prev.map(filter =>
      filter.id === filterId ? { ...filter, isFavorite: !filter.isFavorite } : filter
    ));
  };

  const deleteFilter = (filterId: string) => {
    setSavedFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  const favoriteFilters = savedFilters.filter(f => f.isFavorite);
  const recentFilters = savedFilters
    .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Quick Access Filters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium">Favorite Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {favoriteFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => handleApplyFilter(filter)}
            >
              {filter.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex gap-2">
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Current Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Filter</DialogTitle>
              <DialogDescription>
                Give your filter combination a name for quick access later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Filter name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveFilter} disabled={!filterName.trim()}>
                  Save Filter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Manage Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-white">
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Recent Filters</h4>
                <div className="space-y-2">
                  {recentFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{filter.name}</p>
                        <p className="text-xs text-gray-500">Last used: {filter.lastUsed}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(filter.id)}
                        >
                          {filter.isFavorite ? (
                            <Star className="h-3 w-3 text-yellow-600 fill-current" />
                          ) : (
                            <StarOff className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteFilter(filter.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SavedFilters;
