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
- https://duncanlew.medium.com/getting-started-with-husky-and-lint-staged-for-pre-commit-hooks-c2764d8c9ae
