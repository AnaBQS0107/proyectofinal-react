import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Inicio from './paginas/Inicio';
import RegistroClientes from './paginas/RegistroClientes';
import RegistroEmpleados from './paginas/RegistroEmpleados';
import RegistroPedidos from './paginas/RegistroPedido';
import MantenimientoC from './paginas/MantenimientoClientes'
import LoginSesion from './paginas/LoginSesion';
import Navbar from './componentes/navbar';
import MostrarProductos from './paginas/ObtenerProductos';
import ControlI from './paginas/ControlInventario';
import MantenimientoP from './paginas/MantenimientoProductos';
import MantenimientoE from './paginas/MantenimientoEmpleados';

import Detalles from './paginas/DetalleProducto';
import Ordenes from './paginas/Ordenes';
import Carrito from './paginas/Carrito';



function App() {
  const { userRole, isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<MostrarProductos />} />
          <Route path="/productos/:idProducto" element={<Detalles />} />
          <Route path="/carrito" element={<Carrito />} />
 
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
                  <Route path="Ordenes" element={<Ordenes />} />
                </>
              )}
              {userRole === 'empleado' && (
                <>
                  <Route path="/RegistroE" element={<RegistroEmpleados />} />
                  <Route path="/RegistroP" element={<RegistroPedidos />} />
                  <Route path="/MantenimientoC" element={<MantenimientoC />} />

                  <Route path="/ControlI" element={<ControlI />} />
                  <Route path = '/MantenimientoP' element={<MantenimientoP />}/>
                  <Route path="/MantenimientoE" element={<MantenimientoE />} />
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
