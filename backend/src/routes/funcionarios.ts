import { FastifyInstance } from "fastify";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
}

let funcionarios: Funcionario[] = [
  { id: 1, nome: "Bruno", cargo: "Desenvolvedor" },
  { id: 2, nome: "Ana", cargo: "Analista" },
  { id: 3, nome: "Carlos", cargo: "Gerente" },
];

async function funcionariosRoutes(fastify: FastifyInstance) {
  // GET /funcionarios
  fastify.get("/", async () => {
    return Array.isArray(funcionarios) ? funcionarios : [];
  });

  // GET /funcionarios/:id
  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const f = funcionarios.find(f => f.id === parseInt(id));
    if (!f) return reply.status(404).send({ error: "Funcionário não encontrado" });
    return f;
  });

  // POST /funcionarios
  fastify.post("/", async (request, reply) => {
    const { nome, cargo } = request.body as { nome: string; cargo: string };
    const novo: Funcionario = { id: funcionarios.length + 1, nome, cargo };
    funcionarios.push(novo);
    return novo;
  });

  // PUT /funcionarios/:id
  fastify.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome, cargo } = request.body as { nome: string; cargo: string };
    const index = funcionarios.findIndex(f => f.id === parseInt(id));
    if (index === -1) return reply.status(404).send({ error: "Funcionário não encontrado" });
    funcionarios[index] = { id: parseInt(id), nome, cargo };
    return funcionarios[index];
  });

  // DELETE /funcionarios/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = funcionarios.findIndex(f => f.id === parseInt(id));
    if (index === -1) return reply.status(404).send({ error: "Funcionário não encontrado" });
    const removed = funcionarios.splice(index, 1);
    return removed[0];
  });
}

export default funcionariosRoutes;
