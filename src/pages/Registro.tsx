import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Eye, EyeOff } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validatePassword } from '../utils/validations';
import axios from 'axios';

export default function Registro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<'passageiro' | 'motorista'>('passageiro');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    userPhoto: '',
    cnhPhoto: '',
    role: 'passageiro',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sucesso, setSucesso] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({ ...prev, password: passwordErrors[0] }));
      } else {
        setErrors(prev => {
          const { password, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleTipoUsuarioChange = (tipo: 'passageiro' | 'motorista') => {
    setTipoUsuario(tipo);
    setFormData(prev => ({ ...prev, role: tipo }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Usuário registrado com sucesso:', response.data);
      
      localStorage.setItem('user', JSON.stringify(response.data));

      setSucesso('Usuário registrado com sucesso! Redirecionando para o login...');
    setTimeout(() => {
      // Redirecionar todos os usuários para a página de login
      navigate('/');
    }, 3000); // 3 segundos para mostrar mensagem de sucesso
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Car size={48} className="text-[#FF7E39] mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Criar Conta - Carona Express</h1>
          <p className="text-gray-600">Preencha seus dados para começar</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => handleTipoUsuarioChange('passageiro')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              tipoUsuario === 'passageiro' ? 'bg-[#FF7E39] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Passageiro
          </button>
          <button
            onClick={() => handleTipoUsuarioChange('motorista')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              tipoUsuario === 'motorista' ? 'bg-[#FF7E39] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Motorista
          </button>
        </div>

        {sucesso && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-6 text-center">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <Input
                label="Senha"
                type={mostrarSenha ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Input
              label="Telefone"
              name="phone"
              mask="(99) 99999-9999"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="CEP"
              name="cep"
              mask="99999-999"
              value={formData.cep}
              onChange={handleChange}
              required
            />
            <Input
              label="Cidade e Estado"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
            <Input
              label="Bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              required
            />
            <Input
              label="Rua e Número"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              required
            />
            <Input
              label="URL da Foto do Perfil"
              type="url"
              name="userPhoto"
              value={formData.userPhoto}
              onChange={handleChange}
              required
            />
            {tipoUsuario === 'motorista' && (
              <Input
                label="URL da Foto da CNH"
                type="url"
                name="cnhPhoto"
                value={formData.cnhPhoto}
                onChange={handleChange}
                required
              />
            )}
          </div>

          <Button type="submit">Criar conta</Button>

          <div className="text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link
              to="/"
              className="text-[#48C9A9] hover:text-[#3ab192] font-medium transition-colors"
            >
              Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
