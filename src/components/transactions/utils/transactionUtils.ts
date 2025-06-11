
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'failed': return 'bg-red-100 text-red-800';
    case 'refunded': return 'bg-blue-100 text-blue-800';
    case 'chargeback': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getFraudScoreColor = (score: number) => {
  if (score < 30) return 'text-green-600';
  if (score < 70) return 'text-yellow-600';
  return 'text-red-600';
};

export const getDefaultColumns = () => [
  { key: 'id', label: 'Transaction ID', visible: true, order: 0 },
  { key: 'amount', label: 'Amount', visible: true, order: 1 },
  { key: 'customer', label: 'Customer', visible: true, order: 2 },
  { key: 'status', label: 'Status', visible: true, order: 3 },
  { key: 'paymentMethod', label: 'Payment Method', visible: true, order: 4 },
  { key: 'timestamp', label: 'Date & Time', visible: true, order: 5 },
  { key: 'fraudScore', label: 'Fraud Score', visible: true, order: 6 },
  { key: 'gateway', label: 'Gateway', visible: true, order: 7 },
  { key: 'country', label: 'Country', visible: true, order: 8 },
  { key: 'currency', label: 'Currency', visible: false, order: 9 },
  { key: 'merchantRef', label: 'Merchant Ref', visible: false, order: 10 },
  { key: 'customerEmail', label: 'Customer Email', visible: false, order: 11 },
  { key: 'customerPhone', label: 'Customer Phone', visible: false, order: 12 },
  { key: 'ipAddress', label: 'IP Address', visible: false, order: 13 },
  { key: 'userAgent', label: 'User Agent', visible: false, order: 14 },
  { key: 'responseCode', label: 'Response Code', visible: false, order: 15 }
];
