import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export async function userRoutes(app: FastifyInstance) {
  // Criar usuário (signup)
  app.post('/users', async (request, reply) => {
    const { email, password, role } = request.body as {
      email: string;
      password: string;
      role: 'advisor' | 'viewer';
    };

    // normaliza email
    const normalizedEmail = email.toLowerCase();

    // criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria usuário
    const user = await prisma.user.create({
      data: { email: normalizedEmail, password: hashedPassword, role },
      select: { id: true, email: true, role: true, createdAt: true }, // não retorna password
    });

    reply.status(201).send(user);
  });

  // Listar todos os usuários (sem senha)
  app.get('/users', async () => {
    return prisma.user.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
    });
  });
}
