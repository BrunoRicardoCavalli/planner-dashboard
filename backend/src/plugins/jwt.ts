import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );

 fastify.decorate(
  'authorize',
  (roles: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();

        // Faz type assertion para o tipo correto
        const user = request.user as { role: string } | undefined;

        if (!user || !roles.includes(user.role)) {
          return reply.status(403).send({ message: 'Forbidden' });
        }
      } catch (err) {
        reply.send(err);
      }
    };
  }
);

});
