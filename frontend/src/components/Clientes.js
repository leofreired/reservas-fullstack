import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const apiUrl = 'http://localhost:8080/api/clientes';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setClientes);
  }, []);

  const handleChange = e => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = idEditando ? 'PUT' : 'POST';
    const url = idEditando ? `${apiUrl}/${idEditando}` : apiUrl;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar cliente");
        return fetch(apiUrl);
      })
      .then(res => res.json())
      .then(data => {
        toast.success(idEditando ? 'Cliente atualizado!' : 'Cliente cadastrado!');
        setClientes(data);
        setCliente({ nome: '', email: '', telefone: '', cpf: '' });
        setIdEditando(null);
      })
      .catch(err => {
        toast.error("Erro ao salvar cliente");
        console.error(err);
      });
  };

  const editarCliente = (c) => {
    setCliente({
      nome: c.nome,
      email: c.email,
      telefone: c.telefone,
      cpf: c.cpf
    });
    setIdEditando(c.id);
  };

  const cancelarEdicao = () => {
    setCliente({ nome: '', email: '', telefone: '', cpf: '' });
    setIdEditando(null);
  };

  const deletarCliente = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetch(apiUrl))
      .then(res => res.json())
      .then(data => {
        toast.success("Cliente excluído com sucesso!");
        setClientes(data);
      })
      .catch(() => toast.error("Erro ao excluir cliente."));
  };

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    c.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>{idEditando ? 'Editar Cliente' : 'Cadastro de Clientes'}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input name="nome" value={cliente.nome} onChange={handleChange} placeholder="Nome" className="form-control mb-2" required />
        <input name="email" value={cliente.email} onChange={handleChange} placeholder="Email" className="form-control mb-2" required />
        <input name="telefone" value={cliente.telefone} onChange={handleChange} placeholder="Telefone" className="form-control mb-2" required />
        <input name="cpf" value={cliente.cpf} onChange={handleChange} placeholder="CPF" className="form-control mb-2" required />
        <button type="submit" className="btn btn-success">{idEditando ? 'Atualizar' : 'Cadastrar'}</button>
        {idEditando && <button type="button" onClick={cancelarEdicao} className="btn btn-secondary ms-2">Cancelar</button>}
      </form>

      <input type="text" placeholder="Pesquisar cliente..." value={filtro} onChange={e => setFiltro(e.target.value)} className="form-control mb-3" />

      <h3>Clientes cadastrados:</h3>
      <ul className="list-group">
        {clientesFiltrados.map(c => (
          <li key={c.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{c.nome}</strong><br />
                <small>Email: {c.email}</small><br />
                <small>Telefone: {c.telefone}</small><br />
                <small>CPF: {c.cpf}</small>
              </div>
              <div className="btn-group">
                <button className="btn btn-warning btn-sm" onClick={() => editarCliente(c)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => deletarCliente(c.id)}>Excluir</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
