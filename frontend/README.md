# Frontend - Planner Dashboard

Este é o frontend do Planner Dashboard, desenvolvido com **Next.js 14 + TypeScript** e **ShadCN/UI**.

## Instalação

```bash
cd frontend
npm install
Variáveis de ambiente
Crie um arquivo .env na raiz do frontend com:

ini
Copiar
Editar
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL: URL base da API do backend.

Rodando localmente
bash
Copiar
Editar
npm run dev       # inicia em modo desenvolvimento
npm run build     # gera build de produção
npm start         # roda a versão compilada
O frontend por padrão roda em http://localhost:3001 (conforme Docker Compose).

Funcionalidades
Cadastro, edição e exclusão de funcionários.

Exibição de gráficos:

Gráfico de barras: salário médio por cargo.

Gráfico de pizza: distribuição salarial por cargo.

Responsivo e compatível com zoom em desktop.

Integração com backend via REST API.

Docker
O Dockerfile já gera o build e expõe a porta 3000.

Para subir via Docker Compose (junto com backend e banco):

bash
Copiar
Editar
docker-compose up --build
Estrutura
src/app/ → páginas Next.js

src/components/ → componentes React (Form, Table, Charts)

src/lib/ → funções de API

src/types/ → tipos TypeScript

Observações
O frontend consome a API do backend e requer JWT para autenticação.

Recomendado instalar React DevTools para facilitar o desenvolvimento.