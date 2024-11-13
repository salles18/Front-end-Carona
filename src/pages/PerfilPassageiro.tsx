// src/pages/PerfilPassageiro.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';

interface UserData {
  name: string;
  phone: string;
  email: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
}

const PerfilPassageiro: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }) // Confirme que a rota está correta
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/user', userData);
      setUserData(response.data);
      setMessage('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage('Erro ao atualizar as informações.');
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] ">
      <Navbar />
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Perfil</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome completo"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefone"
              name="phone"
              mask="(99) 99999-9999"
              value={userData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="CEP"
              name="cep"
              mask="99999-999"
              value={userData.cep}
              onChange={handleChange}
              required
            />
            <Input
              label="Cidade"
              name="cidade"
              value={userData.cidade}
              onChange={handleChange}
              required
            />
            <Input
              label="Bairro"
              name="bairro"
              value={userData.bairro}
              onChange={handleChange}
              required
            />
            <Input
              label="Logradouro"
              name="logradouro"
              value={userData.logradouro}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Salvar Informações</Button>
        </form>
      </div>
    </div>
  );
};

export default PerfilPassageiro;
