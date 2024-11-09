import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import HomeMotorista from './pages/HomeMotorista';
import HomePassageiro from './pages/HomePassageiro';
import RecuperarSenha from './pages/RecuperarSenha';
import PrivateRoute from './components/PrivateRoute'; // Importe o PrivateRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        
        {/* Rotas privadas */}
        <Route path="/homemotorista" element={<PrivateRoute element={<HomeMotorista />} />} />
        <Route path="/homepassageiro" element={<PrivateRoute element={<HomePassageiro />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
