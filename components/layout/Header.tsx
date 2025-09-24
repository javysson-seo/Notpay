
import React from 'react';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);


const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-surface shadow-md p-4 flex justify-end items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
          <UserIcon className="h-6 w-6 text-gray-500"/>
        </div>
        <span className="font-medium mr-4">{userName}</span>
        <button onClick={onLogout} className="text-secondary hover:text-primary transition-colors">
          <LogoutIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
