// src/components/SalarioPieChart.tsx
"use client";

import { Funcionario } from "../types";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  funcionarios: Funcionario[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE"];

export default function SalarioPieChart({ funcionarios }: Props) {
  const grouped: Record<string, number> = {};
  funcionarios.forEach(f => {
    if (!grouped[f.cargo]) grouped[f.cargo] = 0;
    grouped[f.cargo] += f.salario;
  });

  const data = Object.entries(grouped).map(([cargo, totalSalario]) => ({ name: cargo, value: totalSalario }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
