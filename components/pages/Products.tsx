import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useToast } from '../../hooks/useToast';
import type { Product } from '../../types';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const { addToast } = useToast();

    const handleAddProduct = () => {
        if (!newProductName || !newProductPrice) {
            addToast('Nome e preço são obrigatórios.', { appearance: 'error' });
            return;
        }
        const newProduct: Product = {
            id: `PROD-00${products.length + 1}`,
            name: newProductName,
            price: parseFloat(newProductPrice),
            createdAt: new Date().toLocaleDateString('pt-BR'),
        };
        setProducts([...products, newProduct]);
        addToast('Produto adicionado com sucesso!', { appearance: 'success' });
        setIsModalOpen(false);
        setNewProductName('');
        setNewProductPrice('');
    };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Produtos</h1>
            <Button onClick={() => setIsModalOpen(true)}>Adicionar Produto</Button>
        </div>
        
        <div className="bg-surface rounded-lg shadow-md border border-gray-200">
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Produto">
            <div className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input 
                        type="text" 
                        id="productName"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Preço</label>
                    <input 
                        type="number" 
                        id="productPrice"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={handleAddProduct}>Adicionar</Button>
                </div>
            </div>
      </Modal>
    </div>
  );
};

export default Products;
