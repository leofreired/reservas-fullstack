import './App.css';
import { useState } from 'react';
import Clientes from './components/Clientes';
import Locacoes from './components/Locacoes';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('clientes');

  return (
    <div className="App">
      <h1>Sistema de Reservas</h1>

      {/* Menu de navegação */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTelaAtiva('clientes')}>Clientes</button>
        <button onClick={() => setTelaAtiva('locacoes')} style={{ marginLeft: '10px' }}>
          Locações
        </button>
      </div>

      {/* Renderização condicional */}
      {telaAtiva === 'clientes' && <Clientes />}
      {telaAtiva === 'locacoes' && <Locacoes />}
    </div>
  );
}

export default App;
