import React from 'react';
import { useToast } from '../../hooks/useToast';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-xs space-y-3">
      {toasts.map((toast) => (
        <Toast 
            key={toast.id} 
            message={toast.message} 
            appearance={toast.appearance} 
        />
      ))}
    </div>
  );
};

export default ToastContainer;
