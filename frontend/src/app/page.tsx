// src/app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Funcionario } from "../types";
import { getFuncionarios, createFuncionario, updateFuncionario, deleteFuncionario } from "../lib/api";
import FormFuncionario from "../components/FormFuncionario";
import FuncionariosTable from "../components/FuncionariosTable";
import SalarioChart from "../components/SalarioChart";
import SalarioPieChart from "../components/SalarioPieChart";

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [editing, setEditing] = useState<Funcionario | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchFuncionarios = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getFuncionarios(token);
      setFuncionarios(data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => { fetchFuncionarios(); }, [fetchFuncionarios]);

  const handleSave = async (funcionario: Funcionario) => {
    try {
      if (funcionario.id && funcionario.id > 0) {
        await updateFuncionario(token, funcionario);
      } else {
        const { id, ...rest } = funcionario;
        await createFuncionario(token, rest); // remove id
      }
      setEditing(null);
      fetchFuncionarios();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try { await deleteFuncionario(token, id); fetchFuncionarios(); } catch (err) { console.error(err); }
  };

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Funcionários</h1>
      <FormFuncionario onSave={handleSave} editing={editing} />
      <div className="mt-6">
        <FuncionariosTable funcionarios={funcionarios} onEdit={setEditing} onDelete={handleDelete} />
      </div>
      <h2 className="text-xl font-semibold mt-10 mb-4">Gráfico de Salário Médio por Cargo</h2>
      <SalarioChart funcionarios={funcionarios} />
      <h2 className="text-xl font-semibold mt-10 mb-4">Distribuição Salarial por Cargo</h2>
      <SalarioPieChart funcionarios={funcionarios} />
    </div>
  );
}
