import React from 'react';
import Button from '../ui/Button';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Notpay</h1>
            <p className="text-gray-600 mt-2">Login do Painel do Cliente</p>
        </div>
        <div className="bg-surface p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Endereço de E-mail
              </label>
              <input 
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
                id="email" 
                type="email" 
                placeholder="voce@suaempresa.com"
                defaultValue="cliente@notpay.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input 
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
                id="password" 
                type="password"
                placeholder="******************"
                defaultValue="password123"
              />
              <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-dark" href="#">
                Esqueceu a senha?
              </a>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          &copy;2023 Notpay Inc. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;