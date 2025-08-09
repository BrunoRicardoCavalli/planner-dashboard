import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../lib/prisma'

export default async function funcionariosRoutes(app: FastifyInstance) {
  // Aplica autenticação em todas as rotas desse grupo
  app.addHook('preHandler', app.authenticate)

  app.get('/', async () => {
    return await prisma.funcionario.findMany()
  })

  app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params
    const funcionario = await prisma.funcionario.findUnique({ where: { id: Number(id) } })
    if (!funcionario) return reply.status(404).send({ message: 'Funcionário não encontrado' })
    return funcionario
  })

  app.post('/', async (request: FastifyRequest<{ Body: { nome: string; email: string; cargo: string; salario: number; dataContratacao: string } }>, reply: FastifyReply) => {
    const { nome, email, cargo, salario, dataContratacao } = request.body
    try {
      const novoFuncionario = await prisma.funcionario.create({
        data: {
          nome,
          email,
          cargo,
          salario,
          dataContratacao: new Date(dataContratacao),
        },
      })
      return reply.status(201).send(novoFuncionario)
    } catch (error) {
      return reply.status(400).send({ message: 'Erro ao criar funcionário', error })
    }
  })

  app.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: { nome: string; email: string; cargo: string; salario: number; dataContratacao: string } }>, reply: FastifyReply) => {
    const { id } = request.params
    const { nome, email, cargo, salario, dataContratacao } = request.body
    try {
      const funcionarioAtualizado = await prisma.funcionario.update({
        where: { id: Number(id) },
        data: {
          nome,
          email,
          cargo,
          salario,
          dataContratacao: new Date(dataContratacao),
        },
      })
      return funcionarioAtualizado
    } catch {
      return reply.status(404).send({ message: 'Funcionário não encontrado' })
    }
  })

  app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params
    try {
      await prisma.funcionario.delete({ where: { id: Number(id) } })
      return reply.send({ message: 'Funcionário excluído com sucesso' })
    } catch {
      return reply.status(404).send({ message: 'Funcionário não encontrado' })
    }
  })
}
