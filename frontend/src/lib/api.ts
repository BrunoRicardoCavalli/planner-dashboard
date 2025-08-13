import { Funcionario } from "../types";

const API_URL = "http://localhost:3001"; // URL do backend Fastify

export const getFuncionarios = async (token: string): Promise<Funcionario[]> => {
  const res = await fetch(`${API_URL}/funcionarios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const createFuncionario = async (token: string, funcionario: Funcionario) => {
  const res = await fetch(`${API_URL}/funcionarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(funcionario)
  });
  return res.json();
};

export const updateFuncionario = async (token: string, funcionario: Funcionario) => {
  const res = await fetch(`${API_URL}/funcionarios/${funcionario.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(funcionario)
  });
  return res.json();
};

export const deleteFuncionario = async (token: string, id: number) => {
  const res = await fetch(`${API_URL}/funcionarios/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};
