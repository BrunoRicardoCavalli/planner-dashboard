// src/routes/auth.ts
import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    // Busca usuário pelo email (lowercase)
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      return reply.status(401).send({ error: 'Credenciais inválidas' });
    }

    // Compara senha com hash
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return reply.status(401).send({ error: 'Credenciais inválidas' });
    }

    // Gera token JWT com id, role e email do usuário
    const token = app.jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      { expiresIn: '1h' }
    );

    return reply.send({ token });
  });
}
