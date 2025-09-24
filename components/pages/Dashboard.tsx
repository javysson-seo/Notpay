import React from 'react';
import Card from '../ui/Card';
import SalesChart from '../charts/SalesChart';
import { MOCK_TRANSACTIONS } from '../../constants';
import { TransactionStatus } from '../../types';

const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);


const Dashboard: React.FC = () => {
  const totalSales = MOCK_TRANSACTIONS
    .filter(t => t.status === TransactionStatus.Paid)
    .reduce((sum, t) => sum + t.netValue, 0);

  const totalTransactions = MOCK_TRANSACTIONS.length;

  const uniqueCustomers = new Set(MOCK_TRANSACTIONS.map(t => t.customerName)).size;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="Vendas Totais"
          value={`R$ ${totalSales.toFixed(2).replace('.', ',')}`}
          icon={<DollarSignIcon className="h-8 w-8" />}
          footer="Últimos 30 dias"
        />
        <Card
          title="Clientes Únicos"
          value={uniqueCustomers.toString()}
          icon={<UsersIcon className="h-8 w-8" />}
          footer="Desde o início"
        />
        <Card
          title="Total de Transações"
          value={totalTransactions.toString()}
          icon={<CreditCardIcon className="h-8 w-8" />}
          footer="Últimos 30 dias"
        />
      </div>
      <Card title="Vendas ao Longo do Tempo" value="" icon={null} className="col-span-1 lg:col-span-2">
          <SalesChart />
      </Card>
    </div>
  );
};

export default Dashboard;
