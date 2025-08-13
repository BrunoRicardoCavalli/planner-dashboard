import { useState } from 'react';

export default function TesteFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarFuncionarios = async () => {
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('http://localhost:3000/funcionarios'); // rota do backend
      if (!res.ok) throw new Error('Erro ao buscar funcionários');
      const data = await res.json();
      setFuncionarios(data);
    } catch (err) {
      setErro(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Funcionários</h1>
      <button onClick={buscarFuncionarios} disabled={loading}>
        {loading ? 'Carregando...' : 'Buscar Funcionários'}
      </button>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <ul>
        {funcionarios.map(f => (
          <li key={f.id}>{f.nome} - {f.cargo}</li>
        ))}
      </ul>
    </div>
  );
}
