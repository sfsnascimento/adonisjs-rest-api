# AdonisJS Versão 6 REST API

Esse projeto é uma REST API feito com AdonisJS Versão 6. A API utiliza o MySQL como banco de dados.



## Pré-requisitos
  - Node.js >= 20.6
  - MySQL

## Instalação

Siga os passos para clonar o projeto e rodar na sua máquina local:


1. **Clone o Repositório:**

   ```
   git clone git@github.com:sfsnascimento/adonisjs-rest-api.git
   cd adonis-rest-api
   ```

2. **Instale as Dependências:**

   Rode o seguinte comando no diretório raiz do projeto para instalar as dependências:

   ```
   npm install
   ```

3. **Configuração do Banco de Dados:**

   Esse projeto utiliza MySQL. Tenha certeza que tem o MySQL instalado e rodando em sua máquina.
    - Crie um novo banco de dados MySQL. 

4. **Configuração do Ambiente:**
   
   Você precisa criar o seu próprio arquivo `.env` no diretório raiz do projeto. Esse arquivo conterá os detalhes necessários para sua conexão com o MySQL. Um exemplo de como seu arquivo `.env` deve ser:
   ```
    TZ=UTC
    PORT=3333
    HOST=localhost
    LOG_LEVEL=info
    APP_KEY=
    NODE_ENV=development
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=seu_usuario_do_banco_de_dados
    DB_PASSWORD=sua_senha_do_banco_de_dados
    DB_DATABASE=nome_do_banco_de_dados
   ```

   Substitua `seu_usuario_do_banco_de_dados`, `sua_senha_do_banco_de_dados` e `nome_do_banco_de_dados` com os seus dados do banco de dados MySQL.

5. **Rode as migrations do Banco de Dados:**

   Execute o seguinte comando no diretório raiz para rodar as migrations do banco de dados:

   ```
   node ace migration:run
   ```

   Isso irá criar as tabelas necessárias no seu banco de dados.

## Rodando a Aplicação

Para rodar a aplicação rode no diretório raiz do projeto:

```
node ace serve --hmr ou npm run dev
```

## Rotas da Aplicação ##

**Rotas Usuário**
  
  - `POST /signup` - adiciona um usuário no banco.

        {
          "email": "admin@teste.com",
          "password": "123456"
        }
  - `POST /login` - realiza o login de um usuário cadastrado.

        {
          "email": "admin@teste.com",
          "password": "123456"
        }

**Rotas Cliente**

  - `GET /clients` - retorna os clientes cadastrados.
  - `GET /client/:id/:year?/:month?` - retorna os dados de um cliente (year e month são opicionais e filtram os dados por ano e mês).
  - `POST /client` - adiciona um cliente.

        {
          "name": "cliente",
          "cpf": "12345678915"
        }
  - `PUT /client/:id` - altera os dados de um cliente.

        {
          "name": "cliente1"
        }

**Rotas Produto**

  - `GET /products` - retorna os produtos cadastrados no banco.
  - `GET /product/:id` - retorna um produto.
  - `POST /product` - adiciona um produto.

        {
          "name":"Celular",
          "price": 2500.00,
          "quantity": 7
        }
  - `PUT /product/:id` - altera dados de um produto.

        {
	        "name": "Mouse logitech"
        }
  - `DELETE /product/:id` - realiza um **soft delete** no produto.

        {
          "active": false
        }

**Rota Venda**

  - `POST /sale` - adiciona uma venda.

        {
          "clientId": 1,
          "productId": 1,
          "quantity": 2
        }
