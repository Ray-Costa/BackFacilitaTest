# Projeto Node.js com PostgreSQL - Backend
Este é um projeto backend desenvolvido em Node.js utilizando PostgreSQL como banco de dados. O objetivo principal é permitir a criação e listagem de usuários.

## Configuração do Projeto
Antes de executar o projeto, é necessário configurar o ambiente. Siga os passos abaixo:

### Clone o repositório:
```bash
git clone git@github.com:Ray-Costa/BackFacilitaTest.git
```

### Instale as dependências:

```bash
cd BackFacilitaTest
npm install
```

### Configure o Banco de Dados PostgreSQL:

Crie um banco de dados no PostgreSQL.
Copie o arquivo .env.example para um novo arquivo chamado .env.
Edite o arquivo .env com suas configurações de banco de dados.

Execute as Migrações:

```bash
npm run migrate
```

### Executando o Projeto
Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```
O servidor estará rodando em http://localhost:3000.

## Endpoints da API
A API possui os seguintes endpoints:

POST /users: Cria um novo usuário.
GET /users: Lista todos os usuários cadastrados.
Certifique-se de usar ferramentas como Postman ou curl para interagir com a API.

