import React, { useState, useEffect } from 'react';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [locacoes, setLocacoes] = useState([]);
  const [novaReserva, setNovaReserva] = useState({
    clienteId: '',
    locacaoId: '',
    dataInicio: '',
    dataFim: '',
    valorFinal: '',
    situacao: 'CONFIRMADA'
  });

  const apiUrl = 'http://localhost:8080/api/reservas';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(setReservas);

    fetch('http://localhost:8080/api/clientes')
      .then(res => res.json())
      .then(setClientes);

    fetch('http://localhost:8080/api/locacoes')
      .then(res => res.json())
      .then(setLocacoes);
  }, []);

  const handleChange = e => {
    setNovaReserva({ ...novaReserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      cliente: { id: parseInt(novaReserva.clienteId) },
      locacao: { id: parseInt(novaReserva.locacaoId) },
      dataInicio: novaReserva.dataInicio,
      dataFim: novaReserva.dataFim,
      valorFinal: parseFloat(novaReserva.valorFinal),
      situacao: novaReserva.situacao
    };

    console.log("Payload enviado:", payload);

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then(() => {
        setNovaReserva({
          clienteId: '',
          locacaoId: '',
          dataInicio: '',
          dataFim: '',
          valorFinal: '',
          situacao: 'CONFIRMADA'
        });
        return fetch(apiUrl).then(res => res.json());
      })
      .then(setReservas)
      .catch(err => console.error("Erro ao criar reserva:", err));
  };

  return (
    <div className="container mt-5">
      <h2>Reservas</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          className="form-control mb-2"
          name="clienteId"
          value={novaReserva.clienteId}
          onChange={handleChange}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-2"
          name="locacaoId"
          value={novaReserva.locacaoId}
          onChange={handleChange}
        >
          <option value="">Selecione o tipo de locação</option>
          {locacoes.map(l => (
            <option key={l.id} value={l.id}>
              {l.nome}
            </option>
          ))}
        </select>

        <input
          className="form-control mb-2"
          type="datetime-local"
          name="dataInicio"
          value={novaReserva.dataInicio}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="datetime-local"
          name="dataFim"
          value={novaReserva.dataFim}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          type="number"
          name="valorFinal"
          placeholder="Valor Final"
          value={novaReserva.valorFinal}
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="situacao"
          value={novaReserva.situacao}
          onChange={handleChange}
        >
          <option value="CONFIRMADA">Confirmada</option>
          <option value="PENDENTE">Pendente</option>
          <option value="CANCELADA">Cancelada</option>
        </select>

        <button className="btn btn-primary">Criar Reserva</button>
      </form>

      <h3>Reservas cadastradas:</h3>
      <ul className="list-group">
        {reservas.map(r => (
          <li key={r.id} className="list-group-item">
            Cliente: {r.cliente?.nome || r.clienteId}, Locação: {r.locacao?.nome || r.locacaoId},<br />
            Início: {r.dataInicio}, Fim: {r.dataFim},<br />
            Valor: R${r.valorFinal}, Situação: {r.situacao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;
