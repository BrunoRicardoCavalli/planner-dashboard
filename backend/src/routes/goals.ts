import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';
import { z } from 'zod';

const goalSchema = z.object({
  clientId: z.number(),
  type: z.string(),
  targetValue: z.number(),
  targetDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Data inválida" }),
});

type GetGoalsQuerystring = {
  clientId?: string;
};

export async function goalsRoutes(app: FastifyInstance) {
  app.get<{ Querystring: GetGoalsQuerystring }>(
    '/goals',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const { clientId } = request.query;
        const where = clientId ? { clientId: Number(clientId) } : {};
        const goals = await prisma.goal.findMany({ where });
        reply.send(goals);
      } catch (e: unknown) {
        if (e instanceof Error) {
          reply.status(500).send({ error: e.message });
        } else {
          reply.status(500).send({ error: 'Erro ao buscar metas' });
        }
      }
    }
  );

  app.post<{ Body: z.infer<typeof goalSchema> }>(
    '/goals',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const parseResult = goalSchema.safeParse(request.body);
        if (!parseResult.success) {
          return reply.status(400).send({ error: parseResult.error.format() });
        }

        const { clientId, type, targetValue, targetDate } = parseResult.data;
        const goal = await prisma.goal.create({
          data: {
            clientId,
            type,
            targetValue,
            targetDate: new Date(targetDate),
          },
        });

        reply.code(201).send(goal);
      } catch (e: unknown) {
        if (e instanceof Error) {
          reply.status(500).send({ error: e.message });
        } else {
          reply.status(500).send({ error: 'Erro ao criar meta' });
        }
      }
    }
  );

  app.put<{
    Params: { id: string };
    Body: Partial<z.infer<typeof goalSchema>>;
  }>(
    '/goals/:id',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const parseResult = goalSchema.partial().safeParse(request.body);
        if (!parseResult.success) {
          return reply.status(400).send({ error: parseResult.error.format() });
        }

        const { type, targetValue, targetDate } = parseResult.data;

        const updatedGoal = await prisma.goal.update({
          where: { id: Number(id) },
          data: {
            ...(type !== undefined && { type }),
            ...(targetValue !== undefined && { targetValue }),
            ...(targetDate !== undefined && { targetDate: new Date(targetDate) }),
          },
        });

        reply.send(updatedGoal);
      } catch (e: unknown) {
        if (e instanceof Error) {
          reply.status(500).send({ error: e.message });
        } else {
          reply.status(500).send({ error: 'Erro ao atualizar meta' });
        }
      }
    }
  );

  app.delete<{ Params: { id: string } }>(
    '/goals/:id',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        await prisma.goal.delete({ where: { id: Number(id) } });
        reply.send({ message: 'Meta deletada com sucesso' });
      } catch (e: unknown) {
        if (e instanceof Error) {
          reply.status(500).send({ error: e.message });
        } else {
          reply.status(500).send({ error: 'Erro ao deletar meta' });
        }
      }
    }
  );
}
