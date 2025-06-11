
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Transaction } from '../types';

interface TransactionTableActionsProps {
  transaction: Transaction;
  onViewDetails: (transaction: Transaction) => void;
}

const TransactionTableActions = ({ transaction, onViewDetails }: TransactionTableActionsProps) => {
  return (
    <div className="flex gap-1">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onViewDetails(transaction)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
          <DropdownMenuItem>Request Refund</DropdownMenuItem>
          <DropdownMenuItem>Resend Webhook</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionTableActions;
