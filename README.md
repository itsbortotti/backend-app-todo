# Backend API - Todo App

Este projeto é o backend da aplicação Todo App, desenvolvido em Node.js com NestJS e TypeORM, utilizando SQLite como banco de dados.

## **Configuração do Ambiente**
--------------------------------------------------------------------------------------------------------  
### **Requisitos**

- Node.js (v18 ou superior)
- Docker e Docker Compose (opcional, para execução em container)

--------------------------------------------------------------------------------------------------------  
### **Instalação**

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd backend

3.	Instale as dependências:
  npm install

--------------------------------------------------------------------------------------------------------
### **Comandos**

Iniciar o Servidor  
  npm run start:dev

Compilar para Produção
  npm run build

Iniciar em Produção  
  npm run start:prod

--------------------------------------------------------------------------------------------------------
### **Documentação da API**

O Swagger está disponível no endpoint:
http://localhost:4000/api-docs

--------------------------------------------------------------------------------------------------------
### **Docker**

Build e Execução
1.  Certifique-se de que o Docker esteja em execução.

2.  Na raiz do projeto, execute:
   docker-compose up --build

3.  Parar os Containers 
    docker-compose down --volumes --remove-orphans

--------------------------------------------------------------------------------------------------------
### **Testes**

Este projeto utiliza Jest para testes unitários.

Executar Testes
  npm test

Executar Testes com Watch
  npm run test:watch

--------------------------------------------------------------------------------------------------------
### **Estrutura do Projeto**
src
 ├── main.ts          // Ponto de entrada da aplicação
 ├── app.module.ts    // Módulo principal
 ├── tasks            // Módulo de tarefas (rotas, serviços e controladores)
 
