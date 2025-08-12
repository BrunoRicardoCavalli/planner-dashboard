import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';

export async function simulationsRoutes(app: FastifyInstance) {
  // Autenticação para todas as rotas
  app.addHook('preHandler', app.authenticate);

  app.get('/simulations', async (request: FastifyRequest<{ Querystring: { clientId?: string }}>, reply: FastifyReply) => {
    const { clientId } = request.query;
    const where = clientId ? { clientId: Number(clientId) } : {};
    const simulations = await prisma.simulation.findMany({ where });
    reply.send(simulations);
  });

  app.post('/simulations', async (request: FastifyRequest<{ Body: { clientId: number; name: string; rateReal: number; data: any } }>, reply: FastifyReply) => {
    const { clientId, name, rateReal, data } = request.body;
    const simulation = await prisma.simulation.create({
      data: { clientId, name, rateReal, data },
    });
    reply.status(201).send(simulation);
  });

  app.put('/simulations/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: { name: string; rateReal: number; data: any } }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { name, rateReal, data } = request.body;
    const updatedSimulation = await prisma.simulation.update({
      where: { id: Number(id) },
      data: { name, rateReal, data },
    });
    reply.send(updatedSimulation);
  });

  app.delete('/simulations/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    await prisma.simulation.delete({ where: { id: Number(id) } });
    reply.send({ message: 'Simulação deletada com sucesso' });
  });
}
