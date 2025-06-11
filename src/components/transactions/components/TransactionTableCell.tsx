
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '../types';
import { getStatusColor, getFraudScoreColor } from '../utils/transactionUtils';

interface TransactionTableCellProps {
  transaction: Transaction;
  columnKey: string;
}

const TransactionTableCell = ({ transaction, columnKey }: TransactionTableCellProps) => {
  switch (columnKey) {
    case 'id':
      return (
        <div>
          <p className="font-medium text-gray-900">{transaction.id}</p>
          <p className="text-sm text-gray-500">{transaction.merchantRef}</p>
        </div>
      );
    case 'amount':
      return (
        <div>
          <p className="font-medium text-gray-900">
            {transaction.currency} {transaction.amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{transaction.paymentMethod}</p>
        </div>
      );
    case 'customer':
      return (
        <div>
          <p className="font-medium text-gray-900">{transaction.customer}</p>
          <p className="text-sm text-gray-500">{transaction.timestamp}</p>
        </div>
      );
    case 'status':
      return (
        <Badge className={getStatusColor(transaction.status)}>
          {transaction.status}
        </Badge>
      );
    case 'fraudScore':
      return (
        <span className={`font-medium ${getFraudScoreColor(transaction.fraudScore)}`}>
          {transaction.fraudScore}
        </span>
      );
    case 'timestamp':
      return (
        <div>
          <p className="text-sm text-gray-900">{new Date(transaction.timestamp).toLocaleDateString()}</p>
          <p className="text-xs text-gray-500">{new Date(transaction.timestamp).toLocaleTimeString()}</p>
        </div>
      );
    default:
      return <span className="text-gray-900">{transaction[columnKey as keyof Transaction]}</span>;
  }
};

export default TransactionTableCell;
