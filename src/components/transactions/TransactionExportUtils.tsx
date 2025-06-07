
import { toast } from 'sonner';

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

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions') => {
  const headers = [
    'Transaction ID',
    'Amount',
    'Currency',
    'Status',
    'Payment Method',
    'Customer',
    'Customer Email',
    'Customer Phone',
    'Merchant Ref',
    'Timestamp',
    'Fraud Score',
    'Gateway',
    'Country',
    'Category',
    'IP Address',
    'Response Code'
  ];

  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      transaction.id,
      transaction.amount,
      transaction.currency,
      transaction.status,
      `"${transaction.paymentMethod}"`,
      `"${transaction.customer}"`,
      transaction.customerEmail,
      transaction.customerPhone,
      transaction.merchantRef,
      transaction.timestamp,
      transaction.fraudScore,
      transaction.gateway,
      transaction.country,
      transaction.category,
      transaction.ipAddress,
      transaction.responseCode
    ].join(','))
  ].join('\n');

  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  toast.success(`Exported ${transactions.length} transactions to CSV`);
};

export const exportToJSON = (transactions: Transaction[], filename: string = 'transactions') => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  downloadFile(jsonContent, `${filename}.json`, 'application/json');
  toast.success(`Exported ${transactions.length} transactions to JSON`);
};

export const exportToPDF = async (transactions: Transaction[], filename: string = 'transactions') => {
  // For now, we'll create a simple text-based report
  // In a real app, you'd use a PDF library like jsPDF
  const reportContent = generateTextReport(transactions);
  downloadFile(reportContent, `${filename}.txt`, 'text/plain');
  toast.success(`Exported ${transactions.length} transactions to text report`);
};

const generateTextReport = (transactions: Transaction[]): string => {
  const summary = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'completed').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    failed: transactions.filter(t => t.status === 'failed').length,
    totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0)
  };

  let report = 'TRANSACTION REPORT\n';
  report += '===================\n\n';
  report += `Report Generated: ${new Date().toLocaleString()}\n\n`;
  report += 'SUMMARY\n';
  report += '-------\n';
  report += `Total Transactions: ${summary.total}\n`;
  report += `Completed: ${summary.completed}\n`;
  report += `Pending: ${summary.pending}\n`;
  report += `Failed: ${summary.failed}\n`;
  report += `Total Amount: $${summary.totalAmount.toFixed(2)}\n\n`;
  report += 'TRANSACTION DETAILS\n';
  report += '-------------------\n\n';

  transactions.forEach(transaction => {
    report += `ID: ${transaction.id}\n`;
    report += `Amount: ${transaction.currency} ${transaction.amount.toFixed(2)}\n`;
    report += `Status: ${transaction.status.toUpperCase()}\n`;
    report += `Customer: ${transaction.customer}\n`;
    report += `Payment Method: ${transaction.paymentMethod}\n`;
    report += `Gateway: ${transaction.gateway}\n`;
    report += `Timestamp: ${transaction.timestamp}\n`;
    report += `Fraud Score: ${transaction.fraudScore}\n`;
    report += '---\n\n';
  });

  return report;
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
