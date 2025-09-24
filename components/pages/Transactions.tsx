import React from 'react';
import { MOCK_TRANSACTIONS } from '../../constants';
import type { Transaction } from '../../types';
import { TransactionStatus } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const statusColorMap: Record<TransactionStatus, 'green' | 'yellow' | 'red'> = {
  [TransactionStatus.Paid]: 'green',
  [TransactionStatus.Pending]: 'yellow',
  [TransactionStatus.Refunded]: 'red',
};

const Transactions: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transações</h1>
        <Button>Exportar CSV</Button>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Data</th>
                <th className="p-4 text-right">Valor Bruto</th>
                <th className="p-4 text-right">Taxa</th>
                <th className="p-4 text-right">Valor Líquido</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx: Transaction) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{tx.id}</td>
                  <td className="p-4">{tx.customerName}</td>
                  <td className="p-4 text-gray-600">{tx.date}</td>
                  <td className="p-4 text-right font-medium">R$ {tx.grossValue.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-right text-red-600">R$ {tx.fee.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-right font-semibold text-green-600">R$ {tx.netValue.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-center">
                    <Badge color={statusColorMap[tx.status]}>{tx.status}</Badge>
                  </td>
                  <td className="p-4 text-center">
                    {tx.status === TransactionStatus.Paid && (
                      <Button variant="secondary" className="py-1 px-3 text-sm" onClick={() => alert(`Estornando transação ${tx.id}`)}>
                        Estornar
                      </Button>
                    )}
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