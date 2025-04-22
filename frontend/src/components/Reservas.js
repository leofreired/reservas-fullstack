import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { formatarData } from '../utils';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [locacoes, setLocacoes] = useState([]);
  const [idEditando, setIdEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
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
    fetch(apiUrl).then(res => res.json()).then(setReservas);
    fetch('http://localhost:8080/api/clientes').then(res => res.json()).then(setClientes);
    fetch('http://localhost:8080/api/locacoes').then(res => res.json()).then(setLocacoes);
  }, []);

  const { locacaoId, dataInicio, dataFim } = novaReserva;

  useEffect(() => {
    if (!locacaoId || !dataInicio || !dataFim) return;

    const locacaoSelecionada = locacoes.find(l => l.id === parseInt(locacaoId));
    if (!locacaoSelecionada) return;

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffHoras = (fim - inicio) / (1000 * 60 * 60);

    if (diffHoras > locacaoSelecionada.tempoMaximo) {
      toast.error(`Tempo máximo: ${locacaoSelecionada.tempoMaximo}h`);
      setNovaReserva(prev => ({ ...prev, dataFim: '', valorFinal: '' }));
      return;
    }

    const valor = diffHoras * locacaoSelecionada.valorHora;
    setNovaReserva(prev => ({ ...prev, valorFinal: valor.toFixed(2) }));
  }, [locacaoId, dataInicio, dataFim, locacoes]);

  const handleChange = e => {
    setNovaReserva({ ...novaReserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = {
      cliente: { id: parseInt(novaReserva.clienteId) },
      locacao: { id: parseInt(novaReserva.locacaoId) },
      dataInicio: novaReserva.dataInicio,
      dataFim: novaReserva.dataFim,
      valorFinal: parseFloat(novaReserva.valorFinal),
      situacao: novaReserva.situacao
    };
  
    const method = idEditando ? 'PUT' : 'POST';
    const url = idEditando ? `${apiUrl}/${idEditando}` : apiUrl;
  
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 409) {
            throw new Error('CONFLITO_RESERVA');
          } else {
            throw new Error(`Erro ${res.status}`);
          }
        }
        return fetch(apiUrl);
      })
      .then(res => res.json())
      .then(data => {
        toast.success(idEditando ? 'Reserva atualizada!' : 'Reserva criada!');
        setReservas(data);
        setNovaReserva({
          clienteId: '',
          locacaoId: '',
          dataInicio: '',
          dataFim: '',
          valorFinal: '',
          situacao: 'CONFIRMADA'
        });
        setIdEditando(null);
      })
      .catch(err => {
        if (err.message === 'CONFLITO_RESERVA') {
          toast.error("Já existe uma reserva nesse horário para essa locação.");
        } else {
          toast.error("Erro ao salvar reserva.");
          console.error(err);
        }
      });
  };
  

  const editarReserva = (reserva) => {
    setNovaReserva({
      clienteId: reserva.cliente.id,
      locacaoId: reserva.locacao.id,
      dataInicio: reserva.dataInicio,
      dataFim: reserva.dataFim,
      valorFinal: reserva.valorFinal,
      situacao: reserva.situacao
    });
    setIdEditando(reserva.id);
  };

  const excluirReserva = (id) => {
    if (!window.confirm("Deseja excluir esta reserva?")) return;

    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => fetch(apiUrl))
      .then(res => res.json())
      .then(data => {
        toast.success("Reserva excluída com sucesso!");
        setReservas(data);
      })
      .catch(err => {
        toast.error("Erro ao excluir reserva");
        console.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>{idEditando ? "Editar Reserva" : "Criar Reserva"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <select className="form-control mb-2" name="clienteId" value={novaReserva.clienteId} onChange={handleChange} required>
          <option value="">Selecione um cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <select className="form-control mb-2" name="locacaoId" value={novaReserva.locacaoId} onChange={handleChange} required>
          <option value="">Selecione a locação</option>
          {locacoes.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
        </select>

        <input className="form-control mb-2" type="datetime-local" name="dataInicio" value={novaReserva.dataInicio} onChange={handleChange} required />
        <input className="form-control mb-2" type="datetime-local" name="dataFim" value={novaReserva.dataFim} onChange={handleChange} required />
        <input className="form-control mb-2" type="number" name="valorFinal" value={novaReserva.valorFinal} placeholder="Valor Final" readOnly />
        <select className="form-control mb-2" name="situacao" value={novaReserva.situacao} onChange={handleChange}>
          <option value="CONFIRMADA">Confirmada</option>
          <option value="PENDENTE">Pendente</option>
          <option value="CANCELADA">Cancelada</option>
        </select>

        <button className="btn btn-success">{idEditando ? "Atualizar" : "Cadastrar"}</button>
        {idEditando && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setIdEditando(null);
            setNovaReserva({
              clienteId: '',
              locacaoId: '',
              dataInicio: '',
              dataFim: '',
              valorFinal: '',
              situacao: 'CONFIRMADA'
            });
          }}>
            Cancelar
          </button>
        )}
      </form>

      <input
        type="text"
        placeholder="Pesquisar por cliente ou locação..."
        className="form-control mb-3"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <h3 className="mb-3">Reservas cadastradas:</h3>
      <div className="row">
        {reservas
          .filter(r =>
            r.cliente?.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            r.locacao?.nome.toLowerCase().includes(filtro.toLowerCase())
          )
          .map(r => (
            <div className="col-md-6 mb-3" key={r.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Cliente: {r.cliente?.nome}</h5>
                  <p className="card-text"><strong>Locação:</strong> {r.locacao?.nome}</p>
                  <p className="card-text"><strong>Início:</strong> {formatarData(r.dataInicio)}</p>
                  <p className="card-text"><strong>Fim:</strong> {formatarData(r.dataFim)}</p>
                  <p className="card-text"><strong>Valor:</strong> R$ {r.valorFinal}</p>
                  <p className="card-text"><strong>Situação:</strong> {r.situacao}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => editarReserva(r)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => excluirReserva(r.id)}>Excluir</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Reservas;
