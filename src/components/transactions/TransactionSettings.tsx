
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Settings, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Column {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

interface TransactionSettingsProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
}

const TransactionSettings = ({ columns, onColumnsChange }: TransactionSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localColumns, setLocalColumns] = useState(columns);

  const handleVisibilityChange = (columnKey: string, visible: boolean) => {
    const updated = localColumns.map(col => 
      col.key === columnKey ? { ...col, visible } : col
    );
    setLocalColumns(updated);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(localColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reordered = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setLocalColumns(reordered);
  };

  const applySettings = () => {
    onColumnsChange(localColumns);
    setIsOpen(false);
  };

  const resetToDefault = () => {
    const defaultColumns = columns.map((col, index) => ({
      ...col,
      visible: index < 9, // Show first 9 columns by default
      order: index
    }));
    setLocalColumns(defaultColumns);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Table Settings</h3>
            <Button variant="ghost" size="sm" onClick={resetToDefault}>
              Reset
            </Button>
          </div>
          
          <Separator />

          <div className="space-y-2">
            <Label>Column Visibility & Order</Label>
            <p className="text-xs text-muted-foreground">
              Toggle visibility and drag to reorder columns
            </p>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {localColumns
                    .sort((a, b) => a.order - b.order)
                    .map((column, index) => (
                      <Draggable key={column.key} draggableId={column.key} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center justify-between p-2 border rounded ${
                              snapshot.isDragging ? 'bg-muted' : 'bg-background'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              </div>
                              <span className="text-sm">{column.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {column.visible ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={column.visible}
                                onCheckedChange={(checked) => handleVisibilityChange(column.key, checked)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={applySettings}>
              Apply Settings
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TransactionSettings;
