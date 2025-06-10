
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  GripVertical, 
  Eye, 
  EyeOff,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DashboardWidget {
  id: string;
  title: string;
  type: string;
  visible: boolean;
  size: 'small' | 'medium' | 'large';
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

interface DashboardCustomizerProps {
  widgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
}

const DashboardCustomizer = ({ widgets, onWidgetsChange }: DashboardCustomizerProps) => {

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onWidgetsChange(items);
  };

  const toggleWidgetVisibility = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, visible: !widget.visible } : widget
    );
    onWidgetsChange(updatedWidgets);
  };

  const changeWidgetSize = (widgetId: string, size: 'small' | 'medium' | 'large') => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, size } : widget
    );
    onWidgetsChange(updatedWidgets);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard Layout</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Customize Dashboard</DialogTitle>
              <DialogDescription>
                Drag and drop to reorder widgets, toggle visibility, and adjust sizes.
              </DialogDescription>
            </DialogHeader>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="widgets">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {widgets.map((widget, index) => (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`p-4 border rounded-lg bg-white ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="h-4 w-4 text-gray-400" />
                                </div>
                                <widget.icon className="h-4 w-4 text-blue-600" />
                                <span className="font-medium">{widget.title}</span>
                                <Badge variant={widget.visible ? 'default' : 'secondary'}>
                                  {widget.visible ? 'Visible' : 'Hidden'}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <select
                                  value={widget.size}
                                  onChange={(e) => changeWidgetSize(widget.id, e.target.value as any)}
                                  className="text-sm border rounded px-2 py-1"
                                >
                                  <option value="small">Small</option>
                                  <option value="medium">Medium</option>
                                  <option value="large">Large</option>
                                </select>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleWidgetVisibility(widget.id)}
                                >
                                  {widget.visible ? (
                                    <Eye className="h-4 w-4" />
                                  ) : (
                                    <EyeOff className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
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
          </DialogContent>
        </Dialog>
      </div>

      {/* Widget Grid */}
      <div className="grid gap-4">
        {widgets
          .filter(widget => widget.visible)
          .map((widget) => {
            const Component = widget.component;
            const sizeClasses = {
              small: 'col-span-1',
              medium: 'md:col-span-2',
              large: 'md:col-span-2 lg:col-span-3'
            };
            
            return (
              <div key={widget.id} className={sizeClasses[widget.size]}>
                <Component />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DashboardCustomizer;
