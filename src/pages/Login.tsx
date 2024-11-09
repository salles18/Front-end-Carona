import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Car } from 'lucide-react';
import axios from 'axios';

import loginImage from '../image/unnamed.png';

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        senha,
      });

      const { token, role } = resposta.data; // Supondo que o backend retorne um campo `role` com o tipo de usuário

      // Armazena o token no localStorage
      localStorage.setItem('token', token);
            
      setTimeout(() => {
        // Redireciona com base no tipo de usuário
        if (role.toLowerCase() === 'motorista') {
          navigate('/homeMotorista');
        } else if (role.toLowerCase() === 'passageiro') {
          navigate('/homePassageiro');
        } else {
          setErro('Tipo de usuário desconhecido');
        }
      }, 2000); // Aguarda 2 segundos antes de redirecionar
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl flex items-center">
        {/* Coluna da imagem */}
        <div className="flex-1 hidden md:block">
          <img 
            src={loginImage} 
            alt="Login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Coluna dos campos de login */}
        <div className="flex-1">
          <div className="flex flex-col items-center mb-8">
            <Car size={48} className="text-[#FF7E39] mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">Bem-vindo!</h1>
            <p className="text-gray-600">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48C9A9] focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48C9A9] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <div className="flex items-center justify-between text-sm">
              <Link 
                to="/recuperar-senha"
                className="text-[#FF7E39] hover:text-[#ff6a1f] transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF7E39] text-white py-2 rounded-lg hover:bg-[#ff6a1f] transition-colors font-medium"
            >
              Entrar
            </button>

            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <Link 
                to="/registro"
                className="text-[#48C9A9] hover:text-[#3ab192] font-medium transition-colors"
              >
                Registre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
