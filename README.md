# 🧾 Sistema de Reservas

Este projeto fullstack tem como objetivo permitir que usuários realizem o **cadastro de clientes, locações e reservas**, consultem dados e gerenciem tudo através de uma interface simples e eficiente.

---

## 🔧 Tecnologias Utilizadas

### Backend:
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Docker & Docker Compose
- Postman (para testes)
- Lombok

### Frontend:
- React.js (Create React App)
- JavaScript (ES6+)
- Hooks: useState, useEffect
- Fetch API para consumo da API REST

---

## 📁 Estrutura do Projeto

projeto/ ├── backend/ → API Spring Boot com MySQL │ ├── src/ │ ├── pom.xml │ └── docker-compose.yml │ ├── frontend/ → Interface em React.js │ ├── src/ │ ├── package.json │ └── public/ │ └── README.md → Este documento

---

## 🚀 Funcionalidades

- [x] Cadastro de clientes
- [x] Listagem de clientes
- [x] Remoção de clientes
- [x] Cadastro de locações
- [x] Listagem e exclusão de locações
- [x] Navegação entre telas
- [x] Cadastro de reservas
- [x] Listagem e consulta por data
- [ ] Autenticação (planejada)

---

## 🐳 Rodando com Docker

1. Navegue até a pasta `backend` e suba o banco com Docker:
```bash
docker-compose up -d

Rode a API no IntelliJ ou terminal:
mvn spring-boot:run

Navegue até a pasta frontend e rode o React:
npm install
npm start

🔗 Endpoints REST
Backend disponível em: http://localhost:8080
Frontend roda em: http://localhost:3000

Exemplo de endpoint:

GET /api/clientes
POST /api/locacoes
DELETE /api/reservas/{id}

👨‍💻 Autor
Desenvolvido por Leonardo Freire Dias como parte de um desafio técnico Fullstack.
