import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Inicio from './paginas/Inicio';
import Navbar from './componentes/navbar';
import RegistroClientes from './paginas/Registroclientes';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/RegistroC" element={<RegistroClientes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
