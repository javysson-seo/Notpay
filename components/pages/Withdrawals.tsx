import React, { useState } from 'react';
import { MOCK_WITHDRAWALS } from '../../constants';
import { WithdrawalStatus } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ConfirmModal from '../ui/ConfirmModal';
import { useToast } from '../../hooks/useToast';

const getStatusColor = (status: WithdrawalStatus): 'green' | 'yellow' | 'red' | 'gray' => {
  switch (status) {
    case WithdrawalStatus.Completed:
      return 'green';
    case WithdrawalStatus.Processing:
      return 'yellow';
    case WithdrawalStatus.Failed:
      return 'red';
    default:
      return 'gray';
  }
};

const Withdrawals: React.FC = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const { addToast } = useToast();

  const handleOpenRequestModal = () => {
    setWithdrawalAmount('');
    setIsRequestModalOpen(true);
  };

  const handleProceedToConfirm = () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      addToast('Por favor, insira um valor de saque válido.', { appearance: 'error' });
      return;
    }
    setIsRequestModalOpen(false);
    setIsConfirmModalOpen(true);
  };
  
  const handleConfirmWithdrawal = () => {
    addToast('Saque solicitado com sucesso!', { appearance: 'success' });
    setIsConfirmModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Saques</h1>
        <Button onClick={handleOpenRequestModal}>
          Solicitar Saque
        </Button>
      </div>

      <div className="bg-surface rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Informação Bancária</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_WITHDRAWALS.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{withdrawal.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{withdrawal.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {withdrawal.amount.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge color={getStatusColor(withdrawal.status)}>{withdrawal.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{withdrawal.bankInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title="Solicitar Saque">
        <div className="space-y-4">
            <div>
                <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-gray-700">Valor do Saque</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input 
                        type="number" 
                        id="withdrawalAmount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="0,00"
                    />
                </div>
                 <p className="mt-2 text-sm text-gray-500">Saldo disponível: R$ 15.234,56</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" onClick={() => setIsRequestModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleProceedToConfirm}>Continuar</Button>
            </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmWithdrawal}
        title="Confirmar Solicitação de Saque"
        >
        Você tem certeza que deseja solicitar um saque no valor de
        <strong className="font-bold text-gray-800"> R$ {parseFloat(withdrawalAmount || '0').toFixed(2).replace('.', ',')}</strong>?
      </ConfirmModal>

    </div>
  );
};

export default Withdrawals;