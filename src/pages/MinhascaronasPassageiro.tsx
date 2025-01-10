import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';

interface Carona {
  id: string;
  cidadeInicial: string;
  cidadeDestino: string;
  data: string;
  horarioPartida: string;
  valor: string;
  motorista?: {
    name: string;
    phone: string;
  };
}

const formatDate = (dateString: string) => {
  // Remove tudo após o 'T', caso esteja presente
  const cleanDate = dateString.split('T')[0];
  const [year, month, day] = cleanDate.split('-');
  return `${day}/${month}/${year}`; // Retorna no formato DD/MM/YYYY
};

const userId = localStorage.getItem('userId');
if (!userId) {
  console.error('ID do usuário não encontrado no localStorage.');
  
}

export default function MinhasCaronasPassageiro() {
  const [caronas, setCaronas] = useState<Carona[]>([]);

  useEffect(() => {
    const fetchMinhasCaronas = async () => {
      try {
        const passageiroId = localStorage.getItem('userId'); // Buscando passageiroId no localStorage
        if (!passageiroId) {
          console.error('ID do passageiro não encontrado no localStorage.');
          return;
        }
  
        const response = await axios.get(`http://localhost:5000/api/caronas/minhas-caronas/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.data.length === 0) {
          console.warn('Nenhuma carona reservada encontrada.');
        }
  
        setCaronas(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao buscar minhas caronas:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    };
    
  
    fetchMinhasCaronas();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Minhas Caronas</h1>
        {caronas.length === 0 ? (
          <p className="text-gray-600 text-center mt-8">
            Você ainda não tem nenhuma carona, reserve uma!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caronas.map((carona) => (
              <div key={carona.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold">{`${carona.cidadeInicial} → ${carona.cidadeDestino}`}</h3>
                <p className="text-gray-600">Data: {formatDate(carona.data)}</p>
                <p className="text-gray-600">Horário: {carona.horarioPartida}</p>
                <p className="text-gray-600">Valor: {carona.valor}</p>
                <p className="text-gray-700">
                  <strong>Motorista:</strong> {carona.motorista?.name || 'Não informado'} <br />
                  <strong>Telefone:</strong> {carona.motorista?.phone || 'Não informado'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
