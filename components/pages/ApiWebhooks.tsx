import React, { useState } from 'react';
import { MOCK_WEBHOOKS } from '../../constants';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useToast } from '../../hooks/useToast';
import Modal from '../ui/Modal';
import type { Webhook } from '../../types';

const ApiWebhooks: React.FC = () => {
    const [apiKey, setApiKey] = useState('np_live_********************************');
    const [webhooks, setWebhooks] = useState<Webhook[]>(MOCK_WEBHOOKS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newWebhookUrl, setNewWebhookUrl] = useState('');
    const [newEvent, setNewEvent] = useState<'payment.received' | 'payment.refunded' | 'payout.completed'>('payment.received');
    const { addToast } = useToast();

    const handleRegenerateKey = () => {
        const newKey = `np_live_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
        setApiKey(newKey);
        addToast('Nova chave de API gerada!', { appearance: 'success' });
    };
    
    const handleCopyKey = () => {
        navigator.clipboard.writeText(apiKey);
        addToast('Chave de API copiada para a área de transferência!', { appearance: 'info' });
    };

    const handleAddWebhook = () => {
        if (!newWebhookUrl) {
            addToast('URL do webhook é obrigatória.', { appearance: 'error' });
            return;
        }
        const newWebhook: Webhook = {
            id: `WH-00${webhooks.length + 1}`,
            url: newWebhookUrl,
            event: newEvent,
            isActive: true,
        };
        setWebhooks([...webhooks, newWebhook]);
        addToast('Webhook adicionado com sucesso!', { appearance: 'success' });
        setIsModalOpen(false);
        setNewWebhookUrl('');
    };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API & Webhooks</h1>

      <div className="bg-surface rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Chave de API</h2>
        <p className="text-gray-600 mb-4">Use esta chave para autenticar suas solicitações de API.</p>
        <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md">
            <code className="text-sm text-gray-800 flex-grow">{apiKey}</code>
            <Button onClick={handleCopyKey} variant="secondary">Copiar</Button>
            <Button onClick={handleRegenerateKey} variant="danger">Regerar</Button>
        </div>
      </div>
      
      <div className="bg-surface rounded-lg shadow-md border border-gray-200">
        <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-xl font-semibold">Webhooks</h2>
            <Button onClick={() => setIsModalOpen(true)}>Adicionar Webhook</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webhooks.map((webhook) => (
                <tr key={webhook.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{webhook.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{webhook.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge color={webhook.isActive ? 'green' : 'gray'}>{webhook.isActive ? 'Ativo' : 'Inativo'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Webhook">
            <div className="space-y-4">
                <div>
                    <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700">URL do Endpoint</label>
                    <input 
                        type="url" 
                        id="webhookUrl"
                        value={newWebhookUrl}
                        onChange={(e) => setNewWebhookUrl(e.target.value)}
                        placeholder="https://suaempresa.com/webhook"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="webhookEvent" className="block text-sm font-medium text-gray-700">Evento</label>
                    <select
                        id="webhookEvent"
                        value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value as any)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                        <option value="payment.received">Pagamento Recebido</option>
                        <option value="payment.refunded">Pagamento Estornado</option>
                        <option value="payout.completed">Saque Concluído</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddWebhook}>Adicionar</Button>
                </div>
            </div>
      </Modal>

    </div>
  );
};

export default ApiWebhooks;
