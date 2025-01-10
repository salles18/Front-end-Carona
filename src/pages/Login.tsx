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
  const [sucesso, setSucesso] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resposta = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        senha,
      });

      const { token, role, userId } = resposta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      setSucesso('Login Realizado com Sucesso!');

      setTimeout(() => {
        if (role.toLowerCase() === 'motorista') {
          navigate('/homeMotorista');
        } else if (role.toLowerCase() === 'passageiro') {
          navigate('/homePassageiro');
        } else {
          setErro('Tipo de usuário desconhecido');
        }
        setSucesso('');
      }, 2000);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro('E-mail ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl flex items-center">
        <div className="flex-1 hidden md:block">
          <img 
            src={loginImage} 
            alt="Login"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col items-center mb-8">
            <Car size={48} className="text-[#FF7E39] mb-2" />
            <h1 className="text-2xl font-bold text-gray-800">Bem-vindo(a)!</h1>
            <p className="text-gray-600">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail:
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
                Senha:
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
            {sucesso && <p className="text-green-500 text-sm">{sucesso}</p>}

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
              <div className="mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(true)} 
                  className="text-[#48C9A9] hover:text-[#3ab192] font-medium transition-colors"
                >
                  Termos e Condições
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Termos e Condições</h2>
            <p className="text-gray-600 mb-4">
              Ao utilizar o Carona Express, você concorda com as seguintes condições:
              <br />
              1. Aceitação dos Termos
Ao utilizar o Carona Express, você concorda com os termos e condições descritos abaixo. Se você não concorda com qualquer parte destes termos, por favor, não utilize nosso serviço.
              <br />
              2. Objetivo do Serviço
Carona Express é uma plataforma que conecta motoristas e passageiros interessados em compartilhar viagens. Nós não fornecemos serviços de transporte diretamente e não somos responsáveis pela conduta dos usuários.
              <br />
              3. Cadastro e Segurança
Todos os usuários devem fornecer informações verdadeiras ao se cadastrar.
É proibido compartilhar sua conta com terceiros.
Você é responsável por manter a segurança de suas informações de login.
            <br />
            4. Regras de Convivência

Respeite outros usuários durante a comunicação e durante as viagens.
É proibido discriminação, linguagem ofensiva ou comportamento inadequado.
Motoristas devem garantir que o veículo está em boas condições de segurança.
            <br />
            Qualquer dúvida entre em contato com o número: (41) 98497-0824
            
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#FF7E39] text-white py-2 px-4 rounded-lg hover:bg-[#ff6a1f] transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
