import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element; // Define o tipo correto para o 'element'
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem('token'); // Verifique o token no localStorage (ou de acordo com a sua lógica)

  // Se não estiver autenticado, redireciona para a página de login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Caso contrário, retorna o componente solicitado
  return element;
};

export default PrivateRoute;
