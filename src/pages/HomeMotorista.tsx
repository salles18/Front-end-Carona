import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavbarMotorista } from '../components/NavbarMotorista';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Bell, Plus, Trash } from 'lucide-react';

export default function HomeMotorista() {
  const [showModal, setShowModal] = useState(false);
  const [caronas, setCaronas] = useState<any[]>([]);
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

  // Função para carregar caronas do backend
  const fetchCaronas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/caronas');
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setCaronas(data);
      } else {
        setCaronas([]); // Define um array vazio caso não seja um array
        console.error("Dados inesperados da API:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar caronas:", error);
      setCaronas([]); // Define um array vazio em caso de erro
    }
  };
  

  // Chama fetchCaronas quando o componente é montado
  useEffect(() => {
    fetchCaronas();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/caronas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCaronas(caronas.filter((carona) => carona.id !== id)); // Atualiza o estado removendo a carona deletada
    } catch (error) {
      console.error('Erro ao deletar carona:', error);
    }
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
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>
            <Button
              onClick={() => setShowModal(true)}
              className="flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Cadastrar Carona
            </Button>
          </div>
        </div>

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
                    onChange={(e) => setFormData({...formData, ano: e.target.value})}
                    required
                  />
                  <Input
                    label="Placa"
                    name="placa"
                    value={formData.placa}
                    onChange={(e) => setFormData({...formData, placa: e.target.value})}
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

                <div className="flex space-x-4">
                  <Button type="submit">
                    Cadastrar Carona
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
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
                  <p className="text-gray-600">{carona.data}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {carona.quantidadeVagas} vagas
                </span>
              </div>
              <p className="text-gray-700">Valor: R${carona.valor}</p>
              <p className="text-gray-700">Modelo: {carona.modeloVeiculo}</p>
              <Button
                onClick={() => handleDelete(carona.id)}
                className="mt-4 flex items-center space-x-2 text-red-600"
              >
                <Trash className="h-6 w-9" />
                <span>Excluir Carona</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
