import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Bell, Search, MapPin } from 'lucide-react';
import axios from 'axios';

interface Carona {
  id: string;
  name: string;
  avaliacao: number;
  cidadeInicial: string;
  cidadeDestino: string;
  data: string;
  horarioPartida: string;
  estimativaChegada: string;
  valor: number;
  quantidadeVagas: number;
  modeloVeiculo: string;
  marca: string;
  ano: string;
  foto: string;
  permiteAnimais: boolean;
}

export default function HomePassageiro() {
  const [cidadeInicial, setCidadeInicial] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [data, setData] = useState('');
  const [caronas, setCaronas] = useState<Carona[]>([]);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [selectedCarona, setSelectedCarona] = useState<Carona | null>(null);

  const fetchCaronas = async (filters: { cidadeInicial?: string; cidadeDestino?: string; data?: string } = {}) => {
    try {
       console.log('Filtros:', filters);
      const response = await axios.get('http://localhost:5000/api/caronas', {
        params: filters,
      });
      setCaronas(response.data);
    } catch (error) {
      console.error('Erro ao buscar caronas:', error);
    }
  };

  useEffect(() => {
    fetchCaronas();
  }, []);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCaronas({
      cidadeInicial,
      cidadeDestino,
      data,
    });
  };

  const handleReservar = (carona: Carona) => {
    setSelectedCarona(carona);
    setShowReservaModal(true);
  };

  const confirmarReserva = async () => {
    if (selectedCarona) {
      try {
        const response = await fetch(`/api/carona/${selectedCarona.id}/pegar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          alert('Reserva confirmada!');
          setShowReservaModal(false);
          setSelectedCarona(null);
        } else {
          console.error('Erro ao reservar carona:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao reservar carona:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Encontre sua Carona</h1>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
          </button>
        </div>

        {/* Formulário de Busca */}
        <form onSubmit={handleBuscar} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
              <Input
                label="Cidade de Origem"
                value={cidadeInicial}
                onChange={(e) => setCidadeInicial(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
              <Input
                label="Cidade de Destino"
                value={cidadeDestino}
                onChange={(e) => setCidadeDestino(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Input
                  type="date"
                  label="Data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="mb-[2px]">
                <Search className="h-5 w-9" />
              </Button>
            </div>
          </div>
        </form>

        {/* Lista de Caronas Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caronas.map((carona) => (
            <div key={carona.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{`${carona.cidadeInicial} → ${carona.cidadeDestino}`}</h3>
                  <p className="text-gray-600">{carona.data}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {carona.quantidadeVagas} vagas
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <strong>Veículo:</strong> {carona.marca} {carona.modeloVeiculo} {carona.ano}
                </p>
                <p className="text-gray-700">
                  <strong>Motorista:</strong> {carona.name}
                </p>
                <p className="text-green-600 font-semibold">
                  R$ {Number(carona.valor).toFixed(2)}
                </p>
              </div>

              <Button onClick={() => handleReservar(carona)}>
                Reservar Carona
              </Button>
            </div>
          ))}
        </div>

        {/* Modal de Confirmação de Reserva */}
        {showReservaModal && selectedCarona && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirmar Reserva</h2>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700">Você está prestes a reservar uma carona para:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Trajeto:</strong> {selectedCarona.cidadeInicial} → {selectedCarona.cidadeDestino}</p>
                  <p><strong>Data:</strong> {selectedCarona.data}</p>
                  <p><strong>Horário:</strong> {selectedCarona.horarioPartida}</p>
                  <p><strong>Valor:</strong> R$ {Number(selectedCarona.valor).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={confirmarReserva}>
                  Confirmar Reserva
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowReservaModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
