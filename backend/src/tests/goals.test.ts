import { FastifyInstance } from 'fastify';

export async function goalsRoutes(app: FastifyInstance) {
  const getGoalsOpts = {
    schema: {
      description: 'Lista os goals do usuário',
      tags: ['Goals'],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              clientId: { type: 'number' },
              type: { type: 'string' },
              targetValue: { type: 'number' },
              targetDate: { type: 'string', format: 'date' }
            }
          }
        }
      }
    },
    preHandler: [app.authenticate],
  };

  app.get('/goals', getGoalsOpts, async (request, reply) => {
    // Aqui deveria buscar no banco, ex:
    // const goals = await prisma.goal.findMany({ where: { userId: request.user.id } });
    const goals = [
      {
        id: 1,
        clientId: 1,
        type: 'Investimento',
        targetValue: 100000,
        targetDate: '2026-12-31',
      },
    ];
    return goals;
  });
}
