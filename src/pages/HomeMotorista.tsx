import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Bell, Plus } from 'lucide-react';

interface Carona {
  id: string;
  cidadeInicial: string;
  cidadeDestino: string;
  modeloVeiculo: string;
  marca: string;
  data: string;
  horarioPartida: string;
  estimativaChegada: string;
  valor: number;
  vagasDisponiveis: number;
  ano: string;
  placa: string;
  fotoVeiculo: string;
  documentoVeiculo: string;
  permiteAnimais: boolean;
}

export default function HomeMotorista() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cidadeInicial: '',
    cidadeDestino: '',
    modeloVeiculo: '',
    marca: '',
    data: '',
    horarioPartida: '',
    estimativaChegada: '',
    valor: '',
    vagasDisponiveis: '',
    ano: '',
    placa: '',
    fotoVeiculo: '',
    documentoVeiculo: '',
    permiteAnimais: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar integração com backend
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
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
                    value={formData.vagasDisponiveis}
                    onChange={(e) => setFormData({...formData, vagasDisponiveis: e.target.value})}
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
                    value={formData.fotoVeiculo}
                    onChange={(e) => setFormData({...formData, fotoVeiculo: e.target.value})}
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
          {/* Exemplo de card de carona */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">São Paulo → Rio de Janeiro</h3>
                <p className="text-gray-600">20/03/2024</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                4 vagas
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Horário:</strong> 08:00 → 12:00
              </p>
              <p className="text-gray-700">
                <strong>Veículo:</strong> Honda Civic 2022
              </p>
              <p className="text-green-600 font-semibold">
                R$ 120,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}