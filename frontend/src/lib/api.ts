// src/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Invalid JSON response from ${endpoint}`);
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Erro na requisição");
  return data;
}

import { Funcionario } from "../types";

export async function getFuncionarios(token: string): Promise<Funcionario[]> {
  return request<Funcionario[]>("/funcionarios", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createFuncionario(
  token: string,
  funcionario: Omit<Funcionario, "id">
): Promise<Funcionario> {
  if (!token) throw new Error("Token de autenticação ausente");
  return request<Funcionario>("/funcionarios", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(funcionario),
  });
}

export async function updateFuncionario(token: string, funcionario: Funcionario): Promise<Funcionario> {
  return request<Funcionario>(`/funcionarios/${funcionario.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(funcionario),
  });
}

export async function deleteFuncionario(token: string, id: number) {
  return request(`/funcionarios/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
