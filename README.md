# Backend chat leaf Chat Sustentabilidade

-----------------------------------------------------------------------------
# Execução
## CONFIGURAÇÕES:
- Docker: https://www.docker.com/products/docker-desktop/
- Nodejs (versão 16.15.0): https://nodejs.org/en
- yarn: https://yarnpkg.com/getting-started/install

## INSTALAÇÃO DO PROJETO
1. Após as configurações anteriores terem sido feitas, executar o comando <i>npm i</i> ou <i>yarn</i> para instalar as dependências do projeto;
2. Criar um arquivo chamado <i>.env</i> contendo o conteúdo a seguir: 

  ## env config
  #POSTGRES
  POSTGRES_USERNAME=root
  POSTGRES_PASSWORD=root
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_DATABASE=leafchat

  DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public


  #MONGODB
  MONGO_INITDB_ROOT_USERNAME=root
  MONGO_INITDB_ROOT_PASSWORD=root
  MONGODB_HOST=localhost
  MONGODB_PORT=27017
  MONGODB_DATABASE=leafchat
  MONGODB_URL=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin&directConnection=true

  JWT_SECRET=2
  BACKEND_URL="http://localhost:5000"
  FRONTEND_URL="http://localhost:3000"

3. Execute o comando `npm run project:setup` ou `yarn project:setup` na raiz do projeto. Esse comando irá executar: 
  - o docker compose para subir os dois containers necessários para a comunicação com banco de dados;
  - prisma migrate dev para gerar as tabelas do banco relacional da aplicação (MYSQL) e em seguida as migrations que o prismaORM necessita
  - prisma generate dev para gerar a tipagem que cada entidade do prisma precisa para suportar o typescript
  - execução das seeds que irão gerar registros pro banco de dados
  - no final do processo, no console terá a informação de 3 usuários. Você pode usar um deles para logar na aplicação

4. executar o comando `npm run dev` ou `yarn dev`. Após isso, a aplicação estará em execução na porta `5000`

-----------------------------------------------------------------------------
# Todo
[x] Env          | include load .env setup

[ ] Middleware   | include joi middlewares and create schemas
[ ] Middleware   | include auth middleware

[x] Error        | setup error methods

[ ] Service      | setup
[ ] Service      | implement logic based in each entity

[x] Test         | setup
[ ] Test         | integration
[ ] Test         | unitary

[ ] Repository   | create repository

[x] Socket.io    | setup
[ ] Socket.io    | consume in chat endpoint

[ ] Docker       | include dockerfile for production deploy

[x] Husky        | setup
[ ] Husky        | include conventional commit pattern

[] Add status in user model
[] Improve role/access user control

- https://duncanlew.medium.com/getting-started-with-husky-and-lint-staged-for-pre-commit-hooks-c2764d8c9ae
