import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Inicio from './paginas/Inicio';
import Navbar from './componentes/navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
