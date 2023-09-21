# Backend chat leaf Chat Sustentabilidade

-----------------------------------------------------------------------------
Descrição: 

-----------------------------------------------------------------------------
Execução: Para o pleno funcionamento do Frontend e Mobile esse BackEnd
deve esta em Execução

exec.
_______________
yarn dev

Stop.
---------------
Crlt + Cc

Processo Preso.
-------------------------
Kill process PID 

------------------------------------------
Dependencias 

yarn add multer v1.15.2

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

# env config
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
