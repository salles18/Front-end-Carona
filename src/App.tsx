import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import HomeMotorista from './pages/HomeMotorista';
import HomePassageiro from './pages/HomePassageiro';
import RecuperarSenha from './pages/RecuperarSenha';
import PrivateRoute from './components/PrivateRoute';
import PerfilPassageiro from './pages/PerfilPassageiro'; // Importe o PrivateRoute
import PerfilMotorista from './pages/PerfilMotorista';
import MinhasCaronasPassageiro from './pages/MinhascaronasPassageiro';

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
        <Route path="/perfilpassageiro" element={<PrivateRoute element={<PerfilPassageiro />} />} />
        <Route path="/perfilmotorista" element={<PrivateRoute element={<PerfilMotorista />} />} />
        <Route path="/minhascaronaspassageiro" element={<PrivateRoute element={<MinhasCaronasPassageiro />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
