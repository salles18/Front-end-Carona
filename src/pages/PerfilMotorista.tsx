// src/pages/PerfilMotorista.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { NavbarMotorista } from '../components/NavbarMotorista';

interface MotoristaData {
  name: string;
  phone: string;
  email: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}

const PerfilMotorista: React.FC = () => {
  const [motoristaData, setMotoristaData] = useState<MotoristaData>({
    name: '',
    phone: '',
    email: '',
    cidade: '',
    bairro: '',
    logradouro: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchMotoristaProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMotoristaData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar perfil do motorista:', error);
        setIsLoading(false);
      }
    };

    fetchMotoristaProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMotoristaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/user', motoristaData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMotoristaData(response.data);
      setMessage('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage('Erro ao atualizar as informações.');
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF7E39] to-[#48C9A9] ">
      <NavbarMotorista />
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mt-7">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar suas Informações</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome completo"
              name="name"
              value={motoristaData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={motoristaData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefone"
              name="phone"
              mask="(99) 99999-9999"
              value={motoristaData.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Cidade e Estado"
              name="cidade"
              value={motoristaData.cidade}
              onChange={handleChange}
              required
            />
            <Input
              label="Bairro"
              name="bairro"
              value={motoristaData.bairro}
              onChange={handleChange}
              required
            />
            <Input
              label="Rua e Número"
              name="logradouro"
              value={motoristaData.logradouro}
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

export default PerfilMotorista;
