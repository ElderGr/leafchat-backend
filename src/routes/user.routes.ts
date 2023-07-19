import express from 'express';
import { createUser, deleteUser, findUser, getUsers, updateUser } from '@/controllers/user.controller';
import { validateBody } from '@/schemas/validation-middleware';
import { userSchema } from '@/schemas/user-schemas';

const routes = express.Router();

routes
  .get('/users', getUsers)
  .get('/users/:uid', findUser)
  .post('/users', validateBody(userSchema), createUser)
  .put('/users/:uid/', updateUser)
  .delete('/users/:uid', deleteUser);

export default routes;
