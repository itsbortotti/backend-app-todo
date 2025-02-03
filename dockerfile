# Backend Dockerfile
FROM node:18-alpine

# Instalar dependências necessárias
RUN apk add --no-cache sqlite python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]