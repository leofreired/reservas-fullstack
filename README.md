# 🧾 Sistema de Reservas
Este projeto fullstack tem como objetivo permitir que usuários realizem o cadastro de clientes, locações e reservas, consultem dados e gerenciem tudo através de uma interface simples e eficiente.

# 🔧 Tecnologias Utilizadas

# Backend:
• Java 17
• Spring Boot
• Spring Data JPA
• MySQL
• Docker & Docker Compose
• Postman (para testes)
• Lombok

# Frontend:
• React.js (Create React App)
• JavaScript (ES6+)
• Hooks: useState, useEffect
• Fetch API para consumo da API REST
• Bootstrap (estilização)
• Toastify (mensagens visuais)


# 📁 Estrutura do Projeto
projeto/
├── backend/           → API Spring Boot com MySQL
│   ├── src/
│   ├── pom.xml
│   └── docker-compose.yml
│
├── frontend/          → Interface em React.js
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── logo.png        → Nova logo personalizada
│
└── README.md          → Este documento principal


# 🚀 Funcionalidades

# Clientes
• Cadastro, listagem, edição e exclusão
• Campo de busca por nome

# Locações
• Cadastro, listagem, edição e exclusão
• Descrição, valor por hora e tempo mínimo/máximo
• Campo de busca por nome/tipo

# Reservas
• Cadastro, listagem, edição e exclusão
• Cálculo automático do valor com base no tempo e valor por hora da locação
• Validação de tempo máximo definido na locação
• Campo de busca por nome do cliente

# Extras
• Navegação entre as páginas via menu
• Estilização com Bootstrap
• Feedback visual com toasts (mensagens de sucesso e erro)
• Datas formatadas com toLocaleString()

# 🐳 Rodando com Docker
Obs: O Docker foi utilizado para subir o banco de dados MySQL em container, evitando a necessidade de instalar o MySQL Workbench e facilitando a execução do projeto em qualquer ambiente.

• Para rodar localmente:
# Banco de dados
cd backend
docker-compose up -d  -> Inicia o MySQL dentro do Docker
docker-compose down  -> Encerra o MySQL dentro do Docker

• VER LOGS:
docker logs mysql-container

• PARA UTILIZAR O BANCO:
Primeiro se conectar ao CMD do Docker com a senha root:
docker exec -it mysql-container mysql -u root -p

USE reservasdb;  -> Iniciar o uso do banco
SELECT * FROM cliente;  -> Realizar os selects desejados para consultar dados

# Rodar backend manualmente (IntelliJ ou terminal)
mvn spring-boot:run

# Rodar frontend
cd frontend
npm install
npm start🔗 

# Endpoints REST
Backend: http://localhost:8080
Frontend: http://localhost:3000

Exemplos:
• GET /api/clientes
• POST /api/locacoes
• PUT /api/clientes
• DELETE /api/reservas/{id}

# 📘 Documentação da API
• A documentação completa da API está disponível no link abaixo:
🔗 [Documentação no Postman](https://documenter.getpostman.com/view/37931824/2sB2cd5ynX)

# 👨‍💻 Autor
Desenvolvido por Leonardo Freire Dias como parte de um desafio técnico Fullstack.