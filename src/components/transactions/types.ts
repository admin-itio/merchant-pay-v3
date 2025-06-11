
export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  merchantRef: string;
  timestamp: string;
  fraudScore: number;
  gateway: string;
  country: string;
  category: string;
  ipAddress: string;
  userAgent: string;
  responseCode: string;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  columns?: { key: string; label: string; visible: boolean; order: number; }[];
}

export interface TableColumn {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}
