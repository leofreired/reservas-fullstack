<<<<<<< HEAD
# 🏗️ Sistema de Reservas - Backend

Este projeto é o backend de um sistema de reservas desenvolvido em Java com Spring Boot. Ele permite o gerenciamento de clientes, locações e reservas, seguindo boas práticas de arquitetura, validação, persistência e integração com MySQL via Docker.

---

## 🚀 Tecnologias Utilizadas

- Java 17
- Spring Boot 3.4
- Spring Data JPA
- Spring Validation
- Lombok
- MySQL 8 (via Docker)
- Maven
- Postman (para testes manuais)
- Docker & Docker Compose

---

## ⚙️ Funcionalidades

- ✅ CRUD de Clientes
- ✅ CRUD de Locações
- ✅ CRUD de Reservas
- ✅ Relacionamentos entre Cliente, Locação e Reserva
- ✅ Endpoint para listar locações disponíveis por data (em breve)
- ✅ Validações de dados com Bean Validation
- ✅ Conexão com MySQL via Docker

---

## 🐳 Como rodar com Docker

### Pré-requisitos
- Docker e Docker Compose instalados
- Maven instalado (ou use IntelliJ para compilar)

### 1. Suba o MySQL via Docker

No terminal, dentro da pasta `backend`:

```bash
docker-compose up -d
Isso criará um container MySQL na porta 3306 com:

usuário: root

senha: root

banco: reservasdb

2. Rodar a aplicação
Se preferir usar o IntelliJ:

Abra o projeto

Rode a classe BackendApplication.java

Ou via terminal (se tiver o Maven configurado):

bash
Copiar
Editar
mvn spring-boot:run


🔌 Endpoints principais
Base URL: http://localhost:8080

▶️ Clientes
GET /api/clientes

GET /api/clientes/{id}

POST /api/clientes

DELETE /api/clientes/{id}

▶️ Locações
GET /api/locacoes

GET /api/locacoes/{id}

POST /api/locacoes

DELETE /api/locacoes/{id}

▶️ Reservas
GET /api/reservas

GET /api/reservas/{id}

POST /api/reservas

DELETE /api/reservas/{id}

🧪 Testes com Postman
Você pode testar os endpoints manualmente com o Postman. Recomenda-se importar uma coleção com os exemplos prontos.


🔐 Segurança
No momento, todos os endpoints estão abertos (sem autenticação), mas o projeto já conta com estrutura para aplicar segurança com Spring Security e JWT.


📂 Estrutura do Projeto

backend/
├── src/main/java/com/meuprojeto/backend/
│   ├── controller/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   ├── config/
│   └── BackendApplication.java
├── src/main/resources/
│   ├── application.yml
├── docker-compose.yml
└── pom.xml

🧠 Autor
Desenvolvido por Leonardo Freire Dias para o desafio técnico de desenvolvedor Fullstack Júnior.
=======
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
- [ ] Cadastro de reservas (em andamento)
- [ ] Listagem e consulta por data
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
Desenvolvido por Leonardo como parte de um desafio técnico Fullstack.
>>>>>>> ee14e46 (init: adiciona backend e frontend)
