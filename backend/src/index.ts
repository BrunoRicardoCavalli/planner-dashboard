import Fastify from 'fastify';
import { userRoutes } from './routes/users';
import { authRoutes } from './routes/auth';  // aqui importou authRoutes
import authenticate from './plugins/authenticate';

const app = Fastify();

app.register(userRoutes);
app.register(authRoutes);    // registra as rotas de login
app.register(authenticate);

app.listen({ port: 3000 }).then(() => {
  console.log('🚀 Server running on http://localhost:3000');
});
