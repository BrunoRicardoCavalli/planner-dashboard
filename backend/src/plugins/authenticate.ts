import fp from 'fastify-plugin';
import jwt from '@fastify/jwt'; // IMPORTAR JWT
import { FastifyReply, FastifyRequest } from 'fastify';

export default fp(async (app) => {
  // Registra o plugin JWT aqui
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'secretao', // ou sua chave secreta
  });

  // Função para verificar token
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

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number; email: string; role: string };
    user: { id: number; email: string; role: string };
  }
}
