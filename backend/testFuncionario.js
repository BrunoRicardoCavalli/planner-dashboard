const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const funcionario = await prisma.funcionario.create({
    data: {
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      cargo: 'Desenvolvedor',
      salario: 5000.00,
      dataContratacao: new Date('2022-01-15'),
    },
  });

  console.log('Funcionário criado:', funcionario);

  const funcionarios = await prisma.funcionario.findMany();
  console.log('Lista de funcionários:', funcionarios);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
