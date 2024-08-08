import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Inicio from './paginas/Inicio';
import Navbar from './componentes/navbar';
import RegistroClientes from './paginas/RegistroClientes';

import RegistroPedidos from './paginas/RegistroPedido';

import RegistroEmpleados from './paginas/RegistroEmpleados';




function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/RegistroC" element={<RegistroClientes />} />

          <Route path="/RegistroP" element={<RegistroPedidos />} />

          <Route path="/RegistroE" element={<RegistroEmpleados />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
