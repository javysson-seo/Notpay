import React, { useState } from 'react';
import Button from '../ui/Button';
import { MOCK_WEBHOOKS } from '../../constants';
import type { Webhook } from '../../types';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';

const RefreshCwIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M3 21a9 9 0 0 1 .1-3.61"/><path d="M20.9 14.39A9 9 0 0 1 12 21a9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);


const ApiWebhooks: React.FC = () => {
    const [apiKey, setApiKey] = useState('np_live_sk_********************1234');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const regenerateApiKey = () => {
        if (window.confirm('Você tem certeza que deseja gerar uma nova chave de API? Isso invalidará a chave antiga imediatamente.')) {
            const newKey = `np_live_sk_${[...Array(20)].map(() => Math.random().toString(36)[2]).join('')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
            setApiKey(newKey);
            alert('Chave de API gerada novamente com sucesso!');
        }
    }
    
    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        alert('Chave de API copiada para a área de transferência!');
    }

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">API & Webhooks</h1>

        <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold mb-4">Chaves de API</h2>
            <p className="text-gray-600 mb-4">Use esta chave para autenticar suas requisições na API. Mantenha-a em segredo!</p>
            <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-md">
                <input type="text" readOnly value={apiKey} className="flex-grow bg-transparent font-mono text-sm focus:outline-none"/>
                <button onClick={copyApiKey} title="Copiar Chave" className="text-gray-500 hover:text-primary">
                    <CopyIcon className="h-5 w-5"/>
                </button>
                <Button variant="secondary" onClick={regenerateApiKey}>
                    <RefreshCwIcon className="h-5 w-5"/>
                    Gerar Novamente
                </Button>
            </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Webhooks</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <PlusIcon className="h-5 w-5"/>
                    Adicionar Endpoint
                </Button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4">URL do Endpoint</th>
                            <th className="p-4">Evento</th>
                            <th className="p-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_WEBHOOKS.map((wh: Webhook) => (
                            <tr key={wh.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-mono text-sm">{wh.url}</td>
                                <td className="p-4 font-mono text-sm">{wh.event}</td>
                                <td className="p-4 text-center">
                                    <Badge color={wh.isActive ? 'green' : 'gray'}>{wh.isActive ? 'Ativo' : 'Inativo'}</Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Endpoint de Webhook">
        <form className="space-y-4">
            <div>
                <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">URL do Endpoint</label>
                <input type="url" id="webhookUrl" placeholder="https://api.seusite.com/webhook" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
                <label htmlFor="webhookEvent" className="block text-sm font-medium text-gray-700">Evento para notificação</label>
                <select id="webhookEvent" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option>payment.received</option>
                    <option>payment.refunded</option>
                    <option>payout.completed</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); alert('Webhook adicionado!'); }}>Adicionar Webhook</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default ApiWebhooks;