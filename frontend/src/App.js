import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clientes from './components/Clientes';
import Locacoes from './components/Locacoes';
import Reservas from './components/Reservas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/locacoes" element={<Locacoes />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="*" element={<Clientes />} /> {/* rota padrão */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
