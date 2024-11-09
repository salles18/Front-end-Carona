import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar integração com backend
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Car size={48} className="text-[#FF7E39] mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Senha</h1>
          <p className="text-gray-600 text-center">
            {enviado 
              ? 'Verifique seu email para redefinir sua senha'
              : 'Digite seu email para receber as instruções'}
          </p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit">
              Enviar instruções
            </Button>

            <div className="text-center text-sm text-gray-600">
              Lembrou sua senha?{' '}
              <Link 
                to="/"
                className="text-[#48C9A9] hover:text-[#3ab192] font-medium transition-colors"
              >
                Voltar ao login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <Button 
              variant="secondary"
              onClick={() => window.location.href = '/'}
            >
              Voltar ao login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}