import React from 'react';
import Card from '../ui/Card';
import SalesChart from '../charts/SalesChart';
import { MOCK_TRANSACTIONS } from '../../constants';
import { TransactionStatus } from '../../types';
import Badge from '../ui/Badge';

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-6-6"/><path d="M13 13a2 2 0 0 0 2-2"/></svg>
);
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a1 1 0 0 0 1-1Z"/><path d="M12 12h.01"/></svg>
);


const Dashboard: React.FC = () => {
    const recentTransactions = MOCK_TRANSACTIONS.slice(0, 4);
    const totalSales = MOCK_TRANSACTIONS.filter(t => t.status === TransactionStatus.Paid).reduce((sum, t) => sum + t.grossValue, 0);
    const netIncome = MOCK_TRANSACTIONS.filter(t => t.status === TransactionStatus.Paid).reduce((sum, t) => sum + t.netValue, 0);
    const feesCollected = totalSales - netIncome;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Volume de Vendas" value={`R$ ${totalSales.toFixed(2).replace('.', ',')}`} icon={<TrendingUpIcon className="h-8 w-8"/>} footer="+5,2% desde o mês passado" />
        <Card title="Receita Líquida" value={`R$ ${netIncome.toFixed(2).replace('.', ',')}`} icon={<DollarSignIcon className="h-8 w-8"/>} footer={`R$ ${feesCollected.toFixed(2).replace('.', ',')} em taxas`} />
        <Card title="Transações Aprovadas" value={MOCK_TRANSACTIONS.filter(t => t.status === TransactionStatus.Paid).length.toString()} icon={<ChartBarIcon className="h-8 w-8"/>} footer={`${MOCK_TRANSACTIONS.length} no total`} />
        <Card title="Saldo Disponível" value="R$ 15.230,89" icon={<WalletIcon className="h-8 w-8"/>} footer="Pronto para saque" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card title="Análise de Tendência de Vendas" value="" icon={<ChartBarIcon className="h-6 w-6"/>}>
                <SalesChart />
            </Card>
        </div>
        <div>
            <Card title="Transações Recentes" value="" icon={<WalletIcon className="h-6 w-6"/>} >
                <div className="space-y-4">
                    {recentTransactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{tx.customerName}</p>
                                <p className="text-sm text-gray-500">{tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">R$ {tx.grossValue.toFixed(2).replace('.', ',')}</p>
                                {tx.status === TransactionStatus.Paid && <Badge color="green">{TransactionStatus.Paid}</Badge>}
                                {tx.status === TransactionStatus.Pending && <Badge color="yellow">{TransactionStatus.Pending}</Badge>}
                                {tx.status === TransactionStatus.Refunded && <Badge color="red">{TransactionStatus.Refunded}</Badge>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;