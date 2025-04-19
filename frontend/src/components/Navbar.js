import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="/">Sistema de Reservas</a>
      <div className="navbar-nav">
        <Link className="nav-link" to="/clientes">Clientes</Link>
        <Link className="nav-link" to="/locacoes">Tipos de Locação</Link>
        <Link className="nav-link" to="/reservas">Reservas</Link>
      </div>
    </nav>
  );
}

export default Navbar;
