import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import type { Product } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>
);


const Products: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Button onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="h-5 w-5"/>
            Novo Produto
        </Button>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Nome</th>
                <th className="p-4 text-right">Preço</th>
                <th className="p-4">Criado em</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((product: Product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{product.id}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-right font-semibold">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                  <td className="p-4 text-gray-600">{product.createdAt}</td>
                  <td className="p-4 text-center">
                    <Button variant="secondary" className="py-1 px-3 text-sm" onClick={() => alert(`Gerando link para ${product.name}`)}>
                      <LinkIcon className="h-4 w-4"/>
                      Gerar Link
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Novo Produto">
        <form className="space-y-4">
            <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input type="text" id="productName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Preço (BRL)</label>
                <input type="number" id="productPrice" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button type="submit" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); alert('Produto criado!'); }}>Criar Produto</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;