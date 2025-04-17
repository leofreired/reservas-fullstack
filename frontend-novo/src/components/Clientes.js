import React, { useEffect, useState } from 'react';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const apiUrl = 'http://localhost:8080/api/clientes';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const handleChange = e => {
    setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoCliente)
    })
      .then(() => {
        setNovoCliente({ nome: '', email: '', telefone: '', cpf: '' });
        return fetch(apiUrl).then(res => res.json());
      })
      .then(data => setClientes(data));
  };

  // ✅ Função deletarCliente fora do handleSubmit
  const deletarCliente = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetch(apiUrl))
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  return (
    <div>
      <h2>Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={novoCliente.nome} onChange={handleChange} placeholder="Nome" />
        <input name="email" value={novoCliente.email} onChange={handleChange} placeholder="Email" />
        <input name="telefone" value={novoCliente.telefone} onChange={handleChange} placeholder="Telefone" />
        <input name="cpf" value={novoCliente.cpf} onChange={handleChange} placeholder="CPF" />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Clientes cadastrados:</h3>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.email}
            <button
              style={{ marginLeft: '10px', color: 'red' }}
              onClick={() => deletarCliente(cliente.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
