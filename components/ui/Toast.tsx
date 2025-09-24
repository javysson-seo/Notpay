import React from 'react';
import type { ToastAppearance } from '../../types';

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const XCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
);


interface ToastProps {
  message: string;
  appearance: ToastAppearance;
}

const appearanceConfig = {
  success: {
    icon: CheckCircleIcon,
    className: 'bg-success',
  },
  error: {
    icon: XCircleIcon,
    className: 'bg-danger',
  },
  info: {
    icon: InfoIcon,
    className: 'bg-primary',
  },
  warning: {
    icon: InfoIcon,
    className: 'bg-warning',
  },
};

const Toast: React.FC<ToastProps> = ({ message, appearance }) => {
  const config = appearanceConfig[appearance];
  const Icon = config.icon;

  return (
    <div
      className={`relative flex items-center p-4 text-white rounded-md shadow-lg ${config.className} animate-toast-in`}
      role="alert"
    >
      <div className={`mr-3`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="flex-1 font-medium text-sm">{message}</p>
    </div>
  );
};

export default Toast;
