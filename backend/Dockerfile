# Usa imagem oficial Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Compila o TypeScript (gera dist/)
RUN npm run build

# Expõe a porta que o Fastify escuta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
