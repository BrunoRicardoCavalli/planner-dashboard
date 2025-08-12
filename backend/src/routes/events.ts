import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';

export async function eventsRoutes(app: FastifyInstance) {
  // Usar autenticação para todas rotas abaixo
  app.addHook('preHandler', app.authenticate);

  app.get('/events', async (request: FastifyRequest<{ Querystring: { clientId?: string }}>, reply: FastifyReply) => {
    const { clientId } = request.query;
    const where = clientId ? { clientId: Number(clientId) } : {};
    const events = await prisma.event.findMany({ where });
    reply.send(events);
  });

  app.post('/events', async (request: FastifyRequest<{ Body: { clientId: number; type: string; value: number; frequency: string; startDate: string } }>, reply: FastifyReply) => {
    const { clientId, type, value, frequency, startDate } = request.body;
    const event = await prisma.event.create({
      data: { clientId, type, value, frequency, startDate: new Date(startDate) },
    });
    reply.status(201).send(event);
  });

  app.put('/events/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: { type: string; value: number; frequency: string; startDate: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { type, value, frequency, startDate } = request.body;
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: { type, value, frequency, startDate: new Date(startDate) },
    });
    reply.send(updatedEvent);
  });

  app.delete('/events/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    await prisma.event.delete({ where: { id: Number(id) } });
    reply.send({ message: 'Evento deletado com sucesso' });
  });
}
