import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

async function createUser() {
  const email = 'seuemail@example.com';
  const password = 'suasenha123'; // sua senha em texto
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'advisor',
    },
  });
  console.log('Usuário criado:', user);
}

createUser().catch(console.error).finally(() => process.exit());
