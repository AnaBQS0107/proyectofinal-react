import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Inicio from './paginas/Inicio';
import RegistroClientes from './paginas/RegistroClientes';
import RegistroEmpleados from './paginas/RegistroEmpleados';
import RegistroPedidos from './paginas/RegistroPedido';
import LoginSesion from './paginas/LoginSesion';
import Ordenes from './paginas/Ordenes';
import Navbar from './componentes/navbar';

function App() {
  const { userRole, isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginSesion />} />
              <Route path="/RegistroC" element={<RegistroClientes />} />
            </>
          ) : (
            <>
              {userRole === 'cliente' && (
                <>
                  <Route path="/RegistroC" element={<RegistroClientes />} />
                </>
              )}
              {userRole === 'empleado' && (
                <>
                  <Route path="/RegistroE" element={<RegistroEmpleados />} />
                  <Route path="/RegistroP" element={<RegistroPedidos />} />
                  <Route path="/ordenes" element={<Ordenes />} /> 
                </>
              )}
            </>
          )}
          <Route path="/login" element={<LoginSesion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
