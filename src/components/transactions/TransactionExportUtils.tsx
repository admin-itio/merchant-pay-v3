
export const exportToCSV = (transactions: any[], filename?: string) => {
  const headers = [
    'Transaction ID',
    'Date/Time',
    'Amount',
    'Currency',
    'Status',
    'Customer',
    'Email',
    'Payment Method',
    'Gateway',
    'Country',
    'Fraud Score',
    'Merchant Reference'
  ];

  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      transaction.id,
      new Date(transaction.timestamp).toISOString(),
      transaction.amount,
      transaction.currency,
      transaction.status,
      `"${transaction.customer}"`,
      transaction.customerEmail,
      `"${transaction.paymentMethod}"`,
      transaction.gateway,
      transaction.country,
      transaction.fraudScore,
      transaction.merchantRef
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `transactions_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (transactions: any[], filename?: string) => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `transactions_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (transactions: any[], filename?: string) => {
  // For a real implementation, you would use a library like jsPDF
  // For now, we'll just export as CSV with a different extension
  console.log('PDF export functionality would be implemented with jsPDF');
  exportToCSV(transactions, filename?.replace('.pdf', '.csv') || `transactions_${new Date().toISOString().split('T')[0]}.csv`);
};
