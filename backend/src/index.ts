import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { goalsRoutes } from './routes/goals';
import authenticate from './plugins/authenticate';
import funcionariosRoutes from './routes/funcionarios';

const app = Fastify();

// Swagger setup
app.register(swagger, { /* sua config swagger aqui */ });
app.register(swaggerUi, { /* sua config swagger-ui aqui */ });

// Registra plugin JWT (no seu authenticate.ts deve ter o register do jwt)
app.register(authenticate);

// Rotas
app.register(authRoutes, { prefix: '/auth' }); // login em /auth/login
app.register(userRoutes, { prefix: '/users' });
app.register(goalsRoutes, { prefix: '/goals' });
app.register(funcionariosRoutes, { prefix: '/funcionarios' });

// Listen e export
export default app;

if (require.main === module) {
  app.listen({ port: 3000, host: '0.0.0.0' })
    .then(() => {
      console.log('🚀 Server running on http://localhost:3000');
      console.log('📚 Swagger docs on http://localhost:3000/docs');
    })
    .catch(console.error);
}
