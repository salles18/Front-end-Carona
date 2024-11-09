import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Car, User, LogOut } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMotorista = location.pathname.includes('/motorista');

  const handleLogout = () => {
    // Implementar lógica de logout
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-[#FF7E39]" />
            <span className="ml-2 text-xl font-bold text-gray-800">Carona Express</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to={isMotorista ? "/motorista" : "/passageiro"}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Início</span>
            </Link>
            
            <Link
              to={`${isMotorista ? "/motorista" : "/passageiro"}/minhas-caronas`}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Car className="h-5 w-5 mr-1" />
              <span>Minhas Caronas</span>
            </Link>
            
            <Link
              to={`${isMotorista ? "/motorista" : "/passageiro"}/perfil`}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-1" />
              <span>Meu Perfil</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}