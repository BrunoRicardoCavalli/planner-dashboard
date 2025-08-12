import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';

export async function insuranceRoutes(app: FastifyInstance) {
  // Todas as rotas protegidas
  app.addHook('preHandler', app.authenticate);

  app.get('/insurance', async (request: FastifyRequest<{ Querystring: { clientId?: string }}>, reply: FastifyReply) => {
    const { clientId } = request.query;
    const where = clientId ? { clientId: Number(clientId) } : {};
    const insurance = await prisma.insurance.findMany({ where });
    reply.send(insurance);
  });

  app.post('/insurance', async (request: FastifyRequest<{ Body: { clientId: number; type: string; amount: number } }>, reply: FastifyReply) => {
    const { clientId, type, amount } = request.body;
    const insurance = await prisma.insurance.create({
      data: { clientId, type, amount },
    });
    reply.status(201).send(insurance);
  });

  app.put('/insurance/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: { type: string; amount: number } }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { type, amount } = request.body;
    const updatedInsurance = await prisma.insurance.update({
      where: { id: Number(id) },
      data: { type, amount },
    });
    reply.send(updatedInsurance);
  });

  app.delete('/insurance/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    await prisma.insurance.delete({ where: { id: Number(id) } });
    reply.send({ message: 'Seguro deletado com sucesso' });
  });
}
