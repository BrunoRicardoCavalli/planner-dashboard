// src/components/FuncionariosTable.tsx
"use client";

import { Funcionario } from "../types";

interface TableProps {
  funcionarios: Funcionario[];
  onEdit: (f: Funcionario) => void;
  onDelete: (id: number) => void;
}

export default function FuncionariosTable({ funcionarios, onEdit, onDelete }: TableProps) {
  return (
    <table className="min-w-full bg-card rounded-lg shadow overflow-hidden">
      <thead className="bg-secondary text-secondary-foreground">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Nome</th>
          <th className="px-4 py-2 text-left">Cargo</th>
          <th className="px-4 py-2 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map(f => (
          <tr key={f.id} className="border-t border-border hover:bg-secondary/10">
            <td className="px-4 py-2">{f.id}</td>
            <td className="px-4 py-2">{f.nome}</td>
            <td className="px-4 py-2">{f.cargo}</td>
            <td className="px-4 py-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 rounded" onClick={() => onEdit(f)}>Editar</button>
              <button className="bg-red-500 text-white px-2 rounded" onClick={() => onDelete(f.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
