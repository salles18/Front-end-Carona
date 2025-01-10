import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Car, User, LogOut, Menu } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Controle do modal
  const navigate = useNavigate();

  const handleLogout = () => {
    // Fecha o modal e navega para a página inicial
    setShowLogoutModal(false);
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Cabeçalho da navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Car className="h-8 w-8 text-[#FF7E39]" />
            <span className="ml-2 text-xl font-bold text-gray-800">Carona Express - Passageiro</span>
          </div>

          {/* Menu Hamburguer */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Links para desktop */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/homepassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Início</span>
            </Link>
            <Link
              to="/minhascaronaspassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Car className="h-5 w-5 mr-1" />
              <span>Minhas Caronas</span>
            </Link>
            <Link
              to="/PerfilPassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-1" />
              <span>Meu Perfil</span>
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)} // Exibe o modal
              className="flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Menu para dispositivos móveis */}
        {isMenuOpen && (
          <div className="flex flex-col space-y-2 mt-2 md:hidden">
            <Link
              to="/homepassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Início</span>
            </Link>
            <Link
              to="/minhascaronaspassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Car className="h-5 w-5 mr-1" />
              <span>Minhas Caronas</span>
            </Link>
            <Link
              to="/PerfilPassageiro"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-1" />
              <span>Meu Perfil</span>
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)} // Exibe o modal
              className="flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Sair</span>
            </button>
          </div>
        )}

        {/* Modal de Confirmação de Logout */}
        {showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 space-y-4 w-80 shadow-lg z-60">
      <h2 className="text-lg font-semibold text-gray-800">Deseja realmente sair?</h2>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowLogoutModal(false)} // Fecha o modal
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          onClick={handleLogout} // Executa o logout
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </nav>
  );
}
