import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../../constants';
import { TransactionStatus } from '../../types';
import Badge from '../ui/Badge';

const getStatusColor = (status: TransactionStatus): 'green' | 'yellow' | 'red' | 'gray' => {
  switch (status) {
    case TransactionStatus.Paid:
      return 'green';
    case TransactionStatus.Pending:
      return 'yellow';
    case TransactionStatus.Refunded:
      return 'red';
    default:
      return 'gray';
  }
};

const Transactions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = MOCK_TRANSACTIONS.filter(
        (transaction) =>
        transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transações</h1>
      <div className="bg-surface rounded-lg shadow-md border border-gray-200">
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar por cliente ou ID..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Bruto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Líquido</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {transaction.grossValue.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {transaction.fee.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {transaction.netValue.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge color={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
