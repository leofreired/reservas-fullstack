import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Locacoes() {
  const [locacoes, setLocacoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [locacao, setLocacao] = useState({
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
      .then(setLocacoes);
  }, []);

  const handleChange = e => {
    setLocacao({ ...locacao, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const method = idEditando ? 'PUT' : 'POST';
    const url = idEditando ? `${apiUrl}/${idEditando}` : apiUrl;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...locacao,
        valorHora: parseFloat(locacao.valorHora),
        tempoMinimo: parseInt(locacao.tempoMinimo),
        tempoMaximo: parseInt(locacao.tempoMaximo)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao salvar locação");
        return fetch(apiUrl);
      })
      .then(res => res.json())
      .then(data => {
        toast.success(idEditando ? 'Locação atualizada!' : 'Locação cadastrada!');
        setLocacoes(data);
        setLocacao({
          nome: '',
          tipo: '',
          descricao: '',
          valorHora: '',
          tempoMinimo: '',
          tempoMaximo: ''
        });
        setIdEditando(null);
      })
      .catch(() => toast.error("Erro ao salvar locação"));
  };

  const editarLocacao = (l) => {
    setLocacao({
      nome: l.nome,
      tipo: l.tipo,
      descricao: l.descricao,
      valorHora: l.valorHora,
      tempoMinimo: l.tempoMinimo,
      tempoMaximo: l.tempoMaximo
    });
    setIdEditando(l.id);
  };

  const cancelarEdicao = () => {
    setLocacao({
      nome: '',
      tipo: '',
      descricao: '',
      valorHora: '',
      tempoMinimo: '',
      tempoMaximo: ''
    });
    setIdEditando(null);
  };

  const deletarLocacao = (id) => {
    if (!window.confirm("Deseja realmente excluir esta locação?")) return;

    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetch(apiUrl))
      .then(res => res.json())
      .then(data => {
        toast.success("Locação excluída com sucesso!");
        setLocacoes(data);
      })
      .catch(() => toast.error("Erro ao excluir locação."));
  };

  const locacoesFiltradas = locacoes.filter(loc =>
    loc.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    loc.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>{idEditando ? 'Editar Locação' : 'Cadastro de Locações'}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input name="nome" value={locacao.nome} onChange={handleChange} placeholder="Nome" className="form-control mb-2" required />
        <input name="tipo" value={locacao.tipo} onChange={handleChange} placeholder="Tipo" className="form-control mb-2" required />
        <input name="descricao" value={locacao.descricao} onChange={handleChange} placeholder="Descrição" className="form-control mb-2" required />
        <input name="valorHora" value={locacao.valorHora} onChange={handleChange} placeholder="Valor por hora" type="number" className="form-control mb-2" required />
        <input name="tempoMinimo" value={locacao.tempoMinimo} onChange={handleChange} placeholder="Tempo mínimo (h)" type="number" className="form-control mb-2" required />
        <input name="tempoMaximo" value={locacao.tempoMaximo} onChange={handleChange} placeholder="Tempo máximo (h)" type="number" className="form-control mb-2" required />
        <button type="submit" className="btn btn-success">{idEditando ? 'Atualizar' : 'Cadastrar'}</button>
        {idEditando && <button type="button" className="btn btn-secondary ms-2" onClick={cancelarEdicao}>Cancelar</button>}
      </form>

      <input
        type="text"
        placeholder="Pesquisar locação..."
        className="form-control mb-3"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <h3>Locações cadastradas:</h3>
      <div className="row">
        {locacoesFiltradas.map(locacao => (
          <div key={locacao.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{locacao.nome} ({locacao.tipo})</h5>
                <p className="card-text"><strong>Descrição:</strong> {locacao.descricao}</p>
                <p className="card-text"><strong>Valor/Hora:</strong> R$ {locacao.valorHora}</p>
                <p className="card-text"><strong>Tempo mínimo:</strong> {locacao.tempoMinimo}h</p>
                <p className="card-text"><strong>Tempo máximo:</strong> {locacao.tempoMaximo}h</p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => editarLocacao(locacao)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deletarLocacao(locacao.id)}>Excluir</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Locacoes;
