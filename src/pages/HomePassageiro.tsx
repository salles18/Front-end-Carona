import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Bell, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Carona {
  status: string;
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

// Função de formatação de horário
const formatTime = (timeString: string) => {
  return timeString; // O horário já está no formato correto 'HH:mm'
};

export default function HomePassageiro() {
  const [cidadeInicial, setCidadeInicial] = useState('');
  const [cidadeDestino, setCidadeDestino] = useState('');
  const [data, setData] = useState('');
  const [caronas, setCaronas] = useState<Carona[]>([]);
  const [minhasCaronas, setMinhasCaronas] = useState<Carona[]>([]);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [selectedCarona, setSelectedCarona] = useState<Carona | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [numeroMotorista, setNumeroMotorista] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();



  const fetchCaronas = async (filters: { cidadeInicial?: string; cidadeDestino?: string; data?: string } = {}) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token de autenticação não encontrado');
        return;
      }
      
      

       // Envia os filtros para a API
       const params = {
        cidadeInicial: filters.cidadeInicial || '',
        cidadeDestino: filters.cidadeDestino || '',
        data: filters.data || '',
      };
      console.log('Filtros enviados para API:', params)
      const response = await axios.get('http://localhost:5000/api/caronas', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Caronas retornadas:', response.data); 

      
   // Filtrar apenas caronas disponíveis
   console.log('Respostas da API:', response.data);
   const caronasDisponiveis = response.data.filter(
    (carona: Carona) => carona.status !== 'ocupado'
  );
  setCaronas(caronasDisponiveis);
} catch (error) {
  console.error('Erro ao buscar caronas:', error);
}
};
  useEffect(() => {
    fetchCaronas();
  }, []);

  

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página
    setIsSearching(true); // Define que está pesquisando
    const formattedDate = data ? new Date(data).toISOString().split('T')[0] : '';

    console.log('Filtros aplicados:', { cidadeInicial, cidadeDestino, data });
    fetchCaronas({
      cidadeInicial,
      cidadeDestino,
      data: formattedDate,
    });
  };

  const handleLimparFiltros = () => {
    setCidadeInicial('');
    setCidadeDestino('');
    setData('');
    setCaronas([]); // Limpa as caronas exibidas
    setIsSearching(false); // Reseta o estado de busca
  };

  const handleReservar = (carona: Carona) => {
    setSelectedCarona(carona);
    setShowReservaModal(true);
  };

  const confirmarReserva = async () => {
    if (!selectedCarona) {
      alert('Selecione uma carona para reservar.');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // ID do usuário logado
  
    if (!userId) {
      alert('ID do usuário não encontrado. Faça login novamente.');
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/carona/${selectedCarona.id}/pegar`,
        { passageiroId: userId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setNumeroMotorista(response.data.numeroMotorista || 'Número não disponível');
        setShowSuccessModal(true);
        // Atualizar estados
        setCaronas(caronas.filter((carona) => carona.id !== selectedCarona.id));
        setMinhasCaronas((prev) => [...prev, selectedCarona]); // Adiciona a carona a `minhasCaronas`
        setShowReservaModal(false);
        setSelectedCarona(null);

        

      } else {
        console.error('Erro ao reservar carona:', response.data);
      }
    } catch (error) {
      console.error('Erro ao reservar carona:', error);
      alert('Erro ao reservar a carona. Tente novamente mais tarde.');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Encontre sua Carona</h1>
          
        </div>

        {/* Formulário de Busca */}
        <form onSubmit={handleBuscar} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  <div className="relative">
    <MapPin className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
    <Input
      label="Cidade de Origem"
      value={cidadeInicial}
      onChange={(e) => setCidadeInicial(e.target.value)}
      className="pl-10"
    />
  </div>
  <div className="relative">
    <MapPin className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
    <Input
      label="Cidade de Destino"
      value={cidadeDestino}
      onChange={(e) => setCidadeDestino(e.target.value)}
      className="pl-10"
    />
  </div>
  <div className="flex items-end space-x-4">
    <div className="flex-1">
      <Input
        type="date"
        label="Data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
    </div>
    <Button type="submit" className="mb-[2px]">
      <Search className="h-6 w-9" />
    </Button>
    <Button
      type="button"
      className="bg-gray-400 "
      onClick={() => {
        setCidadeInicial('');
        setCidadeDestino('');
        setData('');
        fetchCaronas(); // Recarrega caronas sem filtros
      }}
    >
      Limpar Filtros
    </Button>
  </div>
</div>
        </form>

        {/* Lista de Caronas Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {caronas.length > 0 ? (
    caronas.map((carona) => (
      <div key={carona.id} className="bg-white rounded-lg shadow-md p-6">
        {/* Card da carona */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{`${carona.cidadeInicial} → ${carona.cidadeDestino}`}</h3>
            <p className="text-gray-600">Data: {formatDate(carona.data)}</p>
            <p className="text-gray-600">Horário: {formatTime(carona.horarioPartida)} → {formatTime(carona.estimativaChegada)}</p>
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
            <strong>Motorista:</strong> {carona.motorista ? carona.motorista.name : 'Não informado'}
          </p>
          <p className="text-gray-700">
            <strong>Permite Animais:</strong> {carona.permiteAnimais ? 'Sim' : 'Não'}
          </p>
          <p className="text-green-600 font-semibold">
            R$ {Number(carona.valor).toFixed(2)}
          </p>
        </div>

        <Button onClick={() => handleReservar(carona)}>
          Reservar Carona
        </Button>
      </div>
    ))
  ) : isSearching && (
    <div className="text-center col-span-full">
      <p className="text-gray-500">Nenhuma carona encontrada para os critérios informados.</p>
    </div>
  )}
</div>


        {showSuccessModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-green-500 text-4xl">✔</span>
        <h2 className="text-xl font-bold">Reserva Confirmada!</h2>
      </div>
      <p className="text-gray-700 mb-4">
        Sua carona foi reservada com sucesso. Entre em contato com o motorista pelo número:
        <strong> {numeroMotorista}</strong>.
      </p>
      <Button
        onClick={() => {
          setShowSuccessModal(false);
          navigate('/minhasCaronasPassageiro'); // Redireciona para MinhasCaronasPassageiro
        }}
      >
        Fechar
      </Button>
    </div>
  </div>
)}


        {/* Modal de Confirmação de Reserva */}
        {showReservaModal && selectedCarona && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirmar Reserva</h2>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700">Você está prestes a reservar uma carona para:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Trajeto:</strong> {selectedCarona.cidadeInicial} → {selectedCarona.cidadeDestino}</p>
                  <p><strong>Data:</strong> {formatDate(selectedCarona.data)}</p>
                  <p><strong>Horário:</strong> {formatTime(selectedCarona.horarioPartida)}</p>
                  <p><strong>Valor:</strong> R$ {Number(selectedCarona.valor).toFixed(2)}</p>
                </div>
              </div>
              
              <div className=" flex space-x-4">
                <Button onClick={confirmarReserva}
                className="bg-[#32A684] text-white hover:bg-[#3BAF95] transition-colors"
                >
                  Confirmar Reserva
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700 transition-colors "
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
