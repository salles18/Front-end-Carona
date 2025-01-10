import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR }  from 'date-fns/locale/pt-BR'
import { NavbarMotorista } from '../components/NavbarMotorista';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Bell, Plus, Trash, Eye } from 'lucide-react';

type Carona = {
  id: string;
  cidadeInicial: string;
  cidadeDestino: string;
  modeloVeiculo: string;
  marca: string;
  data: string;
  horarioPartida: string;
  estimativaChegada: string;
  valor: string;
  quantidadeVagas: string;
  ano: string;
  placa: string;
  fotosVeiculo: string;
  documentoVeiculo: string;
  permiteAnimais: boolean;
  motoristaId: string;
};

export default function HomeMotorista() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCarona, setSelectedCarona] = useState<Carona | null>(null);
  const [caronas, setCaronas] = useState<Carona[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para exibir modal de confirmação
  const [caronaToDelete, setCaronaToDelete] = useState<string | null>(null); // Estado para armazenar a carona a ser deletada
  const [formData, setFormData] = useState({
    cidadeInicial: '',
    cidadeDestino: '',
    modeloVeiculo: '',
    marca: '',
    data: '',
    horarioPartida: '',
    estimativaChegada: '',
    valor: '',
    quantidadeVagas: '',
    ano: '',
    placa: '',
    fotosVeiculo: '',
    documentoVeiculo: '',
    permiteAnimais: false,
    motoristaId: 'motoristaId',
  });


  // Função de formatação de data no formato DD/MM/YYYY
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
  // Função para carregar caronas do backend
  const fetchCaronas = async () => {
    try {
      // Obtém o token do localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }
  
      // Faz a requisição com o cabeçalho de autorização
      const response = await fetch('http://localhost:5000/api/motorista/caronas', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token
          'Content-Type': 'application/json',
        },
      });
  
      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Verifica se o retorno é um array
      if (Array.isArray(data)) {
        setCaronas(data);
      } else {
        setCaronas([]);
        console.error("Dados inesperados da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar caronas:", error);
      setCaronas([]); // Define um array vazio em caso de erro
    }
  };

  
  

  // Chama fetchCaronas quando o componente é montado
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCaronas();
    }
  }, []); 

  const handleDelete = async () => {
    if (!caronaToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/caronas/${caronaToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCaronas(caronas.filter((carona) => carona.id !== caronaToDelete));
      setShowConfirmModal(false);
      setCaronaToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar carona:', error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setCaronaToDelete(id);
    setShowConfirmModal(true); // Exibe o modal de confirmação
  };

  const handleShowDetails = (carona: any) => {
    setSelectedCarona(carona);
    setShowDetailModal(true);
  };
 // Função para cadastrar nova carona
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/caronas', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    
    setCaronas([...caronas, response.data]);
    setShowModal(false);

    // Limpa o formulário após o cadastro
    setFormData({
      cidadeInicial: '',
      cidadeDestino: '',
      modeloVeiculo: '',
      marca: '',
      data: '',
      horarioPartida: '',
      estimativaChegada: '',
      valor: '',
      quantidadeVagas: '',
      ano: '',
      placa: '',
      fotosVeiculo: '',
      documentoVeiculo: '',
      permiteAnimais: false,
      motoristaId: 'motoristaId',
    });
  } catch (error) {
    console.error('Erro ao cadastrar carona:', error);
  }
};


  return (  
    <div className="min-h-screen bg-gray-50">
      <NavbarMotorista />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Painel do Motorista</h1>
        
          <div className="flex space-x-4">
            
            <Button
              onClick={() => setShowModal(true)}
              className="flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Carona
            </Button>
          </div>
        </div>
         {/* Exibe mensagem de boas-vindas se não houver caronas cadastradas */}
         {caronas.length === 0 ? (
          <div className="text-center p-6 bg-yellow-100 border border-yellow-300 rounded-md">
            <h2 className="text-xl font-bold text-yellow-700">
              Bem-vindo(a), cadastre sua Primeira Carona para começar!
            </h2>
          </div>
        ) : (
          <div className="p-6 bg-green-100 border border-green-300 rounded-md">
            <h2 className="text-xl font-bold text-green-700">
              Já tem caronas cadastradas! Continue gerenciando suas caronas.
            </h2>
          </div>
        )}

        {/* Modal de Cadastro de Carona */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Cadastrar Nova Carona</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Cidade Inicial"
                    name="cidadeInicial"
                    value={formData.cidadeInicial}
                    onChange={(e) => setFormData({...formData, cidadeInicial: e.target.value})}
                    required
                  />
                  <Input
                    label="Cidade Destino"
                    name="cidadeDestino"
                    value={formData.cidadeDestino}
                    onChange={(e) => setFormData({...formData, cidadeDestino: e.target.value})}
                    required
                  />
                  <Input
                    label="Modelo do Veículo"
                    name="modeloVeiculo"
                    value={formData.modeloVeiculo}
                    onChange={(e) => setFormData({...formData, modeloVeiculo: e.target.value})}
                    required
                  />
                  <Input
                    label="Marca"
                    name="marca"
                    value={formData.marca}
                    onChange={(e) => setFormData({...formData, marca: e.target.value})}
                    required
                  />
                  <Input
                    label="Data"
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                    min={new Date().toISOString().split('T')[0]} // Define a data mínima como hoje
                    required
                  />
                  <Input
                    label="Horário de Partida"
                    type="time"
                    name="horarioPartida"
                    value={formData.horarioPartida}
                    onChange={(e) => setFormData({...formData, horarioPartida: e.target.value})}
                    required
                  />
                  <Input
                    label="Estimativa de Chegada"
                    type="time"
                    name="estimativaChegada"
                    value={formData.estimativaChegada}
                    onChange={(e) => setFormData({...formData, estimativaChegada: e.target.value})}
                    required
                  />
                  <Input
                    label="Valor (R$)"
                    type="number"
                    name="valor"
                    value={formData.valor}
                    onChange={(e) => setFormData({...formData, valor: e.target.value})}
                    required
                  />
                  <Input
                    label="Vagas Disponíveis"
                    type="number"
                    name="vagasDisponiveis"
                    value={formData.quantidadeVagas}
                    onChange={(e) => setFormData({...formData, quantidadeVagas: e.target.value})}
                    required
                  />
                  <Input
                    label="Ano do Veículo"
                    name="ano"
                    value={formData.ano}
                    onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
                    if (value.length <= 4) {
                      setFormData({...formData, ano: value});
                        }
                    }}
                    required
                  />
                  <Input
                    label="Placa"
                    name="placa"
                    value={formData.placa}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 7); // Limita a 7 caracteres
                        setFormData({...formData, placa: value});
                    }}
                    required
                  />
                  <Input
                    label="URL da Foto do Veículo"
                    type="url"
                    name="fotoVeiculo"
                    value={formData.fotosVeiculo}
                    onChange={(e) => setFormData({...formData, fotosVeiculo: e.target.value})}
                    required
                  />
                  <Input
                    label="URL do Documento do Veículo"
                    type="url"
                    name="documentoVeiculo"
                    value={formData.documentoVeiculo}
                    onChange={(e) => setFormData({...formData, documentoVeiculo: e.target.value})}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permiteAnimais"
                    checked={formData.permiteAnimais}
                    onChange={(e) => setFormData({...formData, permiteAnimais: e.target.checked})}
                    className="h-4 w-4 text-[#FF7E39] focus:ring-[#FF7E39] border-gray-300 rounded"
                  />
                  <label htmlFor="permiteAnimais" className="text-sm text-gray-700">
                    Permite animais
                  </label>
                </div>

                <div className=" flex space-x-4">
                  <Button type="submit" className="bg-[#3BAF95] text-white py-2 px-4 rounded hover:bg-[#3BAF95]">
                    Cadastrar Carona
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}  

        {/* Modal de Confirmação de Exclusão */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
              <p className="text-gray-700">Tem certeza de que deseja excluir esta carona?</p>
              <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={handleDelete} className="bg-red-600 text-white">
                  Excluir
                </Button>
                <Button onClick={() => setShowConfirmModal(false)} className="bg-orange-300 secondary">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes da Carona */}
        {showDetailModal && selectedCarona && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Detalhes da sua Carona:</h2>
              <p><strong>Cidade Inicial:</strong> {selectedCarona.cidadeInicial}</p>
              <p><strong>Cidade Destino:</strong> {selectedCarona.cidadeDestino}</p>
              <p><strong>Modelo do Veículo:</strong> {selectedCarona.modeloVeiculo}</p>
              <p><strong>Marca:</strong> {selectedCarona.marca}</p>
              <p><strong>Data:</strong> {formatDate(selectedCarona.data)}</p>
              <p><strong>Horário de Partida:</strong> {formatTime(selectedCarona.horarioPartida)}</p>
              <p><strong>Estimativa de Chegada:</strong> {formatTime(selectedCarona.estimativaChegada)}</p>
              <p><strong>Valor:</strong> R${selectedCarona.valor}</p>
              <p><strong>Vagas Disponíveis:</strong> {selectedCarona.quantidadeVagas}</p>
              <p><strong>Ano do Veículo:</strong> {selectedCarona.ano}</p>
              <p><strong>Placa:</strong> {selectedCarona.placa}</p>
              <p><strong>Permite Animais:</strong> {selectedCarona.permiteAnimais ? 'Sim' : 'Não'}</p>
              <Button
                onClick={() => setShowDetailModal(false)}
                className="mt-4 bg-green-600 text-white"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}

        {/* Lista de Caronas Cadastradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {caronas.map((carona) => (
            <div key={carona.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{carona.cidadeInicial} → {carona.cidadeDestino}</h3>
                  <p className="text-gray-600">{formatDate(carona.data)}</p> {/* Data formatada */}
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {carona.quantidadeVagas} vagas
                </span>
              </div>
              <p className="text-gray-700">Valor: R${carona.valor}</p>
              <p className="text-gray-700">Modelo: {carona.modeloVeiculo}</p>
              <p className="text-gray-700">Horário de Partida: {formatTime(carona.horarioPartida)}</p> {/* Horário formatado */}
              <p className="text-gray-700">Estimativa de Chegada: {formatTime(carona.estimativaChegada)}</p> {/* Horário formatado */}
              <div className="flex space-x-4">
  <Button
    onClick={() => handleDeleteClick(carona.id)}
    className="flex items-center bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2"
  >
    <Trash className="h-4 w-4 mr-2" />
    Cancelar Carona
  </Button>
  <Button
    onClick={() => handleShowDetails(carona)}
    className="flex items-center bg-green-800 text-green-800 p-2 rounded hover:bg-green-300 mt-2"
  >
    <Eye className="h-4 w-4 mr-2" />
    Ver Detalhes
  </Button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
