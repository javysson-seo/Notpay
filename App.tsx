import React, { useState, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import Transactions from './components/pages/Transactions';
import Products from './components/pages/Products';
import Withdrawals from './components/pages/Withdrawals';
import ApiWebhooks from './components/pages/ApiWebhooks';
import Login from './components/pages/Login';

export type Page = 'dashboard' | 'transactions' | 'products' | 'withdrawals' | 'api-webhooks';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'products':
        return <Products />;
      case 'withdrawals':
        return <Withdrawals />;
      case 'api-webhooks':
        return <ApiWebhooks />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-on-surface">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Nome do Cliente" onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;