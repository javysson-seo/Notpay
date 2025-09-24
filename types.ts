export enum TransactionStatus {
  Paid = 'Pago',
  Pending = 'Pendente',
  Refunded = 'Estornado',
}

export interface Transaction {
  id: string;
  customerName: string;
  date: string;
  grossValue: number;
  fee: number;
  netValue: number;
  status: TransactionStatus;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: string;
}

export enum WithdrawalStatus {
  Completed = 'Concluído',
  Processing = 'Processando',
  Failed = 'Falhou',
}

export interface Withdrawal {
    id: string;
    date: string;
    amount: number;
    status: WithdrawalStatus;
    bankInfo: string;
}

export interface Webhook {
    id: string;
    url: string;
    event: 'payment.received' | 'payment.refunded' | 'payout.completed';
    isActive: boolean;
}