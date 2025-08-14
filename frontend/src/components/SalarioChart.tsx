// src/components/SalarioChart.tsx
"use client";

import { Funcionario } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  funcionarios: Funcionario[];
}

export default function SalarioChart({ funcionarios }: Props) {
  const data = Object.values(
    funcionarios.reduce((acc: Record<string, { cargo: string; totalSalario: number; count: number }>, f) => {
      if (!acc[f.cargo]) acc[f.cargo] = { cargo: f.cargo, totalSalario: 0, count: 0 };
      acc[f.cargo].totalSalario += f.salario;
      acc[f.cargo].count += 1;
      return acc;
    }, {})
  ).map(item => ({ ...item, salarioMedio: item.totalSalario / item.count }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cargo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salarioMedio" fill="#8884d8" name="Salário Médio" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
