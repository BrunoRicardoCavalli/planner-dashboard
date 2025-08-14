# Backend - Planner Dashboard

## Instalação e build

```bash
cd backend
npm install
npm run build
Variáveis de ambiente

Crie um arquivo .env com as seguintes variáveis:

DATABASE_URL=postgresql://planner:plannerpw@db:5432/plannerdb
JWT_SECRET=uma_chave_secreta
PORT=3000


DATABASE_URL: string de conexão com o PostgreSQL

JWT_SECRET: chave para assinatura dos tokens JWT

PORT: porta onde o backend irá rodar

Rodando localmente
npm run dev       # modo desenvolvimento
npm start         # modo produção

Endpoints principais

POST /auth/login → login (retorna JWT)

GET /funcionarios → lista funcionários

POST /funcionarios → cria funcionário

PUT /funcionarios/:id → atualiza funcionário

DELETE /funcionarios/:id → remove funcionário

GET /clients → lista clientes

POST /clients → cria cliente

PUT /clients/:id → atualiza cliente

DELETE /clients/:id → remove cliente

GET /simulations/projection → retorna projeção patrimonial

Testes
npm run test


Cobertura mínima: 80% (unitários + integração + E2E)

Docker

O Dockerfile já gera o build do TypeScript e expõe a porta 3000.

Para subir via Docker Compose (junto com frontend e banco):

docker-compose up --build