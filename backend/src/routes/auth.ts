import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';

interface UserPayload {
  id: number;
  email: string;
  role: string;
}

interface AuthRequest {
  email: string;
  password: string;
}

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/login',
    async (request: FastifyRequest<{ Body: AuthRequest }>, reply: FastifyReply) => {
      const { email, password } = request.body;

      const user = await fastify.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return reply.status(401).send({ error: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return reply.status(401).send({ error: 'Credenciais inválidas' });
      }

      const token = fastify.jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        { expiresIn: '1h' }
      );

      return { token };
    }
  );

  fastify.get(
    '/me',
    { preHandler: [fastify.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
      return { user: request.user };
    }
  );
}
