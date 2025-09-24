
import React from 'react';
import type { Page } from '../../App';
import { NAV_ITEMS } from '../../constants';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="w-64 bg-surface text-on-surface flex flex-col shadow-lg">
      <div className="p-6 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-primary">Notpay</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-primary text-on-primary'
                    : 'hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-center text-gray-500">© 2023 Notpay Inc.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
