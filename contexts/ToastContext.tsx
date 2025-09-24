import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { ToastMessage, ToastAppearance } from '../types';

interface ToastContextType {
  addToast: (message: string, options?: { appearance: ToastAppearance }) => void;
  toasts: ToastMessage[];
}

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  toasts: [],
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, options: { appearance: ToastAppearance } = { appearance: 'info' }) => {
    const id = Date.now() + Math.random();
    const newToast: ToastMessage = { id, message, ...options };
    setToasts(currentToasts => [...currentToasts, newToast]);
    setTimeout(() => removeToast(id), 5000); // Auto-dismiss after 5 seconds
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
