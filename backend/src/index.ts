import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import funcionariosRoutes from "./routes/funcionarios";

const app = Fastify({ logger: true });

// CORS para o frontend
app.register(cors, {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: "Planner Dashboard API",
      description: "API do backend do Planner Dashboard",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject) => swaggerObject,
});

// Rotas
app.register(funcionariosRoutes, { prefix: "/funcionarios" });

// Start do servidor
if (require.main === module) {
  app.listen({ port: 3000, host: "0.0.0.0" })
    .then(() => {
      console.log("🚀 Server running on http://localhost:3000");
      console.log("📚 Swagger docs on http://localhost:3000/docs");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default app;
