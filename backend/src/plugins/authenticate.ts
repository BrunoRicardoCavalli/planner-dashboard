// src/plugins/authenticate.ts
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export default fp(async (app) => {
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'secretao',
  });

  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send(err);
      }
    }
  );
});

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Aqui não redeclaramos tipos já existentes,
// apenas indicamos que `user` vai ter um formato específico
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number; email: string; role: string };
    user: { id: number; email: string; role: string };
  }
}
