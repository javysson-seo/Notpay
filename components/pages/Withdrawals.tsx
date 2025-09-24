import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { MOCK_WITHDRAWALS } from '../../constants';
import type { Withdrawal } from '../../types';
import { WithdrawalStatus } from '../../types';
import Badge from '../ui/Badge';

const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a1 1 0 0 0 1-1Z"/><path d="M12 12h.01"/></svg>
);

const statusColorMap: Record<WithdrawalStatus, 'green' | 'yellow' | 'red' | 'gray'> = {
  [WithdrawalStatus.Completed]: 'green',
  [WithdrawalStatus.Processing]: 'yellow',
  [WithdrawalStatus.Failed]: 'red',
};

const TwoFactorAuthModal: React.FC<{onClose: () => void; onConfirm: () => void}> = ({onClose, onConfirm}) => (
    <Modal isOpen={true} onClose={onClose} title="Autenticação de Dois Fatores">
        <div className="text-center">
            <p className="mb-4">Insira o código de 6 dígitos do seu aplicativo autenticador.</p>
            <input 
                type="text" 
                maxLength={6}
                className="w-48 p-2 text-2xl tracking-[0.5em] text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="------"
            />
            <div className="flex justify-center gap-3 mt-6">
                <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button type="button" onClick={onConfirm}>Confirmar Saque</Button>
            </div>
        </div>
    </Modal>
);

const Withdrawals: React.FC = () => {
    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

    const handleWithdrawalRequest = () => {
        // In a real app, first validate the amount
        setIs2FAModalOpen(true);
    };

    const handle2FAConfirm = () => {
        setIs2FAModalOpen(false);
        alert('Solicitação de saque enviada com sucesso!');
    };

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Saques</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
                <Card title="Solicitar Saque" value="" icon={<WalletIcon className="h-6 w-6"/>}>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Saldo Disponível</p>
                            <p className="text-2xl font-bold">R$ 15.230,89</p>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor para sacar</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">R$</span>
                                </div>
                                <input type="number" name="amount" id="amount" className="block w-full rounded-md border-gray-300 pl-8 pr-2 py-2 focus:border-primary focus:ring-primary sm:text-sm" placeholder="0,00"/>
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleWithdrawalRequest}>Solicitar Saque</Button>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200 h-full">
                    <h2 className="text-xl font-bold mb-4">Histórico de Saques</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                <th className="p-4">ID</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Dados Bancários</th>
                                <th className="p-4 text-right">Valor</th>
                                <th className="p-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_WITHDRAWALS.map((w: Withdrawal) => (
                                    <tr key={w.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm">{w.id}</td>
                                        <td className="p-4 text-gray-600">{w.date}</td>
                                        <td className="p-4">{w.bankInfo}</td>
                                        <td className="p-4 text-right font-semibold">R$ {w.amount.toFixed(2).replace('.', ',')}</td>
                                        <td className="p-4 text-center">
                                            <Badge color={statusColorMap[w.status]}>{w.status}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {is2FAModalOpen && <TwoFactorAuthModal onClose={() => setIs2FAModalOpen(false)} onConfirm={handle2FAConfirm} />}
    </div>
  );
};

export default Withdrawals;