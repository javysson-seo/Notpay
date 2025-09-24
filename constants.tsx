import React from 'react';
import type { Page } from './App';
import type { Transaction, Product, Withdrawal, Webhook } from './types';
import { TransactionStatus, WithdrawalStatus } from './types';

// Icons using Lucide React (or any SVG-based icon library)
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
);
const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/><path d="M12 15.6a4.5 4.5 0 0 0 4.5-4.5h-9a4.5 4.5 0 0 0 4.5 4.5Z"/><path d="m2.9 13.1 7.6 7.6c.8.8 2.1.8 2.9 0l7.6-7.6a2 2 0 0 0-1.4-3.4H4.3a2 2 0 0 0-1.4 3.4Z"/></svg>
);
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Painel', icon: <HomeIcon className="h-5 w-5" /> },
  { id: 'transactions', label: 'Transações', icon: <ListIcon className="h-5 w-5" /> },
  { id: 'products', label: 'Produtos', icon: <PackageIcon className="h-5 w-5" /> },
  { id: 'withdrawals', label: 'Saques', icon: <DollarSignIcon className="h-5 w-5" /> },
  { id: 'api-webhooks', label: 'API & Webhooks', icon: <CodeIcon className="h-5 w-5" /> },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TXN1001', customerName: 'João Silva', date: '27/10/2023 10:30', grossValue: 1000.00, fee: 0.05, netValue: 999.95, status: TransactionStatus.Paid },
  { id: 'TXN1002', customerName: 'Maria Oliveira', date: '27/10/2023 11:15', grossValue: 250.50, fee: 0.05, netValue: 250.45, status: TransactionStatus.Paid },
  { id: 'TXN1003', customerName: 'Carlos Pereira', date: '27/10/2023 12:00', grossValue: 75.00, fee: 0.05, netValue: 74.95, status: TransactionStatus.Pending },
  { id: 'TXN1004', customerName: 'Ana Costa', date: '26/10/2023 15:45', grossValue: 1500.00, fee: 0.05, netValue: 1499.95, status: TransactionStatus.Refunded },
  { id: 'TXN1005', customerName: 'Pedro Martins', date: '26/10/2023 09:00', grossValue: 50.00, fee: 0.05, netValue: 49.95, status: TransactionStatus.Paid },
  { id: 'TXN1006', customerName: 'Sofia Ferreira', date: '25/10/2023 18:20', grossValue: 320.75, fee: 0.05, netValue: 320.70, status: TransactionStatus.Paid },
];

export const MOCK_PRODUCTS: Product[] = [
    { id: 'PROD-001', name: 'E-book de Culinária', price: 49.90, createdAt: '01/09/2023' },
    { id: 'PROD-002', name: 'Curso Online de Finanças', price: 299.99, createdAt: '15/09/2023' },
    { id: 'PROD-003', name: 'Assinatura Mensal de Software', price: 99.00, createdAt: '01/10/2023' },
    { id: 'PROD-004', name: 'Consultoria de Marketing Digital', price: 1200.00, createdAt: '10/10/2023' },
];

export const MOCK_WITHDRAWALS: Withdrawal[] = [
    { id: 'WDR-001', date: '25/10/2023', amount: 5000.00, status: WithdrawalStatus.Completed, bankInfo: 'Banco do Brasil - Ag: 1234, C/C: 56789-0' },
    { id: 'WDR-002', date: '15/10/2023', amount: 2500.00, status: WithdrawalStatus.Completed, bankInfo: 'Itaú Unibanco - Ag: 4321, C/C: 98765-1' },
    { id: 'WDR-003', date: '05/10/2023', amount: 10000.00, status: WithdrawalStatus.Completed, bankInfo: 'Banco do Brasil - Ag: 1234, C/C: 56789-0' },
];

export const MOCK_WEBHOOKS: Webhook[] = [
    { id: 'WH-001', url: 'https://api.example.com/v1/hooks/payment-received', event: 'payment.received', isActive: true },
    { id: 'WH-002', url: 'https://api.example.com/v1/hooks/payout-completed', event: 'payout.completed', isActive: true },
    { id: 'WH-003', url: 'https://api.example.com/v1/hooks/payment-refunded', event: 'payment.refunded', isActive: false },
]

export const SALES_CHART_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Fev', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Abr', sales: 4500 },
  { name: 'Mai', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
];