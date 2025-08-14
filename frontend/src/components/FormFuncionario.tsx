// src/components/FormFuncionario.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Funcionario } from "../types";

interface Props {
  onSave: (funcionario: Funcionario) => void;
  editing?: Funcionario | null;
}

export default function FormFuncionario({ onSave, editing }: Props) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [salario, setSalario] = useState(0);

  useEffect(() => {
    setNome(editing?.nome || "");
    setCargo(editing?.cargo || "");
    setEmail(editing?.email || "");
    setSalario(editing?.salario || 0);
  }, [editing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      id: editing?.id || 0,
      nome,
      cargo,
      email,
      salario,
      dataContratacao: editing?.dataContratacao || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} className="border p-2 rounded" />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
      <input type="number" placeholder="Salário" value={salario} onChange={(e) => setSalario(Number(e.target.value))} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">{editing ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
}
