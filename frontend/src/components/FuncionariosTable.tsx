"use client";

import { useState } from "react";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
}

export default function FuncionariosTable() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const buscarFuncionarios = async () => {
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("http://localhost:3000/funcionarios");
      if (!res.ok) throw new Error("Erro ao buscar funcionários");
      const data: Funcionario[] = await res.json();
      setFuncionarios(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Funcionários
      </h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={buscarFuncionarios}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Buscar Funcionários"}
      </button>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {funcionarios.length > 0 && (
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((f) => (
              <tr
                key={f.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{f.id}</td>
                <td className="px-4 py-2">{f.nome}</td>
                <td className="px-4 py-2">{f.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
