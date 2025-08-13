"use client";

import { useState, useEffect } from "react";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
}

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [editing, setEditing] = useState<Funcionario | null>(null);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");

  // Buscar todos os funcionários
  const fetchFuncionarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/funcionarios");
      const data = await res.json();
      setFuncionarios(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Salvar funcionário (novo ou editar)
  const handleSave = async () => {
    if (!nome || !cargo) return;

    if (editing) {
      // Update
      await fetch(`http://localhost:3000/funcionarios/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cargo })
      });
    } else {
      // Create
      await fetch("http://localhost:3000/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cargo })
      });
    }

    setNome("");
    setCargo("");
    setEditing(null);
    fetchFuncionarios();
  };

  // Deletar funcionário
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/funcionarios/${id}`, {
      method: "DELETE"
    });
    fetchFuncionarios();
  };

  // Editar funcionário
  const handleEdit = (f: Funcionario) => {
    setEditing(f);
    setNome(f.nome);
    setCargo(f.cargo);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Funcionários</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          {editing ? "Atualizar" : "Adicionar"}
        </button>
      </div>

      <ul className="space-y-2">
        {funcionarios.map((f) => (
          <li key={f.id} className="flex justify-between items-center border p-2 rounded">
            <span>{f.nome} - {f.cargo}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(f)}
                className="bg-yellow-500 text-white px-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(f.id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
