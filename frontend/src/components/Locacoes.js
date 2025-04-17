import React, { useEffect, useState } from 'react';

function Locacoes() {
  const [locacoes, setLocacoes] = useState([]);
  const [novaLocacao, setNovaLocacao] = useState({
    nome: '',
    tipo: '',
    descricao: '',
    valorHora: '',
    tempoMinimo: '',
    tempoMaximo: ''
  });

  const apiUrl = 'http://localhost:8080/api/locacoes';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLocacoes(data));
  }, []);

  const handleChange = e => {
    setNovaLocacao({ ...novaLocacao, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaLocacao)
    })
      .then(() => {
        setNovaLocacao({
          nome: '',
          tipo: '',
          descricao: '',
          valorHora: '',
          tempoMinimo: '',
          tempoMaximo: ''
        });
        return fetch(apiUrl).then(res => res.json());
      })
      .then(data => setLocacoes(data));
  };

  const deletarLocacao = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetch(apiUrl))
      .then(res => res.json())
      .then(data => setLocacoes(data));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Cadastro de Locações</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input name="nome" value={novaLocacao.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="tipo" value={novaLocacao.tipo} onChange={handleChange} placeholder="Tipo" required />
        <input name="descricao" value={novaLocacao.descricao} onChange={handleChange} placeholder="Descrição" required />
        <input name="valorHora" value={novaLocacao.valorHora} onChange={handleChange} placeholder="Valor por hora" required />
        <input name="tempoMinimo" value={novaLocacao.tempoMinimo} onChange={handleChange} placeholder="Tempo mínimo" required />
        <input name="tempoMaximo" value={novaLocacao.tempoMaximo} onChange={handleChange} placeholder="Tempo máximo" required />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Locações cadastradas:</h3>
      <ul>
        {locacoes.map(locacao => (
          <li key={locacao.id}>
            {locacao.nome} ({locacao.tipo}) - R$ {locacao.valorHora}
            <button
              style={{ marginLeft: '10px', color: 'red' }}
              onClick={() => deletarLocacao(locacao.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locacoes;
