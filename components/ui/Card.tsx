
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  footer?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, footer, children, className }) => {
  return (
    <div className={`bg-surface p-6 rounded-lg shadow-md border border-gray-200 flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-secondary">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      {children ? (
        children
      ) : (
        <>
            <p className="text-3xl font-bold text-on-surface">{value}</p>
            {footer && <p className="text-sm text-gray-500 mt-2">{footer}</p>}
        </>
      )}
    </div>
  );
};

export default Card;
