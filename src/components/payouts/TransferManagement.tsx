import React, { useState } from 'react';
import TransferHeader from './components/TransferHeader';
import FeeNotice from './components/FeeNotice';
import TransferStats from './components/TransferStats';
import TransferFilters from './components/TransferFilters';
import TransferTable from './components/TransferTable';
import TransferTransactionModal from './TransferTransactionModal';

interface Transfer {
  id: string;
  beneficiaryName: string;
  beneficiaryId: string;
  amount: number;
  currency: string;
  type: 'PAYIN' | 'PAYOUT' | 'Invoice';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'Web' | 'API' | 'Upload';
  fee: number;
  createdAt: string;
  completedAt?: string;
  description?: string;
  reference?: string;
  processingTime?: string;
  accountDetails?: {
    accountNumber: string;
    bankName?: string;
    country: string;
  };
}

const TransferManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Generate transfers function
  const generateTransfers = (): Transfer[] => {
    const beneficiaries = [
      { name: 'ABC Corp Ltd', id: 'BEN001' },
      { name: 'Crypto Payments', id: 'BEN002' },
      { name: 'Supplier XYZ', id: 'BEN003' },
      { name: 'Tech Solutions Inc', id: 'BEN004' },
      { name: 'Global Trading Co', id: 'BEN005' }
    ];
    
    const currencies = ['USD', 'EUR', 'GBP', 'USDT', 'BTC'];
    const statuses: Array<'pending' | 'processing' | 'completed' | 'failed'> = ['pending', 'processing', 'completed', 'failed'];
    const types: Array<'PAYIN' | 'PAYOUT' | 'Invoice'> = ['PAYIN', 'PAYOUT', 'Invoice'];
    const methods: Array<'Web' | 'API' | 'Upload'> = ['Web', 'API', 'Upload'];

    const transfers: Transfer[] = [];
    
    for (let i = 1; i <= 50; i++) {
      const beneficiary = beneficiaries[Math.floor(Math.random() * beneficiaries.length)];
      const currency = currencies[Math.floor(Math.random() * currencies.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      
      transfers.push({
        id: `TXN${String(i).padStart(3, '0')}`,
        beneficiaryName: beneficiary.name,
        beneficiaryId: beneficiary.id,
        amount: Math.floor(Math.random() * 50000) + 1000,
        currency,
        type,
        status,
        method,
        fee: Math.floor(Math.random() * 100) + 5,
        createdAt: randomDate.toISOString(),
        completedAt: status === 'completed' ? new Date(randomDate.getTime() + 3600000).toISOString() : undefined,
        description: `${type} payment to ${beneficiary.name}`,
        reference: `REF-${i}-${Date.now()}`,
        processingTime: status === 'completed' ? '1 hour' : undefined,
        accountDetails: {
          accountNumber: `****${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
          bankName: currency === 'USD' ? 'Chase Bank' : currency === 'EUR' ? 'Deutsche Bank' : undefined,
          country: currency === 'USD' ? 'United States' : currency === 'EUR' ? 'Germany' : 'Singapore'
        }
      });
    }
    
    return transfers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const allTransfers = generateTransfers();

  // Filter transfers
  const filteredTransfers = allTransfers.filter(transfer => {
    const matchesSearch = transfer.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.beneficiaryId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalTransfers = filteredTransfers.length;
  const totalPages = Math.ceil(totalTransfers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTransfers = filteredTransfers.slice(startIndex, endIndex);

  const handleViewDetails = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setIsDetailsModalOpen(true);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const downloadSampleFile = () => {
    const csvContent = `Beneficiary Name,Amount,Currency,Type,Reference
ABC Corp Ltd,15000,USD,PAYOUT,Payment for services
Crypto Payments,5000,USDT,PAYOUT,Crypto transfer
Supplier XYZ,8500,EUR,Invoice,Invoice payment`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transfer_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalAmount = paginatedTransfers.reduce((sum, transfer) => sum + transfer.amount, 0);
  const totalFees = paginatedTransfers.reduce((sum, transfer) => sum + transfer.fee, 0);
  const completedTransfers = filteredTransfers.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      <TransferHeader onDownloadSample={downloadSampleFile} />
      <FeeNotice />
      <TransferStats
        totalTransfers={totalTransfers}
        completedTransfers={completedTransfers}
        totalAmount={totalAmount}
        totalFees={totalFees}
      />
      <TransferFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />
      <TransferTable
        transfers={paginatedTransfers}
        totalTransfers={totalTransfers}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
        onViewDetails={handleViewDetails}
      />
      <TransferTransactionModal 
        transfer={selectedTransfer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default TransferManagement;
