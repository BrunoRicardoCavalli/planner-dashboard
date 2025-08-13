"use client";

import { useState, FormEvent } from "react";
import { Funcionario } from "../types";

interface Props {
  token: string;
  onSave: (funcionario: Funcionario) => void;
  editing?: Funcionario | null;
}

export default function FormFuncionario({ token, onSave, editing }: Props) {
  const [nome, setNome] = useState(editing?.nome || "");
  const [cargo, setCargo] = useState(editing?.cargo || "");
  const [email, setEmail] = useState(editing?.email || "");
  const [salario, setSalario] = useState(editing?.salario || 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const funcionario: Funcionario = {
      id: editing?.id || 0,
      nome,
      cargo,
      email,
      salario,
      dataContratacao: editing?.dataContratacao || new Date().toISOString()
    };
    onSave(funcionario);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Cargo"
        value={cargo}
        onChange={e => setCargo(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Salário"
        value={salario}
        onChange={e => setSalario(Number(e.target.value))}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editing ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
